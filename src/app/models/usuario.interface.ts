export interface Usuario {
  userId: number;
  login: string;
  nombre: string;
  geograficaId: number;
  lastLog: string;
  googleMail: string;
  activo: number;
}

export interface Facultad {
  facultadId: number;
  nombre: string;
}

export interface UsuarioChequeraFacultad {
  usuarioChequeraFacultadId: number;
  userId: number;
  facultadId: number;
  usuario: Usuario;
  facultad: Facultad;
}

export interface ChequeraStatusResponse {
  persona: Persona;
  lectivo: Lectivo;
  facultad: Facultad;
  chequeraSeries: ChequeraSerie[];
}

export interface Persona {
  personaId: number;
  documentoId: number;
  apellido: string;
  nombre: string;
}

export interface Lectivo {
  nombre: string;
  fechaInicio: string;
  fechaFinal: string;
}

export interface ChequeraSerie {
  chequeraSerieId: number;
  fecha: string;
  observaciones: string;
  alternativaId: number;
  facultad: Facultad;
  tipoChequera: TipoChequera;
  persona: Persona;
  mails: Mails;
  lectivo: Lectivo;
  arancelTipo: ArancelTipo;
  geografica: Geografica;
  chequeraCuotas: ChequeraCuota[];
}

export interface TipoChequera {
  nombre: string;
}

export interface Mails {
  emailPersonal: string;
  emailInstitucional: string;
}

export interface ArancelTipo {
  descripcion: string;
}

export interface Geografica {
  nombre: string;
}

export interface ChequeraCuota {
  chequeraCuotaId: number;
  cuotaId: number;
  mes: number;
  anho: number;
  vencimiento1: string;
  importe1: number;
  vencimiento2: string;
  importe2: number;
  vencimiento3: string;
  importe3: number;
  pagado: number;
  producto: Producto;
  chequeraPagos: ChequeraPago[];
  mercadoPagoContext: MercadoPagoContext | null;
}

export interface Producto {
  nombre: string;
}

export interface ChequeraPago {
  chequeraPagoId: number;
  chequeraCuotaId: number;
  facultadId: number;
  tipoChequeraId: number;
  chequeraSerieId: number;
  productoId: number;
  alternativaId: number;
  cuotaId: number;
  orden: number;
  mes: number;
  anho: number;
  fecha: string;
  acreditacion: string;
  importe: number;
  path: string;
  archivo: string;
  observaciones: string;
  archivoBancoId: number | null;
  archivoBancoIdAcreditacion: number | null;
  verificador: number;
  tipoPagoId: number;
  idMercadoPago: string;
  tipoPago: TipoPago;
}

export interface TipoPago {
  tipoPagoId: number;
  nombre: string;
}

export interface MercadoPagoContext {
  mercadoPagoContextId: number;
  chequeraCuotaId: number;
  initPoint: string;
  fechaVencimiento: string;
  importe: number;
  preferenceId: string;
  activo: number;
  status: string | null;
} 