import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { cities } from '../data/cities';
import { attractions } from '../data/attractions';
import { City, Attraction } from '../types';
import CityCard from '../components/CityCard';
import AttractionCard from '../components/AttractionCard';
import { Search, MapPin } from 'lucide-react';

interface SearchResults {
  cities: City[];
  attractions: Attraction[];
}

const SearchPage: React.FC = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('q') || '';
  const [searchTerm, setSearchTerm] = useState(query);
  const [results, setResults] = useState<SearchResults>({ cities: [], attractions: [] });
  const [isSearching, setIsSearching] = useState(false);

  // Perform search when query changes
  useEffect(() => {
    if (!query) return;
    
    setIsSearching(true);
    
    // Simulate API search delay
    const timer = setTimeout(() => {
      // Search cities
      const matchedCities = cities.filter(city => 
        city.name.toLowerCase().includes(query.toLowerCase()) || 
        city.country.toLowerCase().includes(query.toLowerCase())
      );
      
      // Search attractions
      const matchedAttractions = attractions.filter(attraction => 
        attraction.name.toLowerCase().includes(query.toLowerCase()) || 
        attraction.description.toLowerCase().includes(query.toLowerCase())
      );
      
      setResults({
        cities: matchedCities,
        attractions: matchedAttractions
      });
      
      setIsSearching(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [query]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      window.history.pushState({}, '', `/search?q=${encodeURIComponent(searchTerm)}`);
      
      setIsSearching(true);
      
      // Simulate API search delay
      setTimeout(() => {
        // Search cities
        const matchedCities = cities.filter(city => 
          city.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
          city.country.toLowerCase().includes(searchTerm.toLowerCase())
        );
        
        // Search attractions
        const matchedAttractions = attractions.filter(attraction => 
          attraction.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
          attraction.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
        
        setResults({
          cities: matchedCities,
          attractions: matchedAttractions
        });
        
        setIsSearching(false);
      }, 500);
    }
  };

  const totalResults = results.cities.length + results.attractions.length;

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center mb-8">
          <Search className="h-6 w-6 text-gray-500 mr-2" />
          <h1 className="text-3xl font-bold text-gray-900">Search Results</h1>
        </div>
        
        {/* Search form */}
        <div className="mb-8">
          <form onSubmit={handleSearch} className="flex w-full max-w-3xl">
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Search for cities, attractions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-l-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            <button 
              type="submit" 
              className="px-6 py-2 bg-teal-600 text-white font-medium rounded-r-md hover:bg-teal-700 transition duration-150"
            >
              Search
            </button>
          </form>
        </div>
        
        {/* Loading state */}
        {isSearching ? (
          <div className="flex justify-center my-12">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-teal-600"></div>
          </div>
        ) : (
          <>
            {/* Results summary */}
            {query && (
              <div className="mb-6">
                {totalResults > 0 ? (
                  <p className="text-gray-600">
                    Found {totalResults} result{totalResults !== 1 ? 's' : ''} for "{query}"
                  </p>
                ) : (
                  <div className="bg-white rounded-lg shadow p-8 text-center">
                    <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-gray-100 mb-4">
                      <Search className="h-8 w-8 text-gray-400" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">No results found</h2>
                    <p className="text-gray-600 mb-6">
                      We couldn't find any cities or attractions matching "{query}".
                    </p>
                    <Link
                      to="/cities"
                      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700"
                    >
                      <MapPin className="mr-2 h-4 w-4" />
                      Browse All Cities
                    </Link>
                  </div>
                )}
              </div>
            )}
            
            {/* City results */}
            {results.cities.length > 0 && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Cities</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {results.cities.map((city) => (
                    <CityCard key={city.id} city={city} />
                  ))}
                </div>
              </div>
            )}
            
            {/* Attraction results */}
            {results.attractions.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Attractions</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {results.attractions.map((attraction) => (
                    <div key={attraction.id} className="flex flex-col">
                      <div className="mb-2">
                        <Link 
                          to={`/cities/${attraction.cityId}`}
                          className="text-sm text-gray-600 hover:text-teal-600 flex items-center"
                        >
                          <MapPin className="h-4 w-4 mr-1" />
                          {cities.find(c => c.id === attraction.cityId)?.name || 'Unknown City'}
                        </Link>
                      </div>
                      <AttractionCard attraction={attraction} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SearchPage;