import React, { useEffect, useRef } from 'react'
import { useGridSpans } from '../hooks'

import ImageRating from '../ImageRating'

import './style.css'

function ImageCard({
  id,
  urls,
  description,
  rating,
  onImageRated,
  onRemoveRating,
  ratable,
  canRemoveRating,
  showRating,
  showRatingIndicator,
}) {
  const imageRef = useRef(null)
  const [spans, setSpans] = useGridSpans(imageRef)

  useEffect(() => {
    imageRef.current.addEventListener('load', setSpans)
  }, [setSpans])

  function handleRated(value) {
    onImageRated({
      id,
      urls,
      rating: value,
    })
  }

  function handleRemoveRating() {
    onRemoveRating(id)
  }

  function overlayClassString() {
    let str = 'image-card__overlay'

    if (showRating) {
      str = str + ' show'
    }

    return str
  }

  return (
    <div className="image-card" style={{ gridRowEnd: `span ${spans}` }}>
      <div className="image-card__wrap">
        <img ref={imageRef} src={urls.small} alt={description} />
        {showRatingIndicator && !!rating ? (
          <span className="image-card__rating-notify fa fa-star checked"></span>
        ) : null}

        <div className={overlayClassString()}>
          {rating && canRemoveRating ? (
            <div className="image-card__rating-remove">
              <i className="fas fa-times" onClick={handleRemoveRating}></i>
            </div>
          ) : null}
          <div className="image-card__rating">
            <ImageRating
              ratable={ratable}
              rating={rating}
              onRated={handleRated}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ImageCard
