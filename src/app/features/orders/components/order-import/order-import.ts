import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { MATERIAL_MODULES } from '../../../../shared/components/material/material';
import { AppButtonComponent } from '../../../../shared/components/app-button/app-button';
import { SnackbarService } from '../../../../shared/services/snackbar/snackbar.service';
import { OrderService } from '../../services/order';

@Component({
  selector: 'app-order-import',
  standalone: true,
  imports: [
    CommonModule,
    AppButtonComponent,
    ...MATERIAL_MODULES
  ],
  templateUrl: './order-import.html',
  styleUrl: './order-import.css'
})
export class OrderImportComponent {

  private orderService = inject(OrderService);

  private snackbar = inject(SnackbarService);

  public router = inject(Router);

  selectedFile = signal<File | null>(null);

  loading = signal(false);

  onFileSelected(event: Event): void {

    const input = event.target as HTMLInputElement;

    if (!input.files?.length) {

      return;

    }

    this.selectedFile.set(input.files[0]);

  }

  importOrders(): void {

    if (!this.selectedFile()) {

      this.snackbar.error('Please select an Excel file');

      return;

    }

    const formData = new FormData();

    formData.append(
      'file',
      this.selectedFile()!
    );

    this.loading.set(true);

    this.orderService.importOrders(formData)
      .subscribe({

        next: () => {

          this.loading.set(false);

          this.snackbar.success(
            'Orders Imported Successfully'
          );

          this.router.navigate([
            '/admin/orders'
          ]);

        },

        error: (error) => {

          this.loading.set(false);

          console.log(error);

          this.snackbar.error(
            'Import Failed'
          );

        }

      });

  }

}
