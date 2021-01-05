import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ServerDataService {
  constructor(private http: HttpClient) {}

  getData() {
    return this.http.get(
      `https://plnqfktz3l.execute-api.ap-south-1.amazonaws.com/test/resource-api`
    );
  }
}
