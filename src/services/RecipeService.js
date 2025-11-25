import apiClient from './apiClient'
import { transformRecipe, transformCategory } from './transformers'

export default {
  async getAllRecipes(teamId) {
    const response = await apiClient.get(`/${teamId}/recipes`)
    return response.data.map((recipe) => transformRecipe(recipe))
  },

  async getCategories(teamId) {
    const response = await apiClient.get(`/${teamId}/categories`)
    return response.data.map(transformCategory)
  },

  async getCompleteRecipe(teamId, recipeId) {
    try {
      const [recipeRes, commentsRes] = await Promise.all([
        apiClient.get(`/${teamId}/recipes/${recipeId}`),
        apiClient.get(`/${teamId}/recipes/${recipeId}/comments`),
      ])

      return transformRecipe(recipeRes.data, commentsRes.data)
    } catch (error) {
      console.error('Error fetching complete recipe:', error)
      throw error
    }
  },
}
