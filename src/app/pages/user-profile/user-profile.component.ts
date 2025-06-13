import { Component } from '@angular/core';
import { Users } from '../../models/tables/Users';
import { UsersService } from '../../services/users/users.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  imports: [CommonModule, RouterModule],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {
  user: Users | null = null;

  constructor(private userService: UsersService) {}

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    // Supposons que tu stockes l'id utilisateur connecté dans le localStorage, ex:
    const userStorage = localStorage.getItem('user');
    if (userStorage) {
      const userParsed = JSON.parse(userStorage);
      const userId = userParsed.id;
      if (userId) {
        this.userService.getUserById(userId).subscribe({
          next: (userData) => {
            this.user = userData;
          },
          error: (err) => {
            console.error('Erreur lors du chargement du profil:', err);
          }
        });
      } else {
        console.error('ID utilisateur non trouvé dans le localStorage');
      }
    } else {
      console.error('Aucun utilisateur trouvé dans le localStorage');
    }
  }
}
