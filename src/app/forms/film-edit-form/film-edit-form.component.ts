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
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './film-edit-form.component.html',
  styleUrls: ['./film-edit-form.component.css']
})
export class FilmEditFormComponent implements OnInit {

  @Input() filmId!: number;

  @Output() close = new EventEmitter<void>();
  @Output() filmUpdated = new EventEmitter<void>();


  // =================================
  // Données du film
  // =================================

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


  // =================================
  // Catégories
  // =================================

  categories: Categorie[] = [];

  categorieSelectionnee: Categorie | null = null;

  categoriesSelectionnees: Categorie[] = [];


  // =================================
  // Réalisateurs
  // =================================

  // Tous les réalisateurs disponibles
  realisateurs: Realisateurs[] = [];

  // Réalisateur choisi dans la liste déroulante
  realisateurSelectionne: Realisateurs | null = null;

  // Réalisateurs déjà associés au film
  realisateursExistants: Realisateurs[] = [];

  // Réalisateurs ajoutés pendant la modification
  nouveauxRealisateurs: Realisateurs[] = [];


  // =================================
  // Acteurs
  // =================================

  // Tous les acteurs disponibles
  acteurs: Acteurs[] = [];

  // Acteur choisi dans la liste déroulante
  acteurSelectionne: Acteurs | null = null;

  // Acteurs déjà associés au film + leur rôle
  acteursExistants: {
    id: number;
    nom: string;
    prenom: string;
    role: string;
  }[] = [];

  // Nouveaux acteurs ajoutés + leur rôle
  nouveauxActeurs: {
    acteurId: number;
    role: string;
  }[] = [];


  constructor(
    private filmsService: FilmsService,
    private categorieService: CategorieService,
    private acteursService: ActeursService,
    private realisateursService: RealisateursService
  ) {}


  // =================================
  // Initialisation
  // =================================

  ngOnInit(): void {
    this.chargerFilm();
    this.chargerCategories();
    this.chargerRealisateurs();
    this.chargerActeurs();
  }


  // =================================
  // Film
  // =================================

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


        // -----------------------------
        // Acteurs déjà associés
        // -----------------------------

        if (detail.acteurs) {

          this.acteursExistants = detail.acteurs.map(
            (acteur: any) => ({
              id: acteur.id,
              nom: acteur.nom,
              prenom: acteur.prenom,
              role: acteur.role
            })
          );

        }


        // -----------------------------
        // Catégories
        // -----------------------------

        this.chargerCategoriesSelectionnees(
          detail.categories
        );


        // -----------------------------
        // Réalisateurs
        // -----------------------------

        this.chargerRealisateursSelectionnes(
          detail.realisateurs
        );

      },

      error: (erreur) => {

        console.error(
          'Erreur lors du chargement du film :',
          erreur
        );

      }

    });

  }


  // Convertir le timestamp du backend
  // en date pour input type="date"

  convertirDate(timestamp: number): string {

    if (!timestamp) {
      return '';
    }

    const date = new Date(timestamp);

    return date.toISOString().split('T')[0];
  }


  // =================================
  // Catégories
  // =================================

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


  retirerCategorie(categorie: Categorie): void {

    this.categoriesSelectionnees =
      this.categoriesSelectionnees.filter(
        c => c.id !== categorie.id
      );

  }


  // =================================
  // Réalisateurs
  // =================================

  chargerRealisateurs(): void {

    this.realisateursService.getAllRealisateurs().subscribe({

      next: (realisateurs: Realisateurs[]) => {

        this.realisateurs = realisateurs;

        // On recharge les réalisateurs existants
        // une fois la liste complète récupérée.
        this.chargerRealisateursSelectionnes(
          this.realisateursFilm
        );

      },

      error: (erreur) => {

        console.error(
          'Erreur lors du chargement des réalisateurs :',
          erreur
        );

      }

    });

  }


  // Réalisateurs renvoyés par le détail du film
  realisateursFilm: string[] = [];


  chargerRealisateursSelectionnes(
    realisateursFilm: string[]
  ): void {

    if (!realisateursFilm) {
      return;
    }

    this.realisateursFilm = realisateursFilm;

    if (this.realisateurs.length === 0) {
      return;
    }

    this.realisateursExistants =
      this.realisateurs.filter(
        realisateur =>
          realisateursFilm.includes(
            realisateur.prenom + ' ' + realisateur.nom
          )
      );

  }


  ajouterRealisateur(): void {

    if (!this.realisateurSelectionne) {
      return;
    }


    const id =
      this.realisateurSelectionne.id;


    // Vérifie s'il existe déjà
    // parmi les réalisateurs existants
    const existeDeja =
      this.realisateursExistants.some(
        realisateur =>
          realisateur.id === id
      );


    // Vérifie également les nouveaux
    const dejaAjoute =
      this.nouveauxRealisateurs.some(
        realisateur =>
          realisateur.id === id
      );


    if (!existeDeja && !dejaAjoute) {

      this.nouveauxRealisateurs.push(
        this.realisateurSelectionne
      );

    }


    this.realisateurSelectionne = null;

  }


  retirerRealisateurExistant(
    realisateurId: number
  ): void {

    this.realisateursExistants =
      this.realisateursExistants.filter(
        realisateur =>
          realisateur.id !== realisateurId
      );

  }


  retirerNouveauRealisateur(
    realisateurId: number
  ): void {

    this.nouveauxRealisateurs =
      this.nouveauxRealisateurs.filter(
        realisateur =>
          realisateur.id !== realisateurId
      );

  }


  // =================================
  // Acteurs
  // =================================

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


  ajouterActeur(): void {

    if (!this.acteurSelectionne) {
      return;
    }


    const acteurId =
      this.acteurSelectionne.id!;


    // Vérifier s'il est déjà présent
    // dans les acteurs existants
    const existeDeja =
      this.acteursExistants.some(
        acteur =>
          acteur.id === acteurId
      );


    // Vérifier s'il vient déjà
    // d'être ajouté
    const dejaAjoute =
      this.nouveauxActeurs.some(
        acteur =>
          acteur.acteurId === acteurId
      );


    if (!existeDeja && !dejaAjoute) {

      this.nouveauxActeurs.push({

        acteurId: acteurId,

        role: ''

      });

    }


    this.acteurSelectionne = null;

  }


  retirerActeurExistant(
    acteurId: number
  ): void {

    this.acteursExistants =
      this.acteursExistants.filter(
        acteur =>
          acteur.id !== acteurId
      );

  }


  retirerNouvelActeur(
    acteurId: number
  ): void {

    this.nouveauxActeurs =
      this.nouveauxActeurs.filter(
        acteur =>
          acteur.acteurId !== acteurId
      );

  }


  getNomActeur(
    acteurId: number
  ): string {

    const acteur =
      this.acteurs.find(
        a => a.id === acteurId
      );

    if (!acteur) {
      return '';
    }

    return acteur.prenom + ' ' + acteur.nom;

  }


  // =================================
  // Modification du film
  // =================================

  modifierFilm(): void {

    const dateSortie =
      new Date(
        this.film.dateSortie
      ).getTime();


    // -----------------------------
    // Données du film
    // -----------------------------

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


    // -----------------------------
    // Catégories
    // -----------------------------

    const categories =
      this.categoriesSelectionnees.map(
        categorie =>
          categorie.id
      );


    // -----------------------------
    // Réalisateurs
    // -----------------------------

    const tousLesRealisateurs = [

      ...this.realisateursExistants,

      ...this.nouveauxRealisateurs

    ];


    const realisateurs =
      tousLesRealisateurs.map(
        realisateur =>
          realisateur.id
      );


    // -----------------------------
    // Acteurs
    // -----------------------------

    const acteursExistants =
      this.acteursExistants.map(
        acteur => ({

          acteurId: acteur.id,

          role: acteur.role

        })
      );


    const nouveauxActeurs =
      this.nouveauxActeurs.map(
        acteur => ({

          acteurId: acteur.acteurId,

          role: acteur.role

        })
      );


    const acteurs = [

      ...acteursExistants,

      ...nouveauxActeurs

    ];


    // -----------------------------
    // Données envoyées au backend
    // -----------------------------

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


    this.filmsService.updateFilms(
      donnees as any
    ).subscribe({

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


  // =================================
  // Fermer
  // =================================

  fermer(): void {

    this.close.emit();

  }

}
