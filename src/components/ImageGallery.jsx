import React, { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { db } from "../firebase.js";
import { doc, getDoc } from "firebase/firestore";

const RandomImagesCarousel = () => {
  const [images, setImages] = useState([]);
  const [slides, setSlides] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchImages = async () => {
      const docRef = doc(db, "images", "R01LSyD3fcNTTW8DgqSqZyQEsqE2");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const images = docSnap.data().images;
        // Shuffle the images array
        const shuffledImages = images.sort(() => 0.5 - Math.random());
        // Take the first 10 images and put them into slides
        const firstSlides = shuffledImages.slice(0, 10).map((url) => (
          <img key={url} src={url} alt={url} />
        ));
        setImages(shuffledImages);
        setSlides(firstSlides);
        setCurrentIndex(0);
      } else {
        console.log("No such document!");
      }
    };
    fetchImages();
  }, []);

  const handleOnSlideChange = (index) => {
    if (index === slides.length - 1) {
      // We reached the end of the current slides, add new slides
      const remainingImages = images.slice(currentIndex + 10);
      if (remainingImages.length > 0) {
        const newSlides = remainingImages.slice(0, 10).map((url) => (
          <img key={url} alt={url} src={url} loading="lazy"/>
        ));
        setSlides([...slides, ...newSlides]);
        setCurrentIndex(currentIndex + 10);
      }
    }
  };

  return (
    <div>
      <Carousel
        showArrows={true}
        showThumbs={false}
        showStatus={true}
        infiniteLoop={true}
        selectedItem={currentIndex}
        onChange={handleOnSlideChange}
        renderIndicator={(onClickHandler, isSelected, index, label) => {
          if (isSelected) {
            return (
              <li
                className="carousel-slide-indicator"
                aria-label={`Selected: ${label} ${index + 1}`}
                title={`Selected: ${label} ${index + 1}`}
              />
            );
          }
          return (
            <li
              className="carousel-slide-indicator"
              onClick={onClickHandler}
              onKeyDown={onClickHandler}
              value={index}
              key={index}
              role="button"
              tabIndex="0"
              title={`${label} ${index + 1}`}
              aria-label={`${label} ${index + 1}`}
            />
          );
        }}
      >
        {slides}
      </Carousel>
      
    </div>
  );
};

export default RandomImagesCarousel;
