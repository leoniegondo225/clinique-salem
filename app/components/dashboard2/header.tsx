"use client"
import { Search } from "lucide-react";
import { useState } from "react"; 
import Link from "next/link";

// Liste des patients (exemple)
const patients = [
  { id: '1', name: 'Jean Dupont' },
  { id: '2', name: 'Marie Lambert' },
  { id: '3', name: 'Pierre Durand' },
];

export function DashboardHeader() {
  const [dropdownOpen, setDropdownOpen] = useState(false); // État pour gérer l'ouverture du dropdown
  const [searchQuery, setSearchQuery] = useState(''); // État pour gérer la saisie de recherche
  const [filteredPatients, setFilteredPatients] = useState(patients); // Patients filtrés

  // Fonction pour ouvrir/fermer le dropdown
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // Fonction pour gérer la recherche
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    // Filtrer les patients en fonction de la recherche
    const filtered = patients.filter(patient =>
      patient.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredPatients(filtered); // Mettre à jour les patients filtrés
  };

  return (
    <div>
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            {/* Titre du Header */}
            <Link href="/" className="font-semibold text-lg">
              <h2 className="text-lg font-medium bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                <img src="./image/logo.jpg" alt="salem" className="h-14 w-auto" />
              </h2>
            </Link>
          </div>

          {/* Champ de recherche (Input) */}
          <div className="flex-1 max-w-xl hidden md:block">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              {/* Champ de recherche (Input) */}
              <input
                type="text"
                placeholder="Rechercher un patient..."
                className="pl-8 bg-gray-100 border border-gray-300 rounded-md w-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchQuery}
                onChange={handleSearch} // Met à jour la recherche au changement de texte
              />
              {/* Affichage des résultats de la recherche */}
              {searchQuery && filteredPatients.length > 0 && (
                <div className="absolute bg-white shadow-md rounded-md w-full mt-1 z-10">
                  <ul>
                    {filteredPatients.map(patient => (
                      <li key={patient.id} className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        {/* Utilisation de Link pour rendre le nom cliquable */}
                        <Link href={`/tableau-patient/`} className="block">
                          {patient.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <button
                className="px-4 py-2 bg-gradient-to-r from-green-400 to-blue-500 text-white font-semibold rounded-md w-full text-center"
                type="button"
                onClick={toggleDropdown}>Hospitalisation
                <span className="ml-2">🔽</span>
              </button>

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <ul className="dropdown-menu absolute bg-white rounded-md shadow-lg mt-2 w-full z-50">
                  <li><Link href="/Gestionnaire" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Gestionnaire</Link></li>
                </ul>
              )}
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
