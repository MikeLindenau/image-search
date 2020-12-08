import ImageCard from '../ImageCard'
import './style.css'

function RatedImages({ images, onImageRated, onRemoveRating }) {
  return (
    <div className="rated-image-grid">
      {images.map((image) => (
        <ImageCard
          key={image.id}
          {...image}
          ratable={true}
          canRemoveRating={true}
          showRating={true}
          onImageRated={onImageRated}
          onRemoveRating={onRemoveRating}
        />
      ))}
    </div>
  )
}

export default RatedImages
