
'use server';

// It's STRONGLY recommended to move this key to a .env.local file.
// Create a .env.local file in the root of your project with:
// PIXABAY_API_KEY=YOUR_ACTUAL_PIXABAY_API_KEY
// The key you provided (41934519-a36f6965d8021c8eb21f6fba8) is used as a fallback here.
const PIXABAY_API_KEY = process.env.PIXABAY_API_KEY || '41934519-a36f6965d8021c8eb21f6fba8';
const PIXABAY_API_URL = 'https://pixabay.com/api/';

// Default placeholder if no image is found or API key issue
const DEFAULT_PLACEHOLDER_BASE = 'https://placehold.co/600x400.png';


interface PixabayHit {
  id: number;
  largeImageURL: string;
  webformatURL: string;
  // Add other fields if needed, like tags, user, etc.
}

interface PixabayResponse {
  total: number;
  totalHits: number;
  hits: PixabayHit[];
}

export async function fetchPixabayImage(
  query: string,
  orientation: 'horizontal' | 'vertical' | 'all' = 'all',
  fallbackPlaceholderSeed?: string // To make placeholders unique if needed
): Promise<string> {
  const placeholderQuery = fallbackPlaceholderSeed || query || "image";
  const defaultPlaceholder = `${DEFAULT_PLACEHOLDER_BASE}?text=${encodeURIComponent(placeholderQuery)}`;

  if (!PIXABAY_API_KEY || PIXABAY_API_KEY === 'YOUR_PIXABAY_API_KEY_HERE' /* Check for a generic placeholder */) {
    console.warn('Pixabay API key is not configured or is using a generic placeholder. Please set your PIXABAY_API_KEY in .env.local. Falling back to placeholder image.');
    return defaultPlaceholder;
  }

  const params = new URLSearchParams({
    key: PIXABAY_API_KEY,
    q: query,
    image_type: 'photo',
    safesearch: 'true',
    per_page: '5', // Fetch a few to have a chance to pick one
    orientation: orientation,
  });

  try {
    const response = await fetch(`${PIXABAY_API_URL}?${params.toString()}`, { next: { revalidate: 3600 } }); // Cache for 1 hour
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Pixabay API request failed with status ${response.status}: ${errorText}. Query: ${query}`);
      return `${DEFAULT_PLACEHOLDER_BASE}?text=API+Error`;
    }

    const data: PixabayResponse = await response.json();

    if (data.hits && data.hits.length > 0) {
      // For simplicity, take the first image. Could add logic to pick based on aspect ratio or other criteria.
      return data.hits[0].largeImageURL || data.hits[0].webformatURL;
    } else {
      console.log(`No images found on Pixabay for query: "${query}"`);
      return `${DEFAULT_PLACEHOLDER_BASE}?text=${encodeURIComponent("No image: " + query.substring(0,20))}`;
    }
  } catch (error) {
    console.error(`Error fetching image from Pixabay for query "${query}":`, error);
    return `${DEFAULT_PLACEHOLDER_BASE}?text=Fetch+Error`;
  }
}
