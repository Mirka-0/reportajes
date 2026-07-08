import { GraduationCap, ArrowRight, Eye, CheckCircle2, AlertTriangle, HelpCircle, FileText, Sparkles, Zap, Droplet, Building, BookOpen, Layers } from 'lucide-react';
import { Report, Improvement } from '../types';

interface HomeViewProps {
  reports: Report[];
  improvements: Improvement[];
  setCurrentTab: (tab: string) => void;
}

export default function HomeView({ reports, improvements, setCurrentTab }: HomeViewProps) {
  // Compute real-time statistics
  const totalReceived = reports.length;
  const inRevision = reports.filter(r => r.status === 'recibido' || r.status === 'revision').length;
  const published = reports.filter(r => r.status === 'publicado' || r.status === 'derivado').length;
  const solved = reports.filter(r => r.status === 'atendido').length;

  const categoriesData = [
    { name: 'Techos', count: reports.filter(r => r.category === 'Techos').length, icon: Building, color: 'bg-emerald-50 text-emerald-700 border-emerald-100' },
    { name: 'Salones', count: reports.filter(r => r.category === 'Salones').length, icon: BookOpen, color: 'bg-indigo-50 text-indigo-700 border-indigo-100' },
    { name: 'Baños', count: reports.filter(r => r.category === 'Baños').length, icon: Droplet, color: 'bg-sky-50 text-sky-700 border-sky-100' },
    { name: 'Agua y saneamiento', count: reports.filter(r => r.category === 'Agua y saneamiento').length, icon: Droplet, color: 'bg-cyan-50 text-cyan-700 border-cyan-100' },
    { name: 'Electricidad', count: reports.filter(r => r.category === 'Electricidad').length, icon: Zap, color: 'bg-amber-50 text-amber-700 border-amber-100' },
    { name: 'Muros y estructuras', count: reports.filter(r => r.category === 'Muros y estructuras').length, icon: Layers, color: 'bg-rose-50 text-rose-700 border-rose-100' },
    { name: 'Mobiliario escolar', count: reports.filter(r => r.category === 'Mobiliario escolar').length, icon: Layers, color: 'bg-purple-50 text-purple-700 border-purple-100' },
    { name: 'Patio o zonas comunes', count: reports.filter(r => r.category === 'Patio o zonas comunes').length, icon: Layers, color: 'bg-slate-50 text-slate-700 border-slate-100' },
    { name: 'Otro', count: reports.filter(r => r.category === 'Otro').length, icon: HelpCircle, color: 'bg-slate-50 text-slate-700 border-slate-100' }
  ];

  return (
    <div className="space-y-16 py-8">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#FFE3E3]/30 via-[#FFF9DB]/20 to-white py-12 px-6 rounded-3xl border border-[#FFEAA7]/30" id="hero-section">
        <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
          <div className="inline-flex items-center space-x-2 bg-[#FFE3E3] border border-[#FFC6C6] px-4 py-1.5 rounded-full text-[#D45D5D] text-xs sm:text-sm font-bold tracking-wide uppercase">
            <GraduationCap className="w-4 h-4 text-[#D45D5D] animate-bounce" />
            <span>Colegios Seguros Empiezan Con Reportes Responsables</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-sans font-extrabold tracking-tight text-slate-900 leading-[1.1]">
            Visibilización <span className="text-[#D45D5D] underline decoration-[#FFEAA7] decoration-wavy">Ética y Segura</span> de la Infraestructura Escolar
          </h1>

          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Una plataforma para registrar de forma anónima problemas de infraestructura en la I.E. Fe y Alegría de San Juan de Lurigancho, protegiendo rigurosamente la identidad de estudiantes, padres y docentes.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              id="cta-reportar"
              onClick={() => setCurrentTab('reportar')}
              className="w-full sm:w-auto px-8 py-4 bg-[#FFE3E3] hover:bg-[#FFD1D1] text-[#5C2121] text-base font-extrabold rounded-xl border border-[#FFC6C6] shadow-sm transition-all hover:translate-y-[-2px] inline-flex items-center justify-center space-x-2 cursor-pointer"
            >
              <span>Reportar un problema</span>
              <ArrowRight className="w-5 h-5 text-[#5C2121]" />
            </button>
            <button
              id="cta-ver-reportes"
              onClick={() => setCurrentTab('muro')}
              className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-[#FFF9DB]/40 text-slate-800 text-base font-bold rounded-xl border border-slate-200 transition-all hover:translate-y-[-2px] inline-flex items-center justify-center space-x-2 cursor-pointer"
            >
              <Eye className="w-5 h-5 text-slate-500" />
              <span>Ver casos publicados</span>
            </button>
          </div>
        </div>

        {/* Backdrop Graphic Accents */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-[#FFE3E3] rounded-full blur-3xl opacity-35 -translate-x-12 -translate-y-12"></div>
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-[#FFF9DB] rounded-full blur-3xl opacity-35 translate-x-16 translate-y-16"></div>
      </section>

      {/* Statistics Block */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6" id="stats-section">
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between hover:border-slate-200 transition-colors">
          <span className="text-slate-500 text-xs sm:text-sm font-semibold uppercase tracking-wider block mb-2">Reportes Recibidos</span>
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl sm:text-4xl font-sans font-bold text-slate-800">{totalReceived}</span>
            <span className="text-emerald-500 text-xs font-semibold">Total</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between hover:border-slate-200 transition-colors">
          <span className="text-slate-500 text-xs sm:text-sm font-semibold uppercase tracking-wider block mb-2">Casos en Revisión</span>
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl sm:text-4xl font-sans font-bold text-slate-800">{inRevision}</span>
            <span className="text-amber-500 text-xs font-semibold">Validando</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between hover:border-slate-200 transition-colors">
          <span className="text-slate-500 text-xs sm:text-sm font-semibold uppercase tracking-wider block mb-2">Casos Publicados</span>
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl sm:text-4xl font-sans font-bold text-slate-800">{published}</span>
            <span className="text-rose-500 text-xs font-semibold">Visibles</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between hover:border-slate-200 transition-colors">
          <span className="text-slate-500 text-xs sm:text-sm font-semibold uppercase tracking-wider block mb-2">Mejoras Registradas</span>
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl sm:text-4xl font-sans font-bold text-slate-800">{solved}</span>
            <span className="text-emerald-600 text-xs font-semibold">Atendidos</span>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="space-y-8" id="how-it-works">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-sans font-bold tracking-tight text-slate-900">¿Cómo funciona la plataforma?</h2>
          <p className="text-sm sm:text-base text-slate-500 max-w-xl mx-auto">
            El flujo garantiza que la información se maneje con extrema reserva ética antes de ser publicada.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {[
            {
              step: '1',
              title: 'Identificación segura',
              desc: 'Se ingresa el DNI para evitar spam. El DNI se enmascara de inmediato y nunca se expone.'
            },
            {
              step: '2',
              title: 'Reporte con evidencia',
              desc: 'Describe el riesgo físico y adjunta una foto cuidando de no mostrar rostros ni uniformes.'
            },
            {
              step: '3',
              title: 'Revisión y anonimato',
              desc: 'El equipo verifica la veracidad y borra cualquier dato personal o visual de menores.'
            },
            {
              step: '4',
              title: 'Publicación responsable',
              desc: 'El problema se publica en el muro sin nombres para sensibilizar e informar a la comunidad.'
            },
            {
              step: '5',
              title: 'Seguimiento del caso',
              desc: 'Se actualiza el estado de atención y se deriva de forma oficial a dirección, APAFA o UGEL.'
            }
          ].map((item, index) => (
            <div key={index} className="bg-slate-50 p-6 rounded-xl border border-slate-100 relative hover:shadow-sm transition-all">
              <span className="absolute -top-3 left-4 w-8 h-8 rounded-full bg-[#FFE3E3] text-[#D45D5D] font-sans font-black flex items-center justify-center text-sm border-2 border-white shadow-sm">
                {item.step}
              </span>
              <h3 className="font-sans font-bold text-sm text-slate-800 mt-2 mb-2">{item.title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Categories Grid */}
      <section className="space-y-8" id="categories-section">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-sans font-bold tracking-tight text-slate-900">Categorías de Infraestructura</h2>
          <p className="text-sm sm:text-base text-slate-500 max-w-xl mx-auto">
            Haz clic en una categoría para registrar un nuevo problema o evaluar las áreas afectadas.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {categoriesData.map((cat, idx) => {
            const IconComp = cat.icon;
            return (
              <button
                key={idx}
                id={`cat-card-${cat.name}`}
                onClick={() => setCurrentTab('reportar')}
                className="p-5 bg-white rounded-xl border border-slate-100 shadow-xs hover:border-slate-300 hover:shadow-sm transition-all text-left flex flex-col justify-between group h-36 cursor-pointer"
              >
                <div className={`p-2.5 rounded-lg border inline-block ${cat.color}`}>
                  <IconComp className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-sans font-bold text-sm text-slate-800 group-hover:text-[#D45D5D] transition-colors">
                    {cat.name}
                  </h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {cat.count} {cat.count === 1 ? 'reporte' : 'reportes'}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Ethical Statement (Sección Ética) */}
      <section className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden" id="ethics-section">
        <div className="max-w-3xl relative z-10 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-slate-800 border border-slate-700 rounded-full text-xs text-rose-300 font-semibold tracking-wider uppercase">
            <span>Declaración de Privacidad y Ética</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-sans font-black tracking-tight text-white">
            Nuestro Compromiso de Responsabilidad
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Esta plataforma no busca atacar a personas, gestiones ni instituciones educativas. Nuestro propósito absoluto es visibilizar riesgos estructurales reales de forma objetiva para promover la oportuna asignación de mantenimiento y resguardar la integridad de los escolares. 
          </p>
          <div className="border-t border-slate-800 pt-4 mt-6">
            <p className="text-rose-400 font-sans font-bold text-xs sm:text-sm">
              * Protegemos la identidad de estudiantes, docentes, padres y denunciantes bajo estrictas políticas de anonimización.
            </p>
          </div>
        </div>

        {/* abstract vector */}
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 bg-rose-500 rounded-full filter blur-[120px] opacity-15"></div>
      </section>
    </div>
  );
}
