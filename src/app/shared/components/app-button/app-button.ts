import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MATERIAL_MODULES } from '../material/material';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [
    CommonModule,
    ...MATERIAL_MODULES
  ],
  templateUrl: './app-button.html',
  styleUrl: './app-button.css'
})
export class AppButtonComponent {

  @Input() text = 'Submit';

  @Input() type: 'button' | 'submit' = 'submit';

  @Input() color: 'primary' | 'accent' | 'warn' = 'primary';

  @Input() loading = false;

  @Input() disabled = false;

}
