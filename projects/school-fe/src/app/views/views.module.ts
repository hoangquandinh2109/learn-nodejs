import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ConfirmComponent } from '@webapp-popups/confirm/confirm.component';
import { InfoDialogComponent } from '@webapp-popups/confirm/InfoDialog/info-dialog/info-dialog.component';
import { SharedModule } from '@webapp-share/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HistoryComponent } from './history/history.component';
import { WorkComponent } from './history/work/work.component';
import { ServicePopupComponent } from './service/service-popup/service-popup.component';
import { ServiceComponent } from './service/service.component';
import { ViewsRoutingModule } from './views-routing.module';


const COMPONENTS = [
  ServiceComponent,
  DashboardComponent,
  HistoryComponent
];

const ENTRYCOMPONENTS = [
  ConfirmComponent,
  InfoDialogComponent,
  ServicePopupComponent,
  WorkComponent
];

@NgModule({
  declarations: [...COMPONENTS, ...ENTRYCOMPONENTS],
  imports: [
    CommonModule,
    FormsModule,
    ViewsRoutingModule,
    MatPaginatorModule,
    MatButtonModule,
    MatTooltipModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatDatepickerModule,
    SharedModule
  ],
  entryComponents: [...ENTRYCOMPONENTS]
})
export class ViewsModule { }
