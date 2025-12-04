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
   *  OPTIMERAD: Hämtar alla recept (Snabba versionen).
   * Hämtar bara grundlistan. Inga tunga detalj-anrop här.
   */
  getAllRecipes = async (forceRefresh = false) => {
    // 1. Kolla cachen först
    if (!forceRefresh && this.isCacheValid()) {
      return this.allRecipesCache
    }

    // 2. Hämta bara listan (ett enda API-anrop)
    const response = await apiClient.get(`${this.teamPath}/recipes`)

    // 3. Transformera direkt (ingredienser blir tomma arrayer tills vidare)
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
    const response = await apiClient.get(`${this.teamPath}/categories`)
    return response.data.map(transformCategory)
  }

  /**
   * Tar bort en kategori.
   */
  deleteCategory = async (categoryId) => {
    await apiClient.delete(`${this.teamPath}/categories/${categoryId}`)
    this.allRecipesCache = null // Rensa cachen så listan uppdateras
  }

  /**
   * Hämtar ett komplett recept.
   */
  getCompleteRecipe = async (recipeId, forceRefresh = false) => {
    // 1. Kolla om vi redan har detaljerna i cachen
    if (!forceRefresh && this.recipeDetailsCache.has(recipeId)) {
      // Vi har receptet, men hämtar färska kommentarer
      const cachedRecipe = this.recipeDetailsCache.get(recipeId)
      const commentsRes = await apiClient.get(`${this.teamPath}/recipes/${recipeId}/comments`)
      return transformRecipe(cachedRecipe, commentsRes.data)
    }

    // 2. Hämta receptdetaljer och kommentarer parallellt
    const [recipeRes, commentsRes] = await Promise.all([
      apiClient.get(`${this.teamPath}/recipes/${recipeId}`),
      apiClient.get(`${this.teamPath}/recipes/${recipeId}/comments`),
    ])

    // 3. Spara den tunga receptdatan i cachen
    this.recipeDetailsCache.set(recipeId, recipeRes.data)

    return transformRecipe(recipeRes.data, commentsRes.data)
  }

  addRecipe = async (payload) => {
    const response = await apiClient.post(`${this.teamPath}/recipes`, payload)
    this.allRecipesCache = null // Rensa cachen
    this.recipeDetailsCache.clear(); // Rensa detaljerad cache för att undvika inaktuella data
    return transformRecipe(response.data)
  }

  deleteRecipe = async (recipeId) => {
    await apiClient.delete(`${this.teamPath}/recipes/${recipeId}`)
    this.recipeDetailsCache.delete(recipeId)
    this.allRecipesCache = null
  }

  getRecipeComments = async (recipeId) => {
    const response = await apiClient.get(`${this.teamPath}/recipes/${recipeId}/comments`)
    return response.data.map(transformComment)
  }

  addComment = async (recipeId, payload) => {
    const response = await apiClient.post(`${this.teamPath}/recipes/${recipeId}/comments`, payload)
    return transformComment(response.data)
  }

  addRating = async (recipeId, rating) => {
    const response = await apiClient.post(`${this.teamPath}/recipes/${recipeId}/ratings`, rating)

    // Vi måste ta bort cachen för detta recept så att nya snittbetyget hämtas nästa gång
    this.recipeDetailsCache.delete(recipeId)
    this.allRecipesCache = null

    return response.data
  }
}

const teamId = import.meta.env.VITE_TEAM_ID
const recipeService = new RecipeService(teamId)

export default recipeService
