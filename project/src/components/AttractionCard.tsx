import React from 'react';
import { Heart } from 'lucide-react';
import { Attraction } from '../types';
import { useAuth } from '../context/AuthContext';
import { useSavedAttractions } from '../context/SavedAttractionsContext';

interface AttractionCardProps {
  attraction: Attraction;
}

const AttractionCard: React.FC<AttractionCardProps> = ({ attraction }) => {
  const { isAuthenticated } = useAuth();
  const { isSaved, saveAttraction, removeAttraction } = useSavedAttractions();
  
  const saved = isSaved(attraction.id);
  
  const handleSaveToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (saved) {
      removeAttraction(attraction.id);
    } else {
      saveAttraction(attraction.id);
    }
  };
  
  return (
    <div className="flex flex-col bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={attraction.image} 
          alt={attraction.name}
          className="w-full h-full object-cover"
        />
        {isAuthenticated && (
          <button 
            className={`absolute top-2 right-2 p-2 rounded-full ${saved ? 'bg-red-500 text-white' : 'bg-white text-gray-600'}`}
            onClick={handleSaveToggle}
          >
            <Heart className={`h-5 w-5 ${saved ? 'fill-current' : ''}`} />
          </button>
        )}
      </div>
      <div className="p-4 flex-grow">
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-semibold text-gray-800">{attraction.name}</h3>
          <div className="flex items-center bg-amber-100 px-2 py-1 rounded text-amber-800 text-sm">
            <span className="font-bold">{attraction.rating}</span>
            <span className="ml-1">★</span>
          </div>
        </div>
        <p className="mt-2 text-gray-600 text-sm">{attraction.description}</p>
      </div>
    </div>
  );
};

export default AttractionCard;