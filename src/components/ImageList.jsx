import { useState, useEffect } from 'react';
import { collection, doc, onSnapshot, updateDoc } from 'firebase/firestore';
import {  ref, deleteObject } from 'firebase/storage';
import {  db,storage } from '../firebase.js';
import '../App.css';

function ImageList() {
  const [images, setImages] = useState([]);
 
  

  useEffect(() => {
    const imagesRef = collection(db, 'images');
    const docRef = doc(imagesRef, process.env.REACT_APP_DBKEY);
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        setImages(docSnap.data().images || []);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleDelete = async (imageUrl) => {
    const imagesRef = collection(db, 'images');
    const docRef = doc(imagesRef, process.env.REACT_APP_DBKEY);
    const newImages = images.filter((image) => image !== imageUrl);
    await updateDoc(docRef, { images: newImages });
  
    // Delete image from storage
    const imageRef = ref(storage, imageUrl);
    await deleteObject(imageRef);
  
    setImages(newImages);
  };
  return (
    
    <div className='ContainerforIMGS'>
       <h2>These are the images that will be displayed on page:</h2> 
      {images.map((imageUrl) => (
        <div key={imageUrl} className='image-container'>
          <img src={imageUrl} alt='Uploaded' />
          <button className='buttonDeleteImage' onClick={() => handleDelete(imageUrl)}>x</button>
          
        </div>
        
      ))}
    </div>
  );
}

export default ImageList;
