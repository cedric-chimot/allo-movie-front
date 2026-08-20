import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Films } from '../../models/tables/Films';
import { FilmsService } from '../../services/films/films.service';

@Component({
  selector: 'app-film-form',
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './film-form.component.html',
  styleUrls: ['./film-form.component.css']
})
export class FilmFormComponent {

  @Output() close = new EventEmitter<void>();
  @Output() filmCreated = new EventEmitter<void>();

  film: Films = new Films(
    0,
    '',
    new Date(),
    '',
    '',
    0
  );

  constructor(
    private filmsService: FilmsService
  ) {}

  ajouterFilm(): void {

    this.filmsService.createFilms(this.film).subscribe({
      next: () => {
        this.filmCreated.emit();
      },
      error: (erreur) => {
        console.error(
          'Erreur lors de la création du film :',
          erreur
        );
      }
    });

  }

  fermer(): void {
    this.close.emit();
  }
}
