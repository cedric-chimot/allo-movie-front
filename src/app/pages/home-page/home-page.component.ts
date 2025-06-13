import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home-page',
  imports: [CommonModule, RouterModule],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {
 films = [
    { title: 'Inception', year: 2010, director: 'Christopher Nolan', actor: 'Leonardo DiCaprio', genre: 'Science-fiction', image: 'https://via.placeholder.com/286x160' },
    { title: 'Parasite', year: 2019, director: 'Bong Joon-ho', actor: 'Song Kang-ho', genre: 'Thriller / Drame', image: 'https://via.placeholder.com/286x160' },
    { title: 'Amélie Poulain', year: 2001, director: 'Jean-Pierre Jeunet', actor: 'Audrey Tautou', genre: 'Comédie romantique', image: 'https://via.placeholder.com/286x160' }
  ];

  favorites: Set<string> = new Set();

  toggleFavorite(title: string): void {
    if (this.favorites.has(title)) {
      this.favorites.delete(title);
    } else {
      this.favorites.add(title);
    }
  }

  isFavorite(title: string): boolean {
    return this.favorites.has(title);
  }
  
}
