import { Routes } from '@angular/router';
import { PublicationsListComponent } from './components/publications-list/publications-list.component';

export const HomeRoutes: Routes = [
  {
    path: '',
    redirectTo: 'publications-list',
    pathMatch: 'full'
  },
  {
    path: '',
    children: [
      {
        path: 'publications-list',
        component: PublicationsListComponent
      }
    ]
  }
];
