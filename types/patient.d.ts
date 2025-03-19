export interface Patient {
  id: string;
  nom: string;
  prenom: string;
  birthDate: string;
  telephone: string;
  email: string;
  gender: string;
  emergencyContacts: EmergencyContact[];
}

export interface EmergencyContact {
  id: string;
  nom: string;
  relation: string;
  telephone: string;
}