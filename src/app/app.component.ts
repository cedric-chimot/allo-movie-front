import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterModule, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
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
