'use client';

import React, { useState} from 'react';
import { v4 as uuidv4 } from 'uuid';

interface EmergencyContact {
  id: string;
  nom: string;
  relation: string;
  telephone: string;
  
}

interface EmergencyContactFormProps {
  contact?: EmergencyContact;
  onSave: (contact: EmergencyContact) => void;
  onCancel: () => void;
}

export default function EmergencyContactForm({ contact, onSave, onCancel }: EmergencyContactFormProps) {
  const [formData, setFormData] = useState<EmergencyContact>({
    id: contact?.id || uuidv4(),
    nom: contact?.nom || '',
    relation: contact?.relation || '',
    telephone: contact?.telephone || ''
  });

  const [errors, setErrors] = useState<{
    nom?: string;
    relation?: string;
    telephone?: string;
  }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validate = () => {
    const newErrors: {
      nom?: string;
      relation?: string;
      telephone?: string;
    } = {};

    if (!formData.nom.trim()) {
      newErrors.nom = 'Le nom est requis';
    }

    if (!formData.relation.trim()) {
      newErrors.relation = 'La relation est requise';
    }

    if (!formData.telephone.trim()) {
      newErrors.telephone = 'Le numéro de téléphone est requis';
    } else if (!/^\d{2}\s?\d{2}\s?\d{2}\s?\d{2}\s?\d{2}$/.test(formData.telephone.replace(/\s/g, ''))) {
      newErrors.telephone = 'Format de téléphone invalide (ex: 06 12 34 56 78)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSave(formData);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-medium text-gray-900 mb-4">
        {contact ? 'Modifier le contact' : 'Ajouter un contact d\'urgence'}
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="nom" className="block text-sm font-medium text-gray-700">Nom</label>
          <input
            type="text"
            id="nom"
            name="nom"
            value={formData.nom}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${errors.nom ? 'border-red-300' : ''}`}
          />
          {errors.nom && <p className="mt-1 text-sm text-red-600">{errors.nom}</p>}
        </div>

        <div>
          <label htmlFor="relation" className="block text-sm font-medium text-gray-700">Relation</label>
          <input
            type="text"
            id="relation"
            name="relation"
            value={formData.relation}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${errors.relation ? 'border-red-300' : ''}`}
          />
          {errors.relation && <p className="mt-1 text-sm text-red-600">{errors.relation}</p>}
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Téléphone</label>
          <input
            type="text"
            id="telephone"
            name="telephone"
            value={formData.telephone}
            onChange={handleChange}
            placeholder="06 12 34 56 78"
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${errors.telephone ? 'border-red-300' : ''}`}
          />
          {errors.telephone && <p className="mt-1 text-sm text-red-600">{errors.telephone}</p>}
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Annuler
          </button>
          <button
            type="submit"
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Enregistrer
          </button>
        </div>
      </form>
    </div>
  );
}