import React, { useState } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';
import myImage from '../logo.png';
import menuImage from '../menu.png';

function PortfolioNavbar() {
  const [activeLink, setActiveLink] = useState('work');
  const [showNav, setShowNav] = useState(false);
  const navigate = useNavigate();

  function handleLinkClick(link) {
    setActiveLink(link);

    setShowNav(false);
  }

  function toggleNav() {
    setShowNav(!showNav);
  }

  return (
    <>
      <img onClick={() => navigate('/about')} id="imagineLOGO" src={myImage} alt="Logo" width="30" height="30" className="d-inline-block align-top" />{' '}
      <div className="navbar-toggle" onClick={toggleNav}>
        <img src={menuImage} id="menuHam" alt="Menu" />
      </div>
      <div className={`navbar-vertical ${showNav ? 'show' : 'hide'}`}>
        <Navbar variant="light" className="navbar" style={{ backgroundColor: 'lightblue' }}>
          <Container fluid>
            <Navbar.Brand
              as={Link}
              to="/work"
              onClick={() => handleLinkClick('work')}
              className={activeLink === 'work' ? 'active' : ''}
              
            >
               
            </Navbar.Brand>
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link
                  as={Link}
                  to="/work"
                  onClick={() => handleLinkClick('work')}
                  className={activeLink === 'work' ? 'active' : ''}
                >
                  Work
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/about"
                  onClick={() => handleLinkClick('about')}
                  className={activeLink === 'about' ? 'active' : ''}
                >
                  About
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/contact"
                  onClick={() => handleLinkClick('contact')}
                  className={activeLink === 'contact' ? 'active' : ''}
                >
                  Contact
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <div className="navbar-toggle" onClick={toggleNav}>
          <img src={menuImage} id="menuHam" alt="Menu" />
        </div>
      </div>
    </>
  );
}

export default PortfolioNavbar;
