
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter } from "lucide-react";
import { motion } from "framer-motion";

// Define the GroceryItem type to match the expected status values
type GroceryItem = {
  id: number;
  name: string;
  quantity: number;
  expiryDate: string;
  status: "fresh" | "expiring" | "expired";
};

const GroceryList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "fresh" | "expiring" | "expired">("all");

  // Mock data with correct status types
  const [groceries, setGroceries] = useState<GroceryItem[]>([
    {
      id: 1,
      name: "Milk",
      quantity: 1,
      expiryDate: "2025-04-10",
      status: "fresh"
    },
    {
      id: 2,
      name: "Bread",
      quantity: 1,
      expiryDate: "2025-04-08",
      status: "expiring"
    },
    {
      id: 3,
      name: "Eggs",
      quantity: 12,
      expiryDate: "2025-04-15",
      status: "fresh"
    },
    {
      id: 4,
      name: "Yogurt",
      quantity: 4,
      expiryDate: "2025-04-02",
      status: "expired"
    },
    {
      id: 5,
      name: "Chicken",
      quantity: 1,
      expiryDate: "2025-04-06",
      status: "expiring"
    }
  ]);

  const filteredGroceries = groceries.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-6">Grocery Inventory</h1>
      
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
          <Input
            placeholder="Search groceries..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex items-center gap-2">
          <Filter size={18} className="text-muted-foreground" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as "all" | "fresh" | "expiring" | "expired")}
            className="border rounded p-2 bg-background"
          >
            <option value="all">All Items</option>
            <option value="fresh">Fresh</option>
            <option value="expiring">Expiring Soon</option>
            <option value="expired">Expired</option>
          </select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGroceries.map(item => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`card-hover glass p-6 rounded-lg ${
              item.status === "expired" ? "border-red-400" :
              item.status === "expiring" ? "border-yellow-400" :
              "border-green-400"
            } border-l-4`}
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-semibold">{item.name}</h3>
              <span className={`px-2 py-1 rounded-full text-xs ${
                item.status === "expired" ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200" :
                item.status === "expiring" ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200" :
                "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
              }`}>
                {item.status === "expired" ? "Expired" :
                 item.status === "expiring" ? "Expiring Soon" : "Fresh"}
              </span>
            </div>
            <div className="space-y-2 text-sm">
              <p><span className="font-medium">Quantity:</span> {item.quantity}</p>
              <p><span className="font-medium">Expires on:</span> {new Date(item.expiryDate).toLocaleDateString()}</p>
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <Button variant="outline" size="sm">Edit</Button>
              <Button variant="destructive" size="sm">Remove</Button>
            </div>
          </motion.div>
        ))}
      </div>
      
      {filteredGroceries.length === 0 && (
        <div className="text-center py-10">
          <p className="text-muted-foreground">No groceries found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default GroceryList;
