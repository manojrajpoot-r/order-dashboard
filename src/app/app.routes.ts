import { Routes } from '@angular/router';
import { Login } from './features/auth/login/login';
import { DashboardComponent } from './features/dashboard/dashboard';
import { OrderListComponent } from './features/orders/components/order-list/order-list';
import { authGuard } from './core/guard/auth-guard';
import { MainLayoutComponent } from './core/layout/main-layout/main-layout';
import { OrderEditComponent } from './features/orders/components/order-edit/order-edit';
import { OrderAddComponent } from './features/orders/components/order-add/order-add';
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
        component: OrderListComponent
      },
      {
        path: 'orders/create',
        component: OrderAddComponent
      },
      {
        path: 'orders/:id/edit',
        component: OrderEditComponent
      }

    ]
  },

  // 404
  {
    path: '**',
    redirectTo: 'admin/login'
  }

];
