import React, { useState, useEffect } from 'react';
import { Search, FileText, AlertCircle, ArrowRight, GraduationCap, CheckCircle2, Clock, MapPin, Tag } from 'lucide-react';
import { Report, Status } from '../types';

interface SeguimientoViewProps {
  reports: Report[];
  onViewDetail: (id: string) => void;
}

export default function SeguimientoView({ reports, onViewDetail }: SeguimientoViewProps) {
  const [code, setCode] = useState('');
  const [searchedReport, setSearchedReport] = useState<Report | null>(null);
  const [searched, setSearched] = useState(false);

  // If there's a code in the hash/url query on load, let's pre-populate
  useEffect(() => {
    const handleUrlQuery = () => {
      const hash = window.location.hash;
      if (hash.includes('?code=')) {
        const codeParam = hash.split('?code=')[1];
        if (codeParam) {
          const cleanCode = codeParam.trim().toUpperCase();
          setCode(cleanCode);
          const report = reports.find(r => r.id.toUpperCase() === cleanCode);
          if (report) {
            setSearchedReport(report);
            setSearched(true);
          }
        }
      }
    };
    handleUrlQuery();
  }, [reports]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearched(true);
    const cleanCode = code.trim().toUpperCase();
    const report = reports.find((r) => r.id.toUpperCase() === cleanCode);
    setSearchedReport(report || null);
  };

  const getStatusMessage = (status: Status) => {
    switch (status) {
      case 'recibido':
        return 'Tu reporte fue recibido y está pendiente de revisión por nuestro equipo técnico y de seguridad.';
      case 'revision':
        return 'El equipo está verificando meticulosamente que no existan datos personales visibles, nombres ni rostros de alumnos.';
      case 'publicado':
        return 'El caso fue publicado de forma 100% anónima. Ya es visible para la comunidad en el Muro de Reportes.';
      case 'derivado':
        return 'El caso fue estructurado técnicamente y derivado formalmente a las autoridades responsables.';
      case 'atendido':
        return 'El caso registra una mejora o atención física completada satisfactoriamente.';
      default:
        return '';
    }
  };

  const getStatusBadgeColor = (status: Status) => {
    switch (status) {
      case 'recibido': return 'bg-slate-100 text-slate-800 border-slate-200';
      case 'revision': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'publicado': return 'bg-[#FFE3E3] text-[#D45D5D] border-[#FFC6C6]/40';
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
      case 'derivado': return 'Derivado Oficial';
      case 'atendido': return 'Atendido';
      default: return status;
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 sm:px-6 space-y-8" id="tracking-container">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-sans font-black text-slate-900">Seguimiento de Reportes</h1>
        <p className="text-sm text-slate-500 max-w-md mx-auto">
          Ingresa el código único generado al enviar tu reporte (ej. <code className="font-mono bg-slate-100 px-1 py-0.5 rounded text-[#D45D5D] font-bold">RFA-0001</code>) para consultar su estado en tiempo real.
        </p>
      </div>

      {/* Code Search Input Card */}
      <div className="bg-white p-6 rounded-3xl border border-slate-150 shadow-xs space-y-4">
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <input
              type="text"
              id="tracking-code-input"
              maxLength={12}
              placeholder="Ingresa tu código RFA-XXXX"
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              className="w-full pl-10 pr-4 py-3 text-base font-mono tracking-wider rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#FFE3E3] focus:border-[#FFC6C6] uppercase"
              required
            />
            <Search className="w-5 h-5 text-slate-400 absolute left-3 top-3.5" />
          </div>
          <button
            type="submit"
            id="tracking-search-btn"
            className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-sm transition-all flex items-center justify-center space-x-1.5 cursor-pointer"
          >
            <span>Consultar estado</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Demo Quick-Click Panel */}
        <div className="pt-2">
          <span className="text-[11px] text-slate-400 block font-semibold mb-2">Códigos de prueba rápidos para la sustentación:</span>
          <div className="flex flex-wrap gap-2">
            {reports.map((r) => (
              <button
                key={r.id}
                type="button"
                id={`demo-code-${r.id}`}
                onClick={() => {
                  setCode(r.id);
                  setSearchedReport(r);
                  setSearched(true);
                }}
                className={`px-3 py-1.5 rounded-lg border text-xs font-mono font-bold transition-all cursor-pointer ${
                  code === r.id
                    ? 'bg-[#FFE3E3] border-[#FFC6C6] text-[#D45D5D]'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {r.id} ({getStatusLabel(r.status)})
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Search Results Display */}
      {searched && (
        <div className="space-y-6 animate-fade-in" id="search-results">
          {searchedReport ? (
            <div className="bg-white rounded-3xl border border-slate-150 p-6 sm:p-8 space-y-6 shadow-xs">
              {/* Header result */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-150 pb-4 gap-2">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider">Resultado de Alerta</span>
                  <span className="text-xl font-mono font-black text-[#D45D5D] tracking-wider">{searchedReport.id}</span>
                </div>
                <span className={`px-4 py-1.5 rounded-full border text-xs font-extrabold uppercase ${getStatusBadgeColor(searchedReport.status)}`}>
                  Estado: {getStatusLabel(searchedReport.status)}
                </span>
              </div>

              {/* Status Explanation Message */}
              <div className="bg-[#FFE3E3]/40 p-5 rounded-2xl border border-[#FFC6C6]/60 flex items-start space-x-3">
                <Clock className="w-5 h-5 text-[#D45D5D] mt-0.5 flex-shrink-0" />
                <div className="space-y-1 text-xs sm:text-sm">
                  <span className="font-bold text-[#5C2121]">Estado actual del reporte</span>
                  <p className="text-slate-600 leading-relaxed font-medium">
                    {getStatusMessage(searchedReport.status)}
                  </p>
                </div>
              </div>

              {/* Summary Card */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-3 text-xs sm:text-sm">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Ficha Resumen del Reporte</span>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-1.5">
                    <Tag className="w-4 h-4 text-slate-400" />
                    <span className="text-slate-500">Categoría:</span>
                    <span className="font-bold text-slate-700">{searchedReport.category}</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <MapPin className="w-4 h-4 text-[#D45D5D]" />
                    <span className="text-slate-500">Ubicación:</span>
                    <span className="font-bold text-slate-700">{searchedReport.location}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-150 text-slate-600 leading-relaxed italic">
                  "{searchedReport.description}"
                </div>
              </div>

              {/* View Full Detail Button */}
              {(searchedReport.status === 'publicado' || searchedReport.status === 'derivado' || searchedReport.status === 'atendido') ? (
                <div className="pt-2 flex justify-end">
                  <button
                    id="track-go-detail"
                    onClick={() => onViewDetail(searchedReport.id)}
                    className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs transition-all inline-flex items-center space-x-1.5 cursor-pointer"
                  >
                    <span>Ver detalle y línea de tiempo completa</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="p-4 bg-amber-50 rounded-xl border border-amber-100 text-xs text-amber-800">
                  🛡️ Este caso aún no figura de forma pública en el muro debido a que está pasando por el <strong>Filtro de Privacidad y Seguridad</strong>. Sin embargo, puedes seguir monitoreando su avance desde aquí con tu código privado.
                </div>
              )}
            </div>
          ) : (
            <div className="bg-[#FFE3E3]/30 border border-[#FFC6C6]/40 p-6 rounded-2xl text-center space-y-3" id="tracking-error">
              <AlertCircle className="w-10 h-10 text-[#D45D5D] mx-auto" />
              <h3 className="font-sans font-bold text-[#5C2121] text-base">Código no encontrado</h3>
              <p className="text-xs text-[#D45D5D]/80 max-w-sm mx-auto leading-relaxed">
                El código <strong className="font-mono">{code}</strong> no coincide con ninguna alerta registrada en la plataforma. Por favor, asegúrate de ingresarlo con guiones en formato <strong>RFA-XXXX</strong>.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
