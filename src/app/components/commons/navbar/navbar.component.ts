import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule, NgbCollapseModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  toggleNavbar = true;

  // Variable à mettre à jour selon l’état de connexion (ex: via un service Auth)
  isLoggedIn = false;

  constructor(private router: Router) { }

  ngOnInit() {
    this.router.events.subscribe(() => {
      this.toggleNavbar = true;
    });
  }

  toggleNav() {
    this.toggleNavbar = !this.toggleNavbar;
  }

  logout() {
    console.log('Déconnexion...');
    this.isLoggedIn = false;
  }
  
}
