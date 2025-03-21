 "use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function FormulaireTriage() {
  const router = useRouter();

  // États séparés pour chaque champ
  const [nom, setNom] = useState('');
  const [chambre, setChambre] = useState('');
  const [medecin, setMedecin] = useState('');
  const [dateAdmission, setDateAdmission] = useState('');
  const [delaiPrevu, setDelaiPrevu] = useState('');
  const [statut, setStatut] = useState('en cours');
  const [age, setAge] = useState('');
  const [symptomes, setSymptomes] = useState('');

  // Fonction de soumission avec gestion d'erreur
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Simuler une logique de soumission de données
      console.log("Données soumises ");

      // Après soumission, redirection vers la page de priorités
      router.push('/priorite');
      
    } catch (error) {
      console.error("Erreur lors de la soumission du formulaire", error);
      alert("Une erreur s'est produite. Veuillez réessayer.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl text-center font-semibold text-gray-800 mb-6">Formulaire de Triage</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Nom */}
          <div>
            <label htmlFor="nom" className="block text-sm font-medium text-gray-700 mb-2">
              Nom du Patient
            </label>
            <input
              id="nom"
              type="text"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Chambre */}
          <div>
            <label htmlFor="chambre" className="block text-sm font-medium text-gray-700 mb-2">
              Chambre
            </label>
            <input
              id="chambre"
              type="text"
              value={chambre}
              onChange={(e) => setChambre(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Médecin */}
          <div>
            <label htmlFor="medecin" className="block text-sm font-medium text-gray-700 mb-2">
              Médecin
            </label>
            <input
              id="medecin"
              type="text"
              value={medecin}
              onChange={(e) => setMedecin(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Date d'admission */}
          <div>
            <label htmlFor="dateAdmission" className="block text-sm font-medium text-gray-700 mb-2">
              Date d'admission
            </label>
            <input
              id="dateAdmission"
              type="date"
              value={dateAdmission}
              onChange={(e) => setDateAdmission(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Délai prévu (Calendrier) */}
          <div>
            <label htmlFor="delaiPrevu" className="block text-sm font-medium text-gray-700 mb-2">
              Délai prévu
            </label>
            <input
              id="delaiPrevu"
              type="date"
              value={delaiPrevu}
              onChange={(e) => setDelaiPrevu(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Statut */}
          <div>
            <label htmlFor="statut" className="block text-sm font-medium text-gray-700 mb-2">
              Statut
            </label>
            <select
              id="statut"
              value={statut}
              onChange={(e) => setStatut(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="en cours" className='text-yellow-300'>En cours</option>
              <option value="terminée" className='text-green-400'>Terminée</option>
              <option value="annulée" className='text-red-300'>Annulée</option>
            </select>
          </div>

          {/* Âge */}
          <div>
            <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-2">
              Âge
            </label>
            <input
              id="age"
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Symptômes */}
          <div>
            <label htmlFor="symptomes" className="block text-sm font-medium text-gray-700 mb-2">
              Symptômes
            </label>
            <textarea
              id="symptomes"
              value={symptomes}
              onChange={(e) => setSymptomes(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[100px]"
            />
          </div>

          {/* Bouton */}
          <div>
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
              Continuer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
