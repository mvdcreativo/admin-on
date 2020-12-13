import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdministradorGuard } from 'src/app/auth/guards/administrador.guard';

import { NeighborhoodsComponent } from './neighborhoods.component';

const routes: Routes = [{ path: '', component: NeighborhoodsComponent, canActivate:[AdministradorGuard] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NeighborhoodsRoutingModule { }
