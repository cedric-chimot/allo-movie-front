import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comments } from '../../models/tables/Comments';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  private apiUrl = 'http://localhost:8080/api/comments';

  constructor(private http: HttpClient) { }

  // Ajouter un nouveau commentaire
  createComment(comment: Comments): Observable<Comments> {
    return this.http.post<Comments>(`${this.apiUrl}/create`, comment);
  }

  // Afficher la liste de tous les commentaires
  getAllComments(): Observable<Comments[]> {
    return this.http.get<Comments[]>(`${this.apiUrl}/all`);
  }

  // Trouver un commentaire par son ID
  getCommentById(id: number): Observable<Comments> {
    return this.http.get<Comments>(`${this.apiUrl}/${id}`);
  }

  // Mettre à jour un commentaire
  updateComment(comment: Comments): Observable<Comments> {
    return this.http.put<Comments>(`${this.apiUrl}/update`, comment);
  }

  // Supprimer un commentaire par son ID
  deleteCommentById(id: number): Observable<Comments> {
    return this.http.delete<Comments>(`${this.apiUrl}/delete/${id}`);
  }

  // Supprimer tous les commentaires
  deleteAllComments(): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/all`);
  }

}
