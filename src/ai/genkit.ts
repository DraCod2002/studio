import {genkit} from 'genkit';
import {googleAI, type GoogleAIPluginArgs} from '@genkit-ai/googleai';

const googleApiKey = process.env.GOOGLE_API_KEY;

const googleAIArgs: GoogleAIPluginArgs = {};

if (googleApiKey) {
  googleAIArgs.apiKey = googleApiKey;
} else {
  // Muestra esta advertencia si estamos en un entorno de producción (como Netlify)
  // y la clave API no está configurada. En desarrollo local, Genkit podría
  // intentar usar credenciales predeterminadas de gcloud si están disponibles.
  if (process.env.NODE_ENV === 'production') {
     console.warn(
      'La variable de entorno GOOGLE_API_KEY no está configurada. ' +
      'Las funciones de IA de Genkit podrían no funcionar como se espera en este entorno ' +
      'si las Credenciales Predeterminadas de Aplicación (ADC) no están configuradas. ' +
      'Asegúrate de establecer GOOGLE_API_KEY en la configuración de tu sitio en Netlify.'
    );
  }
}

export const ai = genkit({
  plugins: [googleAI(googleAIArgs)],
  model: 'googleai/gemini-2.0-flash',
});
