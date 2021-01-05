import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatTreeModule } from '@angular/material/tree';

const MaterialComponets = [
  MatButtonModule,
  MatToolbarModule,
  MatIconModule,
  MatTreeModule,
];

@NgModule({
  imports: [MaterialComponets],
  exports: [MaterialComponets],
})
export class MaterialModule {}
