'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Priorite() {
  const router = useRouter();
  const [priority, setPriority] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Ajoute la logique de soumission du formulaire
    router.push('/tableau-patient');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">Niveau de Priorité</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Red Priority */}
          <div className="flex items-center space-x-4 p-4 rounded-lg border border-red-200 bg-red-50">
            <input 
              type="radio" 
              id="rouge" 
              name="priority" 
              value="rouge" 
              checked={priority === 'rouge'} 
              onChange={(e) => setPriority(e.target.value)} 
              className="h-5 w-5 text-red-500 border-red-300 focus:ring-red-500" 
            />
            <label htmlFor="rouge" className="text-red-700 font-medium">
              Rouge - Urgence Critique
            </label>
          </div>

          {/* Yellow Priority */}
          <div className="flex items-center space-x-4 p-4 rounded-lg border border-yellow-200 bg-yellow-50">
            <input 
              type="radio" 
              id="jaune" 
              name="priority" 
              value="jaune" 
              checked={priority === 'jaune'} 
              onChange={(e) => setPriority(e.target.value)} 
              className="h-5 w-5 text-yellow-500 border-yellow-300 focus:ring-yellow-500" 
            />
            <label htmlFor="jaune" className="text-yellow-700 font-medium">
              Jaune - Urgence Modérée
            </label>
          </div>

          {/* Green Priority */}
          <div className="flex items-center space-x-4 p-4 rounded-lg border border-green-200 bg-green-50">
            <input 
              type="radio" 
              id="vert" 
              name="priority" 
              value="vert" 
              checked={priority === 'vert'} 
              onChange={(e) => setPriority(e.target.value)} 
              className="h-5 w-5 text-green-500 border-green-300 focus:ring-green-500" 
            />
            <label htmlFor="vert" className="text-green-700 font-medium">
              Vert - Non Urgent
            </label>
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={!priority}
          >
            Confirmer et Ajouter
          </button>
        </form>
      </div>
    </div>
  );
}
