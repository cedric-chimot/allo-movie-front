import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Films } from '../../models/tables/Films';
import { FilmsService } from '../../services/films/films.service';

@Component({
  selector: 'app-home-page',
  imports: [
    CommonModule,
    RouterModule
],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  films: Films[] = [];

  favorites: Set<number> = new Set();

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

  toggleFavorite(id: number): void {

    if (this.favorites.has(id)) {
      this.favorites.delete(id);
    } else {
      this.favorites.add(id);
    }

  }

  isFavorite(id: number): boolean {
    return this.favorites.has(id);
  }
}
