import React, { useState } from 'react';
import { 
  Lock, 
  LogOut, 
  LayoutDashboard, 
  ShieldCheck, 
  AlertOctagon, 
  RefreshCw, 
  Eye, 
  Edit, 
  CheckCircle2, 
  AlertTriangle, 
  FileText, 
  Globe, 
  ExternalLink, 
  ShieldAlert,
  Search,
  Filter,
  Image as ImageIcon
} from 'lucide-react';
import { Report, Severity, Status } from '../types';

interface AdminViewProps {
  reports: Report[];
  onUpdateReport: (updated: Report) => void;
  onViewReportDetail: (id: string) => void;
}

export default function AdminView({ reports, onUpdateReport, onViewReportDetail }: AdminViewProps) {
  // Login State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Selected report for review and moderation
  const [editingReport, setEditingReport] = useState<Report | null>(null);

  // Moderation form states
  const [modObservation, setModObservation] = useState('');
  const [modAuthority, setModAuthority] = useState('Dirección del colegio');
  const [modSeverity, setModSeverity] = useState<Severity>('medio');
  const [modStatus, setModStatus] = useState<Status>('publicado');
  const [modNoPersonalData, setModNoPersonalData] = useState(false);
  const [modActionRequested, setModActionRequested] = useState('');
  const [modError, setModError] = useState('');

  // Search and Filter states inside Admin Panel
  const [adminSearch, setAdminSearch] = useState('');
  const [adminCategory, setAdminCategory] = useState('Todas');
  const [adminSeverity, setAdminSeverity] = useState('Todas');
  const [adminStatus, setAdminStatus] = useState('Todas');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === 'admin@reportes.edu' && password === 'admin123') {
      setIsAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('Usuario o contraseña de administración incorrectos.');
    }
  };

  const handleStartModeration = (report: Report) => {
    setEditingReport(report);
    setModObservation(report.adminObservations || '');
    setModAuthority(report.derivedAuthority || 'Dirección del colegio');
    setModSeverity(report.severity);
    setModStatus(report.status);
    setModNoPersonalData(report.noPersonalDataChecked || false);
    setModActionRequested(report.actionRequested || `Se solicita evaluación técnica formal para mitigar riesgo de ${report.category.toLowerCase()} en ${report.location}.`);
    setModError('');
  };

  const handleSaveModeration = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingReport) return;

    if (modStatus === 'publicado' && !modNoPersonalData) {
      setModError('⚠️ Para publicar un caso de forma anónima, debes auditar y marcar obligatoriamente el checkbox de "No contiene datos personales visibles".');
      return;
    }

    const updatedReport: Report = {
      ...editingReport,
      severity: modSeverity,
      status: modStatus,
      adminObservations: modObservation,
      derivedAuthority: modStatus === 'derivado' || modStatus === 'atendido' ? modAuthority : editingReport.derivedAuthority,
      noPersonalDataChecked: modNoPersonalData,
      actionRequested: modActionRequested
    };

    onUpdateReport(updatedReport);
    setEditingReport(null);
  };

  // Dashboard calculations
  const total = reports.length;
  const critical = reports.filter((r) => r.severity === 'critico').length;
  const pending = reports.filter((r) => r.status === 'recibido' || r.status === 'revision').length;
  const published = reports.filter((r) => r.status === 'publicado').length;
  const derived = reports.filter((r) => r.status === 'derivado').length;
  const solved = reports.filter((r) => r.status === 'atendido').length;

  const getStatusStyle = (status: Status) => {
    switch (status) {
      case 'recibido': return 'bg-slate-100 text-slate-800 border-slate-200';
      case 'revision': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'publicado': return 'bg-[#FFE3E3] text-[#D45D5D] border border-[#FFC6C6]/40';
      case 'derivado': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'atendido': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  const getStatusLabel = (status: Status) => {
    switch (status) {
      case 'recibido': return 'Recibido';
      case 'revision': return 'En Revisión';
      case 'publicado': return 'Publicado';
      case 'derivado': return 'Derivado';
      case 'atendido': return 'Atendido';
      default: return status;
    }
  };

  const getSeverityStyle = (sev: Severity) => {
    switch (sev) {
      case 'critico': return 'bg-[#FFE3E3] text-[#D45D5D] border border-[#FFC6C6]/40';
      case 'alto': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'medio': return 'bg-yellow-50 text-yellow-800 border-yellow-200';
      case 'bajo': return 'bg-blue-50 text-blue-700 border-blue-200';
      default: return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  // Apply search and filter logic for admin list
  const filteredReports = reports.filter((r) => {
    const matchesSearch =
      r.id.toLowerCase().includes(adminSearch.toLowerCase()) ||
      r.description.toLowerCase().includes(adminSearch.toLowerCase()) ||
      r.location.toLowerCase().includes(adminSearch.toLowerCase()) ||
      r.dniFull.includes(adminSearch);

    const matchesCategory = adminCategory === 'Todas' || r.category === adminCategory;
    const matchesSeverity = adminSeverity === 'Todas' || r.severity === adminSeverity;
    const matchesStatus = adminStatus === 'Todas' || r.status === adminStatus;

    return matchesSearch && matchesCategory && matchesSeverity && matchesStatus;
  });

  const categoriesList = ['Todas', ...Array.from(new Set(reports.map(r => r.category)))];

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto py-12 px-4" id="admin-login-screen">
        <div className="bg-white p-8 rounded-3xl border border-slate-150 shadow-md space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-slate-100 text-slate-700 rounded-full border border-slate-200 flex items-center justify-center mx-auto shadow-xs">
              <Lock className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-sans font-black text-slate-900">Acceso Administrativo</h2>
            <p className="text-xs text-slate-500">
              Inicia sesión para auditar la privacidad de los reportes y gestionar las derivaciones institucionales.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1">
              <label htmlFor="admin-email" className="block text-xs font-bold text-slate-600">Usuario académico</label>
              <input
                type="email"
                id="admin-email"
                placeholder="ejemplo@correo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#FFE3E3]"
                required
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="admin-password" className="block text-xs font-bold text-slate-600">Contraseña académica</label>
              <input
                type="password"
                id="admin-password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#FFE3E3]"
                required
              />
            </div>

            {loginError && (
              <p className="text-xs text-[#D45D5D] font-bold bg-[#FFE3E3]/40 p-2.5 rounded-lg border border-[#FFC6C6]">
                {loginError}
              </p>
            )}

            <button
              type="submit"
              id="admin-submit-btn"
              className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-sm transition-all shadow-xs cursor-pointer"
            >
              Iniciar Sesión
            </button>
          </form>

          {/* Footer removed for production readiness */}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10 py-8" id="admin-panel-dashboard">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <span className="text-xs text-emerald-600 font-sans font-black uppercase tracking-wider block">
            Panel de Control
          </span>
          <h1 className="text-3xl font-sans font-black text-slate-900">Moderación y Gestión de Alertas</h1>
          <p className="text-sm text-slate-500">Sesión activa como: <code className="font-mono text-xs text-[#D45D5D] font-bold bg-[#FFE3E3] border border-[#FFC6C6]/40 px-1.5 py-0.5 rounded">admin@reportes.edu</code></p>
        </div>

        <button
          id="admin-logout-btn"
          onClick={() => setIsAuthenticated(false)}
          className="self-start px-4 py-2 bg-[#FFE3E3] hover:bg-[#FFD1D1] text-[#5C2121] font-bold border border-[#FFC6C6] rounded-xl text-xs transition-all inline-flex items-center space-x-1.5 cursor-pointer"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Cerrar Panel</span>
        </button>
      </div>

      {/* Dashboard Stats row */}
      <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4" id="admin-stats-widgets">
        {[
          { label: 'Total Reportes', val: total, color: 'text-slate-800 bg-slate-50 border-slate-200' },
          { label: 'Riesgos Críticos', val: critical, color: 'text-[#D45D5D] bg-[#FFE3E3]/40 border-[#FFC6C6]/60' },
          { label: 'Pendientes Revisión', val: pending, color: 'text-amber-700 bg-amber-50 border-amber-200' },
          { label: 'Publicados Muro', val: published, color: 'text-blue-700 bg-blue-50 border-blue-200' },
          { label: 'Derivados UGEL/APAFA', val: derived, color: 'text-purple-700 bg-purple-50 border-purple-200' },
          { label: 'Atendidos / Logrados', val: solved, color: 'text-emerald-700 bg-emerald-50 border-emerald-200' }
        ].map((item, idx) => (
          <div key={idx} className={`p-4 rounded-2xl border flex flex-col justify-between ${item.color} shadow-xs`}>
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider block mb-1">{item.label}</span>
            <span className="text-2xl font-sans font-black">{item.val}</span>
          </div>
        ))}
      </section>

      {/* Moderation Form Modal/Box if a report is selected */}
      {editingReport && (
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 space-y-6 border border-slate-800 animate-fade-in" id="moderation-form-section">
          <div className="flex justify-between items-start border-b border-slate-800 pb-3">
            <div>
              <div className="inline-flex items-center space-x-1.5 px-2 py-0.5 bg-rose-500 text-white rounded-md text-[9px] font-sans font-black uppercase tracking-wider mb-1">
                <ShieldAlert className="w-3 h-3" />
                <span>Auditoría de Privacidad y Seguridad</span>
              </div>
              <h3 className="font-sans font-bold text-lg text-white">Evaluación de Alerta: {editingReport.id}</h3>
            </div>
            <button
              id="close-moderation-btn"
              onClick={() => setEditingReport(null)}
              className="text-slate-400 hover:text-white font-bold text-xs bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg transition-all cursor-pointer"
            >
              Cancelar
            </button>
          </div>

          <form onSubmit={handleSaveModeration} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Col: Original User Report Details */}
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-slate-800 p-5 rounded-2xl border border-slate-700 text-xs sm:text-sm space-y-4">
                <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider block border-b border-slate-700 pb-1">Expediente Ciudadano Original</span>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-slate-400 text-xs block mb-0.5">Categoría</span>
                    <span className="font-bold text-white text-sm">{editingReport.category}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-xs block mb-0.5">Ubicación</span>
                    <span className="font-bold text-white text-sm">{editingReport.location}</span>
                  </div>
                </div>

                <div className="pt-2">
                  <span className="text-slate-400 text-xs block mb-1">Descripción del denunciante:</span>
                  <p className="text-slate-300 italic leading-relaxed whitespace-pre-wrap font-sans bg-slate-900/50 p-3 rounded-xl border border-slate-700/55">
                    "{editingReport.description}"
                  </p>
                </div>

                {/* Validation of unmasked DNI - requirement: DNI only visible by admin */}
                <div className="pt-3 border-t border-slate-700 grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-slate-400 block mb-0.5">DNI Completo (Acceso de Control)</span>
                    <span className="font-mono font-bold text-yellow-400 text-sm">{editingReport.dniFull}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block mb-0.5">Tipo de usuario reportante</span>
                    <span className="font-bold text-slate-200 uppercase">{editingReport.userType}</span>
                  </div>
                </div>

                {/* VISUAL EVIDENCE PREVIEW FOR THE ADMIN AUDITOR */}
                {editingReport.evidenceUrl && (
                  <div className="pt-3 border-t border-slate-700 space-y-2">
                    <span className="text-slate-400 text-xs font-bold inline-flex items-center space-x-1.5">
                      <ImageIcon className="w-3.5 h-3.5 text-rose-400" />
                      <span>Imagen de Evidencia Adjunta:</span>
                    </span>
                    <div className="aspect-video w-full max-h-56 rounded-xl overflow-hidden border border-slate-700 bg-slate-950">
                      <img 
                        src={editingReport.evidenceUrl} 
                        alt="Evidencia cargada" 
                        className="w-full h-full object-cover" 
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <p className="text-[11px] text-slate-400 leading-normal">
                      Verifique con cuidado que la foto no exponga rostros de menores de edad, nombres propios ni elementos de acoso escolar.
                    </p>
                  </div>
                )}
              </div>

              {/* Observation field */}
              <div className="space-y-1">
                <label htmlFor="mod-observation" className="block text-xs font-bold text-slate-300">Observación del Equipo de Gestión (público)</label>
                <textarea
                  id="mod-observation"
                  rows={3}
                  placeholder="Ej. Constatado con la junta directiva. Se aislará el área por seguridad y se derivará de inmediato a APAFA para cotizar repuestos."
                  value={modObservation}
                  onChange={(e) => setModObservation(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 text-white rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
              </div>

              {/* Action requested field */}
              <div className="space-y-1">
                <label htmlFor="mod-action-requested" className="block text-xs font-bold text-slate-300">Acción Requerida o Derivada</label>
                <input
                  type="text"
                  id="mod-action-requested"
                  value={modActionRequested}
                  onChange={(e) => setModActionRequested(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 text-white rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
              </div>
            </div>

            {/* Right Col: Moderation Status Controls */}
            <div className="bg-slate-800 p-5 rounded-2xl border border-slate-700 space-y-4">
              <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider block border-b border-slate-700 pb-1">Privacidad y estado</span>

              {/* Gravity Select */}
              <div className="space-y-1">
                <label htmlFor="mod-severity" className="block text-xs font-bold text-slate-400">Revaluar Gravedad</label>
                <select
                  id="mod-severity"
                  value={modSeverity}
                  onChange={(e) => setModSeverity(e.target.value as Severity)}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-xs text-white"
                >
                  <option value="critico">Crítico (Peligro inminente)</option>
                  <option value="alto">Alto (Afecta clases)</option>
                  <option value="medio">Medio (Importante)</option>
                  <option value="bajo">Bajo (Mejora estética)</option>
                </select>
              </div>

              {/* Status Select */}
              <div className="space-y-1">
                <label htmlFor="mod-status" className="block text-xs font-bold text-slate-400">Asignar Estado de Alerta</label>
                <select
                  id="mod-status"
                  value={modStatus}
                  onChange={(e) => setModStatus(e.target.value as Status)}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-xs text-white font-bold"
                >
                  <option value="recibido">Recibido (Borrador interno)</option>
                  <option value="revision">En Revisión (Filtro de privacidad)</option>
                  <option value="publicado">Publicado (Visible en el Muro)</option>
                  <option value="derivado">Derivado (Remitido a entidad)</option>
                  <option value="atendido">Atendido / Resuelto (Mejora lograda)</option>
                </select>
              </div>

              {/* Authority Delegate Select */}
              {(modStatus === 'derivado' || modStatus === 'atendido') && (
                <div className="space-y-1 animate-fade-in">
                  <label htmlFor="mod-authority" className="block text-xs font-bold text-slate-400">Entidad de derivación</label>
                  <select
                    id="mod-authority"
                    value={modAuthority}
                    onChange={(e) => setModAuthority(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-xs text-white"
                  >
                    <option value="Dirección del colegio">Dirección del colegio</option>
                    <option value="APAFA">APAFA</option>
                    <option value="UGEL">UGEL 05 SJL</option>
                    <option value="MINEDU">MINEDU</option>
                    <option value="Municipalidad">Municipalidad</option>
                    <option value="Otro">Otro / Comunal</option>
                  </select>
                </div>
              )}

              {/* Mandatory Privacy Checkbox to publish */}
              <div className="pt-3 border-t border-slate-700">
                <label className="flex items-start space-x-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    id="mod-no-personal-data"
                    checked={modNoPersonalData}
                    onChange={(e) => setModNoPersonalData(e.target.checked)}
                    className="mt-0.5 h-4 w-4 text-rose-600 focus:ring-rose-500 bg-slate-700 border-slate-600 rounded"
                  />
                  <span className="text-[11px] text-slate-300 leading-snug font-bold">
                    El reporte no contiene datos personales visibles (DNI, nombres o rostros de alumnos, o insultos directos). Listo para publicar de forma anónima.
                  </span>
                </label>
              </div>

              {modError && (
                <p className="text-[10px] text-rose-400 font-bold bg-rose-950 p-2 rounded border border-rose-900 leading-relaxed">
                  {modError}
                </p>
              )}

              {/* Save Button */}
              <button
                type="submit"
                id="save-moderation-submit"
                className="w-full py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs rounded-xl transition-all shadow-sm flex items-center justify-center space-x-1 cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Guardar y Aplicar Cambios</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Improved Filters Board for Administrative Dashboard */}
      <div className="bg-white p-6 rounded-3xl border border-slate-150 shadow-xs space-y-4" id="admin-filters-dashboard">
        <div className="flex items-center space-x-2 text-slate-900 font-sans font-bold text-sm border-b border-slate-100 pb-2">
          <Filter className="w-4 h-4 text-[#D45D5D]" />
          <span>Filtros avanzados de moderación de alertas</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Keyword Search */}
          <div className="space-y-1">
            <label htmlFor="admin-search-input" className="block text-xs font-bold text-slate-500">Buscar por código, descripción o DNI</label>
            <div className="relative">
              <input
                id="admin-search-input"
                type="text"
                placeholder="Código, ubicación, DNI..."
                value={adminSearch}
                onChange={(e) => setAdminSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#FFE3E3] focus:border-[#FFC6C6]"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            </div>
          </div>

          {/* Category Filter */}
          <div className="space-y-1">
            <label htmlFor="admin-cat-filter" className="block text-xs font-bold text-slate-500">Categoría</label>
            <select
              id="admin-cat-filter"
              value={adminCategory}
              onChange={(e) => setAdminCategory(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#FFE3E3] bg-white text-slate-700"
            >
              <option value="Todas">Todas las categorías</option>
              {categoriesList.filter(c => c !== 'Todas').map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Severity Filter */}
          <div className="space-y-1">
            <label htmlFor="admin-severity-filter" className="block text-xs font-bold text-slate-500">Gravedad</label>
            <select
              id="admin-severity-filter"
              value={adminSeverity}
              onChange={(e) => setAdminSeverity(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#FFE3E3] bg-white text-slate-700"
            >
              <option value="Todas">Todas las gravedades</option>
              <option value="critico">Crítico</option>
              <option value="alto">Alto</option>
              <option value="medio">Medio</option>
              <option value="bajo">Bajo</option>
            </select>
          </div>

          {/* Status Filter */}
          <div className="space-y-1">
            <label htmlFor="admin-status-filter" className="block text-xs font-bold text-slate-500">Estado de Alerta</label>
            <select
              id="admin-status-filter"
              value={adminStatus}
              onChange={(e) => setAdminStatus(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#FFE3E3] bg-white text-slate-700"
            >
              <option value="Todas">Todos los estados</option>
              <option value="recibido">Recibido</option>
              <option value="revision">En Revisión</option>
              <option value="publicado">Publicado</option>
              <option value="derivado">Derivado</option>
              <option value="atendido">Atendido</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table of all reports in DB */}
      <section className="bg-white rounded-3xl border border-slate-150 shadow-xs overflow-hidden" id="admin-reports-table">
        <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-xl font-sans font-bold text-slate-900">Historial de Reportes de la Institución</h2>
            <p className="text-xs text-slate-500">Muestra todos los reportes, incluidos aquellos que se encuentran en borrador o revisión de privacidad.</p>
          </div>
          <span className="bg-slate-900 text-white px-3 py-1.5 rounded-xl text-xs font-bold font-mono">
            {filteredReports.length} de {reports.length} reportes filtrados
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-150 text-left text-xs sm:text-sm">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="px-6 py-3.5">Código</th>
                <th className="px-6 py-3.5">Categoría</th>
                <th className="px-6 py-3.5">Gravedad</th>
                <th className="px-6 py-3.5">Estado</th>
                <th className="px-6 py-3.5">Fecha</th>
                <th className="px-6 py-3.5">Usuario (DNI)</th>
                <th className="px-6 py-3.5 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-150 text-slate-700 bg-white">
              {filteredReports.length > 0 ? (
                filteredReports.map((report) => (
                  <tr key={report.id} id={`admin-row-${report.id}`} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 font-mono font-bold text-[#D45D5D] whitespace-nowrap">
                      {report.id}
                    </td>
                    <td className="px-6 py-4 font-medium text-slate-900 whitespace-nowrap">
                      {report.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-sans font-bold uppercase border tracking-wider ${getSeverityStyle(report.severity)}`}>
                        {report.severity}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${getStatusStyle(report.status)}`}>
                        {getStatusLabel(report.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-500 whitespace-nowrap">
                      {new Date(report.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-900 font-mono text-xs">{report.dniFull}</span>
                        <span className="text-[10px] text-slate-400 capitalize">{report.userType}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <button
                          id={`admin-btn-view-${report.id}`}
                          onClick={() => onViewReportDetail(report.id)}
                          className="p-1.5 hover:bg-slate-100 text-slate-500 hover:text-slate-800 rounded-lg transition-colors cursor-pointer border border-transparent"
                          title="Ver detalle público"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          id={`admin-btn-mod-${report.id}`}
                          onClick={() => handleStartModeration(report)}
                          className="p-1.5 hover:bg-[#FFE3E3]/50 text-slate-500 hover:text-[#D45D5D] rounded-lg transition-colors cursor-pointer border border-transparent hover:border-[#FFC6C6]"
                          title="Moderar / Control de Privacidad"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-10 text-center text-slate-400">
                    No se encontraron reportes con los filtros seleccionados.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
