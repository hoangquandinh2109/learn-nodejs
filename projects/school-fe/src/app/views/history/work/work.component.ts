import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiceService } from '@webapp-views/service/service.service';
import { Observable, Subject } from 'rxjs';
import { map, startWith, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.scss'],
})
export class WorkComponent implements OnInit, OnDestroy {
  public servicesListFiltered: Observable<any>;
  public workForm: FormGroup = new FormGroup({
    service: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
  });
  public prices: number[] = [];
  public isEditMode: boolean = false;

  private servicesList: any[] = [];
  private destroy: Subject<void> = new Subject<void>();
  constructor(
    public dialogRef: MatDialogRef<WorkComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private serviceSvc: ServiceService
  ) { }

  public ngOnInit(): void {
    this.initServiceAC();
  }

  public ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  public displayFn(service: any): string {
    return service && service.name ? service.name : '';
  }

  public save(): void {
  }
  
  public cancel(): void {
    this.dialogRef.close();
  }

  private initServiceAC(): void {
    this.serviceSvc
      .getServices()
      .valueChanges.pipe(takeUntil(this.destroy))
      .subscribe((resp: any) => {
        this.servicesList = resp.data.services;
      });
    this.servicesListFiltered = this.workForm.controls.service.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );
  }

  private _filter(value: string | any): any {
    let filterValue: string = '';
    if (typeof value === 'string') {
      filterValue = value.toLowerCase();
      if (value === '') {
        this.prices = [];
      }
    } else {
      this.prices = value.prices;
    }
    return this.servicesList.filter((option) =>
      option.name.toLowerCase().includes(filterValue)
    );
  }
}
