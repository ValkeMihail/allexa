
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

import PortfolioNavbar from './components/PortfolioNavbar';
import AboutMe from './components/AboutMe';
import ContactMe from './components/ContactMe';
import RandomImagesCarousel from './components/ImageGallery';
import Login from './components/Login';
import Dashboard from './components/Dashboard';


const firebaseConfig = {
   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  
};

initializeApp(firebaseConfig);
const auth = getAuth();

function App() {
  return (
    
    <Router>
        <div id='bar'></div> 
      <div className="App">
        <PortfolioNavbar />
        <Routes>
  <Route exact path="/" element={<AboutMe />} />
  <Route path="/work" element={<RandomImagesCarousel />} />
  <Route path="/about" element={<AboutMe />} />
  <Route path="/contact" element={<ContactMe />} />
  <Route path="/admin" element={<Login auth={auth} />} />
  <Route path="/dashboard" element={<Dashboard />} />
</Routes>
      </div>
    </Router>
  );
}

export default App;
