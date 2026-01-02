import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'favourites',
    loadComponent: () => import('./favourites/favourites.component').then((m) => m.FavouritesComponent),
  },
  {
    path: 'results',
    loadComponent: () => import('./results/results.component').then((m) => m.ResultsComponent),
  }
];
