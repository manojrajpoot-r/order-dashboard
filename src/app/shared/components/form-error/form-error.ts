import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MATERIAL_MODULES } from '../material/material';
@Component({
  selector: 'app-form-error',
  standalone: true,
  imports: [
    CommonModule,
    ...MATERIAL_MODULES
  ],
  templateUrl: './form-error.html',
  styleUrl: './form-error.css'
})
export class FormErrorComponent {

  @Input() control!: AbstractControl | null;

  get errorMessage(): string {

    if (!this.control) return '';

    if (!this.control.touched) return '';

    if (!this.control.errors) return '';

    if (this.control.hasError('required'))
      return 'This field is required.';

    if (this.control.hasError('email'))
      return 'Please enter a valid email address.';

    if (this.control.hasError('minlength')) {

      return `Minimum ${this.control.getError('minlength').requiredLength} characters required.`;

    }

    if (this.control.hasError('maxlength')) {

      return `Maximum ${this.control.getError('maxlength').requiredLength} characters allowed.`;

    }

    if (this.control.hasError('pattern'))
      return 'Invalid format.';

    return '';

  }

}
