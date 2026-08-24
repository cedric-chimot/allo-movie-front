import { Routes } from '@angular/router';
import { LoginFormComponent } from './forms/login-form/login-form.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { RegisterFormComponent } from './forms/register-form/register-form.component';
import { AdminHomeComponent } from './pages/admin-pages/admin-home/admin-home.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { FilmsPageComponent } from './pages/films-page/films-page.component';
import { FilmDetailPageComponent } from './pages/film-detail-page/film-detail-page.component';
import { FilmsAdminPageComponent } from './pages/admin-pages/film-admin-page/film-admin-page.component';
import { RealisateursAdminComponent } from './pages/admin-pages/realisateurs-admin/realisateurs-admin.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent },
  { path: 'login', component: LoginFormComponent },
  { path: 'register', component: RegisterFormComponent },
  { path: 'admin-home', component: AdminHomeComponent },
  { path: 'admin-films', component: FilmsAdminPageComponent },
  { path: 'admin-directors', component: RealisateursAdminComponent },
  { path: 'user-profile', component: UserProfileComponent },
  { path: 'films', component: FilmsPageComponent },
  { path: 'films/:id', component: FilmDetailPageComponent }
];
