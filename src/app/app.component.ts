import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterModule, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { NavbarComponent } from "./components/commons/navbar/navbar.component";
import { FooterComponent } from "./components/commons/footer/footer.component";

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterModule, RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'allo-movie';
  isAdminRoute: boolean = false;

  constructor(private router: Router) {}

  ngOnInit() {
    // On écoute les changements de route pour mettre à jour la navbar
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      // Si l'URL contient '/admin', on affiche la navbar admin
      this.isAdminRoute = this.router.url.includes('/admin');
    });
  }
}
