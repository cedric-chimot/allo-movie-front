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

  realisateurs: string[] = [];

  acteurs: any[] = [];

  categories: string[] = [];

  ficheEnConstruction = false;

  isCastingModalOpen = false;


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

        this.realisateurs = detail.realisateurs;

        this.acteurs = detail.acteurs;

        this.categories = detail.categories;


        /*
         * Le film existe mais aucune relation
         * n'est encore renseignée.
         */

        if (
          this.realisateurs.length === 0 &&
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


  openCastingModal(): void {

    this.isCastingModalOpen = true;

  }


  closeCastingModal(): void {

    this.isCastingModalOpen = false;

  }


  formatDuree(duree: number | null | undefined): string {

    if (!duree || duree <= 0) {

      return 'À venir';

    }


    const heures = Math.floor(duree / 60);

    const minutes = duree % 60;


    if (heures === 0) {

      return `${minutes} min`;

    }


    if (minutes === 0) {

      return `${heures}h`;

    }


    return `${heures}h${minutes.toString().padStart(2, '0')}`;

  }

}
