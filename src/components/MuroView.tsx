import { useState } from 'react';
import { Search, ListFilter, AlertCircle, GraduationCap, ArrowRight, Eye, Tag, MapPin, Calendar, CheckCircle2 } from 'lucide-react';
import { Report, Severity, Status } from '../types';
import { CATEGORIES } from '../data';

interface MuroViewProps {
  reports: Report[];
  onViewDetail: (id: string) => void;
}

export default function MuroView({ reports, onViewDetail }: MuroViewProps) {
  // Filters state
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [selectedSeverity, setSelectedSeverity] = useState('Todas');
  const [selectedStatus, setSelectedStatus] = useState('Todas');

  // Filter out 'recibido' and 'revision' as they are not approved for public display yet
  const publicReports = reports.filter(
    (r) => r.status === 'publicado' || r.status === 'derivado' || r.status === 'atendido'
  );

  // Apply search and filter logic
  const filteredReports = publicReports.filter((r) => {
    const matchesSearch =
      r.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = selectedCategory === 'Todas' || r.category === selectedCategory;
    const matchesSeverity = selectedSeverity === 'Todas' || r.severity === selectedSeverity;
    const matchesStatus = selectedStatus === 'Todas' || r.status === selectedStatus;

    return matchesSearch && matchesCategory && matchesSeverity && matchesStatus;
  });

  const getSeverityStyle = (sev: Severity) => {
    switch (sev) {
      case 'critico':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'alto':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'medio':
        return 'bg-yellow-50 text-yellow-800 border-yellow-200';
      case 'bajo':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  const getStatusStyle = (status: Status) => {
    switch (status) {
      case 'recibido':
        return 'bg-slate-100 text-slate-700';
      case 'revision':
        return 'bg-amber-100 text-amber-800';
      case 'publicado':
        return 'bg-[#FFE3E3] text-[#D45D5D] border border-[#FFC6C6]/40';
      case 'derivado':
        return 'bg-purple-100 text-purple-700';
      case 'atendido':
        return 'bg-emerald-100 text-emerald-800';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };

  const getStatusLabel = (status: Status) => {
    switch (status) {
      case 'recibido':
        return 'Recibido';
      case 'revision':
        return 'En Revisión';
      case 'publicado':
        return 'Publicado';
      case 'derivado':
        return 'Derivado';
      case 'atendido':
        return 'Atendido';
      default:
        return status;
    }
  };

  return (
    <div className="space-y-8 py-8" id="muro-container">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-1">
          <span className="text-xs text-[#D45D5D] font-sans font-black uppercase tracking-wider block">
            Muro de Alertas
          </span>
          <h1 className="text-3xl font-sans font-black text-slate-900">Reportes Publicados</h1>
          <p className="text-sm text-slate-500">
            Casos de infraestructura en la I.E. Fe y Alegría verificados y anonimizados para la seguridad comunitaria.
          </p>
        </div>

        {/* Counter Badge */}
        <div className="bg-[#FFE3E3] border border-[#FFC6C6] px-5 py-3 rounded-2xl flex items-center space-x-3 self-start md:self-auto">
          <div className="w-2.5 h-2.5 bg-[#D45D5D] rounded-full animate-ping"></div>
          <div>
            <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider">Casos visibles para la comunidad</span>
            <span className="text-lg font-bold font-mono text-[#D45D5D]">
              {filteredReports.length} {filteredReports.length === 1 ? 'Alerta' : 'Alertas'}
            </span>
          </div>
        </div>
      </div>      {/* Filters Board */}
      <div className="bg-white p-5 rounded-2xl border border-[#FFEAA7]/40 shadow-xs space-y-4" id="filters-board">
        <div className="flex items-center space-x-2 text-slate-800 font-sans font-bold text-sm border-b border-slate-100 pb-2">
          <ListFilter className="w-4 h-4 text-[#D45D5D]" />
          <span>Filtros de búsqueda ciudadana</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Keyword Search */}
          <div className="space-y-1">
            <label htmlFor="search-input" className="block text-xs font-bold text-slate-500">Buscar palabra clave o código</label>
            <div className="relative">
              <input
                id="search-input"
                type="text"
                placeholder="Ej. RFA-0001, baño, techo..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#FFE3E3] focus:border-[#FFC6C6]"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            </div>
          </div>

          {/* Category Filter */}
          <div className="space-y-1">
            <label htmlFor="cat-filter" className="block text-xs font-bold text-slate-500">Categoría</label>
            <select
              id="cat-filter"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#FFE3E3] bg-white text-slate-700"
            >
              <option value="Todas">Todas las categorías</option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Severity Filter */}
          <div className="space-y-1">
            <label htmlFor="severity-filter" className="block text-xs font-bold text-slate-500">Nivel de Gravedad</label>
            <select
              id="severity-filter"
              value={selectedSeverity}
              onChange={(e) => setSelectedSeverity(e.target.value)}
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
            <label htmlFor="status-filter" className="block text-xs font-bold text-slate-500">Estado de Atención</label>
            <select
              id="status-filter"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#FFE3E3] bg-white text-slate-700"
            >
              <option value="Todas">Todos los estados</option>
              <option value="publicado">Publicado</option>
              <option value="derivado">Derivado</option>
              <option value="atendido">Atendido</option>
            </select>
          </div>
        </div>
      </div>

      {/* Reports Grid */}
      {filteredReports.length === 0 ? (
        <div className="bg-slate-50 text-center py-16 px-6 rounded-3xl border border-dashed border-slate-200 space-y-3" id="no-reports-view">
          <AlertCircle className="w-10 h-10 text-slate-400 mx-auto" />
          <h3 className="font-sans font-bold text-slate-800 text-base">Ningún reporte coincide con los filtros</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
            Intenta cambiar los parámetros de búsqueda o explora otras categorías de infraestructura escolar. Recuerda que solo se listan reportes ya aprobados por moderación.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="reports-grid">
          {filteredReports.map((report) => (
            <div
              key={report.id}
              id={`report-card-${report.id}`}
              className="bg-white rounded-3xl border border-slate-150 shadow-xs hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between overflow-hidden"
            >
              {/* Card Image header (if available, else nice color block) */}
              {report.evidenceUrl ? (
                <div className="h-44 w-full relative overflow-hidden bg-slate-100 border-b border-slate-100">
                  <img
                    src={report.evidenceUrl}
                    alt={report.category}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 flex space-x-1.5">
                    <span className="bg-slate-900/80 backdrop-blur-xs text-white px-2.5 py-0.5 rounded-md text-[10px] font-mono tracking-wider font-bold">
                      {report.id}
                    </span>
                  </div>
                  <div className="absolute bottom-3 right-3">
                    <span className="bg-[#FFE3E3] border border-[#FFC6C6] text-[#D45D5D] px-2 py-0.5 rounded-md text-[9px] font-sans font-black uppercase tracking-wider shadow-xs flex items-center space-x-1">
                      <GraduationCap className="w-2.5 h-2.5 text-[#D45D5D]" />
                      <span>Anónimo</span>
                    </span>
                  </div>
                </div>
              ) : (
                <div className="h-16 bg-gradient-to-r from-[#FFE3E3]/40 to-slate-50 border-b border-slate-100 p-4 flex justify-between items-center">
                  <span className="font-mono text-xs font-black text-[#D45D5D] bg-white border border-[#FFC6C6] px-2.5 py-1 rounded-md">
                    {report.id}
                  </span>
                  <span className="bg-[#FFF9DB] text-[#826A00] border border-[#FFEAA7]/60 px-2 py-0.5 rounded-md text-[9px] font-sans font-bold uppercase tracking-wider">
                    Reporte Anónimo
                  </span>
                </div>
              )}

              {/* Card Content */}
              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2.5">
                  {/* Category & Gravity */}
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 text-xs font-medium flex items-center space-x-1">
                      <Tag className="w-3.5 h-3.5 text-slate-300" />
                      <span>{report.category}</span>
                    </span>
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-sans font-bold uppercase border tracking-wider ${getSeverityStyle(report.severity)}`}>
                      {report.severity}
                    </span>
                  </div>

                  {/* Location title */}
                  <h3 className="font-sans font-bold text-slate-800 text-sm flex items-start space-x-1.5 line-clamp-1">
                    <MapPin className="w-4 h-4 text-[#D45D5D] flex-shrink-0 mt-0.5" />
                    <span>{report.location}</span>
                  </h3>

                  {/* Description truncated */}
                  <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
                    {report.description}
                  </p>
                </div>

                {/* Card Footer info */}
                <div className="pt-4 border-t border-slate-100 space-y-3">
                  <div className="flex justify-between items-center text-[11px] text-slate-400">
                    <span className="flex items-center space-x-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-300" />
                      <span>{new Date(report.createdAt).toLocaleDateString()}</span>
                    </span>
                    <span className={`px-2 py-0.5 rounded-full font-bold text-[9px] uppercase ${getStatusStyle(report.status)}`}>
                      {getStatusLabel(report.status)}
                    </span>
                  </div>

                  <button
                    id={`btn-view-detail-${report.id}`}
                    onClick={() => onViewDetail(report.id)}
                    className="w-full py-2.5 bg-slate-50 hover:bg-[#FFE3E3]/50 hover:text-[#D45D5D] text-slate-700 border border-slate-150 hover:border-[#FFC6C6] text-xs font-bold rounded-xl transition-all inline-flex items-center justify-center space-x-1 cursor-pointer"
                  >
                    <span>Ver detalle del caso</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
