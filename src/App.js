import React, { useReducer } from 'react'
import reducer, { initialState, actionTypes } from './store'

import Header from './Header'
import SearchResults from './SearchResults'
import RatedImages from './RatedImages'
import { fetchImages } from './unsplash'

import './App.css'

export const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState)

  function handleViewChange(view) {
    dispatch({ type: actionTypes.CHANGED_VIEW, payload: view })
  }

  const handleSearch = async (e) => {
    const response = await fetchImages(e.target.value)
    dispatch({
      type: actionTypes.RECEIVED_IMAGES,
      payload: response.data.results,
    })
  }

  function handleImageRated(ratedImage) {
    dispatch({
      type: actionTypes.RATE_IMAGE,
      payload: ratedImage,
    })
  }

  function handleRemoveRating(id) {
    dispatch({
      type: actionTypes.REMOVE_RATED_IMAGE,
      payload: id,
    })
  }

  return (
    <div className="app">
      <Header
        onSearch={handleSearch}
        onViewChange={handleViewChange}
        view={state.view}
      />
      <div className="app__content">
        {state.view === 'search' ? (
          <SearchResults
            onImageRated={handleImageRated}
            images={state.images}
          />
        ) : (
          <RatedImages
            images={state.ratedImages}
            onImageRated={handleImageRated}
            onRemoveRating={handleRemoveRating}
          />
        )}
      </div>
    </div>
  )
}
