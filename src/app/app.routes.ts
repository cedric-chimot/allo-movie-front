import { Routes } from '@angular/router';
import { LoginFormComponent } from './forms/login-form/login-form.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { RegisterFormComponent } from './forms/register-form/register-form.component';
import { AdminHomeComponent } from './pages/admin-pages/admin-home/admin-home.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent },
  { path: 'login', component: LoginFormComponent },
  { path: 'register', component: RegisterFormComponent },
  { path: 'admin-home', component: AdminHomeComponent },
  { path: 'user-profile', component: UserProfileComponent },
];
