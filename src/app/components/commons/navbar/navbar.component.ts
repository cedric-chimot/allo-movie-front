import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule, NgbCollapseModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  toggleNavbar = true;
  isLoggedIn = false;
  isAdmin = false;

  constructor(private router: Router) {}

  ngOnInit() {
    this.checkUser(); // appel initial

    // écoute les changements de route pour réévaluer
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.checkUser();
      }
    });
  }

  checkUser() {
    const userString = localStorage.getItem('user');
    this.isLoggedIn = !!userString;

    if (this.isLoggedIn && userString) {
      try {
        const user = JSON.parse(userString);
        // 🛠️ Ajout de la vérification nested role
        this.isAdmin = user.role?.role?.toLowerCase() === 'admin';
      } catch (e) {
        this.isAdmin = false;
      }
    } else {
      this.isAdmin = false;
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
