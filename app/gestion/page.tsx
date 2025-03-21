"use client"

import DashboardLayout from '@/app/components/dashboard/DashboardLayout';
import PatientForm from '@/app/components/patients/PatientForm';



export default function gestionnaire() {
  return (
    <DashboardLayout>
      <div className="flex flex-col space-y-8 flex-1 overflow-y-auto p-4">
        <PatientForm/>
      </div>
    </DashboardLayout>
  );
}
