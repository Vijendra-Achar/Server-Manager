import { Data } from './data.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { MatSpinner } from '@angular/material/progress-spinner';
import { ComponentPortal } from '@angular/cdk/portal';

@Injectable({
  providedIn: 'root',
})
export class ServerDataService {
  private spinnerRef: OverlayRef = this.cdkSpinnerCreate();

  constructor(private http: HttpClient, private overlay: Overlay) {}

  getData() {
    return this.http
      .get(
        `https://plnqfktz3l.execute-api.ap-south-1.amazonaws.com/test/resource-api`
      )
      .pipe(
        tap((data: Array<Data>) => {
          let newArr = data.map((ele, i) => {
            if (ele.children.length <= 0) {
              data.splice(i);
            }
          });
          return newArr;
        })
      );
  }

  sendRequest(theId: string, state: string) {
    return this.http.post(
      `https://plnqfktz3l.execute-api.ap-south-1.amazonaws.com/test/resource-api`,
      {
        action: state,
        id: theId,
      }
    );
  }

  private cdkSpinnerCreate() {
    return this.overlay.create({
      hasBackdrop: true,
      backdropClass: 'dark-backdrop',
      positionStrategy: this.overlay
        .position()
        .global()
        .centerHorizontally()
        .centerVertically(),
    });
  }
  showSpinner() {
    this.spinnerRef.attach(new ComponentPortal(MatSpinner));
  }
  stopSpinner() {
    this.spinnerRef.detach();
  }
}
