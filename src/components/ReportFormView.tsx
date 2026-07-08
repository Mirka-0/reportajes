import React, { useState } from 'react';
import { GraduationCap, AlertTriangle, ArrowLeft, ArrowRight, CheckCircle2, Lock, Upload, Image, HelpCircle } from 'lucide-react';
import { Report, UserType, Severity } from '../types';
import { CATEGORIES, USER_TYPE_LABELS } from '../data';

interface ReportFormViewProps {
  onAddReport: (report: Report) => void;
  onGoToReport: (id: string) => void;
  nextReportId: string;
}

// Preset demo images so the user can easily select one during academic exhibition
const DEMO_PRESET_IMAGES = [
  { label: 'Humedad / Grietas', url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=600' },
  { label: 'Cables Expuestos', url: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80&w=600' },
  { label: 'Carpeta Deteriorada', url: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&q=80&w=600' },
  { label: 'Baños Malogrados', url: 'https://images.unsplash.com/photo-1585131838081-3ee34270e5a8?auto=format&fit=crop&q=80&w=600' },
];

export default function ReportFormView({ onAddReport, onGoToReport, nextReportId }: ReportFormViewProps) {
  const [step, setStep] = useState(1);
  const [submittedId, setSubmittedId] = useState<string | null>(null);

  // Form states
  const [userType, setUserType] = useState<UserType>('padre_madre');
  const [dni, setDni] = useState('');
  const [privacyAccepted, setPrivacyAccepted] = useState(false);

  const [category, setCategory] = useState('Techos');
  const [severity, setSeverity] = useState<Severity>('medio');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [isActive, setIsActive] = useState<'si' | 'no' | 'no_sure'>('si');

  const [evidenceUrl, setEvidenceUrl] = useState('');
  const [evidenceDriveUrl, setEvidenceDriveUrl] = useState('');
  const [evidenceChecked, setEvidenceChecked] = useState(false);

  // Validation error states
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Mask DNI helper
  const maskDni = (val: string) => {
    if (val.length !== 8) return '';
    return `${val[0]}****${val[5]}${val[6]}${val[7]}`;
  };

  // Field validation per step
  const validateStep = (currentStep: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (currentStep === 1) {
      if (!dni || dni.length !== 8 || !/^\d+$/.test(dni)) {
        newErrors.dni = 'El DNI debe tener exactamente 8 dígitos numéricos.';
      }
      if (!privacyAccepted) {
        newErrors.privacy = 'Debe aceptar los términos de revisión y privacidad para continuar.';
      }
    }

    if (currentStep === 2) {
      if (!category) {
        newErrors.category = 'Seleccione una categoría de reporte.';
      }
      if (!severity) {
        newErrors.severity = 'Seleccione la gravedad.';
      }
      if (!location.trim()) {
        newErrors.location = 'Escriba la ubicación del problema dentro del colegio (ej. Aula 4A secundaria).';
      }
      if (!description.trim() || description.trim().length < 20) {
        newErrors.description = 'La descripción detallada debe tener al menos 20 caracteres.';
      }
    }

    if (currentStep === 3) {
      if (!evidenceChecked) {
        newErrors.evidenceChecked = 'Debe confirmar que la evidencia no vulnera datos personales ni rostros.';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    setStep((prev) => prev - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(3)) {
      setStep(3);
      return;
    }

    const newReport: Report = {
      id: nextReportId,
      userType,
      dniFull: dni,
      dniMasked: maskDni(dni),
      privacyAccepted,
      category,
      severity,
      location,
      description,
      isActive,
      evidenceUrl: evidenceUrl || undefined,
      evidenceDriveUrl: evidenceDriveUrl || undefined,
      createdAt: new Date().toISOString(),
      status: 'recibido', // starts as received for admin approval
      adminObservations: '',
      derivedAuthority: '',
      noPersonalDataChecked: evidenceChecked,
      actionRequested: `Se solicita inspección técnica de ${category.toLowerCase()} en ${location} para mitigar riesgos.`
    };

    onAddReport(newReport);
    setSubmittedId(nextReportId);
  };

  const handleReset = () => {
    setStep(1);
    setSubmittedId(null);
    setDni('');
    setPrivacyAccepted(false);
    setUserType('padre_madre');
    setCategory('Techos');
    setSeverity('medio');
    setLocation('');
    setDescription('');
    setIsActive('si');
    setEvidenceUrl('');
    setEvidenceDriveUrl('');
    setEvidenceChecked(false);
    setErrors({});
  };

  if (submittedId) {
    return (
      <div className="max-w-xl mx-auto py-12 px-6" id="report-success-screen">
        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-md text-center space-y-6">
          <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full border border-emerald-100 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-sans font-extrabold text-slate-900">¡Reporte Enviado Correctamente!</h2>
            <p className="text-slate-500 text-sm">
              Tu reporte ha ingresado de manera anónima y segura a nuestra base de datos.
            </p>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-150 inline-block">
            <span className="text-xs text-slate-400 font-sans font-medium uppercase tracking-wider block">Código de seguimiento</span>
            <span className="text-2xl font-mono font-black text-[#D45D5D] tracking-wider">{submittedId}</span>
          </div>

          <div className="text-xs text-slate-500 text-left bg-[#FFE3E3]/40 p-4 rounded-xl border border-[#FFC6C6]/60 space-y-2">
            <span className="font-bold text-[#5C2121] block">¿Qué pasa ahora?</span>
            <p className="leading-relaxed">
              1. <strong>Filtro de Privacidad:</strong> El equipo verificará que no figuren nombres, rostros ni datos personales visibles en la descripción ni imágenes.<br />
              2. <strong>Publicación:</strong> Una vez aprobado, figurará en el <strong>Muro de Reportes Públicos</strong> con tu identidad completamente enmascarada.<br />
              3. <strong>Derivación:</strong> El caso se remitirá a la Dirección, APAFA o UGEL correspondiente.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              id="success-go-status"
              onClick={() => onGoToReport(submittedId)}
              className="w-full sm:w-auto px-6 py-3 bg-[#FFE3E3] hover:bg-[#FFD1D1] text-[#5C2121] font-bold rounded-xl text-sm shadow-xs border border-[#FFC6C6] transition-all cursor-pointer"
            >
              Ver estado del reporte
            </button>
            <button
              id="success-another-report"
              onClick={handleReset}
              className="w-full sm:w-auto px-6 py-3 bg-white hover:bg-slate-50 text-slate-700 font-bold border border-slate-200 rounded-xl text-sm transition-all cursor-pointer"
            >
              Enviar otro reporte
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 sm:px-6" id="report-form-container">
      {/* Page Title & Context */}
      <div className="text-center mb-8 space-y-2">
        <h1 className="text-3xl font-sans font-black text-slate-900">Nuevo Reporte de Infraestructura</h1>
        <p className="text-sm text-slate-500 max-w-lg mx-auto">
          Completa el formulario paso a paso. Tu identidad está 100% protegida. No publicaremos datos personales.
        </p>
      </div>

      {/* Step Indicator Progress Bar */}
      <div className="mb-10" id="step-indicator">
        <div className="flex items-center justify-between">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className="flex flex-col items-center flex-1 relative">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-sans font-bold text-sm border-2 z-10 transition-all ${
                  step === s
                    ? 'bg-[#FFE3E3] border-[#FFC6C6] text-[#D45D5D] shadow-xs'
                    : step > s
                    ? 'bg-emerald-500 border-emerald-500 text-white'
                    : 'bg-white border-slate-200 text-slate-400'
                }`}
              >
                {step > s ? '✓' : s}
              </div>
              <span
                className={`text-[10px] sm:text-xs mt-2 font-medium ${
                  step === s ? 'text-slate-800 font-bold' : 'text-slate-400'
                }`}
              >
                {s === 1 && 'Identificación'}
                {s === 2 && 'Información'}
                {s === 3 && 'Evidencia'}
                {s === 4 && 'Confirmar'}
              </span>

              {/* connector lines */}
              {s < 4 && (
                <div
                  className={`absolute top-5 left-[50%] right-[-50%] h-0.5 z-0 ${
                    step > s ? 'bg-emerald-500' : 'bg-slate-200'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Main Wizard Form Container */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 sm:p-10">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* STEP 1: IDENTIFICACIÓN SEGURA */}
          {step === 1 && (
            <div className="space-y-6" id="step-1-form">
              <div className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-100 flex items-start space-x-3">
                <GraduationCap className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                <div className="text-xs text-slate-600 space-y-1">
                  <span className="font-bold text-emerald-800 block">Privacidad Protegida</span>
                  <p className="leading-relaxed">
                    Solicitamos tu DNI únicamente para validar que eres un miembro real de la comunidad educativa y evitar reportes ficticios o repetidos. El DNI permanecerá rigurosamente guardado bajo enmascaramiento y <strong>nunca</strong> será revelado en la web pública.
                  </p>
                </div>
              </div>

              {/* User Type */}
              <div className="space-y-2">
                <label className="block text-sm font-bold text-slate-800">1. Tipo de usuario reportante</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {(Object.keys(USER_TYPE_LABELS) as UserType[]).map((key) => (
                    <button
                      key={key}
                      type="button"
                      id={`user-type-btn-${key}`}
                      onClick={() => setUserType(key)}
                      className={`px-4 py-3 rounded-xl border text-xs sm:text-sm font-medium transition-all text-center cursor-pointer ${
                        userType === key
                          ? 'bg-[#FFE3E3] border-[#FFC6C6] text-[#D45D5D] font-bold'
                          : 'bg-white border-slate-200 text-slate-600 hover:bg-[#FFF9DB]/40'
                      }`}
                    >
                      {USER_TYPE_LABELS[key]}
                    </button>
                  ))}
                </div>
              </div>

              {/* DNI Validation */}
              <div className="space-y-2">
                <label htmlFor="dni-input" className="block text-sm font-bold text-slate-800">
                  2. DNI para validación interna
                </label>
                <input
                  type="text"
                  id="dni-input"
                  maxLength={8}
                  placeholder="Ej. 70123456"
                  value={dni}
                  onChange={(e) => setDni(e.target.value.replace(/\D/g, ''))}
                  className={`w-full px-4 py-3 rounded-xl border text-sm font-mono focus:outline-none focus:ring-2 ${
                    errors.dni
                      ? 'border-rose-400 focus:ring-rose-200'
                      : 'border-slate-200 focus:ring-rose-100'
                  }`}
                />
                <p className="text-xs text-slate-400">
                  ⚠️ Este dato solo se usa para evitar reportes falsos. Se guardará de manera enmascarada (ej. {dni.length === 8 ? maskDni(dni) : '7****321'}). No será publicado bajo ninguna circunstancia.
                </p>
                {errors.dni && <p className="text-xs text-rose-500 font-bold">{errors.dni}</p>}
              </div>

              {/* Privacy Checkbox */}
              <div className="pt-4 border-t border-slate-100">
                <label className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    id="privacy-accept-checkbox"
                    checked={privacyAccepted}
                    onChange={(e) => setPrivacyAccepted(e.target.checked)}
                    className="mt-1 h-4 p-4 rounded text-rose-600 focus:ring-rose-500 border-slate-300"
                  />
                  <span className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Acepto de forma voluntaria que mi reporte sea evaluado por el equipo de seguridad y publicado de forma estrictamente <strong>anónima</strong> si cumple con las normas de privacidad establecidas.
                  </span>
                </label>
                {errors.privacy && <p className="text-xs text-rose-500 font-bold mt-2">{errors.privacy}</p>}
              </div>
            </div>
          )}

          {/* STEP 2: INFORMACIÓN DEL PROBLEMA */}
          {step === 2 && (
            <div className="space-y-6" id="step-2-form">
              {/* Category */}
              <div className="space-y-2">
                <label htmlFor="category-select" className="block text-sm font-bold text-slate-800">Categoría del problema</label>
                <select
                  id="category-select"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-rose-100 bg-white"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Severity Level */}
              <div className="space-y-2">
                <label className="block text-sm font-bold text-slate-800">Nivel de gravedad del riesgo</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { id: 'critico', title: 'Crítico', desc: 'Riesgo inminente para la vida o la salud física escolar.' },
                    { id: 'alto', title: 'Alto', desc: 'Afecta directamente el dictado de clases o la seguridad.' },
                    { id: 'medio', title: 'Medio', desc: 'Incomodidad importante, pero sin peligro inminente.' },
                    { id: 'bajo', title: 'Bajo', desc: 'Requiere mejora estética o de infraestructura menor.' }
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      id={`severity-btn-${item.id}`}
                      onClick={() => setSeverity(item.id as Severity)}
                      className={`p-4 rounded-xl border text-left transition-all flex flex-col justify-between h-24 cursor-pointer ${
                        severity === item.id
                          ? 'bg-[#FFE3E3] border-[#FFC6C6] text-slate-900 ring-2 ring-[#FFC6C6]'
                          : 'bg-white border-slate-200 text-slate-600 hover:bg-[#FFF9DB]/40'
                      }`}
                    >
                      <span className={`text-xs font-bold uppercase ${
                        item.id === 'critico' ? 'text-[#D45D5D]' :
                        item.id === 'alto' ? 'text-amber-600' :
                        item.id === 'medio' ? 'text-yellow-600' : 'text-blue-600'
                      }`}>{item.title}</span>
                      <span className="text-[11px] text-slate-500 leading-tight block mt-1">{item.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Exact Location */}
              <div className="space-y-2">
                <label htmlFor="location-input" className="block text-sm font-bold text-slate-800">Ubicación específica dentro del colegio</label>
                <input
                  type="text"
                  id="location-input"
                  placeholder="Ej. Baño de secundaria de varones, Aula 3er grado B primaria, Patio posterior"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 ${
                    errors.location ? 'border-rose-400 focus:ring-rose-200' : 'border-slate-200 focus:ring-rose-100'
                  }`}
                />
                {errors.location && <p className="text-xs text-rose-500 font-bold">{errors.location}</p>}
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label htmlFor="description-input" className="block text-sm font-bold text-slate-800">Descripción detallada del problema (mínimo 20 caracteres)</label>
                <textarea
                  id="description-input"
                  rows={4}
                  placeholder="Describe qué ocurre, desde cuándo pasa y cómo afecta el normal dictado de clases de los estudiantes..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 ${
                    errors.description ? 'border-rose-400 focus:ring-rose-200' : 'border-slate-200 focus:ring-rose-100'
                  }`}
                />
                <div className="flex justify-between items-center text-xs text-slate-400">
                  <span>Por favor, sé objetivo. No menciones nombres propios de docentes ni autoridades.</span>
                  <span>{description.length} caracteres</span>
                </div>
                {errors.description && <p className="text-xs text-rose-500 font-bold">{errors.description}</p>}
              </div>

              {/* Is Active Question */}
              <div className="space-y-2">
                <label className="block text-sm font-bold text-slate-800">¿El problema sigue activo en la actualidad?</label>
                <div className="flex space-x-3">
                  {[
                    { id: 'si', label: 'Sí, continúa' },
                    { id: 'no', label: 'No, ya lo resolvieron' },
                    { id: 'no_sure', label: 'No estoy seguro / Parcial' }
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      id={`active-btn-${opt.id}`}
                      onClick={() => setIsActive(opt.id as 'si' | 'no' | 'no_sure')}
                      className={`px-4 py-2.5 rounded-xl border text-xs sm:text-sm font-medium cursor-pointer ${
                        isActive === opt.id
                          ? 'bg-slate-900 text-white border-slate-900'
                          : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: EVIDENCIA VISUAL */}
          {step === 3 && (
            <div className="space-y-6" id="step-3-form">
              <div className="bg-[#FFE3E3] border border-[#FFC6C6] p-5 rounded-2xl flex items-start space-x-3">
                <AlertTriangle className="w-5 h-5 text-[#D45D5D] mt-0.5 flex-shrink-0 animate-bounce" />
                <div className="text-xs sm:text-sm text-[#5C2121] space-y-1">
                  <span className="font-sans font-black">ADVERTENCIA MUY IMPORTANTE</span>
                  <p className="leading-relaxed">
                    Por motivos de estricta protección al menor, <strong>NO SUBAS NI PUBLIQUES FOTOS DONDE APAREZCAN ROSTROS</strong> de estudiantes, uniformes identificables con nombres de alumnos, insignias personalizadas, documentos personales ni datos sensibles. Sube solo capturas enfocadas directamente en el daño del material (fierro expuesto, cañería rota, madera dañada).
                  </p>
                </div>
              </div>

              {/* Evidence Options */}
              <div className="space-y-4">
                <label className="block text-sm font-bold text-slate-800">Cargar foto / Evidencia digital</label>

                {/* Preset Picker for Demo */}
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                  <span className="text-xs font-bold text-slate-700 block">Demostración: Selecciona una imagen de prueba</span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {DEMO_PRESET_IMAGES.map((preset, i) => (
                      <button
                        key={i}
                        type="button"
                        id={`preset-img-btn-${i}`}
                        onClick={() => setEvidenceUrl(preset.url)}
                        className={`p-2 rounded-lg border text-left bg-white text-[10px] font-bold transition-all relative overflow-hidden h-20 flex flex-col justify-end cursor-pointer ${
                          evidenceUrl === preset.url ? 'ring-2 ring-[#D45D5D] border-[#D45D5D]' : 'border-slate-200 hover:border-slate-300'
                        }`}
                        style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.7)), url(${preset.url})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                      >
                        <span className="text-white drop-shadow-sm truncate w-full">{preset.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="text-center py-1 font-sans text-xs text-slate-400">— o ingresa datos manualmente —</div>

                {/* Manual Url */}
                <div className="space-y-2">
                  <label htmlFor="evidence-url-input" className="block text-xs font-bold text-slate-500">URL de Imagen (opcional)</label>
                  <input
                    type="url"
                    id="evidence-url-input"
                    placeholder="https://ejemplo.com/foto_vulnerabilidad.jpg"
                    value={evidenceUrl}
                    onChange={(e) => setEvidenceUrl(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-rose-100"
                  />
                </div>

                {/* Drive Url */}
                <div className="space-y-2">
                  <label htmlFor="drive-url-input" className="block text-xs font-bold text-slate-500">Enlace de Google Drive / Carpeta adicional (opcional)</label>
                  <input
                    type="url"
                    id="drive-url-input"
                    placeholder="https://drive.google.com/drive/folders/..."
                    value={evidenceDriveUrl}
                    onChange={(e) => setEvidenceDriveUrl(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-rose-100"
                  />
                  <p className="text-[10px] text-slate-400">Puedes adjuntar una carpeta si tienes varias evidencias o un video extenso.</p>
                </div>
              </div>

              {/* Confirm Image check */}
              <div className="pt-4 border-t border-slate-100">
                <label className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    id="evidence-check"
                    checked={evidenceChecked}
                    onChange={(e) => setEvidenceChecked(e.target.checked)}
                    className="mt-1 h-4 p-4 rounded text-rose-600 focus:ring-rose-500 border-slate-300"
                  />
                  <span className="text-xs sm:text-sm text-slate-600 leading-relaxed font-bold text-rose-900">
                    Confirmo que revisé la evidencia digital cargada y NO CONTIENE rostros de alumnos, nombres visibles, datos de contacto ni ningún tipo de información sensible de menores de edad.
                  </span>
                </label>
                {errors.evidenceChecked && <p className="text-xs text-rose-500 font-bold mt-2">{errors.evidenceChecked}</p>}
              </div>
            </div>
          )}

          {/* STEP 4: VISTA PREVIA */}
          {step === 4 && (
            <div className="space-y-6" id="step-4-preview">
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-150 space-y-4">
                <div className="flex justify-between items-start border-b border-slate-200 pb-3">
                  <div>
                    <span className="text-[10px] text-rose-600 font-sans font-black uppercase tracking-wider block">Vista Previa Responsable</span>
                    <h3 className="font-sans font-bold text-base text-slate-900">Estado Borrador de Alerta</h3>
                  </div>
                  <span className="bg-slate-200 text-slate-700 px-3 py-1 rounded-full text-xs font-semibold">
                    {USER_TYPE_LABELS[userType]}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-slate-400 block mb-0.5">Categoría</span>
                    <span className="font-bold text-slate-800 text-sm">{category}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block mb-0.5">Ubicación general</span>
                    <span className="font-bold text-slate-800 text-sm">{location}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block mb-0.5">Nivel de riesgo</span>
                    <span className={`inline-block px-2 py-0.5 rounded-md font-sans font-bold uppercase tracking-wider ${
                      severity === 'critico' ? 'bg-rose-100 text-rose-700' :
                      severity === 'alto' ? 'bg-amber-100 text-amber-700' :
                      severity === 'medio' ? 'bg-yellow-100 text-yellow-700' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {severity.toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block mb-0.5">Validación de DNI</span>
                    <span className="font-mono text-slate-700 text-sm">{maskDni(dni)}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 text-xs">
                  <span className="text-slate-400 block mb-1">Descripción del caso</span>
                  <p className="text-slate-700 italic leading-relaxed whitespace-pre-wrap">{description}</p>
                </div>

                {evidenceUrl && (
                  <div className="pt-3 border-t border-slate-100">
                    <span className="text-slate-400 text-xs block mb-2">Evidencia Fotográfica</span>
                    <div className="aspect-video w-full max-h-56 rounded-xl overflow-hidden border border-slate-200 bg-slate-100">
                      <img src={evidenceUrl} alt="Vista previa evidencia" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                  </div>
                )}

                {evidenceDriveUrl && (
                  <div className="text-xs pt-2">
                    <span className="text-slate-400 block">Enlace a Google Drive adicional</span>
                    <a href={evidenceDriveUrl} target="_blank" rel="noopener noreferrer" className="text-rose-600 underline font-semibold truncate block">
                      {evidenceDriveUrl}
                    </a>
                  </div>
                )}
              </div>

              {/* Ethics final check notice */}
              <div className="bg-rose-50/70 p-4 rounded-xl border border-rose-100 flex items-start space-x-3 text-xs text-rose-800">
                <Lock className="w-4 h-4 text-rose-600 mt-0.5 flex-shrink-0" />
                <p className="leading-relaxed">
                  <strong>Tu identidad no será publicada en absoluto.</strong> Esta información ingresará primero en un estado de revisión. Solo las personas asignadas como administración de "Reportes Fe y Alegría" validarán los datos para proceder a publicarlo de manera 100% anónima.
                </p>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-6 border-t border-slate-100">
            {step > 1 ? (
              <button
                type="button"
                id="form-btn-prev"
                onClick={handlePrev}
                className="px-6 py-3 border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 font-bold rounded-xl text-sm transition-all inline-flex items-center space-x-1.5 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Atrás</span>
              </button>
            ) : (
              <div></div>
            )}

            {step < 4 ? (
              <button
                type="button"
                id="form-btn-next"
                onClick={handleNext}
                className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-sm transition-all inline-flex items-center space-x-1.5 cursor-pointer"
              >
                <span>Siguiente</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="submit"
                id="form-btn-submit"
                className="px-8 py-3.5 bg-[#FFE3E3] hover:bg-[#FFD1D1] text-[#5C2121] font-extrabold rounded-xl text-sm transition-all border border-[#FFC6C6] shadow-xs inline-flex items-center space-x-2 cursor-pointer"
              >
                <GraduationCap className="w-4 h-4 text-[#D45D5D]" />
                <span>Enviar reporte anónimo</span>
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
