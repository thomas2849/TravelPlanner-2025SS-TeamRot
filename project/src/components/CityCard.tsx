import React from 'react';
import { Link } from 'react-router-dom';
import { City } from '../types';

interface CityCardProps {
  city: City;
}

const CityCard: React.FC<CityCardProps> = ({ city }) => {
  return (
    <Link 
      to={`/cities/${city.id}`} 
      className="relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 group"
    >
      <div className="aspect-[16/9] w-full overflow-hidden">
        <img 
          src={city.image} 
          alt={city.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
      </div>
      <div className="absolute bottom-0 w-full p-4 text-white">
        <h3 className="text-2xl font-bold mb-1">{city.name}</h3>
        <p className="text-sm text-gray-100">{city.country}</p>
      </div>
    </Link>
  );
};

export default CityCard;