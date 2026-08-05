import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { MATERIAL_MODULES } from '../material/material';
import { FormErrorComponent } from '../form-error/form-error';

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormErrorComponent,
    ...MATERIAL_MODULES
  ],
  templateUrl: './app-select.html',
  styleUrl: './app-select.css'
})
export class AppSelectComponent {

  @Input() label = '';

  @Input() placeholder = '';

  @Input({ required: true })
  control!: FormControl;

  @Input() options: any[] = [];

  @Input() valueKey = 'value';

  @Input() labelKey = 'label';

}
