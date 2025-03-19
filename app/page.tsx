import DashboardLayout from './components/dashboard/DashboardLayout';
import PatientForm from './components/patients/PatientForm';

export default function Home() {
  return (
    <DashboardLayout>
      <div className="flex flex-col space-y-8 flex-1 overflow-y-auto p-4">
        <PatientForm/>
      </div>
    </DashboardLayout>
  );
}
