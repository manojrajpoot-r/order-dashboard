import { Component, inject, OnInit } from '@angular/core';
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


  orders: Order[] = [];
  loading = false;
  filteredOrders: Order[] = [];
  searchText = '';
  page = 1;
  pageSize = 10;
  totalRecords = 0;





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
      label: 'Status'
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

    this.getOrders();

  }


  getOrders() {

    this.loading = true;

    this.orderService.getOrders().subscribe({

      next: (response) => {

        this.orders = response;
        this.filteredOrders = response;

        this.totalRecords = response.length;

        this.loading = false;

      },

      error: () => {

        this.loading = false;

      }

    });

  }

  onSearch(value: string) {

    this.searchText = value;

    this.filteredOrders = this.orders.filter(order =>

      order.orderNumber
        ?.toLowerCase()
        .includes(value.toLowerCase())

      ||

      order.customerName
        ?.toLowerCase()
        .includes(value.toLowerCase())

      ||

      order.productCode
        ?.toLowerCase()
        .includes(value.toLowerCase())

    );

    this.totalRecords = this.filteredOrders.length;

    this.page = 1;

  }

  onPageChange(event: any) {

    this.page = event.page;

    this.pageSize = event.pageSize;

  }
  get pagedOrders(): Order[] {

    const start = (this.page - 1) * this.pageSize;

    return this.filteredOrders.slice(
      start,
      start + this.pageSize
    );

  }

  handleAction(event: any) {

    console.log(event);


    switch (event.action) {


      case 'view':

        console.log('View', event.row);

        break;


      case 'edit':

        console.log('Edit', event.row);

        break;


      case 'delete':

        console.log('Delete', event.row);

        break;


    }

  }











}
