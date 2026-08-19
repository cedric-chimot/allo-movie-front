import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Films } from '../../../models/tables/Films';
import { FilmsService } from '../../../services/films/films.service';

@Component({
  selector: 'app-films-admin-page',
  imports: [CommonModule, RouterModule],
  templateUrl: './film-admin-page.component.html',
  styleUrls: ['./film-admin-page.component.css']
})
export class FilmsAdminPageComponent implements OnInit {

  films: Films[] = [];

  constructor(private filmsService: FilmsService) {}

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

}
