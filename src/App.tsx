import { createContext, useContext, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Index from "./pages/Hero";
import Contacto from "./pages/Contacto";
import NotFound from "./pages/NotFound";
import Loader from "./components/Loader";

// Variable de módulo: false en cada recarga real, true durante navegación SPA
let loaderShownThisSession = false;

// En recarga, siempre llevar al inicio
if (window.location.pathname !== '/') {
  window.history.replaceState({}, '', '/');
}

// Context para que Hero sepa cuándo iniciar su animación
export const LoaderContext = createContext(false);
export const useLoaderDone = () => useContext(LoaderContext);

const queryClient = new QueryClient();

const App = () => {
  const [loaderDone, setLoaderDone] = useState(loaderShownThisSession);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <LoaderContext.Provider value={loaderDone}>
          {!loaderDone && (
            <Loader onDone={() => {
              loaderShownThisSession = true;
              setLoaderDone(true);
            }} />
          )}
          <BrowserRouter>
            <Layout>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/nosotros"  element={<Navigate to="/#nosotros"  replace />} />
                <Route path="/servicios" element={<Navigate to="/#servicios" replace />} />
                <Route path="/contacto" element={<Contacto />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Layout>
          </BrowserRouter>
        </LoaderContext.Provider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
