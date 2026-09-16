import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { UsersService } from '../../../services/users/users.service';
import { Users } from '../../../models/tables/Users';

@Component({
  selector: 'app-user-admin-page',
  imports: [ CommonModule, RouterModule ],
  templateUrl: './users-admin-page.component.html',
  styleUrls: ['./users-admin-page.component.css']
})
export class UsersAdminPageComponent implements OnInit {

  users: Users[] = [];

  // Pagination
  currentPage = 1;
  usersParPage = 6;

  constructor(
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.chargerUsers();
  }

  chargerUsers(): void {
    this.usersService.getAllUsersNonAdmin().subscribe({
      next: (users) => {
        this.users = users;
      },
      error: (erreur) => {
        console.error(
          'Erreur lors du chargement des utilisateurs :',
          erreur
        );
      }
    });
  }

  get usersPagines(): Users[] {
    const debut = (this.currentPage - 1) * this.usersParPage;
    const fin = debut + this.usersParPage;

    return this.users.slice(debut, fin);
  }

  get nombrePages(): number {
    return Math.ceil(this.users.length / this.usersParPage);
  }

  changerPage(page: number): void {
    if (page >= 1 && page <= this.nombrePages) {
      this.currentPage = page;
    }
  }

}
