'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Bell, Clock } from 'lucide-react';

type Patient = {
  id: number;
  nom: string;
  age: number;
  symptomes: string;
  priorite: 'rouge' | 'jaune' | 'vert';
  dateAdmission: string;
};

const mockPatients: Patient[] = [
  {
    id: 1,
    nom: "Jean Dupont",
    age: 45,
    symptomes: "Douleurs thoraciques",
    priorite: "rouge",
    dateAdmission: "2024-03-20T10:30:00"
  },
  {
    id: 2,
    nom: "Marie Martin",
    age: 32,
    symptomes: "Migraine sévère",
    priorite: "jaune",
    dateAdmission: "2024-03-20T11:15:00"
  },
  {
    id: 3,
    nom: "Pierre Durant",
    age: 28,
    symptomes: "Entorse cheville",
    priorite: "vert",
    dateAdmission: "2024-03-20T11:45:00"
  }
];

export default function TableauPatient() {
  const [patients] = useState<Patient[]>(mockPatients);

  const getPriorityColor = (priorite: string) => {
    switch (priorite) {
      case 'rouge': return 'bg-red-100 text-red-800';
      case 'jaune': return 'bg-yellow-100 text-yellow-800';
      case 'vert': return 'bg-green-100 text-green-800';
      default: return '';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Liste des Patients</h1>
        <div className="flex gap-4">
          <Link href="/tableau-patient/notifications">
            <div className="flex items-center gap-2 cursor-pointer px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-100">
              <Bell className="w-4 h-4" />
              <span className="text-sm">Notifications</span>
            </div>
          </Link>
          <Link href="/tableau-patient/statut">
            <div className="flex items-center gap-2 cursor-pointer px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-100">
              <Clock className="w-4 h-4" />
              <span className="text-sm">Statut</span>
            </div>
          </Link>
        </div>
      </div>

      <div className="grid gap-4">
        {patients.map((patient) => (
          <div
            key={patient.id}
            className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden"
          >
            <div className="flex items-center justify-between p-6">
              <div className="space-y-2">
                <h3 className="font-semibold text-lg">{patient.nom}</h3>
                <p className="text-sm text-gray-500">
                  {patient.age} ans - {patient.symptomes}
                </p>
                <p className="text-xs text-gray-400">
                  Admis le: {new Date(patient.dateAdmission).toLocaleString()}
                </p>
              </div>
              <span
                className={`px-4 py-2 rounded-full text-sm font-semibold ${getPriorityColor(patient.priorite)}`}
              >
                Priorité {patient.priorite}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
