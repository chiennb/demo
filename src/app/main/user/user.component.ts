import { Component, OnInit, ViewChild } from '@angular/core';

import { ModalDirective } from 'ngx-bootstrap/modal';

import { DataService } from '../../core/services/data.service';
import {NotificationService} from '../../core/services/notification.service';
import {MessageConstants} from '../../core/common/message.constants';
import { SystemConstants } from '../../core/common/system.constants';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  public pageIndex: number = 1;
  public pageSize: number = 4;
  public totalRows: number;
  public pageDisplay: number = 10;
  public filter: string = '';
  public entity: any;

  @ViewChild('modalAddEdit') public modalAddEdit: ModalDirective;

  public users: any[];

  constructor(private _dataService: DataService, private _notificationService: NotificationService) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this._dataService.get(`/api/appUser/getlistpaging?page=${this.pageIndex}&pageSize=${this.pageSize}&filter=${this.filter}`)
      //this._dataService.get('/api/appRole/getlistpaging?page=' + this.pageIndex +'&pageSize=' + this.pageSize+ '&filter=' +this.filter)
      .subscribe((response: any) => {
        this.users = response.Items;
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

  showEditModal(id:any) {
    this.loadRole(id);
    this.modalAddEdit.show()
  }

  loadRole(id:any) {
    this._dataService.get(`/api/appUser/detail/${id}`)
      .subscribe((response: any) => {
        this.entity = response;
        console.log(response);
      });
  }

  saveChange(valid: boolean){
    if(!valid) return;

    if(this.entity.Id == undefined){
      this._dataService.post('/api/appUser/add',JSON.stringify(this.entity))
      .subscribe((response:any)=>{
        this.loadData();
        this.modalAddEdit.hide();
        this._notificationService.printSuccessMessage(MessageConstants.CREATED_OK_MSG);
      },error=>this._dataService.handleError(error));
    }
    else{
      this._dataService.put('/api/appUser/update',JSON.stringify(this.entity))
      .subscribe((response:any)=>{
        this.loadData();
        this.modalAddEdit.hide();
        this._notificationService.printSuccessMessage(MessageConstants.UPDATED_OK_MSG);
      },error=>this._dataService.handleError(error));
    }
  }

  deleteItem(id: any){
    this._notificationService.printConfirmDialog(MessageConstants.CONFIRM_DELETE_MSG,()=> this.deleteItemConfirm(id))
  }

  deleteItemConfirm(id: any){
    this._dataService.delete('/api/appUser/delete','id',id)
      .subscribe((response:any)=>{
        this.loadData();
        this._notificationService.printSuccessMessage(MessageConstants.DELETE_MSG);
      },error=>this._dataService.handleError(error));
  }
}
