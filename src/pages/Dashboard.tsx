
import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CircleCheck, Clock, AlertTriangle, ShoppingCart } from "lucide-react";

// Mock data
const mockStats = {
  total: 24,
  fresh: 15,
  expiringSoon: 6,
  expired: 3,
  recentlyAdded: [
    { id: 1, name: "Milk", expiryDate: "2025-04-12", status: "fresh" },
    { id: 2, name: "Bread", expiryDate: "2025-04-08", status: "expiring" },
    { id: 3, name: "Yogurt", expiryDate: "2025-04-06", status: "expiring" }
  ]
};

const Dashboard = () => {
  const [greeting, setGreeting] = useState("Good day");
  const [stats, setStats] = useState(mockStats);
  
  // Set greeting based on time of day
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good morning");
    else if (hour < 18) setGreeting("Good afternoon");
    else setGreeting("Good evening");
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "fresh":
        return <CircleCheck className="h-5 w-5 text-fresh" />;
      case "expiring":
        return <Clock className="h-5 w-5 text-expiring" />;
      case "expired":
        return <AlertTriangle className="h-5 w-5 text-expired" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <section className="space-y-3">
        <h1 className="text-4xl font-bold">{greeting}!</h1>
        <p className="text-muted-foreground">
          Here's an overview of your grocery inventory
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="glass card-hover">
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">Total Items</CardTitle>
            <CardDescription>Items in your inventory</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <ShoppingCart className="h-8 w-8 text-primary mr-2" />
              <span className="text-3xl font-bold">{stats.total}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="glass card-hover">
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">Fresh</CardTitle>
            <CardDescription>Items good to use</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <CircleCheck className="h-8 w-8 text-fresh mr-2" />
              <span className="text-3xl font-bold">{stats.fresh}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="glass card-hover">
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">Expiring Soon</CardTitle>
            <CardDescription>Use these items soon</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-expiring mr-2" />
              <span className="text-3xl font-bold">{stats.expiringSoon}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="glass card-hover">
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">Expired</CardTitle>
            <CardDescription>Items to discard</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <AlertTriangle className="h-8 w-8 text-expired mr-2" />
              <span className="text-3xl font-bold">{stats.expired}</span>
            </div>
          </CardContent>
        </Card>
      </section>

      <section>
        <Card className="glass">
          <CardHeader>
            <CardTitle>Recently Added</CardTitle>
            <CardDescription>Your latest grocery additions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats.recentlyAdded.map((item, i) => (
                <div 
                  key={item.id} 
                  className="flex justify-between items-center p-3 rounded-md bg-background border animate-slide-in"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <div className="flex items-center gap-3">
                    {getStatusIcon(item.status)}
                    <span className="font-medium">{item.name}</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Expires: {new Date(item.expiryDate).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default Dashboard;
