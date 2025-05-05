import React from 'react';
import { Link } from 'react-router-dom';
import { cities } from '../data/cities';
import CityCard from '../components/CityCard';
import { Globe, MapPin, User, Heart } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const HomePage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const featuredCities = cities.slice(0, 6);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[70vh] bg-cover bg-center" style={{ backgroundImage: `url(https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg)` }}>
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center items-center text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Discover Your Next Adventure</h1>
          <p className="text-xl text-white mb-8 max-w-2xl">Explore the world's most amazing destinations and create unforgettable memories.</p>
          <div className="flex space-x-4">
            <Link to="/cities" className="px-6 py-3 bg-teal-600 text-white font-medium rounded-md hover:bg-teal-700 transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              Explore Cities
            </Link>
            {!isAuthenticated && (
              <Link to="/login" className="px-6 py-3 bg-white text-gray-900 font-medium rounded-md hover:bg-gray-100 transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Featured Cities */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Featured Destinations</h2>
          <Link to="/cities" className="text-teal-600 hover:text-teal-800 font-medium flex items-center">
            View All <Globe className="ml-1 h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredCities.map((city) => (
            <CityCard key={city.id} city={city} />
          ))}
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="bg-teal-100 p-4 rounded-full mb-4">
                <MapPin className="h-8 w-8 text-teal-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Discover Places</h3>
              <p className="text-gray-600">Explore our curated selection of world-famous cities and their attractions.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="bg-teal-100 p-4 rounded-full mb-4">
                <User className="h-8 w-8 text-teal-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Create an Account</h3>
              <p className="text-gray-600">Sign up to save your favorite attractions and plan your perfect trip.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="bg-teal-100 p-4 rounded-full mb-4">
                <Heart className="h-8 w-8 text-teal-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Save Favorites</h3>
              <p className="text-gray-600">Keep track of the places you want to visit on your next adventure.</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-teal-700 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to start planning your trip?</h2>
          <p className="text-xl text-teal-100 mb-8 max-w-2xl mx-auto">Create an account today and begin saving your favorite attractions.</p>
          <Link 
            to={isAuthenticated ? "/cities" : "/register"} 
            className="px-6 py-3 bg-white text-teal-700 font-medium rounded-md hover:bg-gray-100 transition duration-300 shadow-lg inline-block"
          >
            {isAuthenticated ? "Explore Cities" : "Get Started"}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;