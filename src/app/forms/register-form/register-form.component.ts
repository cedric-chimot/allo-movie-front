import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Users } from '../../models/tables/Users';
import { UsersService } from '../../services/users/users.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register-form',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent {
  user: Users = {
    id: 0,
    pseudo: '',
    email: '',
    mdp: '',
    role: null,
    presentation: '',
    dateInscrit: 0,
    avertissements: 0,
    dateBan: 0,
    estBanni: false
  };

  confirmMdp: string = '';

  constructor(private userService: UsersService, private router: Router) {}

  onSubmit(): void {
    if (this.user.pseudo && this.user.email && this.user.mdp && this.confirmMdp) {
      if (this.user.mdp !== this.confirmMdp) {
        alert("Les mots de passe ne correspondent pas !");
        return;
      }

      // On crée un objet sans dateInscrit ni role car c'est géré côté backend
      const newUser = {
        pseudo: this.user.pseudo,
        email: this.user.email,
        mdp: this.user.mdp,
        presentation: '',  // vide à l'inscription
        avertissements: 0,
        dateBan: 0,
        estBanni: false
      };

      this.userService.createUser(newUser as Users).subscribe({
        next: (data) => {
          console.log('Inscription réussie :', data);
          alert('Inscription réussie !');
          this.router.navigate(['/login']);
          this.resetForm();
        },
        error: (err) => {
          console.error('Erreur lors de l\'inscription :', err);
          alert('Erreur lors de l’inscription : ' + err.message);
        }
      });
    } else {
      alert('Veuillez remplir tous les champs');
    }
  }

  resetForm(): void {
    this.user = {
      id: 0,
      pseudo: '',
      email: '',
      mdp: '',
      role: null,
      presentation: '',
      dateInscrit: 0,
      avertissements: 0,
      dateBan: 0,
      estBanni: false
    };
    this.confirmMdp = '';
  }

}

