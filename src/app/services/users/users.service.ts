import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Users } from '../../models/tables/Users';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrl = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient) { }

  // Ajouter un nouvel utilisateur
  createUser(user: Users): Observable<Users> {
    return this.http.post<Users>(`${this.apiUrl}/create`, user);
  }

  // Authentifier un utilisateur (login)
  login(email: string, mdp: string): Observable<Users> {
    return this.http.post<Users>(`${this.apiUrl}/login`, { email, mdp });
  }

  // Afficher la liste de tous les utilisateurs
  getAllUsers(): Observable<Users[]> {
    return this.http.get<Users[]>(`${this.apiUrl}/all`);
  }

  // Trouver un utilisateur par son ID
  getUserById(id: number): Observable<Users> {
    return this.http.get<Users>(`${this.apiUrl}/${id}`);
  }

  // Récupère le nombre total d'utilisateurs
  getNbUsers(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/count`);
  }

  // Mettre à jour un utilisateur
  updateUser(user: Users): Observable<Users> {
    return this.http.put<Users>(`${this.apiUrl}/update`, user);
  }

  // Supprimer un utilisateur par son ID
  deleteUserById(id: number): Observable<Users> {
    return this.http.delete<Users>(`${this.apiUrl}/delete/${id}`);
  }

  // Supprimer tous les utilisateurs
  deleteAllUsers(): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/all`);
  }

}
