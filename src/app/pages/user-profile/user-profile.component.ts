import { Component } from '@angular/core';
import { Users } from '../../models/tables/Users';
import { UsersService } from '../../services/users/users.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  imports: [CommonModule, RouterModule],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {
  user: Users | null = null;

  constructor(userService: UsersService) {}

  ngOnInit(): void {
    this.getUser();
    if (!this.user) {
      console.error('Aucun utilisateur trouvé dans le stockage local.');
    }
  }

  getUser(): void {
    const userData = localStorage.getItem('user');
    if (userData) {
      this.user = JSON.parse(userData);
    } else {
      this.user = null;
    }
  }

}
