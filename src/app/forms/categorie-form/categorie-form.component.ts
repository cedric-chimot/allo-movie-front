import { Component, EventEmitter, Output } from '@angular/core';
import { Categorie } from '../../models/tables/Categorie';
import { CategorieService } from '../../services/categorie/categorie.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-categorie-form',
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './categorie-form.component.html',
  styleUrls: ['./categorie-form.component.css']
})
export class CategorieFormComponent {

  @Output() close = new EventEmitter<void>();
  @Output() categorieCreated = new EventEmitter<void>();

  // Données utilisées par le formulaire
  categorie = {
    id: null,
    categorie: '',
  };

  constructor(
    private categorieService: CategorieService
  ) {}

  ajouterCategorie(): void {

    // Objet envoyé au backend
    const categorieAEnvoyer = new Categorie(
      this.categorie.id,
      this.categorie.categorie,
    );

    console.log('Categorie envoyé au backend :', categorieAEnvoyer);

    this.categorieService.createCategorie(categorieAEnvoyer).subscribe({
      next: () => {
        this.categorieCreated.emit();
      },
      error: (erreur) => {
        console.error(
          'Erreur lors de la création de la catégorie :',
          erreur
        );
      }
    });
  }

  fermer(): void {
    this.close.emit();
  }
}
