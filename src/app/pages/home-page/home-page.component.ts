import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Films } from '../../models/tables/Films';
import { FilmsService } from '../../services/films/films.service';

@Component({
  selector: 'app-home-page',
  imports: [ CommonModule, RouterModule ],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  films: Films[] = [];

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
  // MIEUX NOTÉS
  // =========================

  get filmsMieuxNotes(): Films[] {
    const aujourdHui = Date.now();

    return [...this.films]
      .filter(film => film.dateSortie <= aujourdHui)
      .sort((a, b) => b.noteMoyenne - a.noteMoyenne)
      .slice(0, 4);
  }

  // =========================
  // À L'AFFICHE
  // =========================

  get filmsAffiche(): Films[] {
    const aujourdHui = Date.now();

    return [...this.films]
      .filter(film => film.dateSortie <= aujourdHui)
      .sort((a, b) => b.dateSortie - a.dateSortie)
      .slice(0, 4);
  }

  // =========================
  // À VENIR
  // =========================

  get filmsAVenir(): Films[] {
    const aujourdHui = Date.now();

    return [...this.films]
      .filter(film => film.dateSortie > aujourdHui)
      .sort((a, b) => a.dateSortie - b.dateSortie)
      .slice(0, 4);
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
