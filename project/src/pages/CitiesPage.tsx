import React from 'react';
import { cities } from '../data/cities';
import CityCard from '../components/CityCard';

const CitiesPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Explore Cities Around the World</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover amazing destinations and plan your next adventure.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {cities.map((city) => (
            <CityCard key={city.id} city={city} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CitiesPage;