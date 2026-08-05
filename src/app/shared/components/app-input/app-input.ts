import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MATERIAL_MODULES } from '../material/material';
import { FormErrorComponent } from '../form-error/form-error';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormErrorComponent,
    ...MATERIAL_MODULES
  ],
  templateUrl: './app-input.html',
  styleUrl: './app-input.css'
})
export class AppInputComponent {

  @Input() label = '';

  @Input() type = 'text';

  @Input() placeholder = '';

  @Input({ required: true })
  control!: FormControl;

}
