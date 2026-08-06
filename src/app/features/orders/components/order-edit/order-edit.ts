import { Component, inject, signal, computed } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-edit',
  standalone: true,
  templateUrl: './order-edit.html'
})
export class OrderEditComponent {

  private route = inject(ActivatedRoute);

  orderId = signal<number | null>(null);

  isEditMode = computed(() => this.orderId() !== null);

  constructor() {

    const id = this.route.snapshot.paramMap.get('id');

    this.orderId.set(id ? Number(id) : null);

  }

}
