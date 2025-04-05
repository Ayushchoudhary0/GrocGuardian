
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, Trash2, Bell } from "lucide-react";
import { motion } from "framer-motion";

// Define the Notification type with specific literal types for the 'type' field
type Notification = {
  id: number;
  title: string;
  message: string;
  type: "expiring" | "expired";
  date: string;
};

const Notifications = () => {
  // Mock data with correct type values
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      title: "Milk expiring soon",
      message: "Your milk will expire in 2 days.",
      type: "expiring",
      date: "2025-04-07"
    },
    {
      id: 2,
      title: "Bread expired",
      message: "Your bread has expired today.",
      type: "expired",
      date: "2025-04-05"
    },
    {
      id: 3,
      title: "Yogurt expiring soon",
      message: "Your yogurt will expire in 3 days.",
      type: "expiring", 
      date: "2025-04-08"
    },
    {
      id: 4,
      title: "Chicken expiring soon",
      message: "Your chicken will expire tomorrow.",
      type: "expiring",
      date: "2025-04-06"
    },
    {
      id: 5,
      title: "Eggs expired",
      message: "Your eggs have expired 2 days ago.",
      type: "expired",
      date: "2025-04-03"
    }
  ]);

  const dismissNotification = (id: number) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Notifications</h1>
        {notifications.length > 0 && (
          <Button variant="outline" onClick={clearAllNotifications}>
            <Trash2 size={16} className="mr-2" />
            Clear All
          </Button>
        )}
      </div>

      {notifications.length > 0 ? (
        <motion.div 
          className="space-y-4"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {notifications.map(notification => (
            <motion.div
              key={notification.id}
              variants={item}
              className={`glass p-4 rounded-lg border-l-4 ${
                notification.type === "expired" ? "border-red-500" : "border-yellow-500"
              } flex justify-between items-start`}
            >
              <div className="flex items-start gap-3">
                <div className={`rounded-full p-2 ${
                  notification.type === "expired" ? "bg-red-100 text-red-600" : "bg-yellow-100 text-yellow-600"
                }`}>
                  <Bell size={18} />
                </div>
                <div>
                  <h3 className="font-medium">{notification.title}</h3>
                  <p className="text-sm text-muted-foreground">{notification.message}</p>
                  <p className="text-xs mt-1">
                    {new Date(notification.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <Button 
                size="sm" 
                variant="ghost" 
                onClick={() => dismissNotification(notification.id)}
                className="h-8 w-8 p-0"
              >
                <Check size={16} />
              </Button>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div className="text-center py-16">
          <div className="bg-muted inline-flex rounded-full p-4 mb-4">
            <Bell size={24} className="text-muted-foreground" />
          </div>
          <h2 className="text-xl font-medium mb-2">No notifications</h2>
          <p className="text-muted-foreground">You're all caught up! There are no notifications.</p>
        </div>
      )}
    </div>
  );
};

export default Notifications;
