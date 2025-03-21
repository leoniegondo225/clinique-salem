"use client"

import Link from 'next/link';
import { ClipboardList, AlertTriangle, Users } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <main className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center mb-12 text-green-500">
          Gestion des Hospitalisations
        </h1>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <Link href="/formulaire-de-triage" 
                className="flex flex-col items-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <ClipboardList className="w-12 h-12 text-blue-600 mb-4" />
            <h2 className="text-xl font-semibold text-gray-800">Formulaire de Triage</h2>
            <p className="text-gray-600 text-center mt-2">Enregistrer un nouveau patient</p>
          </Link>

          <Link href="/priorite"
                className="flex flex-col items-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <AlertTriangle className="w-12 h-12 text-yellow-600 mb-4" />
            <h2 className="text-xl font-semibold text-gray-800">Gestion des Priorités</h2>
            <p className="text-gray-600 text-center mt-2">Définir le niveau d'urgence</p>
          </Link>

          <Link href="/tableau-patient"
                className="flex flex-col items-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <Users className="w-12 h-12 text-green-600 mb-4" />
            <h2 className="text-xl font-semibold text-gray-800">Liste des Patients</h2>
            <p className="text-gray-600 text-center mt-2">Voir tous les patients</p>
          </Link>
        </div>
      </main>
    </div>
  );
}