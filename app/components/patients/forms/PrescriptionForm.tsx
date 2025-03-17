'use client';

import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface Prescription {
  id: string;
  medication: string;
  dosage: string;
  frequency: string;
  startDate: string;
  endDate?: string;
  prescribedBy: string;
}

interface PrescriptionFormProps {
  prescription?: Prescription;
  onSave: (prescription: Prescription) => void;
  onCancel: () => void;
}

export default function PrescriptionForm({ prescription, onSave, onCancel }: PrescriptionFormProps) {
  const [formData, setFormData] = useState<Prescription>({
    id: prescription?.id || uuidv4(),
    medication: prescription?.medication || '',
    dosage: prescription?.dosage || '',
    frequency: prescription?.frequency || '',
    startDate: prescription?.startDate || new Date().toISOString().split('T')[0],
    endDate: prescription?.endDate || '',
    prescribedBy: prescription?.prescribedBy || ''
  });

  const [errors, setErrors] = useState<{
    medication?: string;
    dosage?: string;
    frequency?: string;
    startDate?: string;
    prescribedBy?: string;
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
      medication?: string;
      dosage?: string;
      frequency?: string;
      startDate?: string;
      prescribedBy?: string;
    } = {};

    if (!formData.medication.trim()) {
      newErrors.medication = 'Le médicament est requis';
    }

    if (!formData.dosage.trim()) {
      newErrors.dosage = 'Le dosage est requis';
    }

    if (!formData.frequency.trim()) {
      newErrors.frequency = 'La fréquence est requise';
    }

    if (!formData.startDate) {
      newErrors.startDate = 'La date de début est requise';
    }

    if (!formData.prescribedBy.trim()) {
      newErrors.prescribedBy = 'Le nom du médecin prescripteur est requis';
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
        {prescription ? 'Modifier la prescription' : 'Nouvelle prescription'}
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="medication" className="block text-sm font-medium text-gray-700">Médicament</label>
          <input
            type="text"
            id="medication"
            name="medication"
            value={formData.medication}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${errors.medication ? 'border-red-300' : ''}`}
          />
          {errors.medication && <p className="mt-1 text-sm text-red-600">{errors.medication}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="dosage" className="block text-sm font-medium text-gray-700">Dosage</label>
            <input
              type="text"
              id="dosage"
              name="dosage"
              value={formData.dosage}
              onChange={handleChange}
              placeholder="Ex: 500mg"
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${errors.dosage ? 'border-red-300' : ''}`}
            />
            {errors.dosage && <p className="mt-1 text-sm text-red-600">{errors.dosage}</p>}
          </div>

          <div>
            <label htmlFor="frequency" className="block text-sm font-medium text-gray-700">Fréquence</label>
            <input
              type="text"
              id="frequency"
              name="frequency"
              value={formData.frequency}
              onChange={handleChange}
              placeholder="Ex: 2 fois par jour"
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${errors.frequency ? 'border-red-300' : ''}`}
            />
            {errors.frequency && <p className="mt-1 text-sm text-red-600">{errors.frequency}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">Date de début</label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${errors.startDate ? 'border-red-300' : ''}`}
            />
            {errors.startDate && <p className="mt-1 text-sm text-red-600">{errors.startDate}</p>}
          </div>

          <div>
            <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">Date de fin (optionnelle)</label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              value={formData.endDate || ''}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>
        </div>

        <div>
          <label htmlFor="prescribedBy" className="block text-sm font-medium text-gray-700">Prescrit par</label>
          <input
            type="text"
            id="prescribedBy"
            name="prescribedBy"
            value={formData.prescribedBy}
            onChange={handleChange}
            placeholder="Ex: Dr. Martin"
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${errors.prescribedBy ? 'border-red-300' : ''}`}
          />
          {errors.prescribedBy && <p className="mt-1 text-sm text-red-600">{errors.prescribedBy}</p>}
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