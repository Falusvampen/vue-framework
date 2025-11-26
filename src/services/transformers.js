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
// nice https://jasonwatmore.com/vanilla-js-slugify-a-string-in-javascript
const slugify = (input) => {
  if (!input) return ''

  // make lower case and trim
  let slug = input.toLowerCase().trim()

  // remove accents from characters
  slug = slug.normalize('NFD').replace(/[\u0300-\u036f]/g, '')

  // replace invalid chars with spaces
  slug = slug.replace(/[^a-z0-9\s-]/g, ' ').trim()

  // replace multiple spaces or hyphens with a single hyphen
  slug = slug.replace(/[\s-]+/g, '-')

  return slug
}

export const transformRecipe = (apiRecipe, comments = []) => {
  const ingredients = Array.isArray(apiRecipe.ingredients)
    ? apiRecipe.ingredients.map(transformIngredient)
    : []

  return {
    id: apiRecipe.id,
    title: apiRecipe.title || 'Namnlöst recept',
    slug: slugify(apiRecipe.title || 'namnlost-recept'),
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
  return Math.round((sum / ratings.length) * 10) / 10
}
