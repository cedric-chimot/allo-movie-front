import { Routes } from '@angular/router';
import { LoginFormComponent } from './forms/login-form/login-form.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { RegisterFormComponent } from './forms/register-form/register-form.component';
import { AdminHomeComponent } from './pages/admin-pages/admin-home/admin-home.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { SearchFilmsPageComponent } from './pages/search-films-page/search-films-page.component';
import { FilmDetailPageComponent } from './pages/film-detail-page/film-detail-page.component';
import { FilmsAdminPageComponent } from './pages/admin-pages/film-admin-page/film-admin-page.component';
import { RealisateursAdminPageComponent } from './pages/admin-pages/realisateurs-admin-page/realisateurs-admin-page.component';
import { ActeursAdminPageComponent } from './pages/admin-pages/acteurs-admin-page/acteurs-admin-page.component';
import { CategoriesAdminPageComponent } from './pages/admin-pages/categories-admin-page/categories-admin-page.component';
import { UsersAdminPageComponent } from './pages/admin-pages/users-admin-page/users-admin-page.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent },
  { path: 'login', component: LoginFormComponent },
  { path: 'register', component: RegisterFormComponent },
  { path: 'admin-home', component: AdminHomeComponent },
  { path: 'admin-films', component: FilmsAdminPageComponent },
  { path: 'admin-directors', component: RealisateursAdminPageComponent },
  { path: 'admin-actors', component: ActeursAdminPageComponent },
  { path: 'admin-categories', component: CategoriesAdminPageComponent },
  { path: 'admin-users', component: UsersAdminPageComponent },
  { path: 'user-profile', component: UserProfileComponent },
  { path: 'search', component: SearchFilmsPageComponent },
  { path: 'films/:id', component: FilmDetailPageComponent }
];
