"use client"

import { DashboardStats } from "../components/dashboard2/stats";
import { DashboardHeader } from "../components/dashboard2/header";
import { QuickActions } from "../components/dashboard2/quick-actions";
import { RecentAdmissions } from "../components/dashboard2/recent-admissions";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <DashboardHeader/>
      <div className="container mx-auto px-4 py-8 space-y-8">
        <div className="flex items-center justify-between">
          <QuickActions />
        </div>

        <div className="container mx-auto">
          <div className="flex items-center justify-center">
            <h1 className="text-4xl font-medium text-foreground text-center">
            Gestion des <span className="text-blue-400">hospitalisations</span>
            </h1>
          </div>

          <p className="flex items-center justify-center mt-4 txest-gray-400">Système intégré de suivi des patients et de gestion des admissions hospitalières</p>
        </div>

        <DashboardStats/>
        <RecentAdmissions />
      </div>
    </main>
  );
}