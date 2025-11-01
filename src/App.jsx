
import React from 'react';
import LandingPage from './components/LandingPage';
import Header from './components/Header';
import Footer from './components/Footer';
import './App.css';


function App() {
  return (
    <div className="app min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex flex-col">
      <Header />
      <main className="flex-1 flex flex-col justify-center">
        <LandingPage />
      </main>
      <Footer />
    </div>
  );
}

export default App
