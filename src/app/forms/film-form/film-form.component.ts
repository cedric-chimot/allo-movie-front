import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Films } from '../../models/tables/Films';
import { Categorie } from '../../models/tables/Categorie';

import { FilmsService } from '../../services/films/films.service';
import { CategorieService } from '../../services/categorie/categorie.service';

@Component({
  selector: 'app-film-form',
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './film-form.component.html',
  styleUrls: ['./film-form.component.css']
})
export class FilmFormComponent implements OnInit {

  @Output() close = new EventEmitter<void>();
  @Output() filmCreated = new EventEmitter<void>();

  // Données utilisées par le formulaire
  film = {
    id: null,
    titre: '',
    dateSortie: '',
    synopsis: '',
    image: '',
    noteMoyenne: 0,
    resumeLong: '',
    duree: 0
  };

  // Liste de toutes les catégories disponibles
  categories: Categorie[] = [];

  // Catégorie actuellement sélectionnée
  categorieSelectionnee: Categorie | null = null;

  // Catégories ajoutées au film
  categoriesSelectionnees: Categorie[] = [];

  constructor(
    private filmsService: FilmsService,
    private categorieService: CategorieService
  ) {}

  ngOnInit(): void {
    this.chargerCategories();
  }

  // Récupérer toutes les catégories pour le formulaire
  chargerCategories(): void {
    this.categorieService.getAllCategorie().subscribe({
      next: (categories: Categorie[]) => {
        this.categories = categories;
      },
      error: (erreur) => {
        console.error(
          'Erreur lors du chargement des catégories :',
          erreur
        );
      }
    });
  }

  // Ajouter la catégorie sélectionnée à la liste
  ajouterCategorie(): void {

    if (
      this.categorieSelectionnee &&
      !this.categoriesSelectionnees.some(
        categorie => categorie.id === this.categorieSelectionnee!.id
      )
    ) {
      this.categoriesSelectionnees.push(this.categorieSelectionnee);
    }

    // Réinitialiser la sélection
    this.categorieSelectionnee = null;
  }

  // Retirer une catégorie de la liste
  retirerCategorie(categorie: Categorie): void {
    this.categoriesSelectionnees =
      this.categoriesSelectionnees.filter(
        c => c.id !== categorie.id
      );
  }

  // Ajouter le film
  ajouterFilm(): void {

    // Conversion de la date du formulaire
    // Exemple : "2024-02-28" -> timestamp numérique
    const dateSortie = new Date(
      this.film.dateSortie
    ).getTime();

    // Création du film avec TOUS ses champs
    // Les champs sans input restent avec leur valeur par défaut
    const film = new Films(
      this.film.id,
      this.film.titre,
      dateSortie,
      this.film.synopsis,
      this.film.image,
      this.film.noteMoyenne,
      this.film.resumeLong,
      this.film.duree
    );

    // Récupérer uniquement les IDs des catégories sélectionnées
    const categories = this.categoriesSelectionnees.map(
      categorie => categorie.id
    );

    // Données envoyées au backend :
    // le film + les IDs des catégories
    const donnees = {
      film: film,
      categories: categories
    };

    console.log('Film envoyé au backend :', donnees);

    // Le backend crée d'abord le film,
    // récupère son ID généré,
    // puis crée les lignes catégorie_films.
    this.filmsService.createFilms(donnees as any).subscribe({
      next: () => {
        this.filmCreated.emit();
      },
      error: (erreur) => {
        console.error(
          'Erreur lors de la création du film :',
          erreur
        );
      }
    });
  }

  fermer(): void {
    this.close.emit();
  }
}

