'use client';

import React, { useState } from 'react';
import EmergencyContactForm from './forms/EmergencyContactForm';
import AppointmentForm from './forms/AppointmentForm';
import PrescriptionForm from './forms/PrescriptionForm';

// Définir des interfaces pour les données des patients
interface EmergencyContact {
  id: string;
  nom: string;
  relation: string;
  telephone: string;
}

interface Appointment {
  id: string;
  date: string;
  time: string;
  reason: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  notes?: string;
}

interface Prescription {
  id: string;
  medication: string;
  dosage: string;
  frequency: string;
  startDate: string;
  endDate?: string;
  prescribedBy: string;
}

interface MedicalRecord {
  id: string;
  date: string;
  type: string;
  description: string;
  attachmentUrl?: string;
  doctor: string;
}

interface PatientDetails {
  id: string;
  nom: string;
  age: number;
  birthDate: string;
  gender: string;
  address: string;
  contact: string;
  email: string;
  bloodType?: string;
  allergies: string[];
  chronicConditions: string[];
  medicalHistory: string[];
  emergencyContacts: EmergencyContact[];
  appointments: Appointment[];
  prescriptions: Prescription[];
  medicalRecords: MedicalRecord[];
}

// Sample data for demonstration
const samplePatientDetails: PatientDetails = {
  "id": "1",
  "nom": "Koffi Kouadio",
  "age": 45,
  "birthDate": "1978-05-12",
  "gender": "Homme",
  "address": "Quartier Comoe, Abidjan, Côte d'Ivoire",
  "contact": "+225 01 23 45 67 89",
  "email": "koffi.kouadio@email.com",
  "bloodType": "A+",
  "allergies": ["Pénicilline", "Arachides"],
  "chronicConditions": ["Hypertension", "Diabète type 2"],
  medicalHistory: ['Appendicectomie (2010)', 'Fracture du bras (2015)'],
  emergencyContacts: [
    {
      id: 'ec1',
      nom: 'Marie Dupont',
      relation: 'Épouse',
      telephone: '06 87 65 43 21',
    },
    {
      id: 'ec2',
      nom: 'Thomas Dupont',
      relation: 'Fils',
      telephone: '06 54 32 10 98',
    },
  ],
  appointments: [
    {
      id: 'app1',
      date: '2023-11-15',
      time: '14:30',
      reason: 'Contrôle annuel',
      status: 'completed',
      notes: 'Tension artérielle stable. Continuer le traitement actuel.',
    },
    {
      id: 'app2',
      date: '2024-01-20',
      time: '10:00',
      reason: 'Suivi diabète',
      status: 'scheduled',
    },
  ],
  prescriptions: [
    {
      id: 'pres1',
      medication: 'Metformine',
      dosage: '500mg',
      frequency: '2 fois par jour',
      startDate: '2023-11-15',
      prescribedBy: 'Dr. Martin',
    },
    {
      id: 'pres2',
      medication: 'Lisinopril',
      dosage: '10mg',
      frequency: '1 fois par jour',
      startDate: '2023-11-15',
      prescribedBy: 'Dr. Martin',
    },
  ],
  medicalRecords: [
    {
      id: 'rec1',
      date: '2023-11-15',
      type: 'Analyse de sang',
      description: 'Glycémie à jeun, HbA1c, profil lipidique',
      doctor: 'Dr. Martin',
    },
    {
      id: 'rec2',
      date: '2023-09-05',
      type: 'Radiographie',
      description: 'Radiographie du thorax',
      doctor: 'Dr. Petit',
    },
  ],
};

// Tabs for different sections of patient information
type TabType = 'info' | 'contacts' | 'appointments' | 'prescriptions' | 'records';

export default function PatientDetail() {
  const [patient, setPatient] = useState<PatientDetails>(samplePatientDetails);
  const [activeTab, setActiveTab] = useState<TabType>('info');
  const [isEditing, setIsEditing] = useState(false);
  const [showForm, setShowForm] = useState<{
    type: 'contact' | 'appointment' | 'prescription' | null;
    data?: EmergencyContact | Appointment | Prescription;
  }>({ type: null });

  // Function to handle tab switching
  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    setIsEditing(false);
  };

  const handleSaveContact = (contact: EmergencyContact) => {
    if (showForm.data) {
      // Modification d'un contact existant
      const updatedContacts = patient.emergencyContacts.map(c =>
        c.id === contact.id ? contact : c
      );
      setPatient({ ...patient, emergencyContacts: updatedContacts });
    } else {
      // Ajout d'un nouveau contact
      setPatient({
        ...patient,
        emergencyContacts: [...patient.emergencyContacts, contact]
      });
    }
    setShowForm({ type: null });
  };

  const handleSaveAppointment = (appointment: Appointment) => {
    if (showForm.data) {
      // Modification d'un rendez-vous existant
      const updatedAppointments = patient.appointments.map(a =>
        a.id === appointment.id ? appointment : a
      );
      setPatient({ ...patient, appointments: updatedAppointments });
    } else {
      // Ajout d'un nouveau rendez-vous
      setPatient({
        ...patient,
        appointments: [...patient.appointments, appointment]
      });
    }
    setShowForm({ type: null });
  };

  const handleSavePrescription = (prescription: Prescription) => {
    if (showForm.data) {
      // Modification d'une prescription existante
      const updatedPrescriptions = patient.prescriptions.map(p =>
        p.id === prescription.id ? prescription : p
      );
      setPatient({ ...patient, prescriptions: updatedPrescriptions });
    } else {
      // Ajout d'une nouvelle prescription
      setPatient({
        ...patient,
        prescriptions: [...patient.prescriptions, prescription]
      });
    }
    setShowForm({ type: null });
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {showForm.type === 'contact' && (
        <div className="fixed inset-0 bg-gray-50 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="max-w-sm sm:max-w-md w-full">
            <EmergencyContactForm
              contact={showForm.type === 'contact' ? (showForm.data as EmergencyContact) : undefined}
              onSave={handleSaveContact}
              onCancel={() => setShowForm({ type: null })}
            />
          </div>
        </div>
      )}

      {showForm.type === 'appointment' && (
        <div className="fixed inset-0 bg-gray-50 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="max-w-sm sm:max-w-md w-full">
            <AppointmentForm
              appointment={showForm.type === 'appointment' ? (showForm.data as Appointment) : undefined}
              onSave={handleSaveAppointment}
              onCancel={() => setShowForm({ type: null })}
            />
          </div>
        </div>
      )}

      {showForm.type === 'prescription' && (
        <div className="fixed inset-0 bg-gray-50 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="max-w-sm sm:max-w-md w-full">
            <PrescriptionForm
              prescription={showForm.type === 'prescription' ? (showForm.data as Prescription) : undefined}
              onSave={handleSavePrescription}
              onCancel={() => setShowForm({ type: null })}
            />
          </div>
        </div>
      )}
      {/* Patient header with basic info */}
      <div className="p-6 bg-gradient-to-r from-blue-500 to-green-500 text-white">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold">{patient.nom}</h2>
            <div className="mt-2 flex flex-wrap sm:flex-nowrap gap-2 sm:gap-4 text-sm">
              <span>{patient.age} ans</span>
              <span>{patient.gender}</span>
              <span>Groupe sanguin: {patient.bloodType || 'Non spécifié'}</span>
            </div>
          </div>
          <button 
            className="px-4 py-2 bg-white text-blue-600 rounded-md hover:bg-blue-50 transition-colors"
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? 'Annuler' : 'Modifier'}
          </button>
        </div>
      </div>

      {/* Navigation tabs */}
      <div className="border-b border-gray-200 overflow-x-auto">
        <nav className="flex -mb-px min-w-max md:justify-center">
          <button
            className={`py-3 sm:py-4 px-3 sm:px-6 text-center border-b-2 font-medium text-xs sm:text-sm ${activeTab === 'info' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
            onClick={() => handleTabChange('info')}
          >
            Informations personnelles
          </button>
          <button
            className={`py-3 sm:py-4 px-3 sm:px-6 text-center border-b-2 font-medium text-xs sm:text-sm ${activeTab === 'contacts' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
            onClick={() => handleTabChange('contacts')}
          >
            Contacts d&lsquo;urgence
          </button>
          <button
            className={`py-3 sm:py-4 px-3 sm:px-6 text-center border-b-2 font-medium text-xs sm:text-sm ${activeTab === 'appointments' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
            onClick={() => handleTabChange('appointments')}
          >
            Rendez-vous
          </button>
          <button
            className={`py-3 sm:py-4 px-3 sm:px-6 text-center border-b-2 font-medium text-xs sm:text-sm ${activeTab === 'prescriptions' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
            onClick={() => handleTabChange('prescriptions')}
          >
            Prescriptions
          </button>
          <button
            className={`py-3 sm:py-4 px-3 sm:px-6 text-center border-b-2 font-medium text-xs sm:text-sm ${activeTab === 'records' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
            onClick={() => handleTabChange('records')}
          >
            Dossier médical
          </button>
        </nav>
      </div>

      {/* Content based on active tab */}
      <div className="p-4 md:p-6">
        {/* Personal Information Tab */}
        {activeTab === 'info' && (
          <div className="space-y-4 sm:space-y-5 md:space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Coordonnées</h3>
                <div className="space-y-2 sm:space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Adresse</label>
                    <div className="mt-1 text-sm text-gray-900">{patient.address}</div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Téléphone</label>
                    <div className="mt-1 text-sm text-gray-900">{patient.contact}</div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <div className="mt-1 text-sm text-gray-900">{patient.email}</div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Informations médicales</h3>
                <div className="space-y-2 sm:space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Allergies</label>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {patient.allergies.length > 0 ? (
                        patient.allergies.map((allergy, index) => (
                          <span 
                            key={index} 
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800"
                          >
                            {allergy}
                          </span>
                        ))
                      ) : (
                        <span className="text-sm text-gray-500">Aucune allergie connue</span>
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Maladies chroniques</label>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {patient.chronicConditions.length > 0 ? (
                        patient.chronicConditions.map((condition, index) => (
                          <span 
                            key={index} 
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800"
                          >
                            {condition}
                          </span>
                        ))
                      ) : (
                        <span className="text-sm text-gray-500">Aucune maladie chronique</span>
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Antécédents médicaux</label>
                    <div className="mt-1">
                      {patient.medicalHistory.length > 0 ? (
                        <ul className="list-disc pl-5 text-sm text-gray-900">
                          {patient.medicalHistory.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      ) : (
                        <span className="text-sm text-gray-500">Aucun antécédent médical</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Emergency Contacts Tab */}
        {activeTab === 'contacts' && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Contacts d&lsquo;urgence</h3>
              {!isEditing && (
                <button 
                  className="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 text-sm"
                  onClick={() => setShowForm({ type: 'contact' })}
                >
                  + Ajouter un contact
                </button>
              )}
            </div>
            
            {patient.emergencyContacts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-5">
                {patient.emergencyContacts.map((contact) => (
                  <div key={contact.id} className="border rounded-lg p-4 bg-gray-50">
                    <div className="font-medium">{contact.nom}</div>
                    <div className="text-sm text-gray-600 mt-1">{contact.relation}</div>
                    <div className="text-sm text-gray-600 mt-1">{contact.telephone}</div>
                    {isEditing && (
                        <div className="mt-3 flex space-x-2">
                        <button 
                          className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded"
                          onClick={() => setShowForm({ type: 'contact', data: contact })}
                        >
                          Modifier
                        </button>
                        <button 
                          className="px-2 py-1 text-xs bg-red-100 text-red-700 rounded"
                          onClick={() => {
                            console.log(`Suppression du contact: ${contact.id}`);
                            // Ici, vous pourriez afficher une confirmation avant de supprimer
                            const updatedContacts = patient.emergencyContacts.filter(c => c.id !== contact.id);
                            setPatient({...patient, emergencyContacts: updatedContacts});
                          }}
                        >
                          Supprimer
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">Aucun contact d&lsquo;urgence enregistré</p>
            )}
          </div>
        )}

        {/* Appointments Tab */}
        {activeTab === 'appointments' && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Rendez-vous</h3>
              <button 
                className="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 text-sm"
                onClick={() => setShowForm({ type: 'appointment' })}
              >
                + Nouveau rendez-vous
              </button>
            </div>
            
            {patient.appointments.length > 0 ? (
              <div className="space-y-3 sm:space-y-4">
                {patient.appointments.map((appointment) => (
                  <div key={appointment.id} className="border rounded-lg p-4 bg-gray-50">
                    <div className="flex justify-between">
                      <div>
                        <div className="font-medium">{appointment.reason}</div>
                        <div className="text-sm text-gray-600 mt-1">
                          {new Date(appointment.date).toLocaleDateString('fr-FR')} à {appointment.time}
                        </div>
                      </div>
                      <div>
                        <span 
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            appointment.status === 'completed' ? 'bg-green-100 text-green-800' :
                            appointment.status === 'scheduled' ? 'bg-blue-100 text-blue-800' :
                            'bg-red-100 text-red-800'
                          }`}
                        >
                          {appointment.status === 'completed' ? 'Terminé' :
                           appointment.status === 'scheduled' ? 'Planifié' :
                           'Annulé'}
                        </span>
                      </div>
                    </div>
                    {appointment.notes && (
                      <div className="mt-2 text-xs sm:text-sm text-gray-700 bg-white p-2 rounded border border-gray-200">
                        {appointment.notes}
                      </div>
                    )}
                    {isEditing && (
                        <div className="mt-3 flex space-x-2">
                        <button 
                          className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded"
                          onClick={() => setShowForm({ type: 'appointment', data: appointment })}
                        >
                          Modifier
                        </button>
                        <button 
                          className="px-2 py-1 text-xs bg-red-100 text-red-700 rounded"
                          onClick={() => {
                            console.log(`Annulation du rendez-vous: ${appointment.id}`);
                            // Ici, vous pourriez afficher une confirmation avant d'annuler
                            const updatedAppointments = patient.appointments.map(a => 
                              a.id === appointment.id ? {...a, status: 'cancelled' as const} : a
                            );
                            setPatient({...patient, appointments: updatedAppointments});
                          }}
                        >
                          Annuler RDV
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">Aucun rendez-vous planifié</p>
            )}
          </div>
        )}

        {/* Prescriptions Tab */}
        {activeTab === 'prescriptions' && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Prescriptions</h3>
              <button 
                className="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 text-sm"
                onClick={() => setShowForm({ type: 'prescription' })}
              >
                + Nouvelle prescription
              </button>
            </div>
            
            {patient.prescriptions.length > 0 ? (
              <div className="space-y-3 sm:space-y-4">
                {patient.prescriptions.map((prescription) => (
                  <div key={prescription.id} className="border rounded-lg p-4 bg-gray-50">
                    <div className="font-medium">{prescription.medication}</div>
                    <div className="text-sm text-gray-600 mt-1">
                      {prescription.dosage} - {prescription.frequency}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      Début: {new Date(prescription.startDate).toLocaleDateString('fr-FR')}
                      {prescription.endDate && ` - Fin: ${new Date(prescription.endDate).toLocaleDateString('fr-FR')}`}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      Prescrit par: {prescription.prescribedBy}
                    </div>
                    {isEditing && (
                      <div className="mt-3 flex space-x-2">
                        <button 
                          className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded"
                          onClick={() => setShowForm({ type: 'prescription', data: prescription })}
                        >
                          Modifier
                        </button>
                        <button 
                          className="px-2 py-1 text-xs bg-red-100 text-red-700 rounded"
                          onClick={() => {
                            console.log(`Suppression de la prescription: ${prescription.id}`);
                            // Ici, vous pourriez afficher une confirmation avant de supprimer
                            const updatedPrescriptions = patient.prescriptions.filter(p => p.id !== prescription.id);
                            setPatient({...patient, prescriptions: updatedPrescriptions});
                          }}
                        >
                          Supprimer
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">Aucune prescription active</p>
            )}
          </div>
        )}

        {/* Medical Records Tab */}
        {activeTab === 'records' && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Dossier médical</h3>
              <button 
                className="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 text-sm"
                onClick={() => {
                  console.log('Ajout d\'un nouveau document médical');
                  // Ici, vous pourriez ouvrir un formulaire d'ajout
                  setIsEditing(true);
                }}
              >
                + Ajouter un document
              </button>
            </div>
            
            {patient.medicalRecords.length > 0 ? (
              <div className="space-y-3 sm:space-y-4">
                {patient.medicalRecords.map((record) => (
                  <div key={record.id} className="border rounded-lg p-4 bg-gray-50">
                    <div className="font-medium">{record.type}</div>
                    <div className="text-sm text-gray-600 mt-1">
                      Date: {new Date(record.date).toLocaleDateString('fr-FR')}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      {record.description}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      Médecin: {record.doctor}
                    </div>
                    {record.attachmentUrl && (
                      <div className="mt-2">
                        <a 
                          href={record.attachmentUrl} 
                          className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
                          onClick={(e) => {
                            // Empêcher la navigation par défaut si l'URL n'est pas valide
                            if (record.attachmentUrl === '#') {
                              e.preventDefault();
                              console.log(`Téléchargement du document: ${record.id}`);
                              // Ici, vous pourriez implémenter la logique de téléchargement
                            }
                          }}
                        >
                          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                          Télécharger le document
                        </a>
                      </div>
                    )}
                    {isEditing && (
                      <div className="mt-3 flex space-x-2">
                        <button 
                          className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded"
                          onClick={() => {
                            console.log(`Modification du document médical: ${record.id}`);
                            // Ici, vous pourriez ouvrir un formulaire d'édition pour ce document
                          }}
                        >
                          Modifier
                        </button>
                        <button 
                          className="px-2 py-1 text-xs bg-red-100 text-red-700 rounded"
                          onClick={() => {
                            console.log(`Suppression du document médical: ${record.id}`);
                            // Ici, vous pourriez afficher une confirmation avant de supprimer
                            const updatedRecords = patient.medicalRecords.filter(r => r.id !== record.id);
                            setPatient({...patient, medicalRecords: updatedRecords});
                          }}
                        >
                          Supprimer
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">Aucun document médical</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
