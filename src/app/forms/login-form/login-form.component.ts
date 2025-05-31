import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UsersService } from '../../services/users/users.service';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {

  email: string = '';
  mdp: string = '';
  message: string = '';
  messageColor: string = 'red';

  constructor(private usersService: UsersService) {}

  onSubmit(): void {
    if (!this.email || !this.mdp) {
      this.message = "Merci de remplir tous les champs.";
      this.messageColor = 'red';
      return;
    }

    this.usersService.login(this.email, this.mdp).subscribe({
      next: (user) => {
        this.message = `Bienvenue ${user.pseudo} !`;
        this.messageColor = 'green';
      },
      error: (err) => {
        this.message = "Échec de la connexion : email ou mot de passe incorrect.";
        this.messageColor = 'red';
      }
    });
  }
}
