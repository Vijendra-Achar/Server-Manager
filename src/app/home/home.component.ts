import { ServerDataService } from './../services/server-data.service';
import { Component, OnInit } from '@angular/core';
import { NestedTreeControl } from '@angular/cdk/tree';
import { Data } from '../services/data.model';
import { MatTreeNestedDataSource } from '@angular/material/tree';

import { of } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  treeControl = new NestedTreeControl<Data>((node) => node.children);
  dataSource = new MatTreeNestedDataSource<Data>();

  constructor(private dataService: ServerDataService) {}

  ngOnInit(): void {
    this.dataService.getData().subscribe((data: Data[]) => {
      this.dataSource.data = data;
    });
  }

  hasChild = (_: number, node: FoodNode) =>
    !!node.children && node.children.length > 0;
}
