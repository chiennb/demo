import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule} from '@angular/forms';

import { LoginComponent } from './login.component';


import { NotificationService } from '../core/services/notification.service';
import { AuthenService } from '../core/services/authen.service';

export const loginRoutes: Routes = [
  { path: '', component: LoginComponent }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(loginRoutes)
  ],
  providers: [AuthenService, NotificationService],
  declarations: [LoginComponent]

})
export class LoginModule { }
