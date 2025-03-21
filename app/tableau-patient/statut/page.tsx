'use client';

import { useState, useEffect } from 'react';

type StatutUpdate = {
  id: number;
  patient: string;
  status: string;
  timestamp: string;
};

export default function Statut() {
  const [updates, setUpdates] = useState<StatutUpdate[]>([
    {
      id: 1,
      patient: "Jean Dupont",
      status: "En consultation",
      timestamp: new Date().toISOString()
    },
    {
      id: 2,
      patient: "Marie Martin",
      status: "En attente",
      timestamp: new Date().toISOString()
    }
  ]);

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      const newUpdate = {
        id: updates.length + 1,
        patient: "Nouveau Patient",
        status: "Arrivé",
        timestamp: new Date().toISOString()
      };
      setUpdates(prev => [newUpdate, ...prev]);
    }, 30000);

    return () => clearInterval(interval);
  }, [updates]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'En consultation':
        return 'bg-blue-100 text-blue-800';
      case 'En attente':
        return 'bg-yellow-100 text-yellow-800';
      case 'Arrivé':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white shadow-lg rounded-lg max-w-3xl mx-auto">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-semibold">Mises à jour en temps réel</h1>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {updates.map((update) => (
              <div
                key={update.id}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
              >
                <div>
                  <p className="font-medium">{update.patient}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(update.timestamp).toLocaleString()}
                  </p>
                </div>
                <span
                  className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(update.status)}`}
                >
                  {update.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
