import { ServerDataService } from './../services/server-data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private dataService: ServerDataService) {}

  ngOnInit(): void {
    this.dataService.getData().subscribe((data) => {
      console.log(data);
    });
  }
}
