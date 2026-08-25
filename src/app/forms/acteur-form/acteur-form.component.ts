import { Component, EventEmitter, Output } from '@angular/core';
import { Acteurs } from '../../models/tables/Acteurs';
import { ActeursService } from '../../services/acteurs/acteurs.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-acteur-form',
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './acteur-form.component.html',
  styleUrls: ['./acteur-form.component.css']
})
export class ActeurFormComponent {

  @Output() close = new EventEmitter<void>();
  @Output() acteurCreated = new EventEmitter<void>();

  // Données utilisées par le formulaire
  acteur = {
    id: null,
    nom: '',
    prenom: '',
  };

  constructor(
    private acteursService: ActeursService
  ) {}

  ajouterActeur(): void {

    // Objet envoyé au backend
    const acteurAEnvoyer = new Acteurs(
      this.acteur.id,
      this.acteur.nom,
      this.acteur.prenom
    );

    console.log('Acteur envoyé au backend :', acteurAEnvoyer);

    this.acteursService.createActeur(acteurAEnvoyer).subscribe({
      next: () => {
        this.acteurCreated.emit();
      },
      error: (erreur) => {
        console.error(
          'Erreur lors de la création de l\'acteur :',
          erreur
        );
      }
    });
  }

  fermer(): void {
    this.close.emit();
  }
}
