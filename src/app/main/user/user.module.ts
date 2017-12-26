import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ModalModule } from 'ngx-bootstrap/modal';
import { MultiselectDropdownModule } from 'angular2-dropdown-multiselect';
import { Daterangepicker } from 'ng2-daterangepicker';

import { DataService } from '../../core/services/data.service';
import { NotificationService } from '../../core/services/notification.service';

export const userRoutes: Routes = [
  { path: '', redirectTo: 'index', pathMatch: 'full' },
  { path: 'index', component: UserComponent }
]

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PaginationModule,
    Daterangepicker,
    MultiselectDropdownModule,
    ModalModule.forRoot(),
    RouterModule.forChild(userRoutes)
  ],
  declarations: [UserComponent],
  providers: [DataService, NotificationService]
})
export class UserModule { }
