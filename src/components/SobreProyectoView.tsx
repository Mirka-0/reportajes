import { GraduationCap, Users, Award, BookOpen, Key, Users2, Activity, HelpCircle } from 'lucide-react';
import { TEAM_MEMBERS } from '../data';

export default function SobreProyectoView() {
  const principles = [
    { title: 'Privacidad absoluta', desc: 'No recopilamos datos personales de menores y enmascaramos los datos de identificación de los reportantes.', icon: GraduationCap, color: 'text-[#D45D5D] bg-[#FFE3E3] border-[#FFC6C6]/40' },
    { title: 'Anonimato garantizado', desc: 'Los reportes publicados carecen de firmas, nombres o detalles que puedan conducir al señalamiento de personas.', icon: Key, color: 'text-indigo-600 bg-indigo-50 border-indigo-100' },
    { title: 'Transparencia de procesos', desc: 'Permitimos el seguimiento del estado físico de las alertas de forma clara para toda la comunidad vecinal.', icon: BookOpen, color: 'text-emerald-600 bg-emerald-50 border-emerald-100' },
    { title: 'Responsabilidad comunitaria', desc: 'Evitamos denuncias maliciosas y velamos por un lenguaje constructivo y técnico enfocado en infraestructura.', icon: Users, color: 'text-purple-600 bg-purple-50 border-purple-100' },
    { title: 'Seguridad escolar prioritaria', desc: 'Priorizamos aquellos riesgos con potencial de desastre físico para proteger la salud de los escolares.', icon: Award, color: 'text-amber-600 bg-amber-50 border-amber-100' },
    { title: 'Participación ciudadana', desc: 'Fomentamos canales colaborativos de fiscalización entre padres de familia, docentes y egresados.', icon: Users2, color: 'text-sky-600 bg-sky-50 border-sky-100' }
  ];

  return (
    <div className="space-y-12 py-8" id="sobre-proyecto-container">
      {/* Header section */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <span className="text-xs text-[#D45D5D] font-sans font-black uppercase tracking-wider block">Proyecto Universitario</span>
        <h1 className="text-3xl sm:text-4xl font-sans font-black text-slate-900 leading-tight">Sobre "Reportes Fe y Alegría"</h1>
        <p className="text-sm sm:text-base text-slate-500 leading-relaxed">
          Una plataforma digital y un protocolo de acción ciudadana diseñada para visibilizar de forma transparente, anónima y responsable los problemas graves de infraestructura física en la I.E. Fe y Alegría de San Juan de Lurigancho.
        </p>
      </div>

      {/* Main Mission Card */}
      <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-150 shadow-xs grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
        <div className="md:col-span-2 space-y-4">
          <h2 className="text-xl sm:text-2xl font-sans font-bold text-slate-800">Nuestra Misión</h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Nuestra propuesta académica nace bajo la convicción de que <strong>los colegios seguros empiezan con una participación ciudadana responsable</strong>. El deterioro físico silencioso de techos, instalaciones eléctricas expuestas o tuberías de desagüe rotas afectan directamente el rendimiento escolar y ponen en riesgo el bienestar de miles de menores.
          </p>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            A través de un canal tecnológico que filtra datos privados, empoderamos a padres de familia, alumnos y exalumnos para que alerten de forma segura sobre los riesgos de su entorno, sirviendo de puente de información constructiva hacia los comités de la APAFA, las autoridades directivas del plantel y la UGEL correspondiente.
          </p>
        </div>
        <div className="bg-gradient-to-br from-[#FFE3E3]/40 to-slate-50 p-6 rounded-2xl border border-[#FFC6C6]/40 text-center space-y-4">
          <div className="w-12 h-12 bg-white text-[#D45D5D] border border-[#FFC6C6]/60 rounded-full flex items-center justify-center mx-auto shadow-xs">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-sans font-black text-sm text-slate-800">100% Blindado</h4>
            <p className="text-[11px] text-slate-400 mt-1 leading-normal">
              Diseñado bajo estrictos lineamientos de privacidad para evitar la exposición o acoso a directivos o menores.
            </p>
          </div>
        </div>
      </div>

      {/* Principles Section */}
      <div className="space-y-6">
        <div className="text-center space-y-1">
          <h2 className="text-2xl font-sans font-bold text-slate-900">Principios Clave del Proyecto</h2>
          <p className="text-xs sm:text-sm text-slate-400">Nuestros pilares para una acción fiscalizadora transparente y confiable.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {principles.map((pr, i) => {
            const Icon = pr.icon;
            return (
              <div key={i} className="bg-white p-6 rounded-2xl border border-slate-150 shadow-xs space-y-3">
                <div className={`p-2.5 rounded-lg border inline-block ${pr.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-sans font-bold text-sm text-slate-800">{pr.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{pr.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Academic Team roles */}
      <div className="space-y-6 pt-6 border-t border-slate-100">
        <div className="text-center space-y-1">
          <h2 className="text-2xl font-sans font-bold text-slate-900">Equipo de Investigación y Proyecto</h2>
          <p className="text-xs sm:text-sm text-slate-400">Estudiantes responsables del diseño conceptual, técnico e implementación.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TEAM_MEMBERS.map((member, i) => (
            <div key={i} className="bg-slate-50/50 p-6 rounded-2xl border border-slate-150 text-center space-y-3 hover:border-slate-300 hover:bg-white transition-all">
              <div className="w-12 h-12 bg-[#FFE3E3]/60 text-[#D45D5D] border border-[#FFC6C6]/40 rounded-full flex items-center justify-center mx-auto font-sans font-black text-sm">
                {member.name.split(' ').map(w => w[0]).join('')}
              </div>
              <div>
                <h3 className="font-sans font-bold text-sm text-slate-800">{member.name}</h3>
                <span className="text-[10px] bg-[#FFE3E3] text-[#D45D5D] border border-[#FFC6C6]/30 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider block w-max mx-auto mt-1">
                  {member.role}
                </span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">{member.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
