import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { MATERIAL_MODULES } from '../../../shared/components/material/material';
import { SidebarMenu } from '../../models/sidebar-menu/sidebar-menu.model';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    ...MATERIAL_MODULES
  ],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class SidebarComponent {

  menus: SidebarMenu[] = [

    {
      label: 'Dashboard',
      icon: 'dashboard',
      route: '/admin/dashboard'
    },

    {
      label: 'Orders',
      icon: 'shopping_cart',
      route: '/admin/orders'
    },

    {
      label: 'Users',
      icon: 'group',
      route: '/admin/users'
    },

    {
      label: 'Saga Logs',
      icon: 'receipt_long',
      route: '/admin/saga-logs'
    }

  ];
}
