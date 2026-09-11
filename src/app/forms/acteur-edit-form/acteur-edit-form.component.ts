import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Acteurs } from '../../models/tables/Acteurs';
import { ActeursService } from '../../services/acteurs/acteurs.service';

@Component({
  selector: 'app-acteur-edit-form',
  imports: [ CommonModule, FormsModule ],
  templateUrl: './acteur-edit-form.component.html',
  styleUrls: ['./acteur-edit-form.component.css']
})
export class ActeurEditFormComponent implements OnInit {

  @Input() acteurId!: number;

  @Output() close = new EventEmitter<void>();
  @Output() acteurUpdated = new EventEmitter<void>();

  acteur = {
    id: null as number | null,
    nom: '',
    prenom: ''
  };

  constructor(
    private acteursService: ActeursService
  ) {}

  ngOnInit(): void {
    this.chargerActeur();
  }

  chargerActeur(): void {
    this.acteursService.getActeurById(this.acteurId).subscribe({
      next: (acteur) => {

        this.acteur = {
          id: acteur.id,
          nom: acteur.nom,
          prenom: acteur.prenom
        };

      },
      error: (erreur) => {
        console.error(
          'Erreur lors du chargement de l’acteur :',
          erreur
        );
      }
    });
  }

  modifierActeur(): void {

    const acteurModifie = new Acteurs(
      this.acteur.id,
      this.acteur.nom,
      this.acteur.prenom
    );

    this.acteursService.updateActeur(acteurModifie).subscribe({
      next: () => {
        this.acteurUpdated.emit();
      },
      error: (erreur) => {
        console.error(
          'Erreur lors de la modification de l’acteur :',
          erreur
        );
      }
    });
  }

  fermer(): void {
    this.close.emit();
  }
}
