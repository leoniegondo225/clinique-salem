'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaUserMd, FaFlask, FaBars, FaTimes, FaHospital, FaAmbulance, FaUsers, FaPills, FaMoneyBillWave, FaShieldAlt, FaChartLine, FaBell, FaArchive, FaPlusCircle } from 'react-icons/fa';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [activeTab, setActiveTab] = useState<string>('welcome');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // Détecte si l'écran est de taille mobile
  useEffect(() => {
    const checkIfMobile = () => {
      const isNowMobile = window.innerWidth < 768;
      setIsMobile(isNowMobile);
      setSidebarOpen(prevState => isNowMobile ? false : prevState);
    };
    
    // Vérifier au chargement initial
    checkIfMobile();
    
    // Ajouter un écouteur d'événement pour les changements de taille
    // Nettoyer l'écouteur d'événement
    return () => {};
  }, []);

  // Fonction pour gérer la navigation
  const handleNavigation = (tab: string) => {
    setActiveTab(tab);
    if(isMobile) setSidebarOpen(false);
    console.log(`Navigation vers: ${tab}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex flex-col md:flex-row relative">
      {/* Mobile Header with hamburger menu */}
      <div className="md:hidden bg-gradient-to-r from-blue-600 to-green-600 p-4 flex justify-between items-center sticky top-0 z-50">
          <Link href="/" className="block">
          <h1 className="text-xl font-bold text-white tracking-wide">Gestion</h1>
          </Link>
        <button 
          onClick={() => setSidebarOpen(prev => !prev)}
          className="text-white p-2 rounded-md hover:bg-white/10"
        >
          {sidebarOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>
      
      {/* Sidebar - responsive */}
      <aside 
        className={`${isMobile ? (sidebarOpen ? 'translate-x-0' : '-translate-x-full') : 'translate-x-0'} 
          w-full md:w-60 lg:w-64 xl:w-72 bg-gradient-to-r from-blue-600 to-green-600 shadow-xl 
          fixed top-0 left-0 h-screen z-40 transition-transform duration-300 ease-in-out
          ${isMobile ? 'pt-16' : 'pt-0'} flex flex-col`}>
        <div className="p-4 md:p-6 border-b border-blue-500/30 hidden md:block">
          <Link href="/" className="block">
            <h1 className="text-xl md:text-2xl font-bold text-white tracking-wide hover:text-blue-100 transition-colors">Admin</h1>
          </Link>
        </div>
        <nav className="p-4 space-y-2 md:space-y-3 overflow-y-auto flex-grow">
          <Link 
            href="/"
            className={`w-full flex items-center px-4 py-3 rounded-lg text-sm font-medium ${activeTab === 'welcome' ? 'bg-white/20 text-white font-bold shadow-lg transform scale-102 transition-all' : 'text-white/90 hover:bg-white/10 hover:text-white hover:shadow-md transition-all'}`}
            onClick={() => handleNavigation('welcome')}
          >
            <FaPlusCircle className="w-4 h-4 md:w-5 md:h-5 mr-2 md:mr-3" />
            Ajouter un nouveau patient
          </Link>
          <Link 
            href="/patient-management"
            className={`w-full flex items-center px-4 py-3 rounded-lg text-sm font-medium ${activeTab === 'patient-management' ? 'bg-white/20 text-white font-bold shadow-lg transform scale-102 transition-all' : 'text-white/90 hover:bg-white/10 hover:text-white hover:shadow-md transition-all'}`}
            onClick={() => handleNavigation('patient-management')}
          >
            <FaUserMd className="w-4 h-4 md:w-5 md:h-5 mr-2 md:mr-3" />
            Gestion des patients
          </Link>
          <Link 
            href="/hos"
            className={`w-full flex items-center px-4 py-3 rounded-lg text-sm font-medium ${activeTab === 'admissions' ? 'bg-white/20 text-white font-bold shadow-lg transform scale-102 transition-all' : 'text-white/90 hover:bg-white/10 hover:text-white hover:shadow-md transition-all'}`}
            onClick={() => handleNavigation('admissions')}
          >
            <FaHospital className="w-4 h-4 md:w-5 md:h-5 mr-2 md:mr-3" />
            Admission et Hospitalisations
          </Link>
          <Link 
            href="/emergency"
            className={`w-full flex items-center px-4 py-3 rounded-lg text-sm font-medium ${activeTab === 'emergency' ? 'bg-white/20 text-white font-bold shadow-lg transform scale-102 transition-all' : 'text-white/90 hover:bg-white/10 hover:text-white hover:shadow-md transition-all'}`}
            onClick={() => handleNavigation('emergency')}
          >
            <FaAmbulance className="w-4 h-4 md:w-5 md:h-5 mr-2 md:mr-3" />
            Urgences
          </Link>
          <Link 
            href="/staff"
            className={`w-full flex items-center px-4 py-3 rounded-lg text-sm font-medium ${activeTab === 'staff' ? 'bg-white/20 text-white font-bold shadow-lg transform scale-102 transition-all' : 'text-white/90 hover:bg-white/10 hover:text-white hover:shadow-md transition-all'}`}
            onClick={() => handleNavigation('staff')}
          >
            <FaUsers className="w-4 h-4 md:w-5 md:h-5 mr-2 md:mr-3" />
            Gestion du Personnel
          </Link>
          <Link 
            href="/lab-exams"
            className={`w-full flex items-center px-4 py-3 rounded-lg text-sm font-medium ${activeTab === 'lab-exams' ? 'bg-white/20 text-white font-bold shadow-lg transform scale-102 transition-all' : 'text-white/90 hover:bg-white/10 hover:text-white hover:shadow-md transition-all'}`}
            onClick={() => handleNavigation('lab-exams')}
          >
            <FaFlask className="w-4 h-4 md:w-5 md:h-5 mr-2 md:mr-3" />
            Laboratoires et Examens Médicaux
          </Link>
          <Link 
            href="/pharmacy"
            className={`w-full flex items-center px-4 py-3 rounded-lg text-sm font-medium ${activeTab === 'pharmacy' ? 'bg-white/20 text-white font-bold shadow-lg transform scale-102 transition-all' : 'text-white/90 hover:bg-white/10 hover:text-white hover:shadow-md transition-all'}`}
            onClick={() => handleNavigation('pharmacy')}
          >
            <FaPills className="w-4 h-4 md:w-5 md:h-5 mr-2 md:mr-3" />
            Pharmacie et Stocks
          </Link>
          <Link 
            href="/billing"
            className={`w-full flex items-center px-4 py-3 rounded-lg text-sm font-medium ${activeTab === 'billing' ? 'bg-white/20 text-white font-bold shadow-lg transform scale-102 transition-all' : 'text-white/90 hover:bg-white/10 hover:text-white hover:shadow-md transition-all'}`}
            onClick={() => handleNavigation('billing')}
          >
            <FaMoneyBillWave className="w-4 h-4 md:w-5 md:h-5 mr-2 md:mr-3" />
            Facturation et Comptabilité
          </Link>
          <Link 
            href="/insurance"
            className={`w-full flex items-center px-4 py-3 rounded-lg text-sm font-medium ${activeTab === 'insurance' ? 'bg-white/20 text-white font-bold shadow-lg transform scale-102 transition-all' : 'text-white/90 hover:bg-white/10 hover:text-white hover:shadow-md transition-all'}`}
            onClick={() => handleNavigation('insurance')}
          >
            <FaShieldAlt className="w-4 h-4 md:w-5 md:h-5 mr-2 md:mr-3" />
            Assurance
          </Link>
          <Link 
            href="/reports"
            className={`w-full flex items-center px-4 py-3 rounded-lg text-sm font-medium ${activeTab === 'reports' ? 'bg-white/20 text-white font-bold shadow-lg transform scale-102 transition-all' : 'text-white/90 hover:bg-white/10 hover:text-white hover:shadow-md transition-all'}`}
            onClick={() => handleNavigation('reports')}
          >
            <FaChartLine className="w-4 h-4 md:w-5 md:h-5 mr-2 md:mr-3" />
            Rapports et Statistiques
          </Link>
          <Link 
            href="/notifications"
            className={`w-full flex items-center px-4 py-3 rounded-lg text-sm font-medium ${activeTab === 'notifications' ? 'bg-white/20 text-white font-bold shadow-lg transform scale-102 transition-all' : 'text-white/90 hover:bg-white/10 hover:text-white hover:shadow-md transition-all'}`}
            onClick={() => handleNavigation('notifications')}
          >
            <FaBell className="w-4 h-4 md:w-5 md:h-5 mr-2 md:mr-3" />
            Notifications
          </Link>
          <Link 
            href="/archive"
            className={`w-full flex items-center px-4 py-3 rounded-lg text-sm font-medium ${activeTab === 'archives' ? 'bg-white/20 text-white font-bold shadow-lg transform scale-102 transition-all' : 'text-white/90 hover:bg-white/10 hover:text-white hover:shadow-md transition-all'}`}
            onClick={() => handleNavigation('archives')}
          >
            <FaArchive className="w-4 h-4 md:w-5 md:h-5 mr-2 md:mr-3" />
            Archives
          </Link>
        </nav>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && isMobile && (
        <div 
          className="fixed inset-0 bg-black/50 z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-4 lg:p-6 xl:p-8 w-full md:ml-60 lg:ml-64 xl:ml-72 h-screen overflow-y-auto relative z-10">
        {children}
      </main>
    </div>
  );
}