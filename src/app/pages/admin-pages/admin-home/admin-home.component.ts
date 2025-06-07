import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-home',
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.checkAccess();
    // Ici tu pourras ajouter d’autres initialisations plus tard.
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
      // En cas de JSON invalide
      this.router.navigate(['/login']);
    }
  }

}
