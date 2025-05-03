export interface User {
  id: string;
  username: string;
  email: string;
}

export interface City {
  id: string;
  name: string;
  country: string;
  description: string;
  image: string;
}

export interface Attraction {
  id: string;
  cityId: string;
  name: string;
  description: string;
  image: string;
  rating: number;
}

export interface SavedAttraction {
  userId: string;
  attractionId: string;
  savedAt: Date;
}