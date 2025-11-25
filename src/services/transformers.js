const formatDate = (dateString) => {
  if (!dateString) return ''
  try {
    const options = { year: 'numeric', month: 'short', day: 'numeric' }
    return new Date(dateString).toLocaleDateString('sv-SE', options)
  } catch (e) {
    console.error('Error formatting date:', e)
    return dateString
  }
}

export const transformRecipe = (apiRecipe, comments = []) => {
  const ingredients = Array.isArray(apiRecipe.ingredients)
    ? apiRecipe.ingredients.map(transformIngredient)
    : []

  return {
    id: apiRecipe.id,
    title: apiRecipe.title || 'Namnlöst recept',
    description: apiRecipe.description || 'Ingen beskrivning tillgänglig.',
    imageUrl: apiRecipe.imageUrl || 'https://via.placeholder.com/800x600?text=Ingen+bild',
    time: apiRecipe.timeInMins ? `${apiRecipe.timeInMins} min` : 'Okänd tid',

    createdAtRaw: apiRecipe.createdAt,
    createdAt: formatDate(apiRecipe.createdAt),

    ingredients: ingredients,
    instructions: apiRecipe.instructions || [],
    categories: apiRecipe.categories || [],

    ratings: apiRecipe.ratings || [],
    averageRating: calculateAverageRating(apiRecipe.ratings),

    comments: comments.map(transformComment),
  }
}

export const transformIngredient = (apiIngredient) => {
  return {
    id: apiIngredient.id,
    name: apiIngredient.name,
    amount: apiIngredient.amount,
    unit: apiIngredient.unit,
    display: `${apiIngredient.amount} ${apiIngredient.unit} ${apiIngredient.name}`,
  }
}

export const transformComment = (apiComment) => {
  return {
    id: apiComment.id,
    author: apiComment.name || 'Anonym',
    text: apiComment.comment,
    date: formatDate(apiComment.createdAt),
  }
}

export const transformCategory = (apiCategory) => {
  return {
    id: apiCategory.id,
    name: apiCategory.name,
  }
}

function calculateAverageRating(ratings) {
  // Om inga betyg finns, så scammar vi användaren med 5 stjärnor som standard hehe..
  if (!ratings || ratings.length === 0) return 5
  const sum = ratings.reduce((a, b) => a + b, 0)
  return (sum / ratings.length).toFixed(1)
}
