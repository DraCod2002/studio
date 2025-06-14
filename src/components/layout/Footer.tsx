
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background/95 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Xstrees. Todos los derechos reservados.</p>
        <p className="mt-1">Tu viaje hacia una mente más calmada comienza aquí.</p>
        <div className="mt-4 flex justify-center space-x-4">
          <Link href="/privacy-policy" className="hover:text-primary transition-colors">
            Política de Privacidad
          </Link>
          <Link href="/terms-of-service" className="hover:text-primary transition-colors">
            Términos de Servicio
          </Link>
        </div>
      </div>
    </footer>
  );
}

