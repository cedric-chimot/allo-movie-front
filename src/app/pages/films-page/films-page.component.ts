import { Component } from '@angular/core';
import { Films } from '../../models/tables/Films';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-films-page',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './films-page.component.html',
  styleUrls: ['./films-page.component.css']
})
export class FilmsPageComponent {

  films: Films[] = [
    new Films(
      1,
      'Dune : Deuxième Partie',
      new Date('2024-02-28'),
      'Paul Atréides s’unit à Chani et aux Fremen tout en préparant sa vengeance contre ceux qui ont détruit sa famille.',
      'https://via.placeholder.com/300x450',
      8.7
    ),

    new Films(
      2,
      'Oppenheimer',
      new Date('2023-07-19'),
      'L’histoire du physicien J. Robert Oppenheimer et de son rôle dans le développement de la première bombe atomique.',
      'https://via.placeholder.com/300x450',
      8.6
    ),

    new Films(
      3,
      'Interstellar',
      new Date('2014-11-07'),
      'Un groupe d’explorateurs traverse un trou de ver afin de trouver une nouvelle planète capable d’accueillir l’humanité.',
      'https://via.placeholder.com/300x450',
      8.8
    ),

    new Films(
      4,
      'Inception',
      new Date('2010-07-16'),
      'Un spécialiste de l’extraction de secrets à travers les rêves doit accomplir une mission particulièrement complexe.',
      'https://via.placeholder.com/300x450',
      8.7
    ),

    new Films(
      5,
      'The Dark Knight',
      new Date('2008-07-16'),
      'Batman doit affronter le Joker, un criminel qui plonge Gotham dans le chaos.',
      'https://via.placeholder.com/300x450',
      9.0
    ),

    new Films(
      6,
      'Parasite',
      new Date('2019-05-30'),
      'Une famille modeste s’immisce progressivement dans la vie d’une famille beaucoup plus aisée.',
      'https://via.placeholder.com/300x450',
      8.5
    ),

    new Films(
      7,
      'Avatar',
      new Date('2009-12-16'),
      'Un ancien marine découvre la culture d’un peuple extraterrestre sur la planète Pandora.',
      'https://via.placeholder.com/300x450',
      8.1
    ),

    new Films(
      8,
      'Le Seigneur des Anneaux',
      new Date('2001-12-19'),
      'Un jeune Hobbit entreprend un voyage dangereux afin de détruire un anneau aux pouvoirs considérables.',
      'https://via.placeholder.com/300x450',
      8.9
    ),

    new Films(
      9,
      'Joker',
      new Date('2019-10-02'),
      'Arthur Fleck sombre progressivement dans une spirale qui le transforme en une figure criminelle.',
      'https://via.placeholder.com/300x450',
      8.4
    ),

    new Films(
      10,
      'Spider-Man: No Way Home',
      new Date('2021-12-15'),
      'Peter Parker demande de l’aide pour faire oublier son identité secrète, mais les conséquences sont inattendues.',
      'https://via.placeholder.com/300x450',
      8.0
    ),

    new Films(
      11,
      'Film à venir 1',
      new Date('2026-10-15'),
      'Un nouveau film bientôt disponible dans les salles.',
      'https://via.placeholder.com/300x450',
      0
    ),

    new Films(
      12,
      'Film à venir 2',
      new Date('2026-12-10'),
      'Une nouvelle aventure cinématographique prochainement disponible.',
      'https://via.placeholder.com/300x450',
      0
    )
  ];

  searchTerm = '';

  currentPage = 1;
  filmsParPage = 8;

  favoris: Set<number> = new Set();


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
    const aujourdHui = new Date();

    return this.films
      .filter(film => film.dateSortie <= aujourdHui)
      .sort((a, b) => b.noteMoyenne - a.noteMoyenne)
      .slice(0, 5);
  }

  get sortiesRecentes(): Films[] {
    return [...this.films]
      .filter(film => film.dateSortie <= new Date())
      .sort(
        (a, b) =>
          b.dateSortie.getTime() - a.dateSortie.getTime()
      )
      .slice(0, 5);
  }

  get filmsAVenir(): Films[] {
    const aujourdHui = new Date();

    return [...this.films]
      .filter(film => film.dateSortie > aujourdHui)
      .sort(
        (a, b) =>
          a.dateSortie.getTime() - b.dateSortie.getTime()
      )
      .slice(0, 5);
  }


  // =========================
  // PAGINATION
  // =========================

  get filmsPagines(): Films[] {
    const debut = (this.currentPage - 1) * this.filmsParPage;

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
