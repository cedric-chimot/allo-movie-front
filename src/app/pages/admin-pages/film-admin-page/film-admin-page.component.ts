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

  chargerFilms(): void {
    this.filmsService.getAllFilms().subscribe({
      next: (films) => {
        this.films = films;
      },
      error: (erreur) => {
        console.error(
          'Erreur lors du chargement des films :',
          erreur
        );
      }
    });
  }

  get filmsPagines(): Films[] {
    const debut = (this.currentPage - 1) * this.filmsParPage;
    const fin = debut + this.filmsParPage;

    return this.films.slice(debut, fin);
  }

  get nombrePages(): number {
    return Math.ceil(this.films.length / this.filmsParPage);
  }

  changerPage(page: number): void {
    if (page >= 1 && page <= this.nombrePages) {
      this.currentPage = page;
    }
  }

  openAddModal(): void {
    this.isAddModalOpen = true;
  }

  openEditModal(filmId: number): void {
    this.filmIdSelectionne = filmId;
    this.isEditModalOpen = true;
  }

  openDeleteModal(film: Films): void {
    this.filmSelectionnePourSuppression = film;
    this.isDeleteModalOpen = true;
  }

  closeModal(): void {
    this.isAddModalOpen = false;
  }

  closeEditModal(): void {
    this.isEditModalOpen = false;
  }

  closeDeleteModal(): void {
    this.isDeleteModalOpen = false;
    this.filmSelectionnePourSuppression = null;
  }

  filmAjoute(): void {
    this.closeModal();
    this.currentPage = 1;
    this.chargerFilms();
  }

  filmModifie(): void {
    this.closeEditModal();
    this.currentPage = 1;
    this.chargerFilms();
  }

  confirmDeleteFilm(): void {
    if (
      this.filmSelectionnePourSuppression &&
      this.filmSelectionnePourSuppression.id
    ) {

      this.filmsService
        .deleteFilmById(this.filmSelectionnePourSuppression.id)
        .subscribe({
          next: () => {
            this.closeDeleteModal();
            this.chargerFilms();

            // Si on vient de supprimer le dernier élément
            // de la dernière page
            if (
              this.currentPage > this.nombrePages &&
              this.nombrePages > 0
            ) {
              this.currentPage = this.nombrePages;
            }
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
}
