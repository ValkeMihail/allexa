import  React ,{ useState, useRef, useEffect } from 'react';
import '../App.css';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase'; // assuming firebase is initialized and exported as db

function AboutMe() {
  const [inView, setInView] = useState(false);
  const borderLayRef = useRef(null);
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
  
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    };
  
    const observer = new IntersectionObserver(([entry]) => {
      setInView(entry.isIntersecting);
    }, options);
  
    const currentRef = borderLayRef.current;
  
    if (currentRef) {
      observer.observe(currentRef);
    }
  
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);
  

  return (
    <div className="about-container">
      <img id="aboutmeImage" src={myImage} alt="" loading='lazy' />
      <h3>Photographer</h3>
      <h2 id='aboutmeheader'>Allexa</h2>
      <div className='separator'>
        <h1>About Me</h1>
        <div className={inView ? 'borderLay animated3' : 'borderLay'} ref={borderLayRef}>
          <p>
            {bio}
          </p>
        </div>
      </div>
    </div>
  );
}

export default AboutMe;
