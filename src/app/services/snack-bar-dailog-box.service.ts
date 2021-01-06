import { DialogBoxComponent } from './../dialog-box/dialog-box.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SnackBarDailogBoxService {
  constructor(private dialog: MatDialog, private snackBar: MatSnackBar) {}

  showSnackBar(message: string, action: string = 'Dismiss', duration: number) {
    this.snackBar.open(message, action, {
      duration: duration,
    });
  }

  showDialogBox(title: string, message: string) {
    return this.dialog.open(DialogBoxComponent, {
      data: {
        title: title,
        message: message,
      },
    });
  }
}
