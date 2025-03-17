import DashboardLayout from '../components/dashboard/DashboardLayout';

export default function Home() {
  return (
    <DashboardLayout>
      <div className="flex flex-col space-y-8 flex-1 overflow-y-auto p-4">
        {/* En-tête du tableau de bord */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Tableau de bord</h1>
          <p className="text-gray-600">Bienvenue dans votre système de gestion des patients</p>
        </div>
        

      </div>
    </DashboardLayout>
  );
}