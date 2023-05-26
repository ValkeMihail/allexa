import React, {  useState } from 'react';
import { getFirestore, doc, setDoc,getDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import ImageList from './ImageList';
import Profile from './changeAbout';
function Dashboard() {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const storage = getStorage();
  const auth = getAuth();
  const db = getFirestore();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('updateBio');

  // Logout the user and redirect to AboutMe component
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/about');
    } catch (error) {
      console.error(error);
    }
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  const renderUpdateBioTab = () => {
    return (
      <>
        <Profile />
        
      </>
    );
  };
  const renderUploadImagesTab = () => {
    return (
      <>
        <h1>Upload & Delete Images</h1>
        <div className="drop-zone" onDrop={handleDrop} onDragOver={(e) => e.preventDefault()}>
          <label htmlFor="file-input">Drag and drop image files or click to choose files.</label>
          <input id="file-input" type="file" accept="image/*" onChange={handleFileChange} multiple />
          <button className='buttonGeneric' type="button" onClick={() => document.getElementById('file-input').click()}>Choose Files</button>
        </div>
        {file && (
          <div className="file-preview">
            {Array.from(file).map((f, index) => (
              <div key={index}>
                <img src={URL.createObjectURL(f)} alt={f.name} loading="lazy" />
              </div>
            ))}
            {file && (
              <button onClick={() => handleFileUpload(Array.from(file))}>Upload All</button>
            )}
          </div>
        )}
        {error && <p className="error-message">{error}</p>}
        <ImageList />
      </>
    );
  };
  // Upload file to Firebase storage
 
  const handleFileUpload = async (files) => {
    try {
      for (const file of files) {
        // if (file.size > 500000) {
        //     const canvas = document.createElement('canvas');
        //     const ctx = canvas.getContext('2d');
        //     const image = new Image();
        //     image.onload = async () => {
        //       const maxWidth = 1000;
        //       const maxHeight = 1000;
        //       let width = image.width;
        //       let height = image.height;
        //       if (width > height) {
        //         if (width > maxWidth) {
        //           height *= maxWidth / width;
        //           width = maxWidth;
        //         }
        //       } else {
        //         if (height > maxHeight) {
        //           width *= maxHeight / height;
        //           height = maxHeight;
        //         }
        //       }
        //       canvas.width = width;
        //       canvas.height = height;
        //       ctx.drawImage(image, 0, 0, width, height);
        //       const resizedFile = await new Promise((resolve) => {
        //         canvas.toBlob((blob) => {
        //           resolve(new File([blob], file.name, { type: 'image/jpeg', lastModified: Date.now() }));
        //         }, 'image/jpeg', 0.7);
        //       });
        //       const storageRef = ref(storage, `images/${resizedFile.name}`);
        //       await uploadBytes(storageRef, resizedFile);
        //       const downloadURL = await getDownloadURL(storageRef);
        //       const docRef = doc(db, 'images', process.env.REACT_APP_DBKEY);
        //       const docData = await getDoc(docRef);
        //       const images = docData.data().images || [];
        //       images.push(downloadURL);
        //       await setDoc(docRef, { images });
        //       setFile(null);
        //       setError(null);
        //     };
        //     image.src = URL.createObjectURL(file);
        // } else {
          const storageRef = ref(storage, `images/${file.name}`);
          await uploadBytes(storageRef, file);
          const downloadURL = await getDownloadURL(storageRef);
          const docRef = doc(db, 'images', process.env.REACT_APP_DBKEY);
          const docData = await getDoc(docRef);
          const images = docData.data().images || [];
          images.push(downloadURL);
          await setDoc(docRef, { images });
        // }
      }
      setFile(null);
      setError(null);
    } catch (error) {
      console.error(error);
      setError('An error occurred while uploading the file. Please try again later.');
    }
  };
  // Handle drag and drop file input
  const handleDrop = (event) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (files.length > 0 && files[0].type.startsWith('image/')) {
      setFile(files);
      setError(null);
    } else {
      setFile(null);
      setError('Please drop at least one image file.');
    }
  };
  

  const handleFileChange = (event) => {
    const files = event.target.files;
    if (files.length > 0) {
      setFile(files);
      setError(null);
    } else {
      setFile(null);
      setError('Please choose at least one image file.');
    }
  };
  return (
    <div className="dashboard-wrapper">
      <h2>Dashboard</h2>
      {auth.currentUser ? (
    <>
      <div className="tab-bar">
        <button id='updateBioTab' className={ activeTab === 'updateBio' ? 'active' : ''} onClick={() => handleTabClick('updateBio')}>
          Update Bio & Photo
        </button>
        <button id='updatePhotosTab' className={ activeTab === 'uploadImages' ? 'active' : '' } onClick={() => handleTabClick('uploadImages')}>
          Upload & Delete Images
        </button>
        
      </div>
      {activeTab === 'updateBio' && renderUpdateBioTab()}
      {activeTab === 'uploadImages' && renderUploadImagesTab()}
      <button className='buttonGeneric buttonAbsolute' onClick={handleLogout}>Logout</button>
    </>
  ) : (
        <>
        <p>You need to log in to access this page. Please access the /admin route to log in.</p>
        <button className='buttonGeneric' onClick={() => navigate('/admin')}>Take me there</button>
        </>
      )}
    </div>
  );
  
}

export default Dashboard;
