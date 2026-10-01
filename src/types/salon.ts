export interface SalonService {
  id: string;
  name: string;
  category: 'Hair' | 'Skin & Facials' | 'Hands & Feet' | 'Spa & Makeup' | string;
  description: string;
  price: number;
  currency: string;
  duration: string;
  image?: string;
  isPopular?: boolean;
}

export interface SalonReview {
  id: string;
  author: string;
  rating: number;
  text: string;
  date: string;
  serviceTaken?: string;
  avatar?: string;
}

export interface SalonColors {
  primary: string;
  accent: string;
  surface: string;
  dark: string;
}

export interface SalonConfig {
  name: string;
  shortName?: string;
  tagline: string;
  description: string;
  whatsapp: string; // The single configurable WhatsApp number (digits only, e.g. "919876543210")
  phone: string;    // Formatted phone display (e.g. "+91 98765 43210")
  email?: string;
  address: string;
  city: string;
  googleMapsUrl: string;
  googleReviewsUrl: string;
  openingHours: string;
  workingDays: string;
  heroImage: string;
  colors: SalonColors;
  services: SalonService[];
  reviews: SalonReview[];
}
