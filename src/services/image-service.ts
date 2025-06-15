
'use server';

// Se RECOMIENDA ENCARECIDAMENTE mover esta clave a un archivo .env.local.
// Crea un archivo .env.local en la raíz de tu proyecto con:
// PIXABAY_API_KEY=TU_CLAVE_API_REAL_DE_PIXABAY
// La clave que proporcionaste (41934519-a36f6965d8021c8eb21f6fba8) se usa como respaldo aquí.

const PIXABAY_API_URL = 'https://pixabay.com/api/';
const DEFAULT_PLACEHOLDER_BASE = 'https://placehold.co/600x400.png';
const FALLBACK_PIXABAY_API_KEY = '41934519-a36f6965d8021c8eb21f6fba8'; // Clave de ejemplo de la documentación

let initialApiKeySource: string;
let apiKeyToUse = process.env.PIXABAY_API_KEY;

if (process.env.NODE_ENV === 'production') {
  if (!apiKeyToUse) {
    initialApiKeySource = 'fallback (PIXABAY_API_KEY not set in Netlify)';
    apiKeyToUse = FALLBACK_PIXABAY_API_KEY;
    console.warn(
      `[Pixabay Service] ADVERTENCIA IMPORTANTE: La variable de entorno PIXABAY_API_KEY no está configurada en su entorno de producción (Netlify). ` +
      `Se utilizará una clave API de respaldo (${FALLBACK_PIXABAY_API_KEY.substring(0,8)}...). Esto podría llevar a imágenes de marcador de posición o fallos. ` +
      `Por favor, configure PIXABAY_API_KEY en Netlify y redespliegue.`
    );
  } else {
    initialApiKeySource = 'Netlify environment variable';
    console.log(`[Pixabay Service] PIXABAY_API_KEY se está utilizando desde las variables de entorno de producción (Netlify): ${apiKeyToUse.substring(0,8)}...`);
  }
} else {
  // Entorno de desarrollo/local
  if (!apiKeyToUse) {
    initialApiKeySource = 'fallback (.env.local missing PIXABAY_API_KEY)';
    apiKeyToUse = FALLBACK_PIXABAY_API_KEY;
    console.log(`[Pixabay Service] PIXABAY_API_KEY no encontrada en .env.local. Usando clave de respaldo (${FALLBACK_PIXABAY_API_KEY.substring(0,8)}...) para desarrollo.`);
  } else {
     initialApiKeySource = '.env.local file';
     console.log(`[Pixabay Service] Usando PIXABAY_API_KEY desde el archivo .env.local: ${apiKeyToUse.substring(0,8)}...`);
  }
}


interface PixabayHit {
  id: number;
  largeImageURL: string;
  webformatURL: string;
  previewURL: string;
}

interface PixabayResponse {
  total: number;
  totalHits: number;
  hits: PixabayHit[];
}

export async function fetchPixabayImage(
  query: string,
  orientation: 'horizontal' | 'vertical' | 'all' = 'all',
  fallbackPlaceholderSeed?: string
): Promise<string> {
  const placeholderQueryText = fallbackPlaceholderSeed || query || "imagen";
  const defaultPlaceholder = `${DEFAULT_PLACEHOLDER_BASE}?text=${encodeURIComponent(placeholderQueryText)}`;

  // apiKeyToUse ya está determinada globalmente en este módulo
  if (!apiKeyToUse) {
     console.error('[Pixabay Fetch] Error Crítico Interno: No hay clave API de Pixabay disponible. Volviendo a marcador de posición.');
     return `${DEFAULT_PLACEHOLDER_BASE}?text=Error+Interno+Clave`;
  }

  console.log(`[Pixabay Fetch] Intentando obtener imagen para "${query}". Usando API Key (fuente: ${initialApiKeySource}): ${apiKeyToUse.substring(0,8)}...`);

  const params = new URLSearchParams({
    key: apiKeyToUse,
    q: query,
    image_type: 'photo',
    safesearch: 'true',
    per_page: '3', // Obtener algunas para tener la oportunidad de elegir una
    orientation: orientation,
    lang: 'es',
  });

  const fetchUrl = `${PIXABAY_API_URL}?${params.toString()}`;
  console.log(`[Pixabay Fetch] URL de solicitud: ${fetchUrl}`);

  try {
    const response = await fetch(fetchUrl, { next: { revalidate: 3600 } }); // Cache por 1 hora

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`[Pixabay Fetch] La solicitud a la API de Pixabay falló con el estado ${response.status}: ${errorText}. Consulta: "${query}". URL: ${fetchUrl}`);
      return `${DEFAULT_PLACEHOLDER_BASE}?text=Error+API(${response.status})`;
    }

    const data: PixabayResponse = await response.json();

    if (data.hits && data.hits.length > 0) {
      console.log(`[Pixabay Fetch] Imagen encontrada para "${query}": ${data.hits[0].largeImageURL}`);
      return data.hits[0].largeImageURL || data.hits[0].webformatURL;
    } else {
      console.warn(`[Pixabay Fetch] No se encontraron imágenes en Pixabay para la consulta: "${query}". Total Hits: ${data.totalHits}. URL: ${fetchUrl}`);
      return `${DEFAULT_PLACEHOLDER_BASE}?text=Sin+Imagen(${encodeURIComponent(query.substring(0,15))})`;
    }
  } catch (error) {
    console.error(`[Pixabay Fetch] Error al obtener la imagen de Pixabay para la consulta "${query}". Error:`, error);
    return `${DEFAULT_PLACEHOLDER_BASE}?text=Error+Red`;
  }
}
