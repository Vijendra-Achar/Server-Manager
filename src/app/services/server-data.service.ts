import { Data } from './data.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ServerDataService {
  constructor(private http: HttpClient) {}

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
}
