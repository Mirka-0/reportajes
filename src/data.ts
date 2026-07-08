import { Report, Improvement, ProjectTeamMember } from './types';

export const INITIAL_REPORTS: Report[] = [
  {
    id: 'RFA-0001',
    userType: 'padre_madre',
    dniFull: '09876543',
    dniMasked: '0****543',
    privacyAccepted: true,
    category: 'Techos',
    severity: 'critico',
    location: 'Aula de primaria - Pabellón A',
    description: 'Se observa deterioro grave en parte del cielorraso del techo, con desprendimiento de material de concreto y filtraciones de humedad que podrían representar riesgo físico inminente durante las clases.',
    isActive: 'si',
    evidenceUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=600', // representative broken structure
    createdAt: '2026-07-02T08:30:00Z',
    status: 'publicado',
    adminObservations: 'Se constató el riesgo de desprendimiento de concreto en el pabellón de primaria. Se procedió a clausurar temporalmente el aula afectada.',
    derivedAuthority: 'Dirección del colegio',
    noPersonalDataChecked: true,
    actionRequested: 'Se solicita una evaluación e intervención técnica de urgencia por parte de la UGEL y el área de infraestructura para reparar la losa del techo.'
  },
  {
    id: 'RFA-0002',
    userType: 'estudiante',
    dniFull: '71625344',
    dniMasked: '7****344',
    privacyAccepted: true,
    category: 'Baños',
    severity: 'alto',
    location: 'Baños de secundaria - Varones',
    description: 'Tres de los inodoros están completamente atorados e inutilizables por falta de repuestos de grifería y hay fugas de agua constantes que inundan el pasillo de ingreso, generando focos de infección.',
    isActive: 'si',
    evidenceUrl: 'https://images.unsplash.com/photo-1585131838081-3ee34270e5a8?auto=format&fit=crop&q=80&w=600', // pipeline
    createdAt: '2026-06-28T14:15:00Z',
    status: 'publicado',
    adminObservations: 'Verificado. Se notificó al personal de limpieza, pero se requiere cambio de tuberías de desagüe y sanitarios.',
    derivedAuthority: 'APAFA',
    noPersonalDataChecked: true,
    actionRequested: 'Se solicita que la APAFA destine fondos de mantenimiento para cambiar las válvulas de descarga e inodoros deteriorados.'
  },
  {
    id: 'RFA-0003',
    userType: 'docente',
    dniFull: '40291822',
    dniMasked: '4****822',
    privacyAccepted: true,
    category: 'Electricidad',
    severity: 'critico',
    location: 'Pasillo posterior de talleres',
    description: 'Cables eléctricos de alta tensión expuestos y colgantes sin canaletas de seguridad, al alcance de los estudiantes de secundaria. Hay peligro latente de cortocircuito en días de llovizna.',
    isActive: 'si',
    evidenceUrl: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80&w=600', // cables
    createdAt: '2026-07-01T10:00:00Z',
    status: 'revision', // This will start in "revision" to allow the user to approve/publish it from the admin panel!
    adminObservations: '',
    derivedAuthority: '',
    noPersonalDataChecked: false,
    actionRequested: 'Mapeo preliminar de riesgo eléctrico en el pabellón técnico.'
  },
  {
    id: 'RFA-0004',
    userType: 'vecino_comunidad',
    dniFull: '10293847',
    dniMasked: '1****847',
    privacyAccepted: true,
    category: 'Agua y saneamiento',
    severity: 'alto',
    location: 'Pozo cisterna secundario - Patio técnico',
    description: 'El pozo cisterna que abastece al sector sur tiene una fisura estructural considerable y está perdiendo agua limpia, lo que provoca desabastecimiento total de agua durante los turnos de la tarde.',
    isActive: 'si',
    createdAt: '2026-06-25T16:40:00Z',
    status: 'derivado',
    adminObservations: 'Caso derivado de forma oficial a las oficinas de UGEL San Juan de Lurigancho para el financiamiento de la reparación del tanque elevado y cisterna.',
    derivedAuthority: 'UGEL',
    noPersonalDataChecked: true,
    actionRequested: 'Se solicita la inspección técnica urgente por parte del área de infraestructura de la UGEL 05 para programar la impermeabilización del tanque cisterna.'
  },
  {
    id: 'RFA-0005',
    userType: 'padre_madre',
    dniFull: '08346123',
    dniMasked: '0****123',
    privacyAccepted: true,
    category: 'Mobiliario escolar',
    severity: 'bajo',
    location: 'Aulas de 3er grado - Primaria',
    description: 'Varias carpetas de madera se encuentran rotas, desportilladas y con clavos sobresalientes, lo que ha ocasionado raspones en los alumnos y daños constantes en sus uniformes escolares.',
    isActive: 'no',
    createdAt: '2026-06-15T11:20:00Z',
    status: 'atendido',
    adminObservations: 'Se coordinó una jornada de carpintería comunitaria organizada por la APAFA del colegio. Se repararon todas las carpetas dañadas del nivel primario.',
    derivedAuthority: 'APAFA',
    noPersonalDataChecked: true,
    actionRequested: 'Se completó el reacondicionamiento del mobiliario para garantizar la comodidad física de los escolares.'
  }
];

export const INITIAL_IMPROVEMENTS: Improvement[] = [
  {
    id: 'IMP-0001',
    reportId: 'RFA-0005',
    category: 'Mobiliario escolar',
    title: 'Reparación de carpetas de 3er grado',
    description: 'Gracias a la alerta responsable de los padres de familia y la rápida organización de la APAFA, se llevó a cabo una faena de carpintería el fin de semana. Se repararon y barnizaron 25 carpetas escolares que tenían astillas y clavos expuestos.',
    beforeImg: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&q=80&w=600', // old wood
    afterImg: 'https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&q=80&w=600', // clean study desk
    date: '2026-06-22',
    status: 'completa'
  },
  {
    id: 'IMP-0002',
    reportId: 'RFA-0001',
    category: 'Techos',
    title: 'Aislamiento de zona de peligro y plan de obra',
    description: 'Tras reportarse las rajaduras graves en el cielorraso, la Dirección del colegio procedió a reubicar a los alumnos a una sala de cómputo segura de forma temporal. Se colocó malla de seguridad y la UGEL 05 ha agendado la visita técnica de un ingeniero para la reparación estructural.',
    beforeImg: 'https://images.unsplash.com/photo-1541123437800-1bb1317badc2?auto=format&fit=crop&q=80&w=600', // damaged ceiling
    afterImg: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=600', // safety mesh / construction
    date: '2026-07-03',
    status: 'parcial'
  }
];

export const TEAM_MEMBERS: ProjectTeamMember[] = [
  {
    name: 'Mirkala Gutierrez',
    role: 'Gerente del proyecto',
    description: 'Encargada de la dirección general de la iniciativa, coordinando con actores vecinales e institucionales para asegurar la viabilidad del proyecto.'
  },
  {
    name: 'Renato Vilchez',
    role: 'Líder de investigación',
    description: 'Responsable del diagnóstico de vulnerabilidades de infraestructura escolar y de procesar de forma segura las alertas ciudadanas recibidas.'
  },
  {
    name: 'Luciana Marin',
    role: 'Líder creativo',
    description: 'Diseñadora de la experiencia interactiva, garantizando que el reporte sea sumamente sencillo de realizar y proteja visualmente los datos sensibles.'
  },
  {
    name: 'Alfonso Carbajal',
    role: 'Coordinador de extensión',
    description: 'Enlace directo con el personal directivo, APAFA y delegaciones de San Juan de Lurigancho para derivar formalmente las alertas validadas.'
  }
];

export const CATEGORIES = [
  'Techos',
  'Salones',
  'Baños',
  'Agua y saneamiento',
  'Electricidad',
  'Muros y estructuras',
  'Mobiliario escolar',
  'Patio o zonas comunes',
  'Otro'
];

export const USER_TYPE_LABELS: Record<string, string> = {
  padre_madre: 'Padre/madre de familia',
  estudiante: 'Estudiante',
  docente: 'Docente',
  exalumno: 'Exalumno',
  vecino_comunidad: 'Vecino/comunidad',
  otro: 'Otro'
};
