import { Component, OnInit } from '@angular/core';
import { SnackBarDailogBoxService } from './../services/snack-bar-dailog-box.service';
import { ServerDataService } from './../services/server-data.service';
import { Data } from '../services/data.model';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { NestedTreeControl } from '@angular/cdk/tree';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  treeControl = new NestedTreeControl<Data>((node) => node.children);
  dataSource = new MatTreeNestedDataSource<Data>();

  isLoading: boolean = false;

  constructor(
    private dataService: ServerDataService,
    private snackDialog: SnackBarDailogBoxService
  ) {}

  ngOnInit(): void {
    this.dataService.getData().subscribe((data: Data[]) => {
      this.dataSource.data = data;
      this.treeControl.dataNodes = this.dataSource.data;
      this.treeControl.expandAll();
    });
  }

  hasChild = (_: number, node: Data) =>
    !!node.children && node.children.length > 0;

  startStop(serverId: any, serverName: string) {
    let currentValue = window.localStorage.getItem(serverId);
    this.isLoading = true;
    if (currentValue === 'true') {
      this.snackDialog
        .showDialogBox(
          'Quit Server?',
          'Are you sure that you wish to stop this server?'
        )
        .afterClosed()
        .subscribe((ans) => {
          if (ans === 'true') {
            this.dataService
              .sendRequest(serverId, 'stop')
              .pipe(take(1))
              .subscribe((data: any) => {
                if (data?.status === 200) {
                  this.turnOnOff(serverId, currentValue);
                  this.snackDialog.showSnackBar(
                    `The ${serverName} has been stopped ⛔`,
                    'Dismiss',
                    5000
                  );
                  this.isLoading = false;
                }
              });
          }
        });
    } else {
      this.dataService
        .sendRequest(serverId, 'start')
        .pipe(take(1))
        .subscribe((data: any) => {
          if (data.status === 200) {
            this.turnOnOff(serverId, currentValue);
            this.snackDialog.showSnackBar(
              `The ${serverName} is Running 🚀`,
              'Dismiss',
              5000
            );
            this.isLoading = false;
          }
        });
    }
  }

  turnOnOff(serverId: any, currValue: any) {
    window.localStorage.setItem(
      serverId,
      currValue === 'true' ? 'false' : 'true'
    );
  }

  checkBtn(serverId: any) {
    let currentValue = window.localStorage.getItem(serverId);
    return currentValue === 'true' ? true : false;
  }
}
