import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ASCGridConfigData } from '@webapp-components/asc-grid/asc-grid.component';
import { ConfirmComponent } from '@webapp-popups/confirm/confirm.component';
import { ServicePopupComponent } from './service-popup/service-popup.component';
import { ServiceService } from './service.service';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
})
export class ServiceComponent implements OnInit {
  public services: any;
  public searchAdvanced: boolean = true;
  public configData: ASCGridConfigData = {
    colHeadNames: ['STT', 'Tên dịch vụ', 'List giá'],
    colFieldNames: ['name', 'prices'],
    colFieldTypes: ['string', 'string'],
    buttons: [
      {
        color: 'primary',
        tooltip: 'Sửa',
        icon: 'create',
        functionName: 'edit',
      },
      {
        color: 'warn',
        tooltip: 'Xóa',
        icon: 'clear',
        functionName: 'delete',
      },
    ],
  };

  constructor(private serviceSvc: ServiceService, private dialog: MatDialog) {}

  public ngOnInit(): void {
    this.load();
  }
  public load(): void {
    this.serviceSvc.getServices().valueChanges.subscribe((resp: any) => {
      this.services = resp.data.services.map((m) => {
        return {
          id: m.id,
          name: m.name,
          prices: m.prices.join(', '),
        };
      });
    });
  }
  public pageEvent(pageE: any): void {
    // this.filter.PageIndex = pageE.pageIndex + 1;
    // this.filter.PageSize = pageE.pageSize;
    // this.loadGrid();
  }
  public buttonClick(eventInfo: any): void {
    switch (eventInfo.functionName) {
      case 'edit':
        this.edit(eventInfo.item);
        break;
      case 'delete':
        this.delete(eventInfo.item);
        break;
    }
  }
  public add(): void {
    this.openDialog();
  }
  public edit(item: any): void {
    this.openDialog(item);
  }
  public delete(item: any): void {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '750px',
      data: {
        height: '500px',
        title: 'Delete',
        message: 'Delete ' + item.id,
        id: item.id,
      },
    });
    dialogRef.afterClosed().subscribe(() => {
      // chạy sau khi đóng popup
    });
  }
  private openDialog(service?: any): void {
    console.log(service);
    const dialogRef = this.dialog.open(ServicePopupComponent, {
      width: '750px',
      data: {
        height: '500px',
        title: 'Thông tin dịch vụ',
        service,
      },
    });
    dialogRef.afterClosed().subscribe(() => {
      // chạy sau khi đóng popup
    });
  }
}
