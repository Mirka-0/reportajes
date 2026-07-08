import { Sparkles, AlertCircle, CheckCircle2, ArrowRight } from 'lucide-react';
import { Improvement } from '../types';

interface MejorasViewProps {
  improvements: Improvement[];
  onViewReport: (id: string) => void;
}

export default function MejorasView({ improvements, onViewReport }: MejorasViewProps) {
  return (
    <div className="space-y-12 py-8" id="mejoras-container">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center space-x-1.5 bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-full text-emerald-700 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Resultados y Transparencia</span>
        </div>
        <h1 className="text-3xl font-sans font-black text-slate-900">Mejoras de Infraestructura Registradas</h1>
        <p className="text-sm text-slate-500 max-w-lg mx-auto">
          La visibilización responsable rinde frutos. Mostramos los casos atendidos gracias a la colaboración activa de la comunidad y autoridades de la I.E. Fe y Alegría.
        </p>
      </div>

      {/* Hero Empowerment Statement */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 border border-slate-800">
        <div className="space-y-2 max-w-2xl">
          <span className="text-emerald-400 text-xs font-bold uppercase tracking-widest block">El poder de la participación ciudadana</span>
          <h2 className="text-xl sm:text-2xl font-sans font-bold tracking-tight">
            "La visibilización constructiva acelera el cambio"
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            Reportar un problema no es criticar en vano; es cuidar la salud física y las condiciones educativas de nuestros hijos. Alzar la voz de forma ordenada moviliza a la APAFA, Dirección y UGEL.
          </p>
        </div>
        <div className="bg-emerald-500 text-slate-900 px-5 py-3 rounded-2xl font-sans font-extrabold text-xs tracking-wider uppercase flex items-center space-x-2 shrink-0">
          <CheckCircle2 className="w-4 h-4" />
          <span>Mejora e Impacto Social</span>
        </div>
      </div>

      {/* Improvements Grid */}
      <div className="grid grid-cols-1 gap-10" id="improvements-grid">
        {improvements.map((imp) => (
          <div
            key={imp.id}
            id={`improvement-card-${imp.id}`}
            className="bg-white rounded-3xl border border-slate-150 p-6 sm:p-8 shadow-xs hover:shadow-md transition-all space-y-6"
          >
            {/* Header row */}
            <div className="flex flex-col sm:flex-row justify-between items-start gap-3 border-b border-slate-100 pb-4">
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Código de Mejora: {imp.id}</span>
                <h3 className="font-sans font-black text-slate-900 text-lg sm:text-xl">{imp.title}</h3>
                <span className="text-xs text-[#D45D5D] font-bold font-mono bg-[#FFE3E3] border border-[#FFC6C6] px-2 py-0.5 rounded-md inline-block mt-1">
                  Caso de origen: {imp.reportId}
                </span>
              </div>

              <div className="flex flex-col sm:items-end gap-1">
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase text-center ${
                  imp.status === 'completa' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                }`}>
                  {imp.status === 'completa' ? '✓ Mejora completa' : '⚠️ Mejora parcial'}
                </span>
                <span className="text-xs text-slate-400">Fecha de logro: {new Date(imp.date).toLocaleDateString()}</span>
              </div>
            </div>

            {/* Before / After Images slider side-by-side */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Before Column */}
              <div className="space-y-2">
                <div className="relative rounded-2xl overflow-hidden aspect-video border border-slate-200 bg-slate-100">
                  <img src={imp.beforeImg} alt="Antes" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  <span className="absolute top-3 left-3 bg-[#D45D5D] text-white px-3 py-1 rounded-md text-xs font-sans font-black uppercase tracking-wider shadow-sm">
                    Antes del reporte
                  </span>
                </div>
                <p className="text-xs text-slate-500 italic text-center">Estado de riesgo inicialmente visibilizado por la comunidad escolar.</p>
              </div>

              {/* After Column */}
              <div className="space-y-2">
                <div className="relative rounded-2xl overflow-hidden aspect-video border border-slate-200 bg-slate-100">
                  <img src={imp.afterImg} alt="Después" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  <span className="absolute top-3 left-3 bg-emerald-600 text-white px-3 py-1 rounded-md text-xs font-sans font-black uppercase tracking-wider shadow-sm">
                    Después de la mejora
                  </span>
                </div>
                <p className="text-xs text-slate-500 italic text-center">Intervención física realizada para mitigar o solucionar totalmente el riesgo.</p>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2 pt-2 text-xs sm:text-sm">
              <span className="font-sans font-bold text-slate-800 uppercase tracking-wider text-xs block">Descripción del Trabajo Realizado</span>
              <p className="text-slate-600 leading-relaxed bg-slate-50/50 p-4 rounded-xl border border-slate-100 italic">
                "{imp.description}"
              </p>
            </div>

            {/* Action link */}
            <div className="flex justify-end pt-2 border-t border-slate-100">
              <button
                id={`btn-go-report-imp-${imp.reportId}`}
                onClick={() => onViewReport(imp.reportId)}
                className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs transition-all inline-flex items-center space-x-1.5 cursor-pointer"
              >
                <span>Ver historial completo de este caso</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
