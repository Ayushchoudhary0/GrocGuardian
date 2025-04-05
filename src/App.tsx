
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";

import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import AddGrocery from "./pages/AddGrocery";
import GroceryList from "./pages/GroceryList";
import Notifications from "./pages/Notifications";
import RecipeSuggestions from "./pages/RecipeSuggestions";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light" storageKey="fresh-find-grocer-theme">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
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
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
