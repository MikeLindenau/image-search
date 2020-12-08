import { sortBy, reverse } from 'lodash'

const CHANGED_VIEW = 'CHANGED_VIEW'
const RECEIVED_IMAGES = 'RECEIVED_IMAGES'
const RECEIVED_MORE_IMAGES = 'RECEIVED_MORE_IMAGES'
const RATE_IMAGE = 'RATE_IMAGE'
const REMOVE_RATED_IMAGE = 'REMOVE_RATED_IMAGE'

export const actionTypes = {
  CHANGED_VIEW,
  RECEIVED_IMAGES,
  RECEIVED_MORE_IMAGES,
  RATE_IMAGE,
  REMOVE_RATED_IMAGE,
}

function cacheImages(images) {
  localStorage.setItem('images', JSON.stringify(images))
  return images
}

function fetchCachedImages() {
  return JSON.parse(localStorage.getItem('images') || '[]')
}

function sortByRating(ratedImages) {
  return reverse(sortBy(ratedImages, ['rating']))
}

function removeImage(id, images) {
  return images.filter((image) => image.id !== id)
}

function enrichWithRating(images, ratedImages) {
  const ratingIndex = {}

  ratedImages.forEach((ratedImage) => {
    ratingIndex[ratedImage.id] = ratedImage.rating
  })

  return images.map((image) => {
    image.rating = ratingIndex[image.id] || 0
    return image
  })
}

function replaceOrAdd(item, list) {
  const listWithoutItem = removeImage(item.id, list)
  return [...listWithoutItem, item]
}

export const initialState = {
  view: 'search',
  images: [],
  ratedImages: fetchCachedImages(),
}

function addRatingReducer(state, action) {
  const nextRatedImages = cacheImages(
    sortByRating(replaceOrAdd(action.payload, state.ratedImages))
  )
  const nextImages = enrichWithRating(state.images, nextRatedImages)

  return {
    ...state,
    images: nextImages,
    ratedImages: nextRatedImages,
  }
}

function removeRatingReducer(state, action) {
  const nextRatedImages = cacheImages(
    removeImage(action.payload, state.ratedImages)
  )

  return {
    ...state,
    ratedImages: nextRatedImages,
    images: enrichWithRating(state.images, nextRatedImages),
  }
}

function reducer(state, action) {
  switch (action.type) {
    case actionTypes.CHANGED_VIEW:
      return {
        ...state,
        view: action.payload,
      }
    case actionTypes.RECEIVED_IMAGES:
      return {
        ...state,
        images: enrichWithRating(action.payload, state.ratedImages),
      }
    case actionTypes.RECEIVED_MORE_IMAGES:
      return {
        ...state,
        images: [...state.images, action.payload],
      }
    case actionTypes.RATE_IMAGE:
      return addRatingReducer(state, action)
    case actionTypes.REMOVE_RATED_IMAGE:
      return removeRatingReducer(state, action)
    default:
      throw new Error()
  }
}

export default reducer
