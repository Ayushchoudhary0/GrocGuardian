
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, Barcode, Plus } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";

const AddGrocery = () => {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [barcode, setBarcode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !date) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    // Mock API submission
    setTimeout(() => {
      console.log({ name, quantity, date, barcode });
      
      toast({
        title: "Success",
        description: `${name} has been added to your groceries`,
      });
      
      // Reset form
      setName("");
      setQuantity(1);
      setDate(new Date());
      setBarcode("");
      setIsSubmitting(false);
    }, 800);
  };

  const simulateBarcodeScanner = () => {
    toast({
      title: "Scanning...",
      description: "Please position barcode in scanner",
    });
    
    // Simulate scanning
    setTimeout(() => {
      const mockBarcode = Math.floor(Math.random() * 9000000000000) + 1000000000000;
      setBarcode(mockBarcode.toString());
      toast({
        title: "Scan Complete",
        description: "Barcode scanned successfully",
      });
    }, 1500);
  };

  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      <h1 className="text-3xl font-bold mb-6">Add New Grocery</h1>
      
      <Card className="glass">
        <CardHeader>
          <CardTitle>Grocery Details</CardTitle>
          <CardDescription>Add a new item to track its expiration date</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Grocery Name <span className="text-destructive">*</span></Label>
              <Input
                id="name"
                placeholder="e.g. Milk, Bread, Eggs"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="bg-background"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                type="number"
                min={1}
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                className="bg-background"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="expiry">Expiration Date <span className="text-destructive">*</span></Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="expiry"
                    variant="outline"
                    className="w-full justify-start text-left bg-background"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                    disabled={(date) => date < new Date()}
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="barcode">Barcode (Optional)</Label>
              <div className="flex gap-2">
                <Input
                  id="barcode"
                  placeholder="Scan or enter barcode"
                  value={barcode}
                  onChange={(e) => setBarcode(e.target.value)}
                  className="bg-background"
                />
                <Button 
                  type="button" 
                  size="icon" 
                  onClick={simulateBarcodeScanner}
                  variant="outline"
                  className="bg-background"
                >
                  <Barcode className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            <Button 
              type="submit" 
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing
                </span>
              ) : (
                <span className="flex items-center">
                  <Plus className="mr-2 h-5 w-5" />
                  Add Grocery
                </span>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddGrocery;
