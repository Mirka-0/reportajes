export type Severity = 'critico' | 'alto' | 'medio' | 'bajo';
export type Status = 'recibido' | 'revision' | 'publicado' | 'derivado' | 'atendido';

export type UserType =
  | 'padre_madre'
  | 'estudiante'
  | 'docente'
  | 'exalumno'
  | 'vecino_comunidad'
  | 'otro';

export interface Report {
  id: string;
  userType: UserType;
  dniFull: string; // solo visible por administrador
  dniMasked: string; // visible públicamente o por defecto
  privacyAccepted: boolean;
  category: string;
  severity: Severity;
  location: string;
  description: string;
  isActive: 'si' | 'no' | 'no_sure';
  evidenceUrl?: string;
  evidenceDriveUrl?: string;
  createdAt: string;
  status: Status;
  adminObservations?: string;
  derivedAuthority?: string;
  noPersonalDataChecked?: boolean;
  actionRequested?: string;
}

export interface Improvement {
  id: string;
  reportId: string;
  category: string;
  title: string;
  description: string;
  beforeImg: string;
  afterImg: string;
  date: string;
  status: 'parcial' | 'completa';
}

export interface ProjectTeamMember {
  name: string;
  role: string;
  description: string;
}
