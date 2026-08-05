import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MATERIAL_MODULES } from '../../../shared/components/material/material';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    ...MATERIAL_MODULES
  ],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class HeaderComponent {

  appName = 'TechSaga Admin';

  userName = 'Admin';

}
