import { Component, OnInit } from '@angular/core';
import { Films } from '../../models/tables/Films';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FilmsService } from '../../services/films/films.service';

@Component({
  selector: 'app-films-page',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './films-page.component.html',
  styleUrls: ['./films-page.component.css']
})
export class FilmsPageComponent implements OnInit {

  films: Films[] = [];

  searchTerm = '';
  currentPage = 1;
  filmsParPage = 8;

  favoris: Set<number> = new Set();

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
  // RECHERCHE
  // =========================

  get filmsFiltres(): Films[] {
    const recherche = this.searchTerm.trim().toLowerCase();

    if (!recherche) {
      return this.films;
    }

    return this.films.filter(film =>
      film.titre.toLowerCase().includes(recherche)
    );
  }

  // =========================
  // CATÉGORIES
  // =========================

  get filmsAlaffiche(): Films[] {
    const aujourdHui = Date.now();

    return this.films
      .filter(film => film.dateSortie <= aujourdHui)
      .sort((a, b) => b.noteMoyenne - a.noteMoyenne)
      .slice(0, 5);
  }

  get sortiesRecentes(): Films[] {
    const aujourdHui = Date.now();

    return [...this.films]
      .filter(film => film.dateSortie <= aujourdHui)
      .sort(
        (a, b) =>
          b.dateSortie - a.dateSortie
      )
      .slice(0, 5);
  }

  get filmsAVenir(): Films[] {
    const aujourdHui = Date.now();

    return [...this.films]
      .filter(film => film.dateSortie > aujourdHui)
      .sort(
        (a, b) =>
          a.dateSortie - b.dateSortie
      )
      .slice(0, 5);
  }

  // =========================
  // PAGINATION
  // =========================

  get filmsPagines(): Films[] {
    const debut =
      (this.currentPage - 1) * this.filmsParPage;

    return this.filmsFiltres.slice(
      debut,
      debut + this.filmsParPage
    );
  }

  get nombrePages(): number {
    return Math.ceil(
      this.filmsFiltres.length / this.filmsParPage
    );
  }

  changerPage(page: number): void {
    if (page < 1 || page > this.nombrePages) {
      return;
    }

    this.currentPage = page;
  }

  rechercher(): void {
    this.currentPage = 1;
  }

  // =========================
  // FAVORIS
  // =========================

  toggleFavori(id: number): void {
    if (this.favoris.has(id)) {
      this.favoris.delete(id);
    } else {
      this.favoris.add(id);
    }
  }

  estFavori(id: number): boolean {
    return this.favoris.has(id);
  }
}

