import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-admin-navbar',
  imports: [CommonModule, RouterModule, NgbCollapseModule],
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.css']
})
export class AdminNavbarComponent implements OnInit {

  toggleNavbar = true;
  pseudo: string = '';
  isLoggedIn = false;
  isAdmin = false;

  constructor(private router: Router) { }

  ngOnInit() {
    this.router.events.subscribe(() => {
      this.toggleNavbar = true;
    });

    const userString = localStorage.getItem('user');
    if (userString) {
      try {
        const user = JSON.parse(userString);
        this.pseudo = user.pseudo;
      } catch (e) {
        this.pseudo = '';
      }
    }
  }

  logout() {
    console.log('Déconnexion...');
    localStorage.removeItem('user');
    this.isLoggedIn = false;
    this.isAdmin = false;
    window.location.href = '/login';
  }

  toggleNav() {
    this.toggleNavbar = !this.toggleNavbar;
  }
}
