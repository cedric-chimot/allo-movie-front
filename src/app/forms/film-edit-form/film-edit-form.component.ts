import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Films } from '../../models/tables/Films';
import { Categorie } from '../../models/tables/Categorie';
import { Acteurs } from '../../models/tables/Acteurs';
import { Realisateurs } from '../../models/tables/Realisateurs';

import { FilmsService } from '../../services/films/films.service';
import { CategorieService } from '../../services/categorie/categorie.service';
import { ActeursService } from '../../services/acteurs/acteurs.service';
import { RealisateursService } from '../../services/realisateurs/realisateurs.service';

@Component({
  selector: 'app-film-edit-form',
  imports: [ CommonModule, FormsModule ],
  templateUrl: './film-edit-form.component.html',
  styleUrls: ['./film-edit-form.component.css']
})
export class FilmEditFormComponent implements OnInit {

  @Input() filmId!: number;

  @Output() close = new EventEmitter<void>();
  @Output() filmUpdated = new EventEmitter<void>();

  // Données utilisées par le formulaire
  film = {
    id: null as number | null,
    titre: '',
    dateSortie: '',
    synopsis: '',
    image: '',
    noteMoyenne: 0,
    resumeLong: '',
    duree: 0
  };

  // --------------------------------
  // Catégories
  // --------------------------------

  // Toutes les catégories disponibles
  categories: Categorie[] = [];

  // Catégorie actuellement sélectionnée
  categorieSelectionnee: Categorie | null = null;

  // Catégories déjà sélectionnées pour le film
  categoriesSelectionnees: Categorie[] = [];

  // --------------------------------
  // Réalisateurs
  // --------------------------------

  // Tous les réalisateurs disponibles
  realisateurs: Realisateurs[] = [];

  // Réalisateur actuellement sélectionné
  realisateurSelectionne: Realisateurs | null = null;

  // Réalisateurs sélectionnés pour le film
  realisateursSelectionnes: Realisateurs[] = [];

  // --------------------------------
  // Acteurs
  // --------------------------------

  // Tous les acteurs disponibles
  acteurs: Acteurs[] = [];

  // Acteur actuellement sélectionné
  acteurSelectionne: Acteurs | null = null;

  // Acteurs sélectionnés + leur rôle
  acteursSelectionnes: {
    acteurId: number;
    role: string;
  }[] = [];

  constructor(
    private filmsService: FilmsService,
    private categorieService: CategorieService,
    private acteursService: ActeursService,
    private realisateursService: RealisateursService
  ) {}

  ngOnInit(): void {
    this.chargerFilm();
    this.chargerCategories();
    this.chargerRealisateurs();
    this.chargerActeurs();
  }

  // --------------------------------
  // Film
  // --------------------------------

  // Récupérer le film à modifier
  chargerFilm(): void {

    this.filmsService.getFilmDetail(this.filmId).subscribe({
      next: (detail) => {

        this.film = {
          id: detail.film.id,
          titre: detail.film.titre,
          dateSortie: this.convertirDate(detail.film.dateSortie),
          synopsis: detail.film.synopsis,
          image: detail.film.image,
          noteMoyenne: detail.film.noteMoyenne,
          resumeLong: detail.film.resumeLong,
          duree: detail.film.duree
        };

        // Acteurs déjà associés au film
        if (detail.acteurs) {

          this.acteursSelectionnes = detail.acteurs.map(
            (acteur: any) => ({
              acteurId: acteur.id,
              role: acteur.role
            })
          );

        }

        // Les catégories et réalisateurs seront associés
        // après avoir récupéré leurs listes complètes.
        this.chargerCategoriesSelectionnees(detail.categories);
        this.chargerRealisateursSelectionnes(detail.realisateurs);
      },

      error: (erreur) => {
        console.error(
          'Erreur lors du chargement du film :',
          erreur
        );
      }
    });
  }

  // Convertir le timestamp du backend en date utilisable
  // par un input type="date"
  convertirDate(timestamp: number): string {

    if (!timestamp) {
      return '';
    }

    const date = new Date(timestamp);

    return date.toISOString().split('T')[0];
  }

  // --------------------------------
  // Catégories
  // --------------------------------

  // Récupérer toutes les catégories
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

  // Retrouver les catégories déjà associées au film
  chargerCategoriesSelectionnees(
    categoriesFilm: string[]
  ): void {

    if (!categoriesFilm) {
      return;
    }

    this.categoriesSelectionnees =
      this.categories.filter(
        categorie =>
          categoriesFilm.includes(categorie.categorie)
      );
  }

  // Ajouter une catégorie
  ajouterCategorie(): void {

    if (
      this.categorieSelectionnee &&
      !this.categoriesSelectionnees.some(
        categorie =>
          categorie.id === this.categorieSelectionnee!.id
      )
    ) {

      this.categoriesSelectionnees.push(
        this.categorieSelectionnee
      );
    }

    this.categorieSelectionnee = null;
  }

  // Retirer une catégorie
  retirerCategorie(categorie: Categorie): void {

    this.categoriesSelectionnees =
      this.categoriesSelectionnees.filter(
        c => c.id !== categorie.id
      );
  }

  // --------------------------------
  // Réalisateurs
  // --------------------------------

  // Récupérer tous les réalisateurs
  chargerRealisateurs(): void {

    this.realisateursService.getAllRealisateurs().subscribe({
      next: (realisateurs: Realisateurs[]) => {

        this.realisateurs = realisateurs;

      },

      error: (erreur) => {
        console.error(
          'Erreur lors du chargement des réalisateurs :',
          erreur
        );
      }
    });
  }

  // Retrouver les réalisateurs déjà associés au film
  chargerRealisateursSelectionnes(
    realisateursFilm: string[]
  ): void {

    if (!realisateursFilm) {
      return;
    }

    this.realisateursSelectionnes =
      this.realisateurs.filter(
        realisateur =>
          realisateursFilm.includes(
            realisateur.prenom + ' ' + realisateur.nom
          )
      );
  }

  // Ajouter un réalisateur
  ajouterRealisateur(): void {

    if (
      this.realisateurSelectionne &&
      !this.realisateursSelectionnes.some(
        realisateur =>
          realisateur.id === this.realisateurSelectionne!.id
      )
    ) {

      this.realisateursSelectionnes.push(
        this.realisateurSelectionne
      );
    }

    this.realisateurSelectionne = null;
  }

  // Retirer un réalisateur
  retirerRealisateur(realisateur: Realisateurs): void {

    this.realisateursSelectionnes =
      this.realisateursSelectionnes.filter(
        r => r.id !== realisateur.id
      );
  }

  // --------------------------------
  // Acteurs
  // --------------------------------

  // Récupérer tous les acteurs
  chargerActeurs(): void {

    this.acteursService.getAllActeurs().subscribe({
      next: (acteurs: Acteurs[]) => {

        this.acteurs = acteurs;

      },

      error: (erreur) => {
        console.error(
          'Erreur lors du chargement des acteurs :',
          erreur
        );
      }
    });
  }

  // Ajouter un acteur à la relation
  ajouterActeur(): void {

    if (
      this.acteurSelectionne &&
      !this.acteursSelectionnes.some(
        acteur =>
          acteur.acteurId === this.acteurSelectionne!.id
      )
    ) {

      this.acteursSelectionnes.push({
        acteurId: this.acteurSelectionne.id!,
        role: ''
      });
    }

    this.acteurSelectionne = null;
  }

  // Retirer une relation acteur/film
  retirerActeur(acteurId: number): void {

    this.acteursSelectionnes =
      this.acteursSelectionnes.filter(
        acteur =>
          acteur.acteurId !== acteurId
      );
  }

  // --------------------------------
  // Modification du film
  // --------------------------------

  modifierFilm(): void {

    const dateSortie = new Date(
      this.film.dateSortie
    ).getTime();

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

    // Récupérer uniquement les IDs des catégories
    const categories =
      this.categoriesSelectionnees.map(
        categorie => categorie.id
      );

    // Récupérer uniquement les IDs des réalisateurs
    const realisateurs =
      this.realisateursSelectionnes.map(
        realisateur => realisateur.id
      );

    // Acteurs + rôles
    const acteurs =
      this.acteursSelectionnes.map(
        acteur => ({
          acteurId: acteur.acteurId,
          role: acteur.role
        })
      );

    // Données envoyées au backend
    const donnees = {
      film: film,
      categories: categories,
      realisateurs: realisateurs,
      acteurs: acteurs
    };

    console.log(
      'Film modifié envoyé au backend :',
      donnees
    );

    this.filmsService.updateFilms(donnees as any).subscribe({

      next: () => {

        this.filmUpdated.emit();

      },

      error: (erreur) => {

        console.error(
          'Erreur lors de la modification du film :',
          erreur
        );

      }
    });
  }

  // Fermer le formulaire
  fermer(): void {
    this.close.emit();
  }
}
