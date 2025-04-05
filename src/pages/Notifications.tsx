
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BellRing, CheckCircle, Clock, Trash2, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock notification data
const mockNotifications = [
  { 
    id: 1, 
    title: "Milk is expiring soon", 
    message: "Your milk will expire in 3 days", 
    type: "expiring",
    date: "2025-04-08"
  },
  { 
    id: 2, 
    title: "Bread has expired", 
    message: "Your bread expired yesterday", 
    type: "expired",
    date: "2025-04-04"
  },
  { 
    id: 3, 
    title: "Yogurt is expiring soon", 
    message: "Your yogurt will expire tomorrow", 
    type: "expiring",
    date: "2025-04-06"
  },
  { 
    id: 4, 
    title: "Eggs are expiring soon", 
    message: "Your eggs will expire in 2 days", 
    type: "expiring",
    date: "2025-04-07"
  },
  { 
    id: 5, 
    title: "Spinach has expired", 
    message: "Your spinach expired 3 days ago", 
    type: "expired",
    date: "2025-04-02"
  },
];

type Notification = {
  id: number;
  title: string;
  message: string;
  type: "expiring" | "expired";
  date: string;
};

const NotificationCard = ({ 
  notification, 
  onDismiss 
}: { 
  notification: Notification; 
  onDismiss: (id: number) => void 
}) => {
  const icon = notification.type === "expiring" ? 
    <Clock className="h-5 w-5 text-expiring" /> : 
    <Trash2 className="h-5 w-5 text-expired" />;

  const date = new Date(notification.date).toLocaleDateString();
  
  return (
    <div className="bg-card border rounded-lg p-4 animate-slide-in shadow-sm">
      <div className="flex justify-between items-start">
        <div className="flex gap-3">
          {icon}
          <div>
            <h3 className="font-semibold">{notification.title}</h3>
            <p className="text-sm text-muted-foreground">{notification.message}</p>
            <p className="text-xs text-muted-foreground mt-1">{date}</p>
          </div>
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8 rounded-full hover:bg-muted"
          onClick={() => onDismiss(notification.id)}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Dismiss</span>
        </Button>
      </div>
    </div>
  );
};

const Notifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const { toast } = useToast();
  
  const handleDismiss = (id: number) => {
    setNotifications(notifications.filter(n => n.id !== id));
    toast({
      title: "Notification dismissed",
      description: "The notification has been removed",
    });
  };

  const handleDismissAll = () => {
    setNotifications([]);
    toast({
      title: "All notifications cleared",
      description: "All notifications have been dismissed",
    });
  };

  const getExpiringCount = () => notifications.filter(n => n.type === "expiring").length;
  const getExpiredCount = () => notifications.filter(n => n.type === "expired").length;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold flex items-center">
            <BellRing className="mr-3 h-8 w-8" /> 
            Notifications
          </h1>
          <p className="text-muted-foreground mt-1">Stay updated on your grocery expiration dates</p>
        </div>
        
        {notifications.length > 0 && (
          <Button 
            variant="outline" 
            onClick={handleDismissAll}
          >
            <CheckCircle className="h-4 w-4 mr-2" />
            Dismiss All
          </Button>
        )}
      </div>
      
      {notifications.length === 0 ? (
        <Card className="glass text-center py-16">
          <CardContent>
            <div className="flex flex-col items-center">
              <BellRing className="h-12 w-12 text-muted-foreground mb-3 opacity-50" />
              <h3 className="text-lg font-medium">No Notifications</h3>
              <p className="text-muted-foreground">You're all caught up! No expiring items to worry about.</p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {getExpiringCount() > 0 && (
            <Card className="glass">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-expiring" />
                  Expiring Soon ({getExpiringCount()})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {notifications
                  .filter(n => n.type === "expiring")
                  .map((notification, i) => (
                    <div key={notification.id} style={{ animationDelay: `${i * 0.1}s` }}>
                      <NotificationCard 
                        notification={notification} 
                        onDismiss={handleDismiss} 
                      />
                    </div>
                  ))}
              </CardContent>
            </Card>
          )}
          
          {getExpiredCount() > 0 && (
            <Card className="glass">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center">
                  <Trash2 className="h-5 w-5 mr-2 text-expired" />
                  Expired Items ({getExpiredCount()})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {notifications
                  .filter(n => n.type === "expired")
                  .map((notification, i) => (
                    <div key={notification.id} style={{ animationDelay: `${i * 0.1}s` }}>
                      <NotificationCard 
                        notification={notification} 
                        onDismiss={handleDismiss} 
                      />
                    </div>
                  ))}
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
};

export default Notifications;
