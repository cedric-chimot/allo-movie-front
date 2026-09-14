import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CategorieService } from '../../services/categorie/categorie.service';
import { Categorie } from '../../models/tables/Categorie';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-categorie-edit-form',
  imports: [ CommonModule, FormsModule ],
  templateUrl: './categorie-edit-form.component.html',
  styleUrls: ['./categorie-edit-form.component.css']
})
export class CategorieEditFormComponent implements OnInit {

  @Input() categorieId!: number;

  @Output() close = new EventEmitter<void>();
  @Output() categorieUpdated = new EventEmitter<void>();

  categorie = {
    id: null as number | null,
    categorie: '',
  };

  constructor(
    private categorieService: CategorieService
  ) {}

  ngOnInit(): void {
    this.chargerCategorie();
  }

  chargerCategorie(): void {
    this.categorieService.getCategorieById(this.categorieId).subscribe({
      next: (categorie) => {

        this.categorie = {
          id: categorie.id,
          categorie: categorie.categorie,
        };

      },
      error: (erreur) => {
        console.error(
          'Erreur lors du chargement de l’categorie :',
          erreur
        );
      }
    });
  }

  modifierCategorie(): void {

    const categorieModifie = new Categorie(
      this.categorie.id,
      this.categorie.categorie,
    );

    this.categorieService.updateCategorie(categorieModifie).subscribe({
      next: () => {
        this.categorieUpdated.emit();
      },
      error: (erreur) => {
        console.error(
          'Erreur lors de la modification de l’categorie :',
          erreur
        );
      }
    });
  }

  fermer(): void {
    this.close.emit();
  }
}
