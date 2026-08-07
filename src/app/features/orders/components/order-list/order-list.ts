import { Component, inject, OnInit, signal, computed, effect, resource } from '@angular/core';
import { OrderService } from '../../../orders/services/order';
import { Order } from '../../models/order.model';
import { AppTableComponent } from '../../../../shared/components/app-table/app-table';
import { TableColumn } from '../../../../shared/models/table-column/table-column.model'
import { TableAction } from '../../../../shared/models/table-action/table-action.model'
import { MATERIAL_MODULES } from '../../../../shared/components/material/material';
import { AppPaginationComponent } from "../../../../shared/components/app-pagination/app-pagination";
import { SearchBox } from "../../../../shared/components/search-box/search-box";
import { Router } from '@angular/router';
import { SnackbarService } from '../../../../shared/services/snackbar/snackbar.service';
import {
  RouterLink,
  RouterLinkActive
} from '@angular/router';
@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [
    AppTableComponent,
    RouterLink,
    RouterLinkActive,
    SearchBox,
    AppPaginationComponent,
    ...MATERIAL_MODULES,

  ],
  templateUrl: './order-list.html'
})
export class OrderListComponent implements OnInit {

  private orderService = inject(OrderService);
  private router = inject(Router);
  private snackbar = inject(SnackbarService);

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
      type: 'status-select'
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
    },
    {
      key: 'status',
      label: 'Status',
      type: 'status-select'
    },
    {
      name: 'cancel',
      icon: 'cancel'
    }

  ];


  statusOptions = [
    { label: 'Pending', value: 'PENDING' },
    { label: 'Processing', value: 'PROCESSING' },
    { label: 'Placed', value: 'PLACED' },
    { label: 'Cancelled', value: 'CANCELLED' }
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
        this.router.navigate([
          '/admin/orders/view',
          event.row.id
        ]);

        break;

      case 'edit':
        this.router.navigate([
          '/admin/orders',
          event.row.id,
          'edit'
        ]);
        break;

      case 'delete':
        this.deleteOrder(event.row.id);
        break;

      case 'status':
        this.changeStatus(event.row.id, event.row.status);
        break;

      case 'cancel':
        this.cancelOrder(event.row.orderNumber);
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




  deleteOrder(id: number) {
    if (!confirm('Delete this order?')) return;
    this.orderService.deleteOrder(id).subscribe({
      next: () => {
        this.snackbar.success('Order Deleted Successfully');
        this.ordersResource.reload();
      }

    });
  }

  changeStatus(id: number, status: string): void {
    this.orderService.updateStatus(id, status).subscribe({
      next: () => {
        this.snackbar.success('Status Updated Successfully');
        this.ordersResource.reload();
      }
    });

  }


  cancelOrder(orderNumber: string) {
    if (!confirm('Cancel Order?')) {
      return;
    }

    this.orderService
      .cancelOrder(orderNumber)
      .subscribe({
        next: () => {
          this.snackbar.success(
            'Order Cancelled Successfully'
          );
          this.ordersResource.reload();
        }
      });
  }
}
