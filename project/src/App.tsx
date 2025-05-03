import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import CitiesPage from './pages/CitiesPage';
import CityDetailPage from './pages/CityDetailPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import SavedAttractionsPage from './pages/SavedAttractionsPage';
import SearchPage from './pages/SearchPage';
import { AuthProvider } from './context/AuthContext';
import { SavedAttractionsProvider } from './context/SavedAttractionsContext';

function App() {
  return (
    <Router>
      <AuthProvider>
        <SavedAttractionsProvider>
          <div className="min-h-screen bg-gray-50">
            <Navbar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/cities" element={<CitiesPage />} />
              <Route path="/cities/:cityId" element={<CityDetailPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/saved" element={<SavedAttractionsPage />} />
              <Route path="/search" element={<SearchPage />} />
            </Routes>
            
            {/* Footer */}
            <footer className="bg-gray-800 text-white py-8">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between">
                  <div className="mb-6 md:mb-0">
                    <h3 className="text-xl font-bold mb-2">TravelPlanner</h3>
                    <p className="text-gray-400">Discover the world's best destinations</p>
                  </div>
                  <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
                    <div>
                      <h4 className="text-sm font-semibold uppercase tracking-wider mb-3">Explore</h4>
                      <ul className="space-y-2">
                        <li><a href="/" className="text-gray-400 hover:text-white">Home</a></li>
                        <li><a href="/cities" className="text-gray-400 hover:text-white">Cities</a></li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold uppercase tracking-wider mb-3">Account</h4>
                      <ul className="space-y-2">
                        <li><a href="/login" className="text-gray-400 hover:text-white">Sign In</a></li>
                        <li><a href="/register" className="text-gray-400 hover:text-white">Register</a></li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold uppercase tracking-wider mb-3">Support</h4>
                      <ul className="space-y-2">
                        <li><a href="#" className="text-gray-400 hover:text-white">Contact Us</a></li>
                        <li><a href="#" className="text-gray-400 hover:text-white">FAQ</a></li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="mt-8 border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
                  <p className="text-gray-400">&copy; {new Date().getFullYear()} TravelPlanner. All rights reserved.</p>
                  <div className="mt-4 md:mt-0">
                    <p className="text-gray-400 text-sm">
                      <span className="mr-2">Made with ❤️</span> 
                      <span>Image credits: Pexels</span>
                    </p>
                  </div>
                </div>
              </div>
            </footer>
          </div>
        </SavedAttractionsProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;