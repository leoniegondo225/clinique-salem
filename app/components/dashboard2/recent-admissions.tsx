"use client";

import { Eye, MoreHorizontal, X } from "lucide-react";
import { useState } from "react";

// Correction : Utilisation d'IDs uniques pour chaque admission
const recentAdmissions = [
  {
    id: '1',
    patientName: 'Jean Dupont',
    age: "25",
    room: '201',
    doctor: 'Dr. Martin',
    admissionDate: '20 Mars 2024',
    duration: 5,
    location: "Hôpital St. Louis, Paris" // Exemples de détails supplémentaires
  },
  {
    id: '2',
    patientName: 'Marie Lambert',
    age: "30",
    room: '105',
    doctor: 'Dr. Bernard',
    admissionDate: '19 Mars 2024',
    duration: 3,
    location: "Hôpital St. Pierre, Lyon"
  },
  {
    id: '3',
    patientName: 'Pierre Durand',
    age: "40",
    room: '304',
    doctor: 'Dr. Thomas',
    admissionDate: '18 Mars 2024',
    duration: 7,
    location: "Hôpital Cochin, Paris"
  }
];

export function RecentAdmissions() {
  // État pour gérer l'affichage du menu contextuel et du modal
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [openDetails, setOpenDetails] = useState<string | null>(null);

  const handleMenuToggle = (id: string) => {
    setOpenMenu(openMenu === id ? null : id);  // Toggle le menu
  };

  const handleViewDetails = (id: string) => {
    // Ouvre le modal pour afficher les détails
    setOpenDetails(id);
  };

  const closeModal = () => {
    setOpenDetails(null); // Ferme le modal
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-medium">Admissions Récentes</h2>
      </div>
      
      <div className="rounded-lg border bg-white shadow-md">
        <table className="min-w-full table-auto">
          {/* Table Header */}
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Patient</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Âge</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Chambre</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Médecin</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Date d'admission</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Durée prévue</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Statut</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600 w-[50px]"></th>
            </tr>
          </thead>
          
          {/* Table Body */}
          <tbody>
            {recentAdmissions.map((admission) => (
              <tr key={admission.id} className="hover:bg-gray-100">
                <td className="px-4 py-2 font-medium">{admission.patientName}</td>
                <td className="px-4 py-2">{admission.age}</td>
                <td className="px-4 py-2">{admission.room}</td>
                <td className="px-4 py-2">{admission.doctor}</td>
                <td className="px-4 py-2">{admission.admissionDate}</td>
                <td className="px-4 py-2">{admission.duration} jours</td>
                <td className="px-4 py-2">
                  <span className="inline-block px-2 py-1 text-xs font-medium text-emerald-700 bg-emerald-50 rounded-full">
                    En cours
                  </span>
                </td>
                <td className="px-4 py-2">
                  <div className="relative">
                    <button
                      className="text-gray-500 hover:text-gray-700 focus:outline-none"
                      onClick={() => handleMenuToggle(admission.id)} // Toggle menu visibility
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                    {openMenu === admission.id && (
                      <div className="absolute right-0 mt-2 space-y-2 bg-white shadow-md rounded-md w-36 z-10">
                        <button
                          className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                          onClick={() => handleViewDetails(admission.id)}
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          Voir détails
                        </button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal affichant les détails */}
      {openDetails && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-medium text-blue-300">Détails de l'admission</h3>
              <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
                <X className="h-4 w-4" />
              </button>
            </div>
            <p><strong>Nom du patient:</strong> {recentAdmissions.find(admission => admission.id === openDetails)?.patientName}</p>
            <p><strong>Âge:</strong> {recentAdmissions.find(admission => admission.id === openDetails)?.age}</p>
            <p><strong>Chambre:</strong> {recentAdmissions.find(admission => admission.id === openDetails)?.room}</p>
            <p><strong>Médecin:</strong> {recentAdmissions.find(admission => admission.id === openDetails)?.doctor}</p>
            <p><strong>Date d'admission:</strong> {recentAdmissions.find(admission => admission.id === openDetails)?.admissionDate}</p>
            <p><strong>Durée:</strong> {recentAdmissions.find(admission => admission.id === openDetails)?.duration} jours</p>
            <p><strong>Lieu:</strong> {recentAdmissions.find(admission => admission.id === openDetails)?.location}</p>
          </div>
        </div>
      )}
    </div>
  );
}
