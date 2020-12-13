import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdministradorGuard } from 'src/app/auth/guards/administrador.guard';

import { CitiesComponent } from './cities.component';

const routes: Routes = [{ path: '', component: CitiesComponent,canActivate:[AdministradorGuard] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CitiesRoutingModule { }
