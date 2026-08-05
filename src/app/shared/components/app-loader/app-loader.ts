import { Component, inject } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoaderService } from '../../services/loader/loader.service';
@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [
    MatProgressSpinnerModule
  ],
  templateUrl: './app-loader.html',
  styleUrl: './app-loader.css'
})
export class AppLoaderComponent {


  loader = inject(LoaderService);
}







