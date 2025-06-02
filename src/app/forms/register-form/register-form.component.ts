import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Users } from '../../models/tables/Users';
import { UsersService } from '../../services/users/users.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Role } from '../../models/tables/Role';

@Component({
  selector: 'app-register-form',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent {
  user: Users = {
    id: 0, // L'ID sera géré par la base de données
    pseudo: '',
    email: '',
    mdp: '',
    role: new Role(2, 'USER'), // Rôle par défaut pour un nouvel utilisateur
    avertissements: 0,
    dateBan: 0,
    estBanni: false
  };
  
  constructor(private userService: UsersService, private router: Router) {}

  onSubmit(): void {
    this.userService.createUser(this.user).subscribe({
      next: (data) => {
        console.log('Inscription réussie :', data);
        this.router.navigate(['/login']); // redirige vers login après succès
      },
      error: (err) => {
        console.error('Erreur lors de l\'inscription :', err);
      }
    });
  }
}
