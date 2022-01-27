import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PagesRoutingModule } from './pages/pages.routing';
import { AuthRoutingModule } from './auth/auth.routing';


import { NopagefountComponent } from './nopagefount/nopagefount.component';


const routes: Routes = [

  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', component: NopagefountComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes),
    PagesRoutingModule,  //Importacion de las rutas hijas ojo
    AuthRoutingModule,  //Importacion de las rutas hijas ojo
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
