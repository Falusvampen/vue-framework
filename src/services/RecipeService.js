import apiClient from './apiClient'
import { transformRecipe, transformCategory, transformComment } from './transformers'

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

  async getRecipeComments(teamId, recipeId) {
    const response = await apiClient.get(`/${teamId}/recipes/${recipeId}/comments`)
    return response.data.map(transformComment)
  },

  async addComment(teamId, recipeId, payload) {
    const response = await apiClient.post(`/${teamId}/recipes/${recipeId}/comments`, payload)
    return transformComment(response.data)
  },
}
