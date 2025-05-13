import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Films } from '../../models/tables/Films';

@Injectable({
  providedIn: 'root'
})
export class FilmsService {
  private apiUrl = 'http://localhost:8080/api/films';

  constructor(private http: HttpClient) { }

  // Ajouter un nouveau film
  createFilms(film: Films): Observable<Films> {
    return this.http.post<Films>(`${this.apiUrl}/create`, film);
  }

  // Afficher la liste de tous les films
  getAllFilms(): Observable<Films[]> {
    return this.http.get<Films[]>(`${this.apiUrl}/all`);
  }

  // Trouver un film par son ID
  getFilmsById(id: number): Observable<Films> {
    return this.http.get<Films>(`${this.apiUrl}/${id}`);
  }

  // Mettre à jour un film
  updateFilms(film: Films): Observable<Films> {
    return this.http.put<Films>(`${this.apiUrl}/update`, film);
  }

  // Supprimer un film par son ID
  deleteFilmsById(id: number): Observable<Films> {
    return this.http.delete<Films>(`${this.apiUrl}/delete/${id}`);
  }

  // Supprimer tous les films
  deleteAllFilms(): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/all`);
  }

}
