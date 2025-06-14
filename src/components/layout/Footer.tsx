// src/components/layout/Footer.tsx
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background/95 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Serene Pathways. All rights reserved.</p>
        <p className="mt-1">Your journey to a calmer mind starts here.</p>
        <div className="mt-4 flex justify-center space-x-4">
          <Link href="/privacy-policy" className="hover:text-primary transition-colors">
            Privacy Policy
          </Link>
          <Link href="/terms-of-service" className="hover:text-primary transition-colors">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
}
