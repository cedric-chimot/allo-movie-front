import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  toggleNavbar = true;

  constructor(private router: Router) { }

  ngOnInit() {
    this.router.events.subscribe(() => {
      this.toggleNavbar = true;
    });
  }

  toggleNav() {
    this.toggleNavbar = !this.toggleNavbar;
  }

}
