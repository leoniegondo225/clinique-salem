'use client';

import React, { useState } from 'react';

// Define the Patient interface
interface Patient {
  id: string;
  nom: string;
  age: number;
  gender: string;
  contact: string;
  email: string;
  medicalHistory: string[];
  lastVisit: string;
}

// Sample data for demonstration
const samplePatients: Patient[] = [
  {
    "id": "1",
    "nom": "Koffi Kouadio",
    "age": 45,
    "gender": "Homme",
    "contact": "+225 01 23 45 67 89",
    "email": "koffi.kouadio@email.com",
    "medicalHistory": ["Hypertension", "Diabète"],
    "lastVisit": "2023-10-15"
  },
  {
    "id": "2",
    "nom": "Aminata Diouf",
    "age": 32,
    "gender": "Femme",
    "contact": "+221 77 12 34 56 78",
    "email": "aminata.diouf@email.com",
    "medicalHistory": ["Asthme"],
    "lastVisit": "2023-11-02"
  },
  {
    "id": "3",
    "nom": "Mamadou Keita",
    "age": 58,
    "gender": "Homme",
    "contact": "+223 76 45 67 89 10",
    "email": "mamadou.keita@email.com",
    "medicalHistory": ["Arthrite", "Cholestérol élevé"],
    "lastVisit": "2023-09-28"
  }
]

export default function PatientList() {
  const [patients] = useState<Patient[]>(samplePatients);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterGender, setFilterGender] = useState<string>('all');
  const [sortBy, setSortBy] = useState<keyof Patient>('nom');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [,setSelectedPatient] = useState<Patient | null>(null);
  const [] = useState(false);

  // Filter and sort patients
  const filteredPatients = patients
    .filter((patient) => {
      // Filter by search term
      const matchesSearch = patient.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.medicalHistory.some(condition => condition.toLowerCase().includes(searchTerm.toLowerCase()));
      
      // Filter by gender
      const matchesGender = filterGender === 'all' || patient.gender === filterGender;
      
      return matchesSearch && matchesGender;
    })
    .sort((a, b) => {
      // Handle sorting
      if (sortBy === 'age' || sortBy === 'lastVisit') {
        // Numeric or date sorting
        return sortDirection === 'asc' 
          ? a[sortBy] > b[sortBy] ? 1 : -1
          : a[sortBy] < b[sortBy] ? 1 : -1;
      } else {
        // String sorting
        return sortDirection === 'asc'
          ? String(a[sortBy]).localeCompare(String(b[sortBy]))
          : String(b[sortBy]).localeCompare(String(a[sortBy]));
      }
    });

  // Handle sort change
  const handleSort = (column: keyof Patient) => {
    if (sortBy === column) {
      // Toggle direction if same column
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // New column, default to ascending
      setSortBy(column);
      setSortDirection('asc');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4 bg-gradient-to-r from-blue-500 to-green-500">
        <h2 className="text-xl font-semibold text-white">Liste des Patients</h2>
      </div>
      
      {/* Search and filters */}
      <div className="p-4 bg-gray-50 border-b border-gray-200">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Rechercher par nom ou antécédent médical..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="w-full md:w-48">
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filterGender}
              onChange={(e) => setFilterGender(e.target.value)}
            >
              <option value="all">Tous les genres</option>
              <option value="Homme">Homme</option>
              <option value="Femme">Femme</option>
              <option value="Autre">Autre</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Patient table - Responsive */}
      <div className="overflow-x-auto -mx-4 sm:-mx-2 md:mx-0">
        <table className="min-w-full divide-y divide-gray-200 table-auto">
          <thead className="bg-gray-50">
            <tr>
              <th 
                scope="col" 
                className="px-4 sm:px-5 md:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('nom')}
              >
                Nom
                {sortBy === 'nom' && (
                  <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                )}
              </th>
              <th 
                scope="col" 
                className="px-4 sm:px-5 md:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('age')}
              >
                Âge
                {sortBy === 'age' && (
                  <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                )}
              </th>
              <th 
                scope="col" 
                className="px-4 sm:px-5 md:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('gender')}
              >
                Genre
                {sortBy === 'gender' && (
                  <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                )}
              </th>
              <th scope="col" className="px-4 sm:px-5 md:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contact
              </th>
              <th scope="col" className="px-4 sm:px-5 md:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Antécédents
              </th>
              <th 
                scope="col" 
                className="px-4 sm:px-5 md:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('lastVisit')}
              >
                Dernière Visite
                {sortBy === 'lastVisit' && (
                  <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                )}
              </th>
              <th scope="col" className="px-4 sm:px-5 md:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredPatients.length > 0 ? (
              filteredPatients.map((patient) => (
                <tr key={patient.id} className="hover:bg-blue-50 transition-colors">
                  <td className="px-4 sm:px-6 py-2 sm:py-4 whitespace-nowrap">
                    <div className="text-xs sm:text-sm font-medium text-gray-900">{patient.nom}</div>
                  </td>
                  <td className="px-4 sm:px-6 py-2 sm:py-4 whitespace-nowrap">
                    <div className="text-xs sm:text-sm text-gray-500">{patient.age} ans</div>
                  </td>
                  <td className="px-4 sm:px-6 py-2 sm:py-4 whitespace-nowrap">
                    <div className="text-xs sm:text-sm text-gray-500">{patient.gender}</div>
                  </td>
                  <td className="px-4 sm:px-6 py-2 sm:py-4 whitespace-nowrap">
                    <div className="text-xs sm:text-sm text-gray-500">{patient.contact}</div>
                    <div className="text-xs sm:text-sm text-gray-500">{patient.email}</div>
                  </td>
                  <td className="px-4 sm:px-6 py-2 sm:py-4">
                    <div className="flex flex-wrap gap-1 max-w-[150px] sm:max-w-none">
                      {patient.medicalHistory.map((condition, index) => (
                        <span 
                          key={index} 
                          className="inline-flex items-center px-1.5 sm:px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-medium bg-blue-100 text-blue-800"
                        >
                          {condition}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 sm:px-6 py-2 sm:py-4 whitespace-nowrap">
                    <div className="text-xs sm:text-sm text-gray-500">
                      {new Date(patient.lastVisit).toLocaleDateString('fr-FR')}
                    </div>
                  </td>
                  <td className="px-4 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm font-medium">
                    <button 
                      className="text-blue-600 hover:text-blue-900 mr-3"
                      onClick={() => {
                        // Naviguer vers l'onglet des détails du patient et sélectionner ce patient
                        document.getElementById('patient-detail')?.scrollIntoView({ behavior: 'smooth' });
                        // Dans une application réelle avec des routes, on pourrait utiliser:
                        // router.push(`/patients/${patient.id}`);
                      }}
                    >
                      Voir
                    </button>
                    <button 
                      className="text-green-600 hover:text-green-900"
                      onClick={() => {
                        // Sélectionner le patient et ouvrir le formulaire d'édition
                        setSelectedPatient(patient);
                        document.getElementById('patient-detail')?.scrollIntoView({ behavior: 'smooth' });
                        // Dans une application plus complète, on pourrait ouvrir un modal d'édition ici
                      }}
                    >
                      Modifier
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="px-6 py-4 text-center text-sm text-gray-500">
                  Aucun patient trouvé
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}