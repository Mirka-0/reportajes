import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HomeView from './components/HomeView';
import ReportFormView from './components/ReportFormView';
import MuroView from './components/MuroView';
import DetailView from './components/DetailView';
import SeguimientoView from './components/SeguimientoView';
import MejorasView from './components/MejorasView';
import SobreProyectoView from './components/SobreProyectoView';
import AdminView from './components/AdminView';
import { Report, Improvement } from './types';
import { INITIAL_REPORTS, INITIAL_IMPROVEMENTS } from './data';
import { GraduationCap, BookOpen, Heart, Building2, ExternalLink } from 'lucide-react';

export default function App() {
  const [reports, setReports] = useState<Report[]>([]);
  const [improvements, setImprovements] = useState<Improvement[]>([]);
  const [currentTab, setCurrentTab] = useState<string>('inicio');
  const [activeReportId, setActiveReportId] = useState<string | null>(null);

  // Load from LocalStorage or seed with INITIAL_REPORTS
  useEffect(() => {
    const savedReports = localStorage.getItem('rfa_reports');
    const savedImprovements = localStorage.getItem('rfa_improvements');

    if (savedReports) {
      setReports(JSON.parse(savedReports));
    } else {
      setReports(INITIAL_REPORTS);
      localStorage.setItem('rfa_reports', JSON.stringify(INITIAL_REPORTS));
    }

    if (savedImprovements) {
      setImprovements(JSON.parse(savedImprovements));
    } else {
      setImprovements(INITIAL_IMPROVEMENTS);
      localStorage.setItem('rfa_improvements', JSON.stringify(INITIAL_IMPROVEMENTS));
    }
  }, []);

  // Sync state helpers
  const handleAddReport = (newReport: Report) => {
    const updated = [newReport, ...reports];
    setReports(updated);
    localStorage.setItem('rfa_reports', JSON.stringify(updated));
  };

  const handleUpdateReport = (updatedReport: Report) => {
    const updated = reports.map((r) => (r.id === updatedReport.id ? updatedReport : r));
    setReports(updated);
    localStorage.setItem('rfa_reports', JSON.stringify(updated));

    // If the state was updated to "atendido" (Atendido), let's automatically generate an improvement card
    // if it doesn't already exist, so the user sees immediate feedback on the "Mejoras" tab!
    if (updatedReport.status === 'atendido') {
      const exists = improvements.some((imp) => imp.reportId === updatedReport.id);
      if (!exists) {
        const newImp: Improvement = {
          id: `IMP-000${improvements.length + 1}`,
          reportId: updatedReport.id,
          category: updatedReport.category,
          title: `Solución de riesgo en ${updatedReport.category.toLowerCase()}`,
          description: updatedReport.adminObservations || `Se realizaron los trabajos de refacción estructural requeridos en ${updatedReport.location} de manera satisfactoria, garantizando la seguridad escolar.`,
          beforeImg: updatedReport.evidenceUrl || 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=600',
          afterImg: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=600', // resolved / work in progress mockup
          date: new Date().toISOString().split('T')[0],
          status: 'completa'
        };
        const updatedImps = [newImp, ...improvements];
        setImprovements(updatedImps);
        localStorage.setItem('rfa_improvements', JSON.stringify(updatedImps));
      }
    }
  };

  // Helper to calculate the next RFA sequential ID
  const getNextReportId = () => {
    if (reports.length === 0) return 'RFA-0001';
    // extract numbers from IDs like RFA-0001
    const ids = reports.map((r) => {
      const parts = r.id.split('-');
      return parts.length > 1 ? parseInt(parts[1], 10) : 0;
    });
    const maxId = Math.max(...ids, 0);
    const nextNum = maxId + 1;
    return `RFA-${String(nextNum).padStart(4, '0')}`;
  };

  const handleGoToReport = (id: string) => {
    setActiveReportId(id);
    setCurrentTab('detail');
  };

  // Render the appropriate tab contents
  const renderTabContent = () => {
    // If activeReportId is selected, override tab component to show Detail
    if (activeReportId) {
      const selectedReport = reports.find((r) => r.id === activeReportId);
      if (selectedReport) {
        return (
          <DetailView
            report={selectedReport}
            onBack={() => {
              setActiveReportId(null);
              // Return to previous tab or default to 'muro'
              if (currentTab === 'detail') {
                setCurrentTab('muro');
              }
            }}
          />
        );
      }
    }

    switch (currentTab) {
      case 'inicio':
        return (
          <HomeView
            reports={reports}
            improvements={improvements}
            setCurrentTab={(tab) => {
              setCurrentTab(tab);
              setActiveReportId(null);
            }}
          />
        );
      case 'reportar':
        return (
          <ReportFormView
            onAddReport={handleAddReport}
            onGoToReport={handleGoToReport}
            nextReportId={getNextReportId()}
          />
        );
      case 'muro':
        return (
          <MuroView
            reports={reports}
            onViewDetail={(id) => handleGoToReport(id)}
          />
        );
      case 'seguimiento':
        return (
          <SeguimientoView
            reports={reports}
            onViewDetail={(id) => handleGoToReport(id)}
          />
        );
      case 'mejoras':
        return (
          <MejorasView
            improvements={improvements}
            onViewReport={(id) => handleGoToReport(id)}
          />
        );
      case 'sobre':
        return <SobreProyectoView />;
      case 'admin':
        return (
          <AdminView
            reports={reports}
            onUpdateReport={handleUpdateReport}
            onViewReportDetail={(id) => handleGoToReport(id)}
          />
        );
      default:
        return (
          <HomeView
            reports={reports}
            improvements={improvements}
            setCurrentTab={setCurrentTab}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between font-sans antialiased text-slate-800" id="main-app-shell">
      {/* Navigation Header */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        setActiveReportId={setActiveReportId}
      />

      {/* Main Responsive Body Canvas */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {renderTabContent()}
      </main>

      {/* Ethical Citizen Footer */}
      <footer className="bg-white border-t border-slate-200 py-10 px-4 sm:px-6 lg:px-8 text-center" id="main-app-footer">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* logo & mission brief */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-100 pb-6 text-left">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-[#FFE3E3] text-[#D45D5D] rounded-xl border border-[#FFC6C6] flex items-center justify-center">
                <GraduationCap className="w-4 h-4" />
              </div>
              <div>
                <span className="block font-sans font-black text-sm tracking-tight text-slate-900 uppercase leading-none">
                  Fe y Alegría <span className="text-[#D45D5D] font-extrabold">Reportes</span>
                </span>
                <span className="block font-mono text-[9px] uppercase font-black text-[#826A00] tracking-widest mt-1.5 leading-none bg-[#FFF9DB] px-1.5 py-0.5 rounded-md border border-[#FFEAA7]/60 inline-block">
                  ✦ Colegios Seguros ✦
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-400 max-w-md leading-relaxed sm:text-right">
              Espacio académico de reporte ciudadano responsable e infraestructura segura. Protegemos activamente la privacidad de menores e identidades de los denunciantes.
            </p>
          </div>

          {/* footer metadata */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
            <div>
              <span>© 2026 - Reportes Fe y Alegría. Todos los derechos reservados.</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
