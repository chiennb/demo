import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main.component';
import { mainRoutes } from './main.routes';
import { HomeModule } from './home/home.module';
import { UserModule } from './user/user.module';

@NgModule({
  imports: [
    CommonModule,
    HomeModule,
    UserModule,
    RouterModule.forChild(mainRoutes)
  ],
  declarations: [MainComponent]
})
export class MainModule { }
