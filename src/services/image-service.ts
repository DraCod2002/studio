
'use server';

// Se RECOMIENDA ENCARECIDAMENTE mover esta clave a un archivo .env.local.
// Crea un archivo .env.local en la raíz de tu proyecto con:
// PIXABAY_API_KEY=TU_CLAVE_API_REAL_DE_PIXABAY
// La clave que proporcionaste (41934519-a36f6965d8021c8eb21f6fba8) se usa como respaldo aquí.

// Marcador de posición predeterminado si no se encuentra ninguna imagen o hay un problema con la clave API
const DEFAULT_PLACEHOLDER_BASE = 'https://placehold.co/600x400.png';

// Definir la clave de respaldo una vez
const FALLBACK_PIXABAY_API_KEY = '41934519-a36f6965d8021c8eb21f6fba8';

// Determinar la clave API a usar y registrar advertencias/información
let determinedApiKey = process.env.PIXABAY_API_KEY;

if (process.env.NODE_ENV === 'production') {
  if (!determinedApiKey) {
    console.warn(
      '[Pixabay Service] ADVERTENCIA IMPORTANTE: La variable de entorno PIXABAY_API_KEY no está configurada en su entorno de producción (Netlify). ' +
      'Se utilizará una clave de API de respaldo. Esto podría llevar a imágenes de marcador de posición o fallos ' +
      'si la clave de respaldo es inválida o alcanza límites de uso. Para asegurar el correcto funcionamiento, ' +
      'por favor, configure PIXABAY_API_KEY en la sección "Environment variables" de la configuración de su sitio en Netlify y luego redespliegue su sitio.'
    );
    determinedApiKey = FALLBACK_PIXABAY_API_KEY;
  } else {
    console.log('[Pixabay Service] PIXABAY_API_KEY se está utilizando desde las variables de entorno de producción (Netlify).');
  }
} else {
  // Entorno de desarrollo/local
  if (!determinedApiKey) {
    console.log('[Pixabay Service] PIXABAY_API_KEY no encontrada en .env.local. Usando clave de respaldo para desarrollo. Considere añadirla a su archivo .env.local para pruebas locales.');
    determinedApiKey = FALLBACK_PIXABAY_API_KEY;
  } else {
     console.log('[Pixabay Service] Usando PIXABAY_API_KEY desde el archivo .env.local para desarrollo.');
  }
}


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

  // determinedApiKey ya está establecida con la lógica correcta y los logs al inicio del archivo.
  if (!determinedApiKey) {
     // Este caso es muy improbable dado que siempre hay un fallback.
     console.error('[Pixabay Fetch] Error Crítico: No hay clave API de Pixabay disponible internamente. Volviendo a marcador de posición.');
     return defaultPlaceholder;
  }

  const params = new URLSearchParams({
    key: determinedApiKey,
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
      console.error(`La solicitud a la API de Pixabay falló con el estado ${response.status}: ${errorText}. Consulta: ${query}. Clave usada (parcial): ${determinedApiKey.substring(0, 5)}...`);
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

