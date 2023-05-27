import  React ,{ useState,  useEffect } from 'react';
import '../App.css';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase'; // assuming firebase is initialized and exported as db

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
            <div className='aboutTitle'>
                <h3>Photographer</h3>
                <h2 id='aboutmeheader'>Allexa</h2>
            </div>
            
        </div>
        <div className='description'>
            <h1>About Me</h1>
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
