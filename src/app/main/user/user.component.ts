import { Component, OnInit, ViewChild } from '@angular/core';

import { ModalDirective } from 'ngx-bootstrap/modal';
import { IMultiSelectOption } from 'angular2-dropdown-multiselect';


import { DataService } from '../../core/services/data.service';
import { NotificationService } from '../../core/services/notification.service';
import { UploadService } from '../../core/services/upload.service';

import { MessageConstants } from '../../core/common/message.constants';
import { SystemConstants } from '../../core/common/system.constants';
import { error } from 'selenium-webdriver';
import { Daterangepicker } from 'ng2-daterangepicker';

declare var moment: any;

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  public myRoles: string[] = []
  public pageIndex: number = 1;
  public pageSize: number = 4;
  public totalRows: number;
  public pageDisplay: number = 10;
  public filter: string = '';
  public entity: any;

  @ViewChild('modalAddEdit') public modalAddEdit: ModalDirective;
  @ViewChild('avatar') public avatar;

  public users: any[];
  public allRoles: IMultiSelectOption[] = [];
  public baseFolder: string = SystemConstants.BASE_API;
  public roles: any[];

  public dateOptions: any = {
    locale: { format: 'DD/MM/YYYY' },
    alwaysShowCalendars: false,
    singleDatePicker: true
  };

  constructor(private _dataService: DataService,
    private _notificationService: NotificationService, private _uploadService: UploadService) { }

  ngOnInit() {
    this.loadRoles();
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

  loadRoles() {
    this._dataService.get(`/api/appRole/getlistall`)
      //this._dataService.get('/api/appRole/getlistpaging?page=' + this.pageIndex +'&pageSize=' + this.pageSize+ '&filter=' +this.filter)
      .subscribe((response: any) => {
        this.allRoles = [];
        for (let role of response) {
          this.allRoles.push({ id: role.Name, name: role.Description });
        }
        console.log(this.allRoles);
      }, error => this._dataService.handleError(error));
  }
  loadUserDetail(id: any) {
    this.myRoles = [];
    this._dataService.get(`/api/appUser/detail/${id}`)
      .subscribe((response: any) => {
        this.entity = response;
        for (let role of this.entity.Roles) {
          this.myRoles.push(role);
        }
        this.entity.BirthDay = moment(new Date(this.entity.BirthDay)).format('DD/MM/YYYY');
        console.log(this.myRoles);
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

  showEditModal(id: any) {
    this.loadUserDetail(id);
    this.modalAddEdit.show()
  }



  saveChange(valid: boolean) {
    if (!valid) return;
    this.entity.Roles = this.myRoles;
    let fi = this.avatar.nativeElement;
    if (fi.files.length > 0) {
      this._uploadService.postWithFile('/api/upload/saveImage', null, fi.files)
        .then((imageUrl: string) => {
          this.entity.Avatar = imageUrl;
        }).then(() => {
          this.saveData();
        })
    }
    else {
      this.saveData();
    }

  }

  saveData() {
    if (this.entity.Id == undefined) {
      this._dataService.post('/api/appUser/add', JSON.stringify(this.entity))
        .subscribe((response: any) => {
          this.loadData();
          this.modalAddEdit.hide();
          this._notificationService.printSuccessMessage(MessageConstants.CREATED_OK_MSG);
        }, error => this._dataService.handleError(error));
    }
    else {
      this._dataService.put('/api/appUser/update', JSON.stringify(this.entity))
        .subscribe((response: any) => {
          this.loadData();
          this.modalAddEdit.hide();
          this._notificationService.printSuccessMessage(MessageConstants.UPDATED_OK_MSG);
        }, error => this._dataService.handleError(error));
    }
  }

  deleteItem(id: any) {
    this._notificationService.printConfirmDialog(MessageConstants.CONFIRM_DELETE_MSG, () => this.deleteItemConfirm(id))
  }

  deleteItemConfirm(id: any) {
    this._dataService.delete('/api/appUser/delete', 'id', id)
      .subscribe((response: any) => {
        this.loadData();
        this._notificationService.printSuccessMessage(MessageConstants.DELETE_MSG);
      }, error => this._dataService.handleError(error));
  }

  selectGender(event) {
    this.entity.Gender = event.target.value;
  }
}
