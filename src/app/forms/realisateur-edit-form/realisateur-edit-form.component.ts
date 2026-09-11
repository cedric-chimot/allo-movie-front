import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Realisateurs } from '../../models/tables/Realisateurs';
import { RealisateursService } from '../../services/realisateurs/realisateurs.service';
@Component({
  selector: 'app-realisateur-edit-form',
  imports: [ CommonModule, FormsModule ],
  templateUrl: './realisateur-edit-form.component.html',
  styleUrl: './realisateur-edit-form.component.css'
})
export class RealisateurEditFormComponent implements OnInit {

  @Input() realisateurId!: number;

  @Output() close = new EventEmitter<void>();
  @Output() realisateurUpdated = new EventEmitter<void>();

  realisateur = {
    id: null as number | null,
    nom: '',
    prenom: ''
  };

  constructor(
    private realisateursService: RealisateursService
  ) {}

  ngOnInit(): void {
    this.chargerRealisateur();
  }

  chargerRealisateur(): void {
    this.realisateursService.getRealisateurById(this.realisateurId).subscribe({
      next: (realisateur) => {

        this.realisateur = {
          id: realisateur.id,
          nom: realisateur.nom,
          prenom: realisateur.prenom
        };

      },
      error: (erreur) => {
        console.error(
          'Erreur lors du chargement de l’realisateur :',
          erreur
        );
      }
    });
  }

  modifierRealisateur(): void {

    const realisateurModifie = new Realisateurs(
      this.realisateur.id,
      this.realisateur.nom,
      this.realisateur.prenom
    );

    this.realisateursService.updateRealisateur(realisateurModifie).subscribe({
      next: () => {
        this.realisateurUpdated.emit();
      },
      error: (erreur) => {
        console.error(
          'Erreur lors de la modification de l’realisateur :',
          erreur
        );
      }
    });
  }

  fermer(): void {
    this.close.emit();
  }
}
