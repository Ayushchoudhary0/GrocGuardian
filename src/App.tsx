
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { useState, useEffect } from "react";

import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import AddGrocery from "./pages/AddGrocery";
import GroceryList from "./pages/GroceryList";
import Notifications from "./pages/Notifications";
import RecipeSuggestions from "./pages/RecipeSuggestions";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";

// Authentication guard component
const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

const App = () => {
  // Create a new QueryClient instance using useState to ensure stability across renders
  const [queryClient] = useState(() => new QueryClient());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Add a small delay to simulate checking authentication
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="light" storageKey="groc-guardian-theme">
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={
                <RequireAuth>
                  <Layout />
                </RequireAuth>
              }>
                <Route index element={<Dashboard />} />
                <Route path="add" element={<AddGrocery />} />
                <Route path="groceries" element={<GroceryList />} />
                <Route path="notifications" element={<Notifications />} />
                <Route path="recipes" element={<RecipeSuggestions />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </TooltipProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

export default App;
