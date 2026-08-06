import { Component, inject, signal, computed } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MATERIAL_MODULES } from '../../../../shared/components/material/material';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-order-add',
  imports: [
    ReactiveFormsModule,
    ...MATERIAL_MODULES
  ],
  templateUrl: './order-add.html',
  styleUrl: './order-add.css',
})
export class OrderAddComponent {

  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);

  orderId = signal<number | null>(null);

  isEditMode = computed(() => this.orderId() !== null);

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

    this.orderId.set(

      id ? Number(id) : null

    );

  }

}
