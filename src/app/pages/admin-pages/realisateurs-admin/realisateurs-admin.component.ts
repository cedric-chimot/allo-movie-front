import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { RealisateursService } from '../../../services/realisateurs/realisateurs.service';
import { Realisateurs } from '../../../models/tables/Realisateurs';

@Component({
  selector: 'app-realisateurs-admin',
  imports: [
    CommonModule,
    RouterModule,
  ],
  templateUrl: './realisateurs-admin.component.html',
  styleUrls: ['./realisateurs-admin.component.css']
})
export class RealisateursAdminComponent implements OnInit {

  realisateurs: Realisateurs[] = [];
  isAddModalOpen = false;

  // Pagination
  currentPage = 1;
  realisateursParPage = 5;

  constructor(
    private realisateursService: RealisateursService
  ) {}

  ngOnInit(): void {
    this.chargerRealisateurs();
  }

  chargerRealisateurs(): void {
    this.realisateursService.getAllRealisateurs().subscribe({
      next: (realisateurs) => {
        this.realisateurs = realisateurs;
      },
      error: (erreur) => {
        console.error(
          'Erreur lors du chargement des realisateurs :',
          erreur
        );
      }
    });
  }

  get realisateursPagines(): Realisateurs[] {
    const debut = (this.currentPage - 1) * this.realisateursParPage;
    const fin = debut + this.realisateursParPage;

    return this.realisateurs.slice(debut, fin);
  }

  get nombrePages(): number {
    return Math.ceil(this.realisateurs.length / this.realisateursParPage);
  }

  changerPage(page: number): void {
    if (page >= 1 && page <= this.nombrePages) {
      this.currentPage = page;
    }
  }

  openAddModal(): void {
    this.isAddModalOpen = true;
  }

  closeModal(): void {
    this.isAddModalOpen = false;
  }

  filmAjoute(): void {
    this.closeModal();
    this.currentPage = 1;
    this.chargerRealisateurs();
  }
}
