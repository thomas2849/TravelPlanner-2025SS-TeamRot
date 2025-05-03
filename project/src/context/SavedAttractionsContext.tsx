import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { SavedAttraction } from '../types';

interface SavedAttractionsContextType {
  savedAttractions: SavedAttraction[];
  isLoading: boolean;
  saveAttraction: (attractionId: string) => void;
  removeAttraction: (attractionId: string) => void;
  isSaved: (attractionId: string) => boolean;
}

const SavedAttractionsContext = createContext<SavedAttractionsContextType | undefined>(undefined);

export const SavedAttractionsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [savedAttractions, setSavedAttractions] = useState<SavedAttraction[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load saved attractions from localStorage when the user changes
  useEffect(() => {
    if (user) {
      const loadSavedAttractions = () => {
        const storedAttractions = localStorage.getItem(`savedAttractions-${user.id}`);
        if (storedAttractions) {
          setSavedAttractions(JSON.parse(storedAttractions));
        } else {
          setSavedAttractions([]);
        }
        setIsLoading(false);
      };

      loadSavedAttractions();
    } else {
      setSavedAttractions([]);
      setIsLoading(false);
    }
  }, [user]);

  // Save to localStorage whenever savedAttractions changes
  useEffect(() => {
    if (user && !isLoading) {
      localStorage.setItem(`savedAttractions-${user.id}`, JSON.stringify(savedAttractions));
    }
  }, [savedAttractions, user, isLoading]);

  const saveAttraction = (attractionId: string) => {
    if (!user) return;
    
    setSavedAttractions(prev => {
      // Don't add if already saved
      if (prev.some(sa => sa.attractionId === attractionId)) {
        return prev;
      }
      
      return [...prev, {
        userId: user.id,
        attractionId,
        savedAt: new Date()
      }];
    });
  };

  const removeAttraction = (attractionId: string) => {
    if (!user) return;
    
    setSavedAttractions(prev => 
      prev.filter(sa => sa.attractionId !== attractionId)
    );
  };

  const isSaved = (attractionId: string) => {
    return savedAttractions.some(sa => sa.attractionId === attractionId);
  };

  return (
    <SavedAttractionsContext.Provider
      value={{
        savedAttractions,
        isLoading,
        saveAttraction,
        removeAttraction,
        isSaved
      }}
    >
      {children}
    </SavedAttractionsContext.Provider>
  );
};

export const useSavedAttractions = () => {
  const context = useContext(SavedAttractionsContext);
  if (context === undefined) {
    throw new Error('useSavedAttractions must be used within a SavedAttractionsProvider');
  }
  return context;
};