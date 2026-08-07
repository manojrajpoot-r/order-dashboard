import {
  Component,
  computed,
  inject,
  resource
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { MATERIAL_MODULES } from '../../../../shared/components/material/material';
import { AppLoaderComponent } from '../../../../shared/components/app-loader/app-loader';
import { AppStatusBadgeComponent } from '../../../../shared/components/app-status-badge/app-status-badge';
import { AppButtonComponent } from '../../../../shared/components/app-button/app-button';

import { OrderService } from '../../services/order';

@Component({
  selector: 'app-order-view',
  standalone: true,
  imports: [
    CommonModule,
    AppLoaderComponent,
    AppStatusBadgeComponent,
    AppButtonComponent,
    ...MATERIAL_MODULES
  ],
  templateUrl: './order-view.html',
  styleUrl: './order-view.css'
})
export class OrderViewComponent {

  private route = inject(ActivatedRoute);

  private router = inject(Router);

  private orderService = inject(OrderService);

  orderId = Number(
    this.route.snapshot.paramMap.get('id')
  );

  orderResource = resource({

    loader: async () => {

      const response = await this.orderService
        .getOrderById(this.orderId)
        .toPromise();

      return response;

    }

  });

  order = computed(() =>
    this.orderResource.value()?.data
  );

  back() {

    this.router.navigate([
      '/admin/orders'
    ]);

  }

}
