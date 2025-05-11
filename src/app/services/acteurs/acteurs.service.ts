import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Acteurs } from '../../models/tables/Acteurs';

@Injectable({
  providedIn: 'root'
})
export class ActeursService {
  private apiUrl = 'http://localhost:8080/api/acteurs';

  constructor(private http: HttpClient) { }

  // Ajouter un nouvel acteur
  createActeur(acteur: Acteurs): Observable<Acteurs> {
    return this.http.post<Acteurs>(`${this.apiUrl}/create`, acteur);
  }

  // Afficher la liste de tous les acteurs
  getAllActeurs(): Observable<Acteurs[]> {
    return this.http.get<Acteurs[]>(`${this.apiUrl}/all`);
  }

  // Trouver un acteur par son ID
  getActeurById(id: number): Observable<Acteurs> {
    return this.http.get<Acteurs>(`${this.apiUrl}/${id}`);
  }

  // Mettre à jour un acteur
  updateActeur(acteur: Acteurs): Observable<Acteurs> {
    return this.http.put<Acteurs>(`${this.apiUrl}/update`, acteur);
  }

  // Supprimer un acteur par son ID
  deleteActeurById(id: number): Observable<Acteurs> {
    return this.http.delete<Acteurs>(`${this.apiUrl}/delete/${id}`);
  }

  // Supprimer tous les acteurs
  deleteAllActeurs(): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/all`);
  }

}
