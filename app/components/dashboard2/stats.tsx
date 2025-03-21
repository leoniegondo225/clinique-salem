"use client";

import { Users, BedDouble, UserCog, ClipboardCheck } from "lucide-react";

export function DashboardStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 pt-5">
      {/* Card: Patients Admis */}
      <div className="overflow-hidden border rounded-lg transition-all hover:shadow-lg bg-white">
        <div className="flex flex-row items-center justify-between space-y-0 pb-2 px-4 pt-4">
          <div className="text-sm font-medium text-gray-600">Patients Admis</div>
          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
            <Users className="h-4 w-4 text-primary" />
          </div>
        </div>
        <div className="p-4">
          <div className="text-2xl font-semibold">24</div>
          <div className="flex items-center mt-1">
            <div className="h-2 w-2 rounded-full bg-emerald-500 mr-2" />
            <p className="text-sm text-gray-500">+2 depuis hier</p>
          </div>
        </div>
      </div>

      {/* Card: Lits Disponibles */}
      <div className="overflow-hidden border rounded-lg transition-all hover:shadow-lg bg-white">
        <div className="flex flex-row items-center justify-between space-y-0 pb-2 px-4 pt-4">
          <div className="text-sm font-medium text-gray-600">Lits Disponibles</div>
          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
            <BedDouble className="h-4 w-4 text-primary" />
          </div>
        </div>
        <div className="p-4">
          <div className="text-2xl font-semibold">12</div>
          <div className="flex items-center mt-1">
            <div className="h-2 w-2 rounded-full bg-amber-500 mr-2" />
            <p className="text-sm text-gray-500">sur 36 lits</p>
          </div>
        </div>
      </div>

      {/* Card: Médecins de Garde */}
      <div className="overflow-hidden border rounded-lg transition-all hover:shadow-lg bg-white">
        <div className="flex flex-row items-center justify-between space-y-0 pb-2 px-4 pt-4">
          <div className="text-sm font-medium text-gray-600">Médecins de Garde</div>
          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
            <UserCog className="h-4 w-4 text-primary" />
          </div>
        </div>
        <div className="p-4">
          <div className="text-2xl font-semibold">8</div>
          <div className="flex items-center mt-1">
            <div className="h-2 w-2 rounded-full bg-blue-500 mr-2" />
            <p className="text-sm text-gray-500">en service</p>
          </div>
        </div>
      </div>

      {/* Card: Soins Programmés */}
      <div className="overflow-hidden border rounded-lg transition-all hover:shadow-lg bg-white">
        <div className="flex flex-row items-center justify-between space-y-0 pb-2 px-4 pt-4">
          <div className="text-sm font-medium text-gray-600">Soins Programmés</div>
          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
            <ClipboardCheck className="h-4 w-4 text-primary" />
          </div>
        </div>
        <div className="p-4">
          <div className="text-2xl font-semibold">18</div>
          <div className="flex items-center mt-1">
            <div className="h-2 w-2 rounded-full bg-violet-500 mr-2" />
            <p className="text-sm text-gray-500">pour aujourd'hui</p>
          </div>
        </div>
      </div>
    </div>
  );
}
