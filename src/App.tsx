
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { useState } from "react";

import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import AddGrocery from "./pages/AddGrocery";
import GroceryList from "./pages/GroceryList";
import Notifications from "./pages/Notifications";
import RecipeSuggestions from "./pages/RecipeSuggestions";
import NotFound from "./pages/NotFound";

const App = () => {
  // Create a new QueryClient instance using useState to ensure stability across renders
  const [queryClient] = useState(() => new QueryClient());

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="light" storageKey="fresh-find-grocer-theme">
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <Routes>
              <Route path="/" element={<Layout />}>
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
