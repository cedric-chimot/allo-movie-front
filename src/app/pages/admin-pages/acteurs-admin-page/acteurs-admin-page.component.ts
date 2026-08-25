import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ActeursService } from '../../../services/acteurs/acteurs.service';
import { Acteurs } from '../../../models/tables/Acteurs';
import { ActeurFormComponent } from "../../../forms/acteur-form/acteur-form.component";

@Component({
  selector: 'app-acteurs-admin-page',
  imports: [
    CommonModule,
    RouterModule,
    ActeurFormComponent
  ],
  templateUrl: './acteurs-admin-page.component.html',
  styleUrls: ['./acteurs-admin-page.component.css']
})
export class ActeursAdminPageComponent implements OnInit {

  acteurs: Acteurs[] = [];
  isAddModalOpen = false;

  // Pagination
  currentPage = 1;
  acteursParPage = 6;

  constructor(
    private acteursService: ActeursService
  ) {}

  ngOnInit(): void {
    this.chargerActeurs();
  }

  chargerActeurs(): void {
    this.acteursService.getAllActeurs().subscribe({
      next: (acteurs) => {
        this.acteurs = acteurs;
      },
      error: (erreur) => {
        console.error(
          'Erreur lors du chargement des acteurs :',
          erreur
        );
      }
    });
  }

  get acteursPagines(): Acteurs[] {
    const debut = (this.currentPage - 1) * this.acteursParPage;
    const fin = debut + this.acteursParPage;

    return this.acteurs.slice(debut, fin);
  }

  get nombrePages(): number {
    return Math.ceil(this.acteurs.length / this.acteursParPage);
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

  acteurAjoute(): void {
    this.closeModal();
    this.currentPage = 1;
    this.chargerActeurs();
  }
}
