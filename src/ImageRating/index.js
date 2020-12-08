import React, { useEffect, useState } from 'react'

import './style.css'

function ImageRating({ rating = 0, ratable = true, onRated }) {
  const [ratingValue, setRatingValue] = useState(rating)
  const [stars, setStars] = useState([
    { value: 1, checked: false },
    { value: 2, checked: false },
    { value: 3, checked: false },
    { value: 4, checked: false },
    { value: 5, checked: false },
  ])

  useEffect(() => {
    setStars(
      stars.map((star) => {
        return { ...star, checked: ratingValue >= star.value }
      })
    )
  }, [ratingValue, stars])

  function onHoverStar(value) {
    if (!ratable) return
    setRatingValue(value || rating)
  }

  function starClassString(checked) {
    let str = 'image-rating__star fa fa-star'

    if (checked) {
      str = str + ' checked'
    }

    return str
  }

  return (
    <div className="image-rating">
      {stars.map((star, index) => (
        <span
          key={`star_${index}`}
          className={starClassString(star.checked)}
          onMouseEnter={() => onHoverStar(star.value)}
          onMouseLeave={() => onHoverStar()}
          onClick={() => onRated(star.value)}
        ></span>
      ))}
    </div>
  )
}

export default ImageRating
