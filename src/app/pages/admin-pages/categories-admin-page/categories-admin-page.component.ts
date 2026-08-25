import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CategorieService } from '../../../services/categorie/categorie.service';
import { Categorie } from '../../../models/tables/Categorie';
import { CategorieFormComponent } from "../../../forms/categorie-form/categorie-form.component";

@Component({
  selector: 'app-categories-admin-page',
  imports: [
    CommonModule,
    RouterModule,
    CategorieFormComponent
  ],
  templateUrl: './categories-admin-page.component.html',
  styleUrl: './categories-admin-page.component.css'
})
export class CategoriesAdminPageComponent implements OnInit {

  categorie: Categorie[] = [];
  isAddModalOpen = false;

  // Pagination
  currentPage = 1;
  categorieParPage = 6;

  constructor(
    private categorieService: CategorieService
  ) {}

  ngOnInit(): void {
    this.chargerCategorie();
  }

  chargerCategorie(): void {
    this.categorieService.getAllCategorie().subscribe({
      next: (categorie) => {
        this.categorie = categorie;
      },
      error: (erreur) => {
        console.error(
          'Erreur lors du chargement des categorie :',
          erreur
        );
      }
    });
  }

  get categoriePagines(): Categorie[] {
    const debut = (this.currentPage - 1) * this.categorieParPage;
    const fin = debut + this.categorieParPage;

    return this.categorie.slice(debut, fin);
  }

  get nombrePages(): number {
    return Math.ceil(this.categorie.length / this.categorieParPage);
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

  categorieAjoute(): void {
    this.closeModal();
    this.currentPage = 1;
    this.chargerCategorie();
  }
}
