'use client';

import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface Appointment {
  id: string;
  date: string;
  time: string;
  reason: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  notes?: string;
}

interface AppointmentFormProps {
  appointment?: Appointment;
  onSave: (appointment: Appointment) => void;
  onCancel: () => void;
}

export default function AppointmentForm({ appointment, onSave, onCancel }: AppointmentFormProps) {
  const [formData, setFormData] = useState<Appointment>({
    id: appointment?.id || uuidv4(),
    date: appointment?.date || new Date().toISOString().split('T')[0],
    time: appointment?.time || '09:00',
    reason: appointment?.reason || '',
    status: appointment?.status || 'scheduled',
    notes: appointment?.notes || ''
  });

  const [errors, setErrors] = useState<{
    date?: string;
    time?: string;
    reason?: string;
  }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validate = () => {
    const newErrors: {
      date?: string;
      time?: string;
      reason?: string;
    } = {};

    if (!formData.date) {
      newErrors.date = 'La date est requise';
    }

    if (!formData.time) {
      newErrors.time = 'L\'heure est requise';
    }

    if (!formData.reason.trim()) {
      newErrors.reason = 'Le motif est requis';
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
        {appointment ? 'Modifier le rendez-vous' : 'Nouveau rendez-vous'}
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-200">Date</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${errors.date ? 'border-red-300' : ''}`}
            />
            {errors.date && <p className="mt-1 text-sm text-red-600">{errors.date}</p>}
          </div>

          <div>
            <label htmlFor="time" className="block text-sm font-medium text-gray-700">Heure</label>
            <input
              type="time"
              id="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${errors.time ? 'border-red-300' : ''}`}
            />
            {errors.time && <p className="mt-1 text-sm text-red-600">{errors.time}</p>}
          </div>
        </div>

        <div>
          <label htmlFor="reason" className="block text-sm font-medium text-gray-700">Motif</label>
          <input
            type="text"
            id="reason"
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${errors.reason ? 'border-red-300' : ''}`}
          />
          {errors.reason && <p className="mt-1 text-sm text-red-600">{errors.reason}</p>}
        </div>

        {appointment && (
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700">Statut</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            >
              <option value="scheduled">Planifié</option>
              <option value="completed">Terminé</option>
              <option value="cancelled">Annulé</option>
            </select>
          </div>
        )}

        <div>
          <label htmlFor="notes" className="block text-sm font-medium text-gray-700">Notes</label>
          <textarea
            id="notes"
            name="notes"
            rows={3}
            value={formData.notes || ''}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
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