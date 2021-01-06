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
      this.treeControl.dataNodes = this.dataSource.data;
      this.treeControl.expandAll();
    });
  }

  hasChild = (_: number, node: Data) =>
    !!node.children && node.children.length > 0;

  startStop(event: Event, serverId: any) {
    let currentValue = window.localStorage.getItem(serverId);
    window.localStorage.setItem(
      serverId,
      currentValue === 'true' ? 'false' : 'true'
    );
  }

  checkBtn(serverId) {
    let currentValue = window.localStorage.getItem(serverId);
    return currentValue === 'true' ? true : false;
  }
}
