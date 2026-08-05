import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-status-badge',
  standalone: true,
  imports: [],
  templateUrl: './app-status-badge.html',
  styleUrl: './app-status-badge.css'
})
export class AppStatusBadgeComponent {


  @Input({ required: true })
  status: string = '';


}
