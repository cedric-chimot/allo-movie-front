import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { SidebarService } from '../../../services/sidebar/sidebar.service';

@Component({
  selector: 'app-admin-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.css']
})
export class AdminSidebarComponent {
  selectedItem: string | undefined;

  // Définir les éléments avec leurs icônes
  items = [
    { name: 'Dashboard', route: '/admin-home', icon: 'fa-solid fa-tachometer-alt' },
    { name: 'Films', route: '/admin-films', icon: 'fa-solid fa-film' },
    { name: 'Utilisateurs', route: '/admin-users', icon: 'fa-solid fa-users' },
    { name: 'Alertes', route: '/admin-users', icon: 'fa-solid fa-triangle-exclamation' },
    { name: 'Messages', route: '/admin-messages', icon: 'fa-solid fa-envelope' },
    { name: 'Stats', route: '/admin-stats', icon: 'fas fa-chart-line' },
    { name: 'Admins', route: '/admin-admins', icon: 'fa-solid fa-user-shield' },
  ];

  constructor(private router: Router, private sidebarService: SidebarService) {}

  ngOnInit(): void {
    // Mettre à jour l'élément sélectionné au chargement initial
    this.updateSelectedItem();

    // Écouter les changements de route pour garder l'élément actif à jour
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.updateSelectedItem();
      }
    });
  }

  // Mettre à jour l'élément sélectionné
  updateSelectedItem(): void {
    const currentRoute = this.router.url;
    const matchingItem = this.items.find(item => item.route === currentRoute);
    this.selectedItem = matchingItem ? matchingItem.name : undefined;

    // Mettre à jour dans le service pour persister l'état
    if (this.selectedItem) {
      this.sidebarService.setSelectedItem(this.selectedItem);
    }
  }

  // Gestion du clic sur un élément de la sidebar
  onItemClick(item: { name: string; route: string }): void {
    this.sidebarService.setSelectedItem(item.name);
    this.selectedItem = item.name;
    this.router.navigate([item.route]);
  }
}
