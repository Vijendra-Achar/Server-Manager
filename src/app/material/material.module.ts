import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatTreeModule } from '@angular/material/tree';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';

const MaterialComponets = [
  MatButtonModule,
  MatToolbarModule,
  MatIconModule,
  MatTreeModule,
  MatSnackBarModule,
  MatDialogModule,
];

@NgModule({
  imports: [MaterialComponets],
  exports: [MaterialComponets],
})
export class MaterialModule {}
