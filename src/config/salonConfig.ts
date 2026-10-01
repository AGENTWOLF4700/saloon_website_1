import { SalonConfig } from '../types/salon';
import heroImageDefault from '../assets/images/hero_salon_interior_1790857527190.jpg';
import hairImageDefault from '../assets/images/service_hair_styling_1790857544061.jpg';
import facialImageDefault from '../assets/images/service_facial_spa_1790857556692.jpg';
import nailImageDefault from '../assets/images/service_nail_care_1790857570680.jpg';

/**
 * ==============================================================================
 * SALON CONFIGURATION TEMPLATE
 * ==============================================================================
 * This is the SINGLE SOURCE OF TRUTH for salon branding, contact, and content.
 * To create a website for a new salon, update the values below or switch presets.
 * No code changes needed elsewhere!
 */
export const defaultSalonConfig: SalonConfig = {
  // Brand identity
  name: "Glow & Style Salon",
  shortName: "Glow & Style",
  tagline: "Where Style Meets Confidence",
  description: "Professional hair, beauty and grooming services tailored for you in a calm, luxurious boutique atmosphere.",

  // Primary Contact & WhatsApp (Single configurable location for WhatsApp number)
  whatsapp: "919461474764", // Configured with requested test number 94614 74764
  phone: "+91 94614 74764",
  email: "hello@glowandstylesalon.com",

  // Location & Working Schedule
  address: "Plot 42, Malviya Nagar Main Road, Jaipur, Rajasthan 302017",
  city: "Jaipur, Rajasthan",
  googleMapsUrl: "https://www.google.com/search?q=salon+jaipur&oq=salon&gs_lcrp=EgZjaHJvbWUqCggBEAAYkgMYgAQyBggAEEUYOTIKCAEQABiSAxiABDINCAIQABiSAxiABBiKBTIHCAMQABiABDIHCAQQABiABDIGCAUQRRg9MgYIBhBFGD0yBggHEEUYPNIBCDMxODhqMGo3qAIAsAIA&sourceid=chrome&source=chrome.ob&ie=UTF-8#sv=CCYSyQYKBwoDdWRtEgAaA3B2LSq4BjKOBnpRVDA2d0VJRUJBQkdBRWlFd2pHdTltejdaaVhBeFZCUm1jSEhleGlPVVVvQVRLU0JCS1BCQzloWTJ4clAzTmhQVXdtWVdrOVJFTm9jMU5GZDJwalowOURlamRhYVZoQmVGVkhiVWRaUTBoVGFVNUVhRUZaUVVOSlEwTkJSVkZDZUc5RFl6SXdKbU52UFRFbVlYTmxQVEltWjJOc2FXUTlRMm93UzBOQmFuZHBabXBXUW1oQ1MwVnBNRUZaZURSTE9VOWZVVVF4YjFGbVYyMXVXaTFwYzBaelMxTnplbDh3VVVsbFduWXpkemsyZWt0UFV6Qk9Wamc1WmpScE1WTlNSRFJZT0RaVFRXRkJkVVJLUlVGTWQxOTNZMEltYkdGaVpXdzlabkpsWlY5d2MxOTNaV0p6YVhSbEptTnBaRDFEUVVGVGRXZElhMkZJWmpkWmNFWktOMjlQTjNkSGRGTkhRVXBvY0hOSlNUSmxaR1p6YjBKMU5ESjVjR1pSUVhwTkxVMVRPR3AwVldJd2RqUnVhSGhsZDJOcFVFeGpOekZYZFZSTFdXOUtSVFZ5TjBvMlRISjZjV3hQTjFaSVpHTkdlRUZvYjE5U1FsZGFRazlqWkV0UlRtTXpiM1ZmYVZnMFYydEdkek4zTkVwM1F6ZzNTemd5T1RGa1VtbE9lSEo2Um1OSllVUjVPRmRpVUc5TFlWVTBhWGswYlhGNGVqUllWMGhhVjNwdGMyRjVXSFJXUW5veWVrOUJjV2REZFhsbE5XaHNTVmM1VlhwMU5tdHhhRnBzYVVGNWRFazJjMjU2UkZkWFIwdE5ZbFJ3Wm5nME4zZzBkbVpUTUMxamRUTmFiRm81UWxoMlpVUkNVVkJmU3pBbVkyTWhnX0JMWTJGMFpXZHZjbms5WVdOeVkzQmZkakZmTXpJbWMybG5QVUZQUkRZMFh6RjFSbHBoY0hCSlQxTkdYekIwUTJjMWJEUmFka2h2Um5Oa05IY21ZV1IxY213OU9BRmFGd2dBRWhNSXhsMHlGQWNkN0dJNVJROiUweDM5NmRiNjk0N2I1Y2YzMmY6MHg2YTVmZTYwMzYxODVmNzg0GAogg4W_oA4",
  googleReviewsUrl: "https://www.google.com/search?q=salon+jaipur&oq=salon&gs_lcrp=EgZjaHJvbWUqCggBEAAYkgMYgAQyBggAEEUYOTIKCAEQABiSAxiABDINCAIQABiSAxiABBiKBTIHCAMQABiABDIHCAQQABiABDIGCAUQRRg9MgYIBhBFGD0yBggHEEUYPNIBCDMxODhqMGo3qAIAsAIA&sourceid=chrome&source=chrome.ob&ie=UTF-8#sv=CCYSyQYKBwoDdWRtEgAaA3B2LSq4BjKOBnpRVDA2d0VJRUJBQkdBRWlFd2pHdTltejdaaVhBeFZCUm1jSEhleGlPVVVvQVRLU0JCS1BCQzloWTJ4clAzTmhQVXdtWVdrOVJFTm9jMU5GZDJwalowOURlamRhYVZoQmVGVkhiVWRaUTBoVGFVNUVhRUZaUVVOSlEwTkJSVkZDZUc5RFl6SXdKbU52UFRFbVlYTmxQVEltWjJOc2FXUTlRMm93UzBOQmFuZHBabXBXUW1oQ1MwVnBNRUZaZURSTE9VOWZVVVF4YjFGbVYyMXVXaTFwYzBaelMxTnplbDh3VVVsbFduWXpkemsyZWt0UFV6Qk9Wamc1WmpScE1WTlNSRFJZT0RaVFRXRkJkVVJLUlVGTWQxOTNZMEltYkdGaVpXdzlabkpsWlY5d2MxOTNaV0p6YVhSbEptTnBaRDFEUVVGVGRXZElhMkZJWmpkWmNFWktOMjlQTjNkSGRGTkhRVXBvY0hOSlNUSmxaR1p6YjBKMU5ESjVjR1pSUVhwTkxVMVRPR3AwVldJd2RqUnVhSGhsZDJOcFVFeGpOekZYZFZSTFdXOUtSVFZ5TjBvMlRISjZjV3hQTjFaSVpHTkdlRUZvYjE5U1FsZGFRazlqWkV0UlRtTXpiM1ZmYVZnMFYydEdkek4zTkVwM1F6ZzNTemd5T1RGa1VtbE9lSEo2Um1OSllVUjVPRmRpVUc5TFlWVTBhWGswYlhGNGVqUllWMGhhVjNwdGMyRjVXSFJXUW5veWVrOUJjV2REZFhsbE5XaHNTVmM1VlhwMU5tdHhhRnBzYVVGNWRFazJjMjU2UkZkWFIwdE5ZbFJ3Wm5nME4zZzBkbVpUTUMxamRUTmFiRm81UWxoMlpVUkNVVkJmU3pBbVkyTWhnX0JMWTJGMFpXZHZjbms5WVdOeVkzQmZkakZmTXpJbWMybG5QVUZQUkRZMFh6RjFSbHBoY0hCSlQxTkdYekIwUTJjMWJEUmFka2h2Um5Oa05IY21ZV1IxY213OU9BRmFGd2dBRWhNSXhsMHlGQWNkN0dJNVJROiUweDM5NmRiNjk0N2I1Y2YzMmY6MHg2YTVmZTYwMzYxODVmNzg0GAogg4W_oA4",
  openingHours: "9:00 AM – 8:30 PM",
  workingDays: "Monday to Sunday (Open All 7 Days)",

  // Main visual assets
  heroImage: heroImageDefault,

  // Theme accent colors (Hex or Tailwind compatible)
  colors: {
    primary: "#1A1A1A",   // Deep obsidian black
    accent: "#C59B27",    // Warm champagne gold
    surface: "#FDFCFA",   // Soft warm linen
    dark: "#141414",
  },

  // Service Catalog
  services: [
    {
      id: "haircut",
      name: "Haircut & Styling",
      category: "Hair",
      description: "Precision haircut tailored to your face shape, followed by wash, conditioning and blowout styling.",
      price: 300,
      currency: "₹",
      duration: "45 mins",
      image: hairImageDefault,
      isPopular: true,
    },
    {
      id: "hair-styling",
      name: "Blowdry & Hair Styling",
      category: "Hair",
      description: "Volumizing blowout, soft waves, or sleek straight finish using heat protectants and salon styling serums.",
      price: 500,
      currency: "₹",
      duration: "40 mins",
      image: hairImageDefault,
      isPopular: false,
    },
    {
      id: "hair-coloring",
      name: "Hair Coloring & Balayage",
      category: "Hair",
      description: "Custom shade formulation, global color, subtle highlights or natural balayage with ammonia-free colors.",
      price: 1800,
      currency: "₹",
      duration: "120 mins",
      image: hairImageDefault,
      isPopular: true,
    },
    {
      id: "hair-spa",
      name: "Keratin Hair Spa & Mask",
      category: "Hair",
      description: "Deep conditioning steam massage, protein-rich scalp repair mask, and shine-infusing treatment.",
      price: 1200,
      currency: "₹",
      duration: "60 mins",
      image: hairImageDefault,
      isPopular: false,
    },
    {
      id: "facial-glow",
      name: "HydraGlow Botanical Facial",
      category: "Skin & Facials",
      description: "Gentle lymphatic drainage massage, pore detoxification, botanical serums, and ultra-hydrating collagen sheet mask.",
      price: 850,
      currency: "₹",
      duration: "60 mins",
      image: facialImageDefault,
      isPopular: true,
    },
    {
      id: "facial-gold",
      name: "Radiance Gold Facial",
      category: "Skin & Facials",
      description: "Luxury 24K gold dust infusion designed to reduce sun pigmentation, brighten tone, and leave lasting radiance.",
      price: 1400,
      currency: "₹",
      duration: "75 mins",
      image: facialImageDefault,
      isPopular: false,
    },
    {
      id: "manicure",
      name: "Luxury Spa Manicure",
      category: "Hands & Feet",
      description: "Aromatherapy hand soak, cuticles cleanup, organic exfoliating scrub, hand massage, and long-lasting gel polish.",
      price: 450,
      currency: "₹",
      duration: "45 mins",
      image: nailImageDefault,
      isPopular: false,
    },
    {
      id: "pedicure",
      name: "Royal Velvet Pedicure",
      category: "Hands & Feet",
      description: "Warm herbal foot soak, callus buffing, dead skin exfoliation, pressure-point reflexology massage, and polish.",
      price: 550,
      currency: "₹",
      duration: "50 mins",
      image: nailImageDefault,
      isPopular: true,
    },
    {
      id: "bridal-makeup",
      name: "Party & Occasion Makeup",
      category: "Spa & Makeup",
      description: "HD base application, eye contouring, lash enhancement, and setting for a flawless, photo-ready all-day finish.",
      price: 2500,
      currency: "₹",
      duration: "90 mins",
      image: facialImageDefault,
      isPopular: true,
    },
  ],

  // Client Testimonials
  reviews: [
    {
      id: "review-1",
      author: "Priya",
      rating: 5,
      text: "Absolutely loved the service. The staff was professional, polite, and made me feel like royalty. The hair styling lasted the entire evening!",
      date: "Last week",
      serviceTaken: "Haircut & Blowdry",
      avatar: "P",
    },
    {
      id: "review-2",
      author: "Ananya Sharma",
      rating: 5,
      text: "Best salon experience in Jaipur by far. Booked via WhatsApp in 30 seconds and walked in without any wait. My hair feels incredibly soft and shiny.",
      date: "2 weeks ago",
      serviceTaken: "Keratin Hair Spa",
      avatar: "A",
    },
    {
      id: "review-3",
      author: "Meera Kapoor",
      rating: 5,
      text: "Their HydraGlow facial worked wonders on my tired skin before a family wedding. The aesthetician gave great skincare advice with zero pressure.",
      date: "1 month ago",
      serviceTaken: "HydraGlow Botanical Facial",
      avatar: "M",
    },
    {
      id: "review-4",
      author: "Rahul Verma",
      rating: 5,
      text: "Crisp fade and beard sculpting done to perfection. Clean tools, relaxing ambient vibes, and very reasonable pricing for this level of luxury.",
      date: "3 weeks ago",
      serviceTaken: "Haircut & Styling",
      avatar: "R",
    },
    {
      id: "review-5",
      author: "Sunita Mehta",
      rating: 5,
      text: "Treated my daughter and myself to a manicure and pedicure session. Spotless hygiene, soothing background music, and lovely staff.",
      date: "1 month ago",
      serviceTaken: "Royal Velvet Pedicure",
      avatar: "S",
    },
  ],
};
