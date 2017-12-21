import { Component, OnInit, ViewChild } from '@angular/core';

import { ModalDirective } from 'ngx-bootstrap/modal';

import { DataService } from '../../core/services/data.service';
import {NotificationService} from '../../core/services/notification.service';
import {MessageConstants} from '../../core/common/message.constants';

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
  public entity: any;

  @ViewChild('modalAddEdit') public modalAddEdit: ModalDirective;

  public roles: any[];

  constructor(private _dataService: DataService, private _notificationService: NotificationService) { }

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

  pageChanged(event: any): void {
    console.log(event);
    this.pageIndex = event.page;
    this.loadData();
  }

  showAddModal() {
    this.entity = {};
    this.modalAddEdit.show()
  }

  saveChange(valid: boolean){
    if(!valid) return;

    if(this.entity.Id == undefined){
      this._dataService.post('/api/appRole/add',JSON.stringify(this.entity))
      .subscribe((response:any)=>{
        this.loadData();
        this.modalAddEdit.hide();
        this._notificationService.printSuccessMessage(MessageConstants.CREATED_OK_MSG);
      },error=>this._dataService.handleError(error));
    }
  }
}
