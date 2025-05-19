import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Realisateurs } from '../../models/tables/Realisateurs';

@Injectable({
  providedIn: 'root'
})
export class RealisateursService {
  private apiUrl = 'http://localhost:8080/api/realisateurs';

  constructor(private http: HttpClient) { }

  // Ajouter un nouveau réalisateur
  createRealisateurs(realisateur: Realisateurs): Observable<Realisateurs> {
    return this.http.post<Realisateurs>(`${this.apiUrl}/create`, realisateur);
  }

  // Afficher la liste de tous les réalisateurs
  getAllRealisateurs(): Observable<Realisateurs[]> {
    return this.http.get<Realisateurs[]>(`${this.apiUrl}/all`);
  }

  // Trouver un réalisateur par son ID
  getRealisateursById(id: number): Observable<Realisateurs> {
    return this.http.get<Realisateurs>(`${this.apiUrl}/${id}`);
  }

  // Mettre à jour un réalisateur
  updateRealisateurs(realisateur: Realisateurs): Observable<Realisateurs> {
    return this.http.put<Realisateurs>(`${this.apiUrl}/update`, realisateur);
  }

  // Supprimer un réalisateur par son ID
  deleteRealisateursById(id: number): Observable<Realisateurs> {
    return this.http.delete<Realisateurs>(`${this.apiUrl}/delete/${id}`);
  }

  // Supprimer tous les réalisateurs
  deleteAllRealisateurs(): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/all`);
  }

}
