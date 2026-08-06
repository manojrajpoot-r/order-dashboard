import { Component, inject, OnInit, signal, computed, effect, resource } from '@angular/core';
import { OrderService } from '../../../orders/services/order';
import { Order } from '../../models/order.model';
import { AppTableComponent } from '../../../../shared/components/app-table/app-table';
import { AppLoaderComponent } from '../../../../shared/components/app-loader/app-loader';
import { TableColumn } from '../../../../shared/models/table-column/table-column.model'
import { TableAction } from '../../../../shared/models/table-column/table-action.model'
import { MATERIAL_MODULES } from '../../../../shared/components/material/material';
import { AppStatusBadgeComponent } from '../../../../shared/components/app-status-badge/app-status-badge'
import { AppPaginationComponent } from "../../../../shared/components/app-pagination/app-pagination";
import { SearchBox } from "../../../../shared/components/search-box/search-box";
import { Router } from '@angular/router';
@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [
    AppTableComponent,
    AppLoaderComponent,
    ...MATERIAL_MODULES,
    AppStatusBadgeComponent,
    SearchBox,
    AppPaginationComponent
  ],
  templateUrl: './order-list.html'
})
export class OrderListComponent implements OnInit {

  private orderService = inject(OrderService);
  private router = inject(Router);


  page = signal(1);
  pageSize = signal(10);
  searchText = signal('');


  columns = [

    {
      key: 'orderNumber',
      label: 'Order No'
    },

    {
      key: 'customerName',
      label: 'Customer'
    },

    {
      key: 'productCode',
      label: 'Product'
    },

    {
      key: 'quantity',
      label: 'Qty'
    },

    {
      key: 'totalAmount',
      label: 'Amount'
    },

    {
      key: 'status',
      label: 'Status',
      type: 'status'
    }

  ];

  actions = [

    {
      name: 'view',
      icon: 'visibility'
    },

    {
      name: 'edit',
      icon: 'edit'
    },

    {
      name: 'delete',
      icon: 'delete'
    }

  ];



  ngOnInit() {

  }

  onSearch(value: string) {
    this.searchText.set(value);
    this.page.set(1);
  }

  onPageChange(event: any) {
    this.page.set(event.page);
    this.pageSize.set(
      event.pageSize
    );
  }


  handleAction(event: any) {

    switch (event.action) {

      case 'view':

        break;

      case 'edit':
        this.router.navigate([
          '/admin/orders',
          event.row.id,
          'edit'
        ]);
        break;

      case 'delete':

        break;
    }
  }



  filteredOrders = computed(() => {
    const keyword = this.searchText().trim().toLowerCase();

    if (!keyword) {

      return this.orders();

    }

    return this.orders().filter(order =>

      order.customerName
        .toLowerCase()
        .includes(keyword)
      ||
      order.orderNumber
        .toLowerCase()
        .includes(keyword)
      ||
      order.productCode
        .toLowerCase()
        .includes(keyword)
    );
  });

  pagedOrders = computed(() => {
    const start =
      (this.page() - 1)
      * this.pageSize();
    return this.filteredOrders()
      .slice(
        start,
        start + this.pageSize()
      );
  });

  totalRecords = computed(() => this.filteredOrders().length);

  pendingOrders = computed(() =>
    this.orders()
      .filter(
        order =>
          order.status === 'PENDING'
      )
  );

  ordersResource = resource({
    loader: async () => {
      return await this.orderService.getOrders();
    }
  });
  orders = computed<Order[]>(() =>
    this.ordersResource.value()?.data ?? []
  );
}
