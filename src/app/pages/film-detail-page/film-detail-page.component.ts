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

  films: Films[] = [
    new Films(
      1,
      'Dune : Deuxième Partie',
      new Date('2024-02-28'),
      'Paul Atréides s’unit à Chani et aux Fremen pour tenter de reprendre le contrôle d’Arrakis et se venger de ceux qui ont détruit sa famille.',
      'https://via.placeholder.com/500x750',
      8.7
    ),

    new Films(
      2,
      'Oppenheimer',
      new Date('2023-07-19'),
      'L’histoire de J. Robert Oppenheimer, physicien américain dont les travaux ont joué un rôle majeur dans la création de la première bombe atomique.',
      'https://via.placeholder.com/500x750',
      8.6
    ),

    new Films(
      3,
      'Interstellar',
      new Date('2014-11-07'),
      'Dans un futur où la Terre devient progressivement inhabitable, un groupe d’explorateurs voyage à travers un trou de ver afin de trouver une nouvelle planète capable d’accueillir l’humanité.',
      'https://via.placeholder.com/500x750',
      8.8
    ),

    new Films(
      4,
      'Inception',
      new Date('2010-07-16'),
      'Dom Cobb est un spécialiste de l’extraction : il pénètre dans les rêves des autres afin de voler leurs secrets. Une dernière mission lui est proposée : implanter une idée dans l’esprit d’une cible.',
      'https://via.placeholder.com/500x750',
      8.7
    ),

    new Films(
      5,
      'The Dark Knight',
      new Date('2008-07-16'),
      'Batman doit affronter le Joker, un criminel imprévisible qui plonge Gotham City dans le chaos et pousse ses habitants et ses héros dans leurs derniers retranchements.',
      'https://via.placeholder.com/500x750',
      9.0
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

    if (!this.film) {
      return;
    }

    const relations = this.relationsFilms[this.film.id];

    if (!relations) {
      return;
    }

    this.realisateur = relations.realisateur;
    this.acteurs = relations.acteurs;
    this.categories = relations.categories;
  }
}
