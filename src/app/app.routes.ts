import { Routes } from '@angular/router';
import { LoginFormComponent } from './forms/login-form/login-form.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { RegisterFormComponent } from './forms/register-form/register-form.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent },
  { path: 'login', component: LoginFormComponent },
  { path: 'register', component: RegisterFormComponent },
];
