"use client";
import Link from 'next/link';
import { useState } from "react";
import { Plus, UserPlus, BedDouble, FileText } from "lucide-react";

export function QuickActions() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      {/* Bouton principal qui déclenche le dropdown */}
      <button onClick={toggleDropdown} className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"> <Plus className="mr-2 h-4 w-4" />
        Nouvelle Action
      </button>

      {/* Menu déroulant */}
      <div className={`absolute mt-2 right-0 w-56 bg-white shadow-lg rounded-md ${isOpen ? "block" : "hidden"}`}>
        <ul className="space-y-2">
          <li>
            <Link href="/formulaire-de-triage">
              <button className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
                <UserPlus className="mr-2 h-4 w-4" />
                Nouvelle Admission
              </button>
            </Link>
          </li>

          <li>
            <button className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
              <BedDouble className="mr-2 h-4 w-4" />
              Assigner une Chambre
            </button>
          </li>
          <li>
            <button className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
              <FileText className="mr-2 h-4 w-4" />
              Nouveau Rapport
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
