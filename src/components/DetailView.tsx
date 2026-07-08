import { useState } from 'react';
import { ArrowLeft, Share2, GraduationCap, Calendar, MapPin, Tag, AlertTriangle, FileText, CheckCircle2, Lock, Clock, Info } from 'lucide-react';
import { Report, Status } from '../types';

interface DetailViewProps {
  report: Report;
  onBack: () => void;
}

export default function DetailView({ report, onBack }: DetailViewProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    // Simulate share link copy
    const dummyUrl = `${window.location.origin}/#seguimiento?code=${report.id}`;
    navigator.clipboard.writeText(dummyUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    });
  };

  const getSeverityStyle = (sev: string) => {
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

  // Steps for timeline
  const steps = [
    { label: 'Reporte recibido', desc: 'Ingreso inicial anónimo al sistema.', key: 'recibido' },
    { label: 'En revisión de privacidad', desc: 'Validación de descripción y filtrado de datos de menores.', key: 'revision' },
    { label: 'Publicado de forma anónima', desc: 'Visibilizado en el muro público de infraestructura.', key: 'publicado' },
    { label: 'Derivado a autoridades', desc: `Remitido a ${report.derivedAuthority || 'las autoridades competentes'} para mantenimiento.`, key: 'derivado' },
    { label: 'Atendido / Resuelto', desc: 'El riesgo fue mitigado o el daño totalmente solucionado.', key: 'atendido' },
  ];

  // Helper to determine active status in timeline
  const getStatusIndex = (currStatus: Status) => {
    switch (currStatus) {
      case 'recibido': return 0;
      case 'revision': return 1;
      case 'publicado': return 2;
      case 'derivado': return 3;
      case 'atendido': return 4;
      default: return 0;
    }
  };

  const currentStatusIndex = getStatusIndex(report.status);

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 space-y-8" id="detail-view-container">
      {/* Back navigation header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-100 pb-5">
        <button
          id="detail-back-btn"
          onClick={onBack}
          className="self-start px-4 py-2 border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 font-bold rounded-xl text-xs transition-all inline-flex items-center space-x-1.5 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver a reportes</span>
        </button>

        <div className="flex items-center space-x-2">
          <span className="bg-[#FFE3E3] border border-[#FFC6C6] text-[#D45D5D] px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider flex items-center space-x-1">
            <GraduationCap className="w-3.5 h-3.5 text-[#D45D5D]" />
            <span>Identidad Ocultada</span>
          </span>

          <button
            id="detail-share-btn"
            onClick={handleShare}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs transition-all inline-flex items-center space-x-1.5 cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{copied ? '¡Código Copiado!' : 'Compartir caso'}</span>
          </button>
        </div>
      </div>

      {copied && (
        <div className="bg-emerald-50 text-emerald-800 p-4 rounded-xl border border-emerald-100 text-xs font-bold text-center animate-fade-in" id="share-copied-alert">
          🎉 ¡Enlace de seguimiento copiado al portapapeles! Puedes enviarlo por WhatsApp o compartirlo de manera segura.
        </div>
      )}

      {/* Main Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column: Report Information */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-150 p-6 sm:p-8 space-y-6 shadow-xs">
            {/* Header info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-4 gap-2">
              <div>
                <span className="text-[10px] text-slate-400 font-sans font-bold uppercase tracking-wider block">Código Único de Reporte</span>
                <span className="text-xl font-mono font-black text-[#D45D5D] tracking-wider">{report.id}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className={`px-2.5 py-1 rounded-md text-[10px] font-sans font-black uppercase border tracking-wider ${getSeverityStyle(report.severity)}`}>
                  Gravedad: {report.severity}
                </span>
                <span className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md text-[10px] font-sans font-bold uppercase">
                  F. Reporte: {new Date(report.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>

            {/* General Info list */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm bg-slate-50 p-4 rounded-2xl border border-slate-100">
              <div className="flex items-center space-x-2">
                <Tag className="w-4 h-4 text-slate-400" />
                <span className="text-slate-500">Categoría:</span>
                <span className="font-bold text-slate-800">{report.category}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-[#D45D5D]" />
                <span className="text-slate-500">Ubicación:</span>
                <span className="font-bold text-slate-800">{report.location}</span>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <h3 className="font-sans font-bold text-slate-900 text-sm sm:text-base flex items-center space-x-2">
                <FileText className="w-4 h-4 text-[#D45D5D]" />
                <span>Descripción detallada del riesgo</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed whitespace-pre-wrap bg-white border border-slate-100 p-4 rounded-xl italic">
                "{report.description}"
              </p>
            </div>

            {/* Action Requested */}
            <div className="space-y-2 bg-[#FFE3E3]/40 p-5 rounded-2xl border border-[#FFC6C6]/60">
              <h4 className="font-sans font-bold text-xs sm:text-sm uppercase tracking-wider flex items-center space-x-1.5 text-[#5C2121]">
                <AlertTriangle className="w-4 h-4 text-[#D45D5D]" />
                <span>Acción Solicitada</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {report.actionRequested || `Se solicita la inspección técnica formal y la programación de refacción para el problema reportado en la categoría de ${report.category}.`}
              </p>
            </div>

            {/* Photo Evidence if uploaded */}
            {report.evidenceUrl && (
              <div className="space-y-2 pt-4 border-t border-slate-100">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wide block">Evidencia Fotográfica Verificada</span>
                <div className="aspect-video w-full rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 shadow-xs">
                  <img src={report.evidenceUrl} alt="Evidencia de daño" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
              </div>
            )}

            {/* Drive link if exists */}
            {report.evidenceDriveUrl && (
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-150 text-xs">
                <span className="text-slate-400 block font-semibold mb-1">Repositorio adicional de evidencia</span>
                <a href={report.evidenceDriveUrl} target="_blank" rel="noopener noreferrer" className="text-[#D45D5D] underline font-semibold truncate block hover:text-[#5C2121]">
                  {report.evidenceDriveUrl}
                </a>
              </div>
            )}

            {/* Admin Observations/logs */}
            {report.adminObservations && (
              <div className="p-5 bg-emerald-50/30 rounded-2xl border border-emerald-100 text-xs sm:text-sm space-y-2">
                <span className="font-sans font-bold text-emerald-800 uppercase tracking-wider block">Observación de Moderación</span>
                <p className="text-slate-600 leading-relaxed italic">
                  "{report.adminObservations}"
                </p>
              </div>
            )}

            {/* Privacy Shield box */}
            <div className="p-4 bg-slate-900 text-white rounded-2xl flex items-start space-x-3 text-[11px] sm:text-xs">
              <Lock className="w-4 h-4 text-[#FFD1D1] mt-0.5 flex-shrink-0" />
              <div className="space-y-0.5">
                <span className="font-bold text-white uppercase tracking-wider block">Estándar de Seguridad y Privacidad</span>
                <p className="text-slate-300 leading-relaxed">
                  Los datos del denunciante fueron ocultados y enmascarados desde el origen para proteger su integridad. El DNI únicamente fue utilizado para validación técnica de seguridad comunitaria. No se almacenan datos personales de menores.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right column: Interactive Case Timeline */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-slate-150 p-6 sm:p-8 shadow-xs space-y-6">
            <h3 className="font-sans font-bold text-slate-900 text-sm sm:text-base border-b border-slate-100 pb-3 flex items-center space-x-2">
              <Clock className="w-4 h-4 text-[#D45D5D]" />
              <span>Línea de tiempo del caso</span>
            </h3>

            {/* Vertical timeline */}
            <div className="relative border-l border-slate-200 pl-4 ml-2 space-y-6">
              {steps.map((st, index) => {
                const isCompleted = index <= currentStatusIndex;
                const isCurrent = index === currentStatusIndex;

                return (
                  <div key={index} className="relative">
                    {/* Circle badge indicator */}
                    <div
                      className={`absolute -left-[25px] w-4.5 h-4.5 rounded-full border-2 flex items-center justify-center transition-all ${
                        isCurrent
                          ? 'bg-[#D45D5D] border-white ring-2 ring-[#FFC6C6]'
                          : isCompleted
                          ? 'bg-emerald-500 border-white'
                          : 'bg-white border-slate-200'
                      }`}
                    >
                      {isCompleted && !isCurrent && (
                        <span className="text-white text-[8px] font-bold">✓</span>
                      )}
                    </div>

                    <div className="space-y-1">
                      <h4
                        className={`font-sans font-bold text-xs sm:text-sm ${
                          isCurrent
                            ? 'text-[#D45D5D] font-extrabold'
                            : isCompleted
                            ? 'text-emerald-700'
                            : 'text-slate-400'
                        }`}
                      >
                        {st.label}
                      </h4>
                      <p className="text-[11px] text-slate-500 leading-relaxed">
                        {st.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Authority delegation note */}
            {report.status === 'derivado' && report.derivedAuthority && (
              <div className="bg-purple-50 p-4 rounded-xl border border-purple-100 text-xs text-purple-800 space-y-1">
                <span className="font-bold uppercase tracking-wider block">Estado de Derivación</span>
                <p className="leading-relaxed">
                  Este expediente técnico fue estructurado de manera anónima y remitido oficialmente al área de infraestructura de: <strong>{report.derivedAuthority}</strong> para su programación física.
                </p>
              </div>
            )}

            {/* Solved state congratulations */}
            {report.status === 'atendido' && (
              <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100 text-xs text-emerald-800 space-y-1">
                <span className="font-bold uppercase tracking-wider block flex items-center space-x-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Atención Completada</span>
                </span>
                <p className="leading-relaxed">
                  Se ha registrado una mejora o solución estructural satisfactoria para este riesgo, restaurando las condiciones óptimas de seguridad escolar.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
