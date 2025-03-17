"use client";


import { useState } from 'react';



// Composant de la fenêtre modale
function LoginModal({ role, onClose }: { role: string; onClose: () => void }) {
  const roleName = (role === "medecin") ? "Médecin" 
  : (role === "Gestionnaire") ? "Gestionnaire"
  : (role === "Administrateur") && "Administrateur"

  return (
    <div className="fixed inset-0 flex items-center justify-center text-white z-50 bg-[rgba(0,0,0,0.5)]">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-2xl font-semibold text-center text-green-700">Connexion {roleName}</h2>
        <form className="mt-4">
          <label className="block font-medium text-black">Nom d&lsquo;utilisateur</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500"
            placeholder="Entrez votre nom d'utilisateur"
          />

          <label className="block font-medium mt-4 text-black">Mot de passe</label>
          <input
            type="password"
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500"
            placeholder="Entrez votre mot de passe"
          />

          <div className="flex justify-between items-center mt-4">
            <button
              type="submit"
              className="bg-green-700 text-white px-3 py-1 rounded-lg hover:bg-green-600 text-10"
            >
              Se connecter
            </button>
            <a href="#" className="text-black hover:underline">
              Mot de passe oublié ?
            </a>
            
          </div>

          <div className="text-center mt-4">
          <button
              type="button"
              onClick={onClose}
              className="text-red-600 hover:underline"
            >
              Fermer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}



export default function Page() {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [role, setRole] = useState<string>('');

  // Fonction pour ouvrir le modal avec le rôle
  const openModal = (role: string) => {
    setRole(role);
    setIsModalOpen(true);
  };

  // Fonction pour fermer le modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {/* Section Hero avec l'arrière-plan animé */}
      <div className="relative w-full h-screen flex flex-col items-center justify-center text-white text-center">
        <div className="absolute inset-0 w-full h-full">
          <div
            className="absolute inset-0 w-full h-full bg-cover bg-center bg-fade"
            style={{
              backgroundImage:
                "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(/img/img1.avif)",
            }}
          />
          <div
            className="absolute inset-0 w-full h-full bg-cover bg-center bg-fade"
            style={{
              backgroundImage:
                "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(/img/img2.avif)",
            }}
          />
          <div
            className="absolute inset-0 w-full h-full bg-cover bg-center bg-fade"
            style={{
              backgroundImage:
                "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(/img/img3.avif)",
            }}
          />
        </div>
        <div className="relative z-10">
          <h1 className="text-4xl font-bold mb-7">Bienvenue à la Clinique SALEM</h1>
          <p className="text-lg mb-5">Votre espace santé en toute simplicité</p>
           {/* Section des Cartes */}
      <div className=" flex flex-col items-center">
        

        <div className="flex flex-wrap gap-6 justify-center">
          {/* Carte Médecin */}
          <div className="bg-white shadow-lg rounded-lg p-6 text-center cursor-pointer transition-all duration-300 hover:bg-blue-300  w-64" onClick={() => openModal('medecin')}>
            <div className="text-5xl">🧑‍⚕️</div>
            <h2 className="text-xl font-semibold text-red-600 mt-4">Médecin</h2>
            <p className="text-lg mt-2 text-black  hover:text-white ">
            Organisez les soins, les rendez-vous et le suivi des patients
            </p>
          </div>

          {/* Carte Personnel */}
          <div className="bg-white shadow-lg rounded-lg p-6 text-center cursor-pointer transition-all duration-300 hover:bg-blue-300  w-64 " onClick={() => openModal('Gestionnaire')}>
            <div className="text-5xl">📂</div>
            <h2 className="text-xl font-semibold text-red-600 mt-4">Gestionnaires</h2>
            <p className="text-lg mt-2 text-black hover:text-white">
            Administrez les dossiers médicaux et la gestion des rendez-vous des patients 
            </p>
          </div>

          {/* Carte Admin */}
          <div className="bg-white shadow-lg rounded-lg p-6 text-center cursor-pointer transition-all duration-300 hover:bg-blue-300  w-64 " onClick={() => openModal('Administrateur')}>
            <div className="text-5xl">⚙️</div>
            <h2 className="text-xl font-semibold text-red-600 mt-4">Administration</h2>
            <p className="text-lg mt-2 text-black hover:text-white">
            Gérez les paramètres et la configuration de l&lsquo;application
            </p>
          </div>
        </div>
      </div>
        </div>
      </div>

      {/* Affichage du Modal */}
      {isModalOpen && <LoginModal role={role} onClose={closeModal} />}
    </>
  );
}
