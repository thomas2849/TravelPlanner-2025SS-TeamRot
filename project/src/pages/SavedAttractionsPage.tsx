import React, { useMemo } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useSavedAttractions } from '../context/SavedAttractionsContext';
import { attractions } from '../data/attractions';
import { cities } from '../data/cities';
import { City, Attraction } from '../types';
import AttractionCard from '../components/AttractionCard';
import { Heart, MapPin } from 'lucide-react';

const SavedAttractionsPage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const { savedAttractions, isLoading } = useSavedAttractions();
  
  // Redirect if not logged in
  if (!isAuthenticated && !isLoading) {
    return <Navigate to="/login" />;
  }
  
  // Get full attraction details for saved attractions
  const savedAttractionDetails = useMemo(() => {
    const savedIds = savedAttractions.map(sa => sa.attractionId);
    return attractions.filter(attraction => savedIds.includes(attraction.id));
  }, [savedAttractions]);
  
  // Group attractions by city
  const attractionsByCity = useMemo(() => {
    const groupedAttractions: Record<string, { city: City, attractions: Attraction[] }> = {};
    
    savedAttractionDetails.forEach(attraction => {
      const city = cities.find(c => c.id === attraction.cityId);
      if (city) {
        if (!groupedAttractions[city.id]) {
          groupedAttractions[city.id] = {
            city,
            attractions: []
          };
        }
        groupedAttractions[city.id].attractions.push(attraction);
      }
    });
    
    return Object.values(groupedAttractions);
  }, [savedAttractionDetails]);
  
  if (isLoading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-600"></div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center mb-8">
          <Heart className="h-6 w-6 text-red-500 mr-2" />
          <h1 className="text-3xl font-bold text-gray-900">Your Saved Attractions</h1>
        </div>
        
        {savedAttractionDetails.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-gray-100 mb-4">
              <Heart className="h-8 w-8 text-gray-400" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">No saved attractions yet</h2>
            <p className="text-gray-600 mb-6">
              Start exploring cities and save your favorite attractions for your next trip.
            </p>
            <Link
              to="/cities"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700"
            >
              <MapPin className="mr-2 h-4 w-4" />
              Explore Cities
            </Link>
          </div>
        ) : (
          <>
            <p className="text-gray-600 mb-8">
              You have saved {savedAttractionDetails.length} attractions across {attractionsByCity.length} cities.
            </p>
            
            {attractionsByCity.map(({ city, attractions }) => (
              <div key={city.id} className="mb-12">
                <div className="flex items-center mb-4">
                  <Link to={`/cities/${city.id}`} className="flex items-center group">
                    <h2 className="text-2xl font-bold text-gray-900 group-hover:text-teal-600 transition-colors">
                      {city.name}
                    </h2>
                    <MapPin className="ml-2 h-5 w-5 text-gray-500 group-hover:text-teal-600 transition-colors" />
                  </Link>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {attractions.map(attraction => (
                    <AttractionCard key={attraction.id} attraction={attraction} />
                  ))}
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default SavedAttractionsPage;