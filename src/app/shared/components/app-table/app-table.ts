import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TitleCasePipe } from '@angular/common';
import { MATERIAL_MODULES } from '../material/material';
import { AppLoaderComponent } from "../app-loader/app-loader";
import { AppStatusBadgeComponent } from '../app-status-badge/app-status-badge';
import { OnChanges, SimpleChanges } from '@angular/core';
@Component({
  selector: 'app-table',
  imports: [
    MatTooltipModule,
    TitleCasePipe,
    AppLoaderComponent,
    AppStatusBadgeComponent,
    ...MATERIAL_MODULES
  ],
  standalone: true,
  templateUrl: './app-table.html'
})
export class AppTableComponent {


  @Input() data: any[] = [];



  @Input() columns: any[] = [];

  @Input() loading: boolean = false;

  @Input() noDataMessage: string = 'No Data Found';


  @Input() actions: any[] = [];


  @Output() actionClick = new EventEmitter<any>();



  get displayedColumns() {

    return [

      ...this.columns.map(
        column => column.key
      ),

      ...(this.actions.length ? ['actions'] : [])

    ];

  }



  handleAction(action: string, row: any) {

    this.actionClick.emit({
      action,
      row
    });

  }


}
