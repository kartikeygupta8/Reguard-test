import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import Customers from './components/Customers';
import Purchases from './components/Purchases';
import Claims from './components/Claims';

function App() {
  return (
    <Router>
      <div style={containerStyle}>
        <nav style={navbarStyle}>
          <Link to="/customers" style={linkStyle} activeStyle={activeLinkStyle}>
            Customers
          </Link>
          <Link to="/purchases" style={linkStyle} activeStyle={activeLinkStyle}>
            Purchases
          </Link>
          <Link to="/claims" style={linkStyle} activeStyle={activeLinkStyle}>
            Claims
          </Link>
        </nav>
        <main style={mainContentStyle}>
          <Routes>
            <Route path="/customers" element={<Customers />} />
            <Route path="/purchases" element={<Purchases />} />
            <Route path="/claims" element={<Claims />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

// Styles
const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  fontFamily: 'Arial, sans-serif',
  padding: '20px',
};

const navbarStyle = {
  display: 'flex',
  gap: '15px',
  padding: '10px 20px',
  borderRadius: '8px',
  backgroundColor: '#333',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
};

const linkStyle = {
  color: '#fff',
  textDecoration: 'none',
  fontSize: '16px',
  padding: '8px 16px',
  borderRadius: '5px',
  transition: 'background-color 0.3s, transform 0.3s',
};

const activeLinkStyle = {
  backgroundColor: '#555',
};

const hoverStyle = {
  backgroundColor: '#555',
  transform: 'scale(1.1)',
};

const mainContentStyle = {
  marginTop: '20px',
  width: '80%',
  maxWidth: '900px',
};

export default App;
