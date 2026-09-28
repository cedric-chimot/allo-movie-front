import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Films } from '../../../models/tables/Films';
import { FilmsService } from '../../../services/films/films.service';

import { FilmFormComponent } from '../../../forms/film-form/film-form.component';
import { FilmEditFormComponent } from '../../../forms/film-edit-form/film-edit-form.component';

@Component({
  selector: 'app-films-admin-page',
  imports: [ CommonModule, RouterModule, FilmFormComponent, FilmEditFormComponent ],
  templateUrl: './film-admin-page.component.html',
  styleUrls: ['./film-admin-page.component.css']
})
export class FilmsAdminPageComponent implements OnInit {

  films: Films[] = [];

  isAddModalOpen = false;
  isEditModalOpen = false;
  isDeleteModalOpen = false;
  isDeleteAllModalOpen = false;

  filmIdSelectionne!: number;
  filmSelectionnePourSuppression: Films | null = null;

  // Pagination
  currentPage = 1;
  filmsParPage = 5;

  constructor(
    private filmsService: FilmsService
  ) {}

  ngOnInit(): void {
    this.chargerFilms();
  }

  // =========================
  // CHARGEMENT DES FILMS
  // =========================

  chargerFilms(): void {
    this.filmsService.getAllFilms().subscribe({
      next: (films) => {
        this.films = films;

        // Évite de rester sur une page inexistante
        if (
          this.nombrePages > 0 &&
          this.currentPage > this.nombrePages
        ) {
          this.currentPage = this.nombrePages;
        }

        if (this.films.length === 0) {
          this.currentPage = 1;
        }
      },
      error: (erreur) => {
        console.error(
          'Erreur lors du chargement des films :',
          erreur
        );
      }
    });
  }

  // =========================
  // PAGINATION
  // =========================

  get filmsPagines(): Films[] {
    const debut =
      (this.currentPage - 1) * this.filmsParPage;

    const fin = debut + this.filmsParPage;

    return this.films.slice(debut, fin);
  }

  get nombrePages(): number {
    return Math.ceil(
      this.films.length / this.filmsParPage
    );
  }

  changerPage(page: number): void {
    if (
      page >= 1 &&
      page <= this.nombrePages
    ) {
      this.currentPage = page;
    }
  }

  // =========================
  // AJOUT
  // =========================

  openAddModal(): void {
    this.isAddModalOpen = true;
  }

  closeModal(): void {
    this.isAddModalOpen = false;
  }

  filmAjoute(): void {
    this.closeModal();
    this.currentPage = 1;
    this.chargerFilms();
  }

  // =========================
  // MODIFICATION
  // =========================

  openEditModal(filmId: number): void {
    this.filmIdSelectionne = filmId;
    this.isEditModalOpen = true;
  }

  closeEditModal(): void {
    this.isEditModalOpen = false;
  }

  filmModifie(): void {
    this.closeEditModal();
    this.currentPage = 1;
    this.chargerFilms();
  }

  // =========================
  // SUPPRESSION D'UN FILM
  // =========================

  openDeleteModal(film: Films): void {
    this.filmSelectionnePourSuppression = film;
    this.isDeleteModalOpen = true;
  }

  closeDeleteModal(): void {
    this.isDeleteModalOpen = false;
    this.filmSelectionnePourSuppression = null;
  }

  confirmDeleteFilm(): void {

    if (
      this.filmSelectionnePourSuppression &&
      this.filmSelectionnePourSuppression.id
    ) {

      this.filmsService
        .deleteFilmById(
          this.filmSelectionnePourSuppression.id
        )
        .subscribe({

          next: () => {

            this.closeDeleteModal();

            this.chargerFilms();

          },

          error: (erreur) => {

            console.error(
              'Erreur lors de la suppression du film :',
              erreur
            );

          }

        });

    } else {

      console.error(
        'Aucun film sélectionné pour suppression'
      );

    }
  }

  // =========================
  // SUPPRESSION DE TOUS LES FILMS
  // =========================

  openDeleteAllModal(): void {
    this.isDeleteAllModalOpen = true;
  }

  closeDeleteAllModal(): void {
    this.isDeleteAllModalOpen = false;
  }

  confirmDeleteAllFilms(): void {

    this.filmsService.deleteAllFilms().subscribe({

      next: () => {

        this.closeDeleteAllModal();

        this.films = [];

        this.currentPage = 1;

      },

      error: (erreur) => {

        console.error(
          'Erreur lors de la suppression de tous les films :',
          erreur
        );

      }

    });
  }
}
