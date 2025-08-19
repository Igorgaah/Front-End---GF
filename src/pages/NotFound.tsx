import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Home, AlertTriangle } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="bg-gradient-surface border-investment-border shadow-card max-w-md w-full">
        <CardContent className="p-8 text-center space-y-6">
          <div className="mb-6">
            <AlertTriangle className="mx-auto h-16 w-16 text-destructive mb-4" />
            <h1 className="text-4xl font-bold mb-2 text-foreground">404</h1>
            <p className="text-xl text-muted-foreground mb-4">Página não encontrada</p>
            <p className="text-sm text-muted-foreground">
              A página que você está procurando não existe ou foi movida.
            </p>
          </div>
          
          <Button 
            asChild
            className="bg-gradient-hero hover:opacity-90 text-primary-foreground shadow-elegant hover:shadow-glow transition-all duration-300"
          >
            <a href="/" className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              Voltar ao Dashboard
            </a>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotFound;
