
import {  doc, getDoc, updateDoc } from 'firebase/firestore';
import {  ref, getDownloadURL, uploadBytes } from 'firebase/storage';
import { useState, useEffect } from 'react';
import {  db,storage } from '../firebase.js';
import "../App.css";

function Profile() {
  const [bio, setBio] = useState('');
  const [aboutImage, setAboutImage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, 'allexa', process.env.REACT_APP_DBKEY);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setBio(docSnap.data().bio);
        setAboutImage(docSnap.data().myImage);
      } else {
        console.log('No such document!');
      }
    };
    fetchData();
  }, []);

  const handleUpdateBio = async (event) => {
    event.preventDefault();
    const newBio = event.target.elements.bio.value.trim();
    if (newBio) {
      const docRef = doc(db, 'allexa', process.env.REACT_APP_DBKEY);
      await updateDoc(docRef, { bio: newBio });
      setBio(newBio);
    }
  };

  const handleUpdatePhoto = async () => {
    const imageInput = document.getElementById('imageInput');

    if (imageInput.files.length > 0) {
      const file = imageInput.files[0];
      
      const storageRef = ref(storage, `myImage/me.png`);
      await uploadBytes(storageRef, file); 
      const downloadURL = await getDownloadURL(storageRef);
      const docRef = doc(db, 'allexa', process.env.REACT_APP_DBKEY);
      await updateDoc(docRef, { myImage: downloadURL });
      setAboutImage(downloadURL);
    }
  };

  return (
    <div className='changeAboutContainer'>
      <img src={aboutImage} id='imageAboutDashboard'alt="about" />
      <p>{bio}</p>
      <h1>Update Bio & Photo</h1>
      <input type="file" id="imageInput" accept="image/*" />
      <button  className='buttonGeneric buttonUpdate' onClick={handleUpdatePhoto}>Update Photo</button>
      <form id='formFlex' onSubmit={handleUpdateBio}>
    <label htmlFor="bio">New Bio:</label>
    <textarea id="bio" name="bio" />
    <button className='buttonGeneric buttonUpdate' type="submit">Update Bio</button>
    </form>
     
    </div>
  );
}

export default Profile;
