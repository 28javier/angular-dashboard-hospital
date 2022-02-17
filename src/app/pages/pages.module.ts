import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


// Modulos 
import { PagesRoutingModule } from './pages.routing';
import { SharedModule } from '../shared/shared.module';
import { ComponentsModule } from '../components/components.module';

import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { AccountSetingsComponent } from './account-setings/account-setings.component';



@NgModule({
  declarations: [
    ProgressComponent,
    Grafica1Component,
    DashboardComponent,
    PagesComponent,
    AccountSetingsComponent
  ],
  exports: [
    ProgressComponent,
    Grafica1Component,
    DashboardComponent,
    PagesComponent,
    AccountSetingsComponent

  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    SharedModule,
    FormsModule,
    ComponentsModule,
  ]
})
export class PagesModule { }
