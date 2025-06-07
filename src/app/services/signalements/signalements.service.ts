import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Signalements } from '../../models/tables/Signalements';

@Injectable({
  providedIn: 'root'
})
export class SignalementsService {
  private apiUrl = 'http://localhost:8080/api/signalements';

  constructor(private http: HttpClient) { }

  // Ajouter un nouveau signalement
  createSignalement(signalements: Signalements): Observable<Signalements> {
    return this.http.post<Signalements>(`${this.apiUrl}/create`, signalements);
  }

  // Afficher la liste de tous les signalements
  getAllSignalements(): Observable<Signalements[]> {
    return this.http.get<Signalements[]>(`${this.apiUrl}/all`);
  }

  // Trouver un signalement par son ID
  getSignalementById(id: number): Observable<Signalements> {
    return this.http.get<Signalements>(`${this.apiUrl}/${id}`);
  }

  // Mettre à jour un signalement
  updateSignalements(signalements: Signalements): Observable<Signalements> {
    return this.http.patch<Signalements>(`${this.apiUrl}/update`, signalements);
  }

  // Supprimer un signalement par son ID
  deleteSignalementById(id: number): Observable<Signalements> {
    return this.http.delete<Signalements>(`${this.apiUrl}/delete/${id}`);
  }

  // Supprimer tous les signalements
  deleteAllSignalements(): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/all`);
  }

}
