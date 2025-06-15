
'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, LogIn } from 'lucide-react';
import { setAdminLoggedIn } from '@/services/analytics-service';
import { useToast } from "@/hooks/use-toast";

export default function AdminLoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    // Estas son las credenciales correctas
    if (username === 'admin' && password === 'admin2025') {
      setAdminLoggedIn(true);
      toast({
        title: "Login Exitoso",
        description: "Redirigiendo al panel de administración...",
      });
      router.push('/admin/dashboard');
    } else {
      setError('Nombre de usuario o contraseña incorrectos.');
      toast({
        variant: "destructive",
        title: "Error de Login",
        description: "Nombre de usuario o contraseña incorrectos.",
      });
    }
  };

  return (
    <Card className="w-full max-w-md shadow-xl">
      <CardHeader className="text-center">
        <LogIn className="w-12 h-12 text-primary mx-auto mb-3" />
        <CardTitle className="text-2xl font-bold">Acceso de Administrador</CardTitle>
        <CardDescription>Por favor, introduce tus credenciales.</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="username">Usuario</Label>
            <Input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="Tu nombre de usuario"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Contraseña</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Tu contraseña"
            />
          </div>
          {error && (
            <div className="flex items-center text-sm text-destructive">
              <AlertCircle className="mr-2 h-4 w-4" />
              {error}
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">
            Ingresar
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
