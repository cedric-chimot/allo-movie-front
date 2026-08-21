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

  // Données utilisées par le formulaire
  film = {
    id: null,
    titre: '',
    dateSortie: '',
    synopsis: '',
    image: '',
    noteMoyenne: 0
  };

  constructor(
    private filmsService: FilmsService
  ) {}

  ajouterFilm(): void {

    // Conversion de la date du formulaire
    // "2024-02-28" -> timestamp numérique
    const dateSortie = new Date(this.film.dateSortie).getTime();

    // Objet envoyé au backend
    const filmAEnvoyer = new Films(
      this.film.id,
      this.film.titre,
      dateSortie,
      this.film.synopsis,
      this.film.image,
      this.film.noteMoyenne
    );

    console.log('Film envoyé au backend :', filmAEnvoyer);

    this.filmsService.createFilms(filmAEnvoyer).subscribe({
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
