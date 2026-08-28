import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

import { Films } from '../../models/tables/Films';

@Component({
  selector: 'app-film-detail-page',
  imports: [CommonModule, RouterModule],
  templateUrl: './film-detail-page.component.html',
  styleUrls: ['./film-detail-page.component.css']
})
export class FilmDetailPageComponent {

  film: Films | undefined;

  realisateur = '';
  acteurs: string[] = [];
  categories: string[] = [];

  ficheEnConstruction = false;

  films: Films[] = [
    new Films(
      1,
      'Dune : Deuxième Partie',
      new Date('2024-02-28').getTime(),
      'Paul Atréides s’unit à Chani et aux Fremen pour tenter de reprendre le contrôle d’Arrakis et se venger de ceux qui ont détruit sa famille.',
      'https://via.placeholder.com/500x750',
      8.7,
      ''
    ),

    new Films(
      2,
      'Oppenheimer',
      new Date('2023-07-19').getTime(),
      'L’histoire de J. Robert Oppenheimer, physicien américain dont les travaux ont joué un rôle majeur dans la création de la première bombe atomique.',
      'https://via.placeholder.com/500x750',
      8.6,
      ''
    ),

    new Films(
      3,
      'Interstellar',
      new Date('2014-11-07').getTime(),
      'Dans un futur où la Terre devient progressivement inhabitable, un groupe d’explorateurs voyage à travers un trou de ver afin de trouver une nouvelle planète capable d’accueillir l’humanité.',
      'https://via.placeholder.com/500x750',
      8.8,
      ''
    ),

    new Films(
      4,
      'Inception',
      new Date('2010-07-16').getTime(),
      'Dom Cobb est un spécialiste de l’extraction : il pénètre dans les rêves des autres afin de voler leurs secrets. Une dernière mission lui est proposée : implanter une idée dans l’esprit d’une cible.',
      'https://via.placeholder.com/500x750',
      8.7,
      ''
    ),

    new Films(
      5,
      'The Dark Knight',
      new Date('2008-07-16').getTime(),
      'Batman doit affronter le Joker, un criminel imprévisible qui plonge Gotham City dans le chaos et pousse ses habitants et ses héros dans leurs derniers retranchements.',
      'https://via.placeholder.com/500x750',
      9.0,
      ''
    ),

    new Films(
      6,
      'Parasite',
      new Date('2019-05-30').getTime(),
      'Une famille modeste s’immisce progressivement dans la vie d’une famille beaucoup plus aisée.',
      'https://via.placeholder.com/500x750',
      8.5,
      ''
    ),

    new Films(
      7,
      'Avatar',
      new Date('2009-12-16').getTime(),
      'Un ancien marine découvre la culture d’un peuple extraterrestre sur la planète Pandora.',
      'https://via.placeholder.com/500x750',
      8.1,
      ''
    ),

    new Films(
      8,
      'Le Seigneur des Anneaux',
      new Date('2001-12-19').getTime(),
      'Un jeune Hobbit entreprend un voyage dangereux afin de détruire un anneau aux pouvoirs considérables.',
      'https://via.placeholder.com/500x750',
      8.9,
      ''
    ),

    new Films(
      9,
      'Joker',
      new Date('2019-10-02').getTime(),
      'Arthur Fleck sombre progressivement dans une spirale qui le transforme en une figure criminelle.',
      'https://via.placeholder.com/500x750',
      8.4,
      ''
    ),

    new Films(
      10,
      'Spider-Man: No Way Home',
      new Date('2021-12-15').getTime(),
      'Peter Parker demande de l’aide pour faire oublier son identité secrète, mais les conséquences sont inattendues.',
      'https://via.placeholder.com/500x750',
      8.0,
      ''
    ),

    new Films(
      11,
      'Film à venir 1',
      new Date('2026-10-15').getTime(),
      'Un nouveau film bientôt disponible dans les salles.',
      'https://via.placeholder.com/500x750',
      0,
      ''
    ),

    new Films(
      12,
      'Film à venir 2',
      new Date('2026-12-10').getTime(),
      'Une nouvelle aventure cinématographique prochainement disponible.',
      'https://via.placeholder.com/500x750',
      0,
      ''
    )
  ];
  /**
   * Données temporaires représentant les relations
   * entre les films, les réalisateurs, les acteurs et les catégories.
   *
   * Elles seront remplacées plus tard par les données de la BDD.
   */
  relationsFilms: {
    [idFilm: number]: {
      realisateur: string;
      acteurs: string[];
      categories: string[];
    };
  } = {

    1: {
      realisateur: 'Denis Villeneuve',
      acteurs: [
        'Timothée Chalamet',
        'Zendaya',
        'Rebecca Ferguson'
      ],
      categories: [
        'Science-fiction',
        'Aventure',
        'Drame'
      ]
    },

    2: {
      realisateur: 'Christopher Nolan',
      acteurs: [
        'Cillian Murphy',
        'Emily Blunt',
        'Robert Downey Jr.'
      ],
      categories: [
        'Biographie',
        'Drame',
        'Historique'
      ]
    },

    3: {
      realisateur: 'Christopher Nolan',
      acteurs: [
        'Matthew McConaughey',
        'Anne Hathaway',
        'Jessica Chastain'
      ],
      categories: [
        'Science-fiction',
        'Aventure',
        'Drame'
      ]
    },

    4: {
      realisateur: 'Christopher Nolan',
      acteurs: [
        'Leonardo DiCaprio',
        'Joseph Gordon-Levitt',
        'Tom Hardy'
      ],
      categories: [
        'Science-fiction',
        'Thriller',
        'Action'
      ]
    },

    5: {
      realisateur: 'Christopher Nolan',
      acteurs: [
        'Christian Bale',
        'Heath Ledger',
        'Gary Oldman'
      ],
      categories: [
        'Action',
        'Thriller',
        'Drame'
      ]
    }

  };

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = Number(
      this.route.snapshot.paramMap.get('id')
    );

    this.film = this.films.find(
      film => film.id === id
    );

    // L'ID ne correspond à aucun film
    if (!this.film || this.film.id === null) {
      return;
    }

    const relations = this.relationsFilms[this.film.id];

    // Le film existe mais sa fiche n'est pas encore complète
    if (!relations) {
      this.ficheEnConstruction = true;
      return;
    }

    this.realisateur = relations.realisateur;
    this.acteurs = relations.acteurs;
    this.categories = relations.categories;
  }
}
