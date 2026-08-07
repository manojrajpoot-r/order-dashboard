import { Routes } from '@angular/router';
import { Login } from './features/auth/login/login';
import { DashboardComponent } from './features/dashboard/dashboard';
import { OrderListComponent } from './features/orders/components/order-list/order-list';
import { authGuard } from './core/guard/auth-guard';
import { MainLayoutComponent } from './core/layout/main-layout/main-layout';

export const routes: Routes = [

  // Default Route
  {
    path: '',
    redirectTo: 'admin/login',
    pathMatch: 'full'
  },

  // Login (Without Guard)
  {
    path: 'admin/login',
    component: Login
  },

  // Protected Routes
  {
    path: 'admin',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [

      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },

      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'orders',
        loadComponent: () =>
          import('./features/orders/components/order-list/order-list')
            .then(m => m.OrderListComponent)
      },
      {
        path: 'orders/create',
        loadComponent: () =>
          import('./features/orders/components/order-add/order-add')
            .then(m => m.OrderAddComponent)
      },
      {
        path: 'orders/:id/edit',
        loadComponent: () =>
          import('./features/orders/components/order-add/order-add')
            .then(m => m.OrderAddComponent)
      },
      {
        path: 'orders/view/:id',
        loadComponent: () =>
          import('./features/orders/components/order-view/order-view')
            .then(m => m.OrderViewComponent)
      },
      {
        path: 'orders/import',
        loadComponent: () =>
          import('./features/orders/components/order-import/order-import')
            .then(m => m.OrderImportComponent)
      }

    ]
  },

  // 404
  {
    path: '**',
    redirectTo: 'admin/login'
  }

];
