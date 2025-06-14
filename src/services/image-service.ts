
'use server';

// Se RECOMIENDA ENCARECIDAMENTE mover esta clave a un archivo .env.local.
// Crea un archivo .env.local en la raíz de tu proyecto con:
// PIXABAY_API_KEY=TU_CLAVE_API_REAL_DE_PIXABAY
// La clave que proporcionaste (41934519-a36f6965d8021c8eb21f6fba8) se usa como respaldo aquí.
const PIXABAY_API_KEY = process.env.PIXABAY_API_KEY || '41934519-a36f6965d8021c8eb21f6fba8';
const PIXABAY_API_URL = 'https://pixabay.com/api/';

// Marcador de posición predeterminado si no se encuentra ninguna imagen o hay un problema con la clave API
const DEFAULT_PLACEHOLDER_BASE = 'https://placehold.co/600x400.png';


interface PixabayHit {
  id: number;
  largeImageURL: string;
  webformatURL: string;
  // Agrega otros campos si es necesario, como etiquetas, usuario, etc.
}

interface PixabayResponse {
  total: number;
  totalHits: number;
  hits: PixabayHit[];
}

export async function fetchPixabayImage(
  query: string,
  orientation: 'horizontal' | 'vertical' | 'all' = 'all',
  fallbackPlaceholderSeed?: string // Para hacer que los marcadores de posición sean únicos si es necesario
): Promise<string> {
  const placeholderQuery = fallbackPlaceholderSeed || query || "imagen";
  const defaultPlaceholder = `${DEFAULT_PLACEHOLDER_BASE}?text=${encodeURIComponent(placeholderQuery)}`;

  if (!PIXABAY_API_KEY || PIXABAY_API_KEY === 'YOUR_PIXABAY_API_KEY_HERE' /* Verifica un marcador de posición genérico */) {
    console.warn('La clave API de Pixabay no está configurada o está usando un marcador de posición genérico. Por favor, establece tu PIXABAY_API_KEY en .env.local. Volviendo a la imagen de marcador de posición.');
    return defaultPlaceholder;
  }

  const params = new URLSearchParams({
    key: PIXABAY_API_KEY,
    q: query,
    image_type: 'photo',
    safesearch: 'true',
    per_page: '5', // Obtener algunas para tener la oportunidad de elegir una
    orientation: orientation,
    lang: 'es', // Solicitar resultados en español si es posible
  });

  try {
    const response = await fetch(`${PIXABAY_API_URL}?${params.toString()}`, { next: { revalidate: 3600 } }); // Cache por 1 hora
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`La solicitud a la API de Pixabay falló con el estado ${response.status}: ${errorText}. Consulta: ${query}`);
      return `${DEFAULT_PLACEHOLDER_BASE}?text=Error+API`;
    }

    const data: PixabayResponse = await response.json();

    if (data.hits && data.hits.length > 0) {
      // Por simplicidad, toma la primera imagen. Se podría agregar lógica para elegir según la relación de aspecto u otros criterios.
      return data.hits[0].largeImageURL || data.hits[0].webformatURL;
    } else {
      console.log(`No se encontraron imágenes en Pixabay para la consulta: "${query}"`);
      return `${DEFAULT_PLACEHOLDER_BASE}?text=${encodeURIComponent("Sin imagen: " + query.substring(0,20))}`;
    }
  } catch (error) {
    console.error(`Error al obtener la imagen de Pixabay para la consulta "${query}":`, error);
    return `${DEFAULT_PLACEHOLDER_BASE}?text=Error+Obtencion`;
  }
}
