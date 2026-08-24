import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FilmsService } from '../../../services/films/films.service';

@Component({
  selector: 'app-admin-home',
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {

  nombreFilms = 0;

  constructor(
    private router: Router,
    private filmsService: FilmsService
  ) {}

  ngOnInit(): void {
    this.checkAccess();
    this.chargerNombreFilms();
  }

  private checkAccess(): void {
    const userString = localStorage.getItem('user');

    if (!userString) {
      this.router.navigate(['/login']);
      return;
    }

    try {
      const user = JSON.parse(userString);

      if (!user.role || user.role.role.toUpperCase() !== 'ADMIN') {
        this.router.navigate(['/']);
      }
    } catch (e) {
      this.router.navigate(['/login']);
    }
  }

  private chargerNombreFilms(): void {
    this.filmsService.getAllFilms().subscribe({
      next: (films) => {
        this.nombreFilms = films.length;
      },
      error: (erreur) => {
        console.error(
          'Erreur lors du chargement du nombre de films :',
          erreur
        );
      }
    });
  }
}
