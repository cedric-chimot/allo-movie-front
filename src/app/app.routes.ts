import { Routes } from '@angular/router';
import { LoginFormComponent } from './forms/login-form/login-form.component';
import { HomePageComponent } from './pages/home-page/home-page.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent },
  { path: 'login', component: LoginFormComponent },
];
