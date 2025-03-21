'use client';

import { useState, useEffect } from 'react';
import { Bell, AlertTriangle, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { Clock } from 'lucide-react';

type Notification = {
  id: number;
  message: string;
  type: 'info' | 'warning' | 'success';
  timestamp: string;
};

export default function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      message: "Nouveau patient priorité rouge admis",
      type: "warning",
      timestamp: new Date().toISOString(),
    },
    {
      id: 2,
      message: "Mise à jour du statut: Patient transféré",
      type: "info",
      timestamp: new Date().toISOString(),
    },
    {
      id: 3,
      message: "Patient sortant: Traitement terminé",
      type: "success",
      timestamp: new Date().toISOString(),
    },
  ]);

  useEffect(() => {
    // Simulate real-time notifications
    const interval = setInterval(() => {
      const types: ('info' | 'warning' | 'success')[] = ['info', 'warning', 'success'];
      const newNotification = {
        id: notifications.length + 1,
        message: "Nouvelle mise à jour",
        type: types[Math.floor(Math.random() * types.length)],
        timestamp: new Date().toISOString(),
      };
      setNotifications(prev => [newNotification, ...prev]);
    }, 45000);

    return () => clearInterval(interval);
  }, []);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'warning': return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'success': return <CheckCircle className="w-5 h-5 text-green-500" />;
      default: return <Bell className="w-5 h-5 text-blue-500" />;
    }
  };

  const getNotificationStyle = (type: string) => {
    switch (type) {
      case 'warning': return 'bg-yellow-50 border-yellow-200';
      case 'success': return 'bg-green-50 border-green-200';
      default: return 'bg-blue-50 border-blue-200';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-700">Notifications</h2>
          <Link href="/">
            <div className="flex items-center gap-2 cursor-pointer px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-100">
              <Clock className="w-4 h-4" />
              <span className="text-sm">Statut</span>
            </div>
          </Link>
        </div>
        <div className="space-y-4">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`flex items-center space-x-4 p-4 rounded-lg border ${getNotificationStyle(notification.type)}`}
            >
              {getNotificationIcon(notification.type)}
              <div className="flex-1">
                <p className="font-medium text-gray-800">{notification.message}</p>
                <p className="text-sm text-gray-500">
                  {new Date(notification.timestamp).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
