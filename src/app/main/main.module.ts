import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main.component';
import { mainRoutes } from './main.routes';
import { HomeModule } from './home/home.module';
import { UserModule } from './user/user.module';

import { PaginationModule } from 'ngx-bootstrap/pagination';

import { UtilityService } from '../core/services/utility.service';
import {AuthenService} from '../core/services/authen.service';

@NgModule({
  imports: [
    CommonModule,
    HomeModule,
    UserModule,

    RouterModule.forChild(mainRoutes),

    PaginationModule.forRoot()
  ],
  providers:[UtilityService, AuthenService],
  declarations: [MainComponent]
})
export class MainModule { }
