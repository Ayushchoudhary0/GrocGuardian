
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CircleCheck, Clock, AlertTriangle, Search, Trash2, Edit } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock data for groceries
const mockGroceries = [
  { id: 1, name: "Milk", quantity: 1, expiryDate: "2025-04-15", status: "fresh" },
  { id: 2, name: "Bread", expiryDate: "2025-04-07", quantity: 1, status: "expiring" },
  { id: 3, name: "Yogurt", expiryDate: "2025-04-06", quantity: 3, status: "expiring" },
  { id: 4, name: "Tomatoes", expiryDate: "2025-04-10", quantity: 5, status: "fresh" },
  { id: 5, name: "Cheese", expiryDate: "2025-04-20", quantity: 1, status: "fresh" },
  { id: 6, name: "Eggs", expiryDate: "2025-04-08", quantity: 12, status: "expiring" },
  { id: 7, name: "Spinach", expiryDate: "2025-04-02", quantity: 1, status: "expired" },
  { id: 8, name: "Bananas", expiryDate: "2025-04-03", quantity: 6, status: "expired" }
];

type GroceryItem = {
  id: number;
  name: string;
  quantity: number;
  expiryDate: string;
  status: "fresh" | "expiring" | "expired";
};

const StatusBadge = ({ status }: { status: string }) => {
  let icon;
  let badgeClass;
  let label;

  switch (status) {
    case "fresh":
      icon = <CircleCheck className="h-4 w-4" />;
      badgeClass = "status-badge-fresh";
      label = "Fresh";
      break;
    case "expiring":
      icon = <Clock className="h-4 w-4" />;
      badgeClass = "status-badge-expiring";
      label = "Expiring Soon";
      break;
    case "expired":
      icon = <AlertTriangle className="h-4 w-4" />;
      badgeClass = "status-badge-expired";
      label = "Expired";
      break;
    default:
      return null;
  }

  return (
    <span className={`status-badge ${badgeClass} flex items-center gap-1`}>
      {icon}
      {label}
    </span>
  );
};

const GroceryCard = ({ item, onDelete }: { item: GroceryItem; onDelete: (id: number) => void }) => {
  const expiryDate = new Date(item.expiryDate).toLocaleDateString();
  
  return (
    <Card className={`card-hover ${item.status === 'expired' ? 'opacity-75' : ''}`}>
      <CardContent className="pt-6 pb-4 px-4">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="text-lg font-medium mb-1">{item.name}</h3>
            <p className="text-sm text-muted-foreground">
              Expires: {expiryDate} • Qty: {item.quantity}
            </p>
          </div>
          <StatusBadge status={item.status} />
        </div>
        <div className="flex justify-end gap-2 mt-3">
          <Button variant="outline" size="sm">
            <Edit className="h-4 w-4 mr-1" />
            Edit
          </Button>
          <Button 
            variant="destructive" 
            size="sm"
            onClick={() => onDelete(item.id)}
          >
            <Trash2 className="h-4 w-4 mr-1" />
            Remove
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const GroceryList = () => {
  const [groceries, setGroceries] = useState<GroceryItem[]>(mockGroceries);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const { toast } = useToast();

  const handleDelete = (id: number) => {
    setGroceries(groceries.filter(item => item.id !== id));
    toast({
      title: "Item Removed",
      description: "Grocery item has been removed from your list"
    });
  };

  const filteredGroceries = groceries.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === "all" || item.status === filter;
    return matchesSearch && matchesFilter;
  });

  const getStatusCount = (status: string) => {
    return groceries.filter(item => item.status === status).length;
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Your Groceries</h1>
        <div className="flex gap-2">
          <Button variant="outline">
            <Edit className="h-4 w-4 mr-1" />
            Edit
          </Button>
          <Button>
            <Search className="h-4 w-4 mr-1" />
            Sort
          </Button>
        </div>
      </div>

      <Card className="glass">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <CardTitle>All Items ({groceries.length})</CardTitle>
            <div className="flex gap-2">
              <Button
                variant={filter === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter("all")}
              >
                All
              </Button>
              <Button
                variant={filter === "fresh" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter("fresh")}
              >
                Fresh ({getStatusCount("fresh")})
              </Button>
              <Button
                variant={filter === "expiring" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter("expiring")}
              >
                Expiring ({getStatusCount("expiring")})
              </Button>
              <Button
                variant={filter === "expired" ? "default" : "outline"} 
                size="sm"
                onClick={() => setFilter("expired")}
              >
                Expired ({getStatusCount("expired")})
              </Button>
            </div>
          </div>

          <div className="mt-4 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search groceries..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-background"
            />
          </div>
        </CardHeader>
        <CardContent>
          {filteredGroceries.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground">No grocery items found</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredGroceries.map((item, i) => (
                <div key={item.id} className="animate-slide-in" style={{ animationDelay: `${i * 0.05}s` }}>
                  <GroceryCard item={item} onDelete={handleDelete} />
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default GroceryList;
