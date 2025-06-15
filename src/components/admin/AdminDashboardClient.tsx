
'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Eye, LogOut, MousePointerClick, RefreshCw, AlertTriangle, Trash2 } from 'lucide-react';
import {
  isAdminLoggedIn,
  setAdminLoggedIn,
  getPageViewCount,
  getAllEventCounts,
  resetAnalytics,
} from '@/services/analytics-service';
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface EventCounts {
  [key: string]: number;
}

export default function AdminDashboardClient() {
  const router = useRouter();
  const [pageViews, setPageViews] = useState(0);
  const [eventCounts, setEventCounts] = useState<EventCounts>({});
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const loadData = useCallback(() => {
    setPageViews(getPageViewCount());
    setEventCounts(getAllEventCounts());
  }, []);

  useEffect(() => {
    if (!isAdminLoggedIn()) {
      router.replace('/admin/login');
    } else {
      loadData();
      setIsLoading(false);
    }
  }, [router, loadData]);

  const handleLogout = () => {
    setAdminLoggedIn(false);
    toast({
      title: "Sesión Cerrada",
      description: "Has cerrado sesión como administrador.",
    });
    router.replace('/admin/login');
  };

  const handleRefresh = () => {
    loadData();
    toast({
      title: "Datos Actualizados",
      description: "Las estadísticas han sido recargadas.",
    });
  };

  const handleResetAnalytics = () => {
    resetAnalytics();
    loadData(); // Recargar datos para mostrar que se han reseteado
    toast({
        title: "Analíticas Reseteadas",
        description: "Todos los datos de seguimiento han sido eliminados.",
        variant: "destructive"
    });
  };

  if (isLoading) {
    return (
      <PageWrapper className="flex items-center justify-center min-h-[calc(100vh-200px)]">
        <Card className="text-center p-8">
          <BarChart className="w-12 h-12 text-primary mx-auto mb-4 animate-pulse" />
          <CardTitle className="text-2xl">Cargando Panel de Administración...</CardTitle>
          <CardDescription>Por favor, espera.</CardDescription>
        </Card>
      </PageWrapper>
    );
  }
  
  if (!isAdminLoggedIn()) {
      return null; // O un loader, aunque el redirect ya debería haber ocurrido
  }

  const trackedEvents = [
    { id: 'chatbot_button_clicks', name: 'Clics en "Chatea con el Bot de Apoyo"' },
    { id: 'stress_test_button_clicks', name: 'Clics en "Realiza el Test de Estrés"' },
    { id: 'articles_button_clicks', name: 'Clics en "Leer Artículos" (home)' },
    { id: 'resources_button_clicks', name: 'Clics en "Encontrar Profesionales" (home)' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="text-center sm:text-left">
            <h1 className="text-3xl font-bold flex items-center">
                <BarChart className="w-8 h-8 mr-3 text-primary" />
                Panel de Administración
            </h1>
            <p className="text-muted-foreground">Métricas básicas de uso del sitio.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleRefresh}><RefreshCw className="mr-2 h-4 w-4" /> Actualizar</Button>
          <Button onClick={handleLogout}><LogOut className="mr-2 h-4 w-4" /> Cerrar Sesión</Button>
        </div>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center"><Eye className="mr-2 h-5 w-5 text-primary" /> Vistas de Página Totales</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-4xl font-bold">{pageViews}</p>
          <p className="text-sm text-muted-foreground">Número total de veces que cualquier página ha sido cargada.</p>
        </CardContent>
      </Card>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center"><MousePointerClick className="mr-2 h-5 w-5 text-primary" /> Clics en Botones (Homepage)</CardTitle>
          <CardDescription>Seguimiento de clics en botones específicos de la página de inicio.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {trackedEvents.map(event => (
            <div key={event.id} className="flex justify-between items-center p-3 bg-muted/50 rounded-md">
              <span>{event.name}:</span>
              <span className="font-bold text-lg">{eventCounts[event.id] || 0}</span>
            </div>
          ))}
           {Object.keys(eventCounts).filter(key => !trackedEvents.find(te => te.id === key)).map(customEventKey => (
            <div key={customEventKey} className="flex justify-between items-center p-3 bg-muted/30 rounded-md">
              <span>{customEventKey.replace(/_/g, ' ')} (otro):</span>
              <span className="font-bold text-lg">{eventCounts[customEventKey] || 0}</span>
            </div>
          ))}
          {Object.keys(eventCounts).length === 0 && !trackedEvents.some(te => eventCounts[te.id]) && (
             <p className="text-sm text-muted-foreground">Aún no se han registrado clics en los botones rastreados.</p>
          )}
        </CardContent>
      </Card>
      
      <Card className="border-destructive bg-destructive/5 shadow-lg">
        <CardHeader>
            <CardTitle className="text-destructive flex items-center"><AlertTriangle className="mr-2 h-5 w-5" /> Zona de Peligro</CardTitle>
        </CardHeader>
        <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
                Esta acción eliminará todos los datos de seguimiento almacenados en el navegador del usuario (visitas de página y clics). Esta acción no se puede deshacer.
            </p>
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button variant="destructive"><Trash2 className="mr-2 h-4 w-4" /> Resetear Datos de Analítica</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                    <AlertDialogTitle>¿Estás seguro de resetear los datos?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Esto eliminará permanentemente todas las visitas de página y conteos de clics almacenados localmente.
                        Esta acción no se puede deshacer.
                    </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction onClick={handleResetAnalytics} className="bg-destructive hover:bg-destructive/90 text-destructive-foreground">
                        Sí, resetear datos
                    </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </CardContent>
      </Card>

      <Card className="mt-8 bg-amber-50 border-amber-400">
          <CardHeader>
            <CardTitle className="text-amber-700 flex items-center"><AlertTriangle className="mr-2 h-5 w-5" /> Recordatorio de Seguridad</CardTitle>
          </CardHeader>
          <CardContent className="text-amber-700 text-sm">
            <p>Este panel de administración es una implementación básica para fines de demostración. Utiliza autenticación del lado del cliente y almacenamiento local (`localStorage`) para las métricas, lo cual <strong>no es seguro</strong> para un entorno de producción. Los datos pueden ser fácilmente accedidos o modificados por el usuario, y no hay una protección real de las credenciales.</p>
            <p className="mt-2">En una aplicación real, la autenticación debe manejarse en el backend, y las analíticas deben almacenarse en una base de datos segura.</p>
          </CardContent>
      </Card>
    </div>
  );
}

// Necesario para envolver AdminDashboardClient si se usa directamente en una página de servidor
const PageWrapper = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <div className={`container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 ${className}`}>
    {children}
  </div>
);
