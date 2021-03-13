import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponent } from '@webapp-popups/confirm/confirm.component';
import { WorkComponent } from './work/work.component';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

  constructor(
    private dialog: MatDialog
  ) { }

  public ngOnInit(): void {
    const dateInMonth = new Date();
    const month = dateInMonth.getMonth();
    dateInMonth.setDate(1);
    const arr = [];
    let aWeek = this.daysOfAWeek(dateInMonth);
    arr.push(aWeek);
    dateInMonth.setDate(dateInMonth.getDate() + 7);
    while (aWeek[6].getMonth() === month) {
      aWeek = this.daysOfAWeek(dateInMonth);
      arr.push(aWeek);
      dateInMonth.setDate(dateInMonth.getDate() + 7);
    }
    console.log(arr);
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

  private openDialog(work?: any): void {
    const dialogRef = this.dialog.open(WorkComponent, {
      width: '750px',
      data: {
        height: '500px',
        title: 'Chi tiết công việc',
        work,
      },
    });
    dialogRef.afterClosed().subscribe(() => {
      // chạy sau khi đóng popup
    });
  }

  private daysOfAWeek(current: Date): Date[] {
    const firstDate = (current.getDate() - current.getDay());
    const week = [new Date(current.setDate(firstDate))];
    for (let i = 1; i < 7; i++) {
      week.push(
        new Date(current.setDate(current.getDate() + 1))
      );
    }
    return week;
  }

}
