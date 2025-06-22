import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { getAppConfig } from '../config/app.config';
import { UsuarioChequeraFacultad, Usuario, ChequeraStatusResponse } from '../models/usuario.interface';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  private readonly baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = getAppConfig().backendUrl;
  }

  /**
   * Verifica si una cuenta de Google es válida en el backend y obtiene la información del usuario
   * @param googleMail - El email de Google a verificar
   * @returns Observable<Usuario | null> - Información del usuario si es válida, null en caso contrario
   */
  verifyAccount(googleMail: string): Observable<Usuario | null> {
    const url = `${this.baseUrl}chequera/backend/auth/verify/${encodeURIComponent(googleMail)}`;
    return this.http.get<Usuario>(url);
  }

  /**
   * Obtiene las facultades asociadas a un usuario
   * @param userId - El ID del usuario
   * @returns Observable<UsuarioChequeraFacultad[]> - Lista de facultades del usuario
   */
  getUserFacultades(userId: number): Observable<UsuarioChequeraFacultad[]> {
    const url = `${this.baseUrl}chequera/backend/usuarioChequeraFacultad/user/${userId}`;
    console.log('BackendService.getUserFacultades - URL:', url);
    console.log('BackendService.getUserFacultades - userId:', userId);
    return this.http.get<UsuarioChequeraFacultad[]>(url);
  }

  /**
   * Obtiene el status de la chequera para un documento y facultad específicos
   * @param documento - El número de documento
   * @param facultadId - El ID de la facultad
   * @returns Observable<ChequeraStatusResponse> - Información completa de la chequera
   */
  getChequeraStatus(documento: number, facultadId: number): Observable<ChequeraStatusResponse> {
    const url = `${this.baseUrl}chequera/backend/chequera/status/${documento}/facultad/${facultadId}`;
    console.log('BackendService.getChequeraStatus - URL:', url);
    console.log('BackendService.getChequeraStatus - documento:', documento, 'facultadId:', facultadId);
    return this.http.get<ChequeraStatusResponse>(url);
  }
} 