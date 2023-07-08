import  React ,{ useState,  useEffect } from 'react';
import '../App.css';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

function AboutMe() {

  const [myImage, setMyImage] = useState('');
  const [bio, setBio] = useState('');

  useEffect(() => {
    const docRef = doc(db, 'allexa', process.env.REACT_APP_DBKEY);
    getDoc(docRef).then((doc) => {
      if (doc.exists()) {
        const data = doc.data();
        setMyImage(data.myImage);
        setBio(data.bio);
      }
    });
  
  }, []);
  

  return (
    <div className="about-container">
        <div className='headerAbout'>
            <img id="aboutmeImage" src={myImage} alt="" loading='lazy' />
            
        </div>
        <div className='description'>
            <h1>ABOUT</h1>
            <div>
                <p>
                    {bio}
                </p>
            </div>
        </div>
    </div>
  );
}

export default AboutMe;
