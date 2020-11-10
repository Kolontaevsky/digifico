import { LoginComponent } from './components/login/login.component';
import { Routes } from '@angular/router';

export const AuthRoutes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '',
    children: [
      {
        path: 'login',
        component: LoginComponent
      }
    ]
  }
];
