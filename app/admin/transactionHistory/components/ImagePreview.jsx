import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'

export const ImagePreviewer = ({ imageUrls }) => {
  return (
    <Carousel showArrows={true} showThumbs={false}>
      {imageUrls &&
        Object.values(imageUrls).map((imageUrl, index) => (
          <div key={index}>
            <img src={imageUrl} alt={`Image ${index}`} />
          </div>
        ))}
    </Carousel>
  )
}
