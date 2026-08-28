import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Films } from '../../models/tables/Films';
import { FilmsService } from '../../services/films/films.service';


@Component({
  selector: 'app-film-detail-page',
  imports: [CommonModule, RouterModule],
  templateUrl: './film-detail-page.component.html',
  styleUrls: ['./film-detail-page.component.css']
})
export class FilmDetailPageComponent implements OnInit {

  film: Films | undefined;

  realisateur = '';

  acteurs: any[] = [];

  categories: string[] = [];

  ficheEnConstruction = false;


  constructor(
    private route: ActivatedRoute,
    private filmsService: FilmsService
  ) {}


  ngOnInit(): void {

    const id = Number(
      this.route.snapshot.paramMap.get('id')
    );


    if (!id) {
      this.ficheEnConstruction = true;
      return;
    }


    this.filmsService.getFilmDetail(id).subscribe({

      next: (detail) => {

        this.film = detail.film;

        this.realisateur = detail.realisateur;

        this.acteurs = detail.acteurs;

        this.categories = detail.categories;


        /*
         * Le film existe mais aucune relation
         * n'est encore renseignée.
         */
        if (
          !this.realisateur &&
          this.acteurs.length === 0 &&
          this.categories.length === 0
        ) {
          this.ficheEnConstruction = true;
        }

      },


      error: (error) => {

        console.error(
          'Erreur lors de la récupération du détail du film :',
          error
        );

        this.ficheEnConstruction = true;
      }

    });

  }

}

