
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChefHat, Search, Clock, BookOpen, ThumbsUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

// Mock recipe data
const mockRecipes = [
  {
    id: 1,
    title: "Paneer Butter Masala",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=1000&auto=format&fit=crop",
    cookTime: "30 mins",
    ingredients: ["Paneer", "Tomatoes", "Cream", "Butter", "Spices"],
    cuisineType: "North Indian",
    difficulty: "Medium",
    matching: 4
  },
  {
    id: 2,
    title: "Vegetable Biryani",
    image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=1000&auto=format&fit=crop",
    cookTime: "45 mins",
    ingredients: ["Basmati Rice", "Mixed Vegetables", "Yogurt", "Spices"],
    cuisineType: "South Indian",
    difficulty: "Medium",
    matching: 5
  },
  {
    id: 3,
    title: "Masala Dosa",
    image: "https://images.unsplash.com/photo-1625398407796-82154b4da8f0?q=80&w=1000&auto=format&fit=crop",
    cookTime: "40 mins",
    ingredients: ["Rice Flour", "Potatoes", "Onions", "Chillies"],
    cuisineType: "South Indian",
    difficulty: "Hard",
    matching: 3
  },
  {
    id: 4,
    title: "Chicken Curry",
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?q=80&w=1000&auto=format&fit=crop",
    cookTime: "35 mins",
    ingredients: ["Chicken", "Onions", "Tomatoes", "Ginger", "Garlic"],
    cuisineType: "North Indian",
    difficulty: "Easy",
    matching: 4
  },
  {
    id: 5,
    title: "Aloo Paratha",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=1000&auto=format&fit=crop",
    cookTime: "25 mins",
    ingredients: ["Potatoes", "Wheat Flour", "Spices", "Ghee"],
    cuisineType: "North Indian",
    difficulty: "Easy",
    matching: 3
  },
  {
    id: 6,
    title: "Palak Paneer",
    image: "https://images.unsplash.com/photo-1596797038530-2c107aa7a129?q=80&w=1000&auto=format&fit=crop",
    cookTime: "30 mins",
    ingredients: ["Spinach", "Paneer", "Onions", "Spices"],
    cuisineType: "North Indian",
    difficulty: "Medium",
    matching: 5
  }
];

type Recipe = {
  id: number;
  title: string;
  image: string;
  cookTime: string;
  ingredients: string[];
  cuisineType: string;
  difficulty: string;
  matching: number;
};

const RecipeCard = ({ recipe }: { recipe: Recipe }) => {
  const { toast } = useToast();
  
  const handleSave = () => {
    toast({
      title: "Recipe Saved",
      description: `${recipe.title} has been saved to your favorites`,
    });
  };
  
  return (
    <Card className="overflow-hidden h-full glass card-hover">
      <div 
        className="h-48 bg-cover bg-center" 
        style={{ backgroundImage: `url(${recipe.image})` }}
      />
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle>{recipe.title}</CardTitle>
          <Badge variant="outline" className="bg-primary/10">
            {recipe.cuisineType}
          </Badge>
        </div>
        <CardDescription className="flex items-center gap-1">
          <Clock className="h-3 w-3" />
          {recipe.cookTime}
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div>
          <p className="text-sm font-medium mb-1">Ingredients:</p>
          <div className="flex flex-wrap gap-1">
            {recipe.ingredients.map((ingredient, i) => (
              <Badge key={i} variant="secondary" className="text-xs">
                {ingredient}
              </Badge>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-1 mt-4 text-sm text-muted-foreground">
          <ThumbsUp className="h-3 w-3" />
          <span>{recipe.matching} ingredients match your inventory</span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" size="sm">
          <BookOpen className="h-4 w-4 mr-1" />
          View Recipe
        </Button>
        <Button size="sm" onClick={handleSave}>
          Save
        </Button>
      </CardFooter>
    </Card>
  );
};

const RecipeSuggestions = () => {
  const [recipes, setRecipes] = useState<Recipe[]>(mockRecipes);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredRecipes = recipes.filter(recipe => 
    recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    recipe.ingredients.some(ingredient => 
      ingredient.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold flex items-center">
            <ChefHat className="mr-3 h-8 w-8" /> 
            Recipe Suggestions
          </h1>
          <p className="text-muted-foreground mt-1">
            Indian recipes based on ingredients in your inventory
          </p>
        </div>
        <div className="flex gap-4">
          <img 
            src="https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?q=80&w=1000&auto=format&fit=crop" 
            alt="Fresh ingredients" 
            className="h-16 w-16 rounded-md object-cover shadow-sm" 
          />
          <img 
            src="https://images.unsplash.com/photo-1596797038530-2c107aa7a129?q=80&w=1000&auto=format&fit=crop" 
            alt="Indian cuisine" 
            className="h-16 w-16 rounded-md object-cover shadow-sm" 
          />
        </div>
      </div>
      
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search recipes or ingredients..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9 bg-card"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRecipes.length > 0 ? (
          filteredRecipes.map((recipe, i) => (
            <div key={recipe.id} className="animate-slide-in" style={{ animationDelay: `${i * 0.05}s` }}>
              <RecipeCard recipe={recipe} />
            </div>
          ))
        ) : (
          <div className="col-span-3 text-center py-16">
            <ChefHat className="h-12 w-12 mx-auto text-muted-foreground mb-3 opacity-50" />
            <h3 className="text-lg font-medium">No recipes found</h3>
            <p className="text-muted-foreground">Try a different search term</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipeSuggestions;
