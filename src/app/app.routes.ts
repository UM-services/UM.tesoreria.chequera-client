import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Dashboard } from './components/dashboard/dashboard';
import { FacultadSelector } from './components/facultad-selector/facultad-selector';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: Login
  },
  {
    path: 'facultad-selector',
    component: FacultadSelector,
    canActivate: [AuthGuard]
  },
  {
    path: 'dashboard',
    component: Dashboard,
    canActivate: [AuthGuard]
  }
];
