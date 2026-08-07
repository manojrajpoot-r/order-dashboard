import { Component, inject, signal, computed } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MATERIAL_MODULES } from '../../../../shared/components/material/material';
import { CommonModule } from '@angular/common';
import { AppInputComponent } from '../../../../shared/components/app-input/app-input';
import { AppButtonComponent } from '../../../../shared/components/app-button/app-button';
import { AppSelectComponent } from '../../../../shared/components/app-select/app-select';
import { SnackbarService } from '../../../../shared/services/snackbar/snackbar.service';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { OrderService } from '../../services/order';
@Component({
  selector: 'app-order-add',
  imports: [
    ReactiveFormsModule,
    AppInputComponent,
    AppButtonComponent,
    AppSelectComponent,

    ...MATERIAL_MODULES
  ],
  templateUrl: './order-add.html',
  styleUrl: './order-add.css',
})
export class OrderAddComponent {

  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private orderService = inject(OrderService);
  private snackbar = inject(SnackbarService);
  // Signal
  orderId = signal<number | null>(null);

  // Computed Signal
  isEditMode = computed(() => this.orderId() !== null);

  statusOptions = [
    { label: 'Pending', value: 'PENDING' },
    { label: 'Reserved', value: 'RESERVED' },
    { label: 'Paid', value: 'PAID' },
    { label: 'Shipped', value: 'SHIPPED' },
    { label: 'Delivered', value: 'DELIVERED' }
  ];

  form = this.fb.nonNullable.group({

    orderNumber: ['', Validators.required],

    customerName: ['', Validators.required],

    productCode: ['', Validators.required],

    quantity: [1, [Validators.required, Validators.min(1)]],

    totalAmount: [0, [Validators.required, Validators.min(1)]],

    status: ['PENDING', Validators.required]

  });

  constructor() {

    const id = this.route.snapshot.paramMap.get('id');

    this.orderId.set(id ? Number(id) : null);

    if (this.isEditMode()) {
      this.loadOrder();
    }

  }

  loadOrder(): void {
    const id = this.orderId();

    if (!id) return;

    this.orderService.getOrderById(id).subscribe({

      next: (response: any) => {

        console.log(response);

        this.form.patchValue({

          orderNumber: response.data.orderNumber,

          customerName: response.data.customerName,

          productCode: response.data.productCode,

          quantity: response.data.quantity,

          totalAmount: response.data.totalAmount,

          status: response.data.status

        });

      }

    });

  }

  save() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    if (this.isEditMode()) {
      this.updateOrder();
    } else {
      this.createOrder();
    }

  }

  createOrder() {

    const form = this.form.getRawValue();

    const payload = {

      order_number: form.orderNumber,

      customer_name: form.customerName,

      product_code: form.productCode,

      quantity: form.quantity,

      total_amount: form.totalAmount,

      idempotency_key: crypto.randomUUID()

    };

    this.orderService.createOrder(payload).subscribe({

      next: () => {

        this.snackbar.success('Order Created Successfully');

        this.router.navigate(['/admin/orders']);

      },

      error: (err) => {

        console.log(err.error);

      }

    });

  }

  updateOrder(): void {

    const form = this.form.getRawValue();

    const payload = {

      order_number: form.orderNumber,

      customer_name: form.customerName,

      product_code: form.productCode,

      quantity: form.quantity,

      total_amount: form.totalAmount,

      idempotency_key: crypto.randomUUID()

    };

    this.orderService.updateOrder(

      this.orderId()!,

      payload

    ).subscribe({

      next: (response) => {
        this.snackbar.success('Order Updated Successfully');
        this.router.navigate(['/admin/orders']);

      },

      error: (error) => {
        console.error(error);
        this.snackbar.error(error);

      }

    });

  }

  cancel() {
    this.router.navigate(['/admin/orders']);
  }

}






