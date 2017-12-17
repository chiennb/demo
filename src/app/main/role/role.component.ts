import { Component, OnInit } from '@angular/core';

import { DataService } from '../../core/services/data.service';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {
  public pageIndex: number = 1;
  public pageSize: number = 4;
  public totalRows: number;
  public pageDisplay: number = 10;
  public filter: string = '';


  public roles: any[];

  constructor(private _dataService: DataService) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this._dataService.get(`/api/appRole/getlistpaging?page=${this.pageIndex}&pageSize=${this.pageSize}&filter=${this.filter}`)
    //this._dataService.get('/api/appRole/getlistpaging?page=' + this.pageIndex +'&pageSize=' + this.pageSize+ '&filter=' +this.filter)
      .subscribe((response: any) => {
        this.roles = response.Items;
        console.log(response);
        this.pageIndex = response.PageIndex;
        this.totalRows = response.TotalRows
      });
  }

  pageChanged(event: any): void{
    console.log(event);
    this.pageIndex = event.page;
    this.loadData();
  }
}
