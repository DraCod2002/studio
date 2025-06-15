
'use server';

// Se RECOMIENDA ENCARECIDAMENTE mover esta clave a un archivo .env.local.
// Crea un archivo .env.local en la raíz de tu proyecto con:
// PIXABAY_API_KEY=TU_CLAVE_API_REAL_DE_PIXABAY

const PIXABAY_API_URL = 'https://pixabay.com/api/'; // Definida correctamente aquí
const DEFAULT_PLACEHOLDER_BASE = 'https://placehold.co/600x400.png';
const EXAMPLE_PIXABAY_API_KEY = '41934519-a36f6965d8021c8eb21f6fba8'; // Clave de ejemplo de la documentación

let apiKeyToUse = process.env.PIXABAY_API_KEY;
let apiKeySourceInfo = '';
let usingExampleKey = false;

if (process.env.NODE_ENV === 'production') {
  if (!apiKeyToUse) {
    apiKeySourceInfo = `fallback (PIXABAY_API_KEY no configurada en Netlify)`;
    apiKeyToUse = EXAMPLE_PIXABAY_API_KEY;
    usingExampleKey = true;
    console.warn(
      `[Pixabay Service] ADVERTENCIA SERIA: La variable de entorno PIXABAY_API_KEY no está configurada en su entorno de producción (Netlify). ` +
      `Se utilizará la CLAVE DE EJEMPLO DE LA DOCUMENTACIÓN DE PIXABAY (${EXAMPLE_PIXABAY_API_KEY.substring(0,8)}...). ` +
      `Esto NO es recomendable y podría fallar o tener limitaciones. ` +
      `Por favor, configure SU PROPIA PIXABAY_API_KEY en Netlify y redespliegue.`
    );
  } else if (apiKeyToUse === EXAMPLE_PIXABAY_API_KEY) {
    apiKeySourceInfo = `Netlify env var (PERO ES LA CLAVE DE EJEMPLO)`;
    usingExampleKey = true;
    console.warn(
      `[Pixabay Service] ADVERTENCIA SERIA: Está utilizando la CLAVE DE EJEMPLO DE LA DOCUMENTACIÓN DE PIXABAY (${EXAMPLE_PIXABAY_API_KEY.substring(0,8)}...) en producción desde las variables de entorno de Netlify. ` +
      `Esto NO es recomendable y podría fallar o tener limitaciones. ` +
      `Por favor, configure SU PROPIA PIXABAY_API_KEY en Netlify y redespliegue.`
    );
  } else {
    apiKeySourceInfo = 'Netlify environment variable (personal)';
    console.log(`[Pixabay Service] PIXABAY_API_KEY (personal) se está utilizando desde las variables de entorno de producción (Netlify): ${apiKeyToUse.substring(0,8)}...`);
  }
} else {
  // Entorno de desarrollo/local
  if (!apiKeyToUse) {
    apiKeySourceInfo = `fallback (.env.local sin PIXABAY_API_KEY)`;
    apiKeyToUse = EXAMPLE_PIXABAY_API_KEY;
    usingExampleKey = true;
    console.log(`[Pixabay Service] PIXABAY_API_KEY no encontrada en .env.local. Usando clave de EJEMPLO (${EXAMPLE_PIXABAY_API_KEY.substring(0,8)}...) para desarrollo.`);
  } else if (apiKeyToUse === EXAMPLE_PIXABAY_API_KEY) {
    apiKeySourceInfo = `.env.local (PERO ES LA CLAVE DE EJEMPLO)`;
    usingExampleKey = true;
     console.warn(`[Pixabay Service] ADVERTENCIA: Usando la clave de EJEMPLO de Pixabay (${EXAMPLE_PIXABAY_API_KEY.substring(0,8)}...) desde .env.local. Considere obtener su propia clave para desarrollo.`);
  }
  else {
     apiKeySourceInfo = '.env.local (personal)';
     console.log(`[Pixabay Service] Usando PIXABAY_API_KEY (personal) desde el archivo .env.local: ${apiKeyToUse.substring(0,8)}...`);
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
  fallbackPlaceholderSeed?: string // Usado para generar un placeholder único si la imagen real falla
): Promise<string> {
  const placeholderQueryText = fallbackPlaceholderSeed || query || "imagen";
  const defaultPlaceholder = `${DEFAULT_PLACEHOLDER_BASE}?text=${encodeURIComponent(placeholderQueryText)}`;

  if (!apiKeyToUse) {
     console.error('[Pixabay Fetch] Error Crítico Interno: No hay clave API de Pixabay disponible (apiKeyToUse está vacía). Volviendo a marcador de posición.');
     return `${DEFAULT_PLACEHOLDER_BASE}?text=Error+Interno+Clave`;
  }
  
  if (usingExampleKey && process.env.NODE_ENV === 'production') {
    console.warn(`[Pixabay Fetch] Usando CLAVE DE EJEMPLO (${apiKeyToUse.substring(0,8)}...) de Pixabay en PRODUCCIÓN para consulta: "${query}". Esto puede causar fallos.`);
  } else {
    console.log(`[Pixabay Fetch] Intentando obtener imagen para "${query}". Usando API Key (fuente: ${apiKeySourceInfo}, clave: ${apiKeyToUse.substring(0,8)}...).`);
  }


  const params = new URLSearchParams({
    key: apiKeyToUse,
    q: query,
    image_type: 'photo',
    safesearch: 'true',
    per_page: '3', // Solicitud de 3 para tener alguna opción, aunque solo usemos la primera
    orientation: orientation,
    lang: 'es', // Buscar en español si es posible
  });

  const fetchUrl = `${PIXABAY_API_URL}?${params.toString()}`;
  console.log(`[Pixabay Fetch] URL de solicitud completa: ${fetchUrl}`);

  try {
    const response = await fetch(fetchUrl, { next: { revalidate: 3600 } }); // Cache por 1 hora

    if (!response.ok) {
      const errorBody = await response.text();
      console.error(`[Pixabay Fetch] La solicitud a la API de Pixabay falló con el estado ${response.status}: ${errorBody}. Consulta: "${query}". Clave usada: ${apiKeyToUse.substring(0,8)}... URL: ${fetchUrl}`);
      if (response.status === 400 && errorBody.includes("[ERROR 400] \"key\" is missing")) {
         return `${DEFAULT_PLACEHOLDER_BASE}?text=Error+Clave+Ausente`;
      }
      if (response.status === 401 || response.status === 403 || errorBody.toLowerCase().includes("invalid api key")) {
        return `${DEFAULT_PLACEHOLDER_BASE}?text=Error+Clave+API`;
      }
      if (response.status === 429) { // Too Many Requests
        return `${DEFAULT_PLACEHOLDER_BASE}?text=Limite+API`;
      }
      return `${DEFAULT_PLACEHOLDER_BASE}?text=Error+API(${response.status})`;
    }

    const data: PixabayResponse = await response.json();

    if (data.hits && data.hits.length > 0) {
      console.log(`[Pixabay Fetch] Imagen encontrada para "${query}". URL: ${data.hits[0].largeImageURL || data.hits[0].webformatURL}`);
      return data.hits[0].largeImageURL || data.hits[0].webformatURL;
    } else {
      console.warn(`[Pixabay Fetch] No se encontraron imágenes en Pixabay para la consulta: "${query}". Total Hits: ${data.totalHits}. Clave usada: ${apiKeyToUse.substring(0,8)}... URL: ${fetchUrl}`);
      return `${DEFAULT_PLACEHOLDER_BASE}?text=Sin+Imagen(${encodeURIComponent(query.substring(0,10))})`;
    }
  } catch (error: any) {
    // El error del log original era `ReferenceError: PIXABAY_API_URL is not defined`
    // Si ese error persiste, significa que la constante PIXABAY_API_URL no está definida en el ámbito correcto.
    // Con esta corrección, ese error específico no debería ocurrir.
    console.error(`[Pixabay Fetch] Error al obtener la imagen de Pixabay para la consulta "${query}". Error: ${error.message || error}. URL: ${fetchUrl}`, error);
    return `${DEFAULT_PLACEHOLDER_BASE}?text=Error+Red(${encodeURIComponent(query.substring(0,10))})`;
  }
}

    