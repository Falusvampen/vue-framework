import apiClient from './apiClient'
import { transformRecipe, transformCategory, transformComment } from './transformers'

const CACHE_TTL = 5 * 60 * 1000

export class RecipeService {
  // Interna variabler för caching
  allRecipesCache = null
  lastFetchTime = 0

  // En Map där vi sparar detaljerna för recept vi klickat på eller laddat i bakgrunden
  recipeDetailsCache = new Map()

  /**
   * @param {string} teamId - Unikt ID för teamet/gruppen
   */
  constructor(teamId) {
    if (!teamId) {
      throw new Error('RecipeService: "teamId" saknas! Kontrollera din .env-fil.')
    }
    this.teamPath = `/${teamId}`
  }

  /**
   * Hjälpmetod för att se om vår cachade lista är giltig.
   */
  isCacheValid = () => {
    const now = Date.now()
    return this.allRecipesCache && now - this.lastFetchTime < CACHE_TTL
  }

  /**
   * Hämtar alla recept
   */
  getAllRecipes = async (forceRefresh = false) => {
    // 1. Kolla cachen först
    if (!forceRefresh && this.isCacheValid()) {
      return this.allRecipesCache
    }

    // 2. Hämta bara listan (ett enda API-anrop)
    const response = await apiClient.get(`${this.teamPath}/recipes`, {
      errorMessage: 'Kunde inte hämta receptlistan. Försök ladda om sidan.',
    })

    // 3. Transformera direkt
    const recipes = response.data.map(transformRecipe)

    // 4. Spara i cachen
    this.allRecipesCache = recipes
    this.lastFetchTime = Date.now()

    return this.allRecipesCache
  }

  /**
   * Hämtar kategorier.
   */
  getCategories = async () => {
    const response = await apiClient.get(`${this.teamPath}/categories`, {
      errorMessage: 'Kunde inte hämta kategorierna.',
    })
    return response.data.map(transformCategory)
  }

  /**
   * Tar bort en kategori.
   */
  deleteCategory = async (categoryId) => {
    await apiClient.delete(`${this.teamPath}/categories/${categoryId}`, {
      errorMessage: 'Kunde inte ta bort kategorin. Den kanske används av ett recept?',
    })
    this.allRecipesCache = null // Rensa cachen så listan uppdateras
  }

  /**
   * Hämtar ett specifikt recept med alla detaljer.
   */
  getRecipe = async (recipeId) => {
    if (this.recipeDetailsCache.has(recipeId)) {
      return this.recipeDetailsCache.get(recipeId)
    }

    const response = await apiClient.get(`${this.teamPath}/recipes/${recipeId}`, {
      errorMessage: 'Kunde inte hämta receptets detaljer.',
    })
    const recipe = transformRecipe(response.data)

    // 3. Spara i cachen
    this.recipeDetailsCache.set(recipeId, recipe)
    return recipe
  }

  addRecipe = async (payload) => {
    const response = await apiClient.post(`${this.teamPath}/recipes`, payload, {
      errorMessage: 'Det gick inte att spara receptet. Kontrollera att alla fält är ifyllda.',
    })
    this.allRecipesCache = null // Rensa cachen
    this.recipeDetailsCache.clear() // Rensa detaljerad cache för att undvika inaktuella data
    return transformRecipe(response.data)
  }

  deleteRecipe = async (recipeId) => {
    await apiClient.delete(`${this.teamPath}/recipes/${recipeId}`, {
      errorMessage: 'Kunde inte ta bort receptet.',
    })
    this.recipeDetailsCache.delete(recipeId)
    this.allRecipesCache = null
  }

  getRecipeComments = async (recipeId) => {
    const response = await apiClient.get(`${this.teamPath}/recipes/${recipeId}/comments`, {
      errorMessage: 'Kunde inte hämta kommentarer.',
    })
    return response.data.map(transformComment)
  }

  addComment = async (recipeId, payload) => {
    const response = await apiClient.post(
      `${this.teamPath}/recipes/${recipeId}/comments`,
      payload,
      { errorMessage: 'Kunde inte skicka kommentaren.' },
    )
    return transformComment(response.data)
  }

  addRating = async (recipeId, rating) => {
    const response = await apiClient.post(`${this.teamPath}/recipes/${recipeId}/ratings`, rating, {
      errorMessage: 'Kunde inte spara ditt betyg.',
    })

    // Vi måste ta bort cachen för detta recept så att nya snittbetyget hämtas nästa gång
    this.recipeDetailsCache.delete(recipeId)
    this.allRecipesCache = null

    return response.data
  }
}

const teamId = import.meta.env.VITE_TEAM_ID
const recipeService = new RecipeService(teamId)

export default recipeService
