import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import gql from 'graphql-tag';
import { ServiceService } from '../service.service';


@Component({
  selector: 'app-service-popup',
  templateUrl: './service-popup.component.html'
})
export class ServicePopupComponent implements OnInit {
  public isEditMode: boolean;
  public serviceForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    prices: new FormControl('', Validators.required)
  });
  constructor(
    public dialogRef: MatDialogRef<ServicePopupComponent>,
    private service: ServiceService,
    @Inject(MAT_DIALOG_DATA) public data: any
  )
  {
      this.isEditMode = data.service !== undefined;
      if (this.isEditMode) {
        this.serviceForm.controls.name.setValue(data.service.name);
        this.serviceForm.controls.prices.setValue(data.service.prices);
      }
  }

  public ngOnInit(): void {
  }

  public cancel(): void {
    this.dialogRef.close();
  }
  public submit(): void {
    this.isEditMode ? this.edit() : this.add();
  }

  private add(): void{
    const data = {
      name: this.serviceForm.controls.name.value,
      prices: this.serviceForm.controls.prices.value.split(',').map(m => parseInt(m, 0))
    }
    this.service.addService(data).subscribe(() => {
      this.dialogRef.close();
    });
  }

  private edit(): void {
    const id = this.data.service.id;
    const data = {
      id,
      name: this.serviceForm.controls.name.value,
      prices: this.serviceForm.controls.prices.value.split(',').map(m => parseInt(m, 0))
    };
    this.service.updateService(data).subscribe(() => {
      this.dialogRef.close();
    })
  }
}
