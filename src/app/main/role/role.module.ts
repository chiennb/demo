import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import {FormsModule} from '@angular/forms';

import {PaginationModule} from 'ngx-bootstrap/pagination';
import {ModalModule} from 'ngx-bootstrap/modal';

import { RoleComponent } from './role.component';
import { DataService } from '../../core/services/data.service';
import { NotificationService } from '../../core/services/notification.service';


const roleRoutes: Routes = [
  //localhost:4200/main/user
  { path: '', redirectTo: 'index', pathMatch: 'full' },
  //localhost:4200/main/home/index
  { path: 'index', component: RoleComponent }
]
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PaginationModule,
    ModalModule.forRoot(),
    RouterModule.forChild(roleRoutes)
  ],
  declarations: [RoleComponent],
  providers:[DataService, NotificationService]
})
export class RoleModule { }
