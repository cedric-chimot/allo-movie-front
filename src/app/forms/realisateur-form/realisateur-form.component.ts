import { Component, EventEmitter, Output } from '@angular/core';
import { Realisateurs } from '../../models/tables/Realisateurs';
import { RealisateursService } from '../../services/realisateurs/realisateurs.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-realisateur-form',
    imports: [
      CommonModule,
      FormsModule
    ],
  templateUrl: './realisateur-form.component.html',
  styleUrls: ['./realisateur-form.component.css']
})
export class RealisateurFormComponent {

  @Output() close = new EventEmitter<void>();
  @Output() realisateurCreated = new EventEmitter<void>();

  // Données utilisées par le formulaire
  realisateur = {
    id: null,
    nom: '',
    prenom: '',
  };

  constructor(
    private realisateursService: RealisateursService
  ) {}

  ajouterRealisateur(): void {

    // Objet envoyé au backend
    const realisateurAEnvoyer = new Realisateurs(
      this.realisateur.id,
      this.realisateur.nom,
      this.realisateur.prenom
    );

    console.log('Réalisateur envoyé au backend :', realisateurAEnvoyer);

    this.realisateursService.createRealisateurs(realisateurAEnvoyer).subscribe({
      next: () => {
        this.realisateurCreated.emit();
      },
      error: (erreur) => {
        console.error(
          'Erreur lors de la création du réalisateur :',
          erreur
        );
      }
    });
  }

  fermer(): void {
    this.close.emit();
  }
}
