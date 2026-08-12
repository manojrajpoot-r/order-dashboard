import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../services/order';
import { MATERIAL_MODULES } from '../../../../shared/components/material/material';
import { RouterLink } from '@angular/router';
import { AppLoaderComponent } from '../../../../shared/components/app-loader/app-loader';
@Component({
  selector: 'app-saga-timeline',
  standalone: true,
  imports: [
    RouterLink,
    AppLoaderComponent,
    ...MATERIAL_MODULES
  ],
  templateUrl: './saga-timeline.html',
  styleUrl: './saga-timeline.css'
})
export class SagaTimelineComponent implements OnInit {

  private route = inject(ActivatedRoute);
  private orderService = inject(OrderService);

  orderId!: number;

  timeline: unknown[] = [];

  loading = false;

  ngOnInit(): void {

    this.orderId = Number(
      this.route.snapshot.paramMap.get('id')
    );

    this.loadTimeline();

  }

  loadTimeline(): void {

    this.loading = true;

    this.orderService.getTimeline(this.orderId)
      .subscribe({
        next: (response) => {
          console.log(response);
          this.timeline = response.data;

          this.loading = false;

        },
        error: () => {

          this.loading = false;

        }
      });

  }

}
