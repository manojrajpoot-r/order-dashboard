import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';


@Component({

  selector: 'app-pagination',

  standalone: true,

  imports: [
    MatPaginatorModule
  ],

  templateUrl: './app-pagination.html',

  styleUrl: './app-pagination.css'

})
export class AppPaginationComponent {


  @Input()
  totalRecords: number = 0;
  @Input() page = 1;

  @Input()
  pageSize: number = 10;



  @Output() pageChange = new EventEmitter<any>();


  onPageChange(event: PageEvent) {

    this.pageChange.emit(event);

  }





















}
