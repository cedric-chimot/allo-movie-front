import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categorie } from '../../models/tables/Categorie';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {
  private apiUrl = 'http://localhost:8080/api/categorie';

  constructor(private http: HttpClient) { }

  // Ajouter une nouvelle catégorie
  createCategorie(categorie: Categorie): Observable<Categorie> {
    return this.http.post<Categorie>(`${this.apiUrl}/create`, categorie);
  }

  // Afficher la liste de toutes les catégories
  getAllCategorie(): Observable<Categorie[]> {
    return this.http.get<Categorie[]>(`${this.apiUrl}/all`);
  }

  // Trouver une catégorie par son ID
  getCategorieById(id: number): Observable<Categorie> {
    return this.http.get<Categorie>(`${this.apiUrl}/${id}`);
  }

  // Mettre à jour une catégorie
  updateCategorie(categorie: Categorie): Observable<Categorie> {
    return this.http.put<Categorie>(`${this.apiUrl}/update`, categorie);
  }

  // Supprimer une catégorie par son ID
  deleteCategorieById(id: number): Observable<Categorie> {
    return this.http.delete<Categorie>(`${this.apiUrl}/delete/${id}`);
  }

  // Supprimer toutes les catégories
  deleteAllCategorie(): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/all`);
  }

}
