import apiClient from './apiClient'
import { transformRecipe, transformCategory, transformComment } from './transformers'

/**
 * Service för att hantera recept-relaterade API-anrop.
 */
export class RecipeService {
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
   * Hämtar alla recept (lista).
   */
  async getAllRecipes() {
    const response = await apiClient.get(`${this.teamPath}/recipes`)
    return response.data.map(transformRecipe)
  }

  /**
   * Hämtar alla kategorier.
   */
  async getCategories() {
    const response = await apiClient.get(`${this.teamPath}/categories`)
    return response.data.map(transformCategory)
  }

  /**
   * Hämtar ett enskilt recept och dess kommentarer parallellt.
   * @param {string} recipeId
   */
  async getCompleteRecipe(recipeId) {
    const [recipeRes, commentsRes] = await Promise.all([
      apiClient.get(`${this.teamPath}/recipes/${recipeId}`),
      apiClient.get(`${this.teamPath}/recipes/${recipeId}/comments`),
    ])

    // Skickar in både receptdata och kommentarsdata till transformern
    return transformRecipe(recipeRes.data, commentsRes.data)
  }

  /**
   * Hämtar kommentarer för ett specifikt recept.
   * @param {string} recipeId
   */
  async getRecipeComments(recipeId) {
    const response = await apiClient.get(`${this.teamPath}/recipes/${recipeId}/comments`)
    return response.data.map(transformComment)
  }

  /**
   * Lägger till en kommentar för ett specifikt recept.
   * @param {string} recipeId
   * @param {object} payload - Kommentarens data
   */
  async addComment(recipeId, payload) {
    const response = await apiClient.post(`${this.teamPath}/recipes/${recipeId}/comments`, payload)
    return transformComment(response.data)
  }

  async addRating(recipeId, rating) {
    const response = await apiClient.post(`${this.teamPath}/recipes/${recipeId}/ratings`, rating)
    return response.data
  }
}

const teamId = import.meta.env.VITE_TEAM_ID
const recipeService = new RecipeService(teamId)

export default recipeService
