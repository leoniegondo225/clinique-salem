'use client';

import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { FaPlusCircle } from 'react-icons/fa';
import { EmergencyContact } from '@/types/patient';

// Types pour le patient
interface Patient {
  id: string;
  nom: string;
  prenom: string;
  birthDate: string;
  telephone: string;
  email: string;
  gender: string;
  emergencyContacts: EmergencyContact[];
}

interface ErrorState {
  [key: string]: string;
}

// Fonctions de validation
const validatePhone = (phone: string) => {
  return /^\d{2}\s?\d{2}\s?\d{2}\s?\d{2}\s?\d{2}$/.test(phone)
    ? '' : 'Format invalide (ex: 06 12 34 56 78)';
};

const validateEmail = (email: string) => {
  return /\S+@\S+\.\S+/.test(email) ? '' : 'Email invalide';
};

const validateRequired = (value: string, label: string) => {
  return value.trim() === '' ? `${label} est requis` : '';
};

export default function PatientForm() {

  // État pour les données du formulaire
  const [formData, setFormData] = useState<Patient>({
    id: uuidv4(),
    nom: '',
    prenom: '',
    birthDate: '',
    telephone: '',
    email: '',
    gender: '',
    emergencyContacts: [],
  });

  // État pour les erreurs
  const [errors, setErrors] = useState<ErrorState>({});

  // Gérer les changements dans les champs du formulaire
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Gérer les changements dans les contacts d'urgence
  const handleEmergencyChange = (index: number, field: keyof EmergencyContact, value: string) => {
    setFormData((prev) => {
      const contacts = [...prev.emergencyContacts];
      contacts[index] = { ...contacts[index], [field]: value };
      return { ...prev, emergencyContacts: contacts };
    });
  };

  // Ajouter un contact d'urgence
  const handleAddEmergencyContact = () => {
    setFormData((prev) => ({
      ...prev,
      emergencyContacts: [
        ...prev.emergencyContacts,
        { id: uuidv4(), nom: '', relation: '', telephone: '' },
      ],
    }));
  };

  // Valider les champs du formulaire
  const validateField = (name: string, value: string) => {
    let error = '';

    switch (name) {
      case 'prenom':
        error = validateRequired(value, 'Prénom');
        break;
      case 'nom':
        error = validateRequired(value, 'Nom');
        break;
      case 'birthDate':
        error = value ? '' : 'Veuillez sélectionner une date';
        break;
      case 'telephone':
        error = validatePhone(value);
        break;
      case 'email':
        error = validateEmail(value);
        break;
      case 'gender':
        error = value ? '' : 'Veuillez sélectionner une option';
        break;
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
    return !error;
  };

  // Gérer la soumission du formulaire
  const handleSubmit = async (e:  React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let isValid = true;

    // Validation des champs principaux
    Object.keys(formData).forEach((key) => {
      if (key !== 'emergencyContacts' && key !== 'id') {
        isValid = validateField(key, String(formData[key as keyof Patient])) && isValid;
      }
    });

    // Validation des contacts d'urgence
    formData.emergencyContacts.forEach((contact, index) => {
      if (!contact.nom.trim()) {
        setErrors((prev) => ({
          ...prev,
          [`emergencyContacts[${index}].name`]: 'Le nom est requis',
        }));
        isValid = false;
      }
      if (!contact.relation.trim()) {
        setErrors((prev) => ({
          ...prev,
          [`emergencyContacts[${index}].relationship`]: 'La relation est requise',
        }));
        isValid = false;
      }
      if (!contact.telephone.trim() || !/^\d{2}\s?\d{2}\s?\d{2}\s?\d{2}\s?\d{2}$/.test(contact.telephone)) {
        setErrors((prev) => ({
          ...prev,
          [`emergencyContacts[${index}].phone`]: 'Format de téléphone invalide',
        }));
        isValid = false;
      }
    });

    // Soumettre les données si valides
    if (isValid) {
      try {
        const req = await fetch('https://project-clinique.vercel.app/api/create-patient', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            "Origin": "https://clinique-salem.vercel.app/"
          },
          body: JSON.stringify(formData),
        });

        const res = await req.json()
        console.log(res)
        if (res.message !== "ok") {
          throw new Error('Erreur lors de l\'enregistrement du patient');
        }

        // Réinitialisation des données et des erreurs après la soumission
        setFormData({
          id: uuidv4(),
          prenom: '',
          nom: '',
          birthDate: '',
          telephone: '',
          email: '',
          gender: '',
          emergencyContacts: [],
        });
        setErrors({});
        console.log('Patient enregistré avec succès');
      } catch (error) {
        console.error('Erreur de soumission:', error);
      }
    }
  };

  const hello = () =>{
    alert("cliqué")
  }

  return (
    <form onSubmit={(e) => handleSubmit(e)} className="bg-white rounded-xl shadow-lg p-6 space-y-6 w-full min-w-[320px] max-w-4xl mx-auto ">
      {/* Informations Personnelles */}
      <div className="space-y-4 pb-6">
        <h3 className="text-lg font-semibold text-gray-900">Informations Personnelles</h3>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-600">
              Nom <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="nom"
              name="nom"
              value={formData.nom}
              onChange={handleInputChange}
              className={`mt-1 block w-full rounded-lg border transition-all duration-300 p-1 ${
                errors.nom ? 'border-red-300' : 'border-blue-200'
              } shadow-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500`}
            />
            {errors.nom && <p className="mt-1 text-sm text-red-600">{errors.nom}</p>}
          </div>

          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-600">
              Prénom <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="prenom"
              name="prenom"
              value={formData.prenom}
              onChange={handleInputChange}
              className={`mt-1 block w-full rounded-md p-1 ${
                errors.prenom ? 'border-red-300' : 'border-gray-300'
              } shadow-sm focus:border-blue-500 focus:ring-blue-500`}
            />
            {errors.prenom && <p className="mt-1 text-sm text-red-600">{errors.prenom}</p>}
          </div>

          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`mt-1 block w-full rounded-md p-1 ${
                errors.eamil ? 'border-red-300' : 'border-gray-300'
              } shadow-sm focus:border-blue-500 focus:ring-blue-500`}
            />
            
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="birthDate" className="block text-sm font-medium text-gray-600">
                Date de Naissance <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                id="birthDate"
                name="birthDate"
                value={formData.birthDate}
                onChange={handleInputChange}
                className={`mt-1 block w-full rounded-md p-1 ${
                  errors.birthDate ? 'border-red-300' : 'border-gray-300'
                } shadow-sm focus:border-blue-500 focus:ring-blue-500`}
              />
              {errors.birthDate && <p className="mt-1 text-sm text-red-600">{errors.birthDate}</p>}
            </div>

            <div>
              <label htmlFor="gender" className="block text-sm font-medium text-gray-600">
                Sexe <span className="text-red-500">*</span>
              </label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className={`mt-1 block w-full rounded-md p-1 ${
                  errors.gender ? 'border-red-300' : 'border-gray-300'
                } shadow-sm focus:border-blue-500 focus:ring-blue-500`}
              >
                <option value="">Sélectionner...</option>
                <option value="male">Masculin</option>
                <option value="female">Féminin</option>
              </select>
              {errors.gender && <p className="mt-1 text-sm text-red-600">{errors.gender}</p>}
            </div>
          </div>
        </div>
      </div>

      {/* Contacts d'Urgence */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Contacts d&lsquo;Urgence</h3>
        {formData.emergencyContacts.map((contact, index) => (
          <div key={contact.id} className="bg-blue-50/30 p-4 rounded-xl space-y-3 border border-blue-100 shadow-sm hover:shadow-md transition-all duration-300 hover:bg-blue-50/50">
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Nom <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={contact.nom}
                onChange={(e) => handleEmergencyChange(index, 'nom', e.target.value)}
                className={`mt-1 block w-full rounded-md p-1 ${
                  errors[`emergencyContacts[${index}].name`] ? 'border-red-300' : 'border-gray-300'
                } shadow-sm focus:border-blue-500 focus:ring-blue-500`}
              />
              {errors[`emergencyContacts[${index}].name`] && (
                <p className="mt-1 text-sm text-red-600">{errors[`emergencyContacts[${index}].name`]}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600">
                Relation <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={contact.relation}
                onChange={(e) => handleEmergencyChange(index, 'relation', e.target.value)}
                className={`mt-1 block w-full rounded-md p-1 ${
                  errors[`emergencyContacts[${index}].relationship`] ? 'border-red-300' : 'border-gray-300'
                } shadow-sm focus:border-blue-500 focus:ring-blue-500`}
              />
              {errors[`emergencyContacts[${index}].relation`] && (
                <p className="mt-1 text-sm text-red-600">{errors[`emergencyContacts[${index}].relation`]}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600">
                Téléphone <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={contact.telephone}
                onChange={(e) => handleEmergencyChange(index, 'telephone', e.target.value)}
                placeholder="06 12 34 56 78"
                className={`mt-1 block w-full rounded-md p-1 ${
                  errors[`emergencyContacts[${index}].telephone`] ? 'border-red-300' : 'border-gray-300'
                } shadow-sm focus:border-blue-500 focus:ring-blue-500`}
              />
              {errors[`emergencyContacts[${index}].telephone`] && (
                <p className="mt-1 text-sm text-red-600">{errors[`emergencyContacts[${index}].telephone`]}</p>
              )}
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddEmergencyContact}
          className="w-full bg-blue-50 text-blue-800 hover:bg-blue-100 font-semibold py-3 px-6 rounded-md transition-colors duration-300 flex items-center justify-center gap-2 shadow-sm hover:shadow-md"
        >
          <FaPlusCircle />
          Ajouter un contact d&lsquo;urgence
        </button>
      </div>

      {/* Soumettre */}
      <div className="pt-6">
        <button onClick={hello}
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-md transition-colors duration-300 shadow-sm hover:shadow-md"
        >
          Enregistrer le Patient
        </button>
      </div>
    </form>
  );
}
