import ImageCard from '../ImageCard'
import './style.css'

function SearchResults({ onImageRated, images }) {
  return (
    <div className="search-image-grid">
      {images.map((image) => (
        <ImageCard
          key={image.id}
          {...image}
          rating={image.rating}
          onImageRated={onImageRated}
          showRatingIndicator={true}
        />
      ))}
    </div>
  )
}

export default SearchResults
