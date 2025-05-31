import { Routes } from '@angular/router';
import { LoginFormComponent } from './forms/login-form/login-form.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: LoginFormComponent },
];
