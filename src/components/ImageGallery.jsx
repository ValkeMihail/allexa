import React, { useState, useEffect } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { db } from "../firebase.js";
import { doc, getDoc } from "firebase/firestore";

const RandomImagesCarousel = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      const docRef = doc(db, "images", "R01LSyD3fcNTTW8DgqSqZyQEsqE2");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const images = docSnap.data().images;
        // Shuffle the images array
        const shuffledImages = images.sort(() => 0.5 - Math.random());
        // Take the first 10 images and put them into slides
        setImages(shuffledImages);
      } else {
        console.log("No such document!");
      }
    };
    fetchImages();
  }, []);

 

  return (
    <div className="gridImages">
       { images.map((image) => (
        <div
            className="imageContainer" 
            key={image}>
            <img 
                className="imageElement"
                src={image} alt="" />
        </div>
        ))


       }
    </div>
  );
};

export default RandomImagesCarousel;
