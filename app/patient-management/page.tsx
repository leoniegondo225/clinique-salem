"use client"

import DashboardLayout from '../components/dashboard/DashboardLayout';
import PatientList from '../components/patients/PatientList';
import PatientDetail from '../components/patients/PatientDetail';

export default function PatientManagementPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col space-y-8 flex-1 overflow-y-auto p-4">
        {/* Patient List Section */}
        <section>
          <PatientList />
        </section>

        {/* Patient Detail Section */}
        <section>
          <PatientDetail />
        </section>
      </div>
    </DashboardLayout>
  );
}