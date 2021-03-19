import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages/pages.component';

import { AuthGuard } from './auth/guards/auth.guard';
import { AdministradorGuard } from './auth/guards/administrador.guard';


const routes: Routes = [
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },

  { 
    path: '', 
    component: PagesComponent,
    children: [
      { path: '', redirectTo: '/productos' ,pathMatch:'full'},
      { path: 'productos', loadChildren: () => import('./pages/products/products.module').then(m => m.ProductsModule)},
      { path: 'departamentos', loadChildren: () => import('./pages/locations/states/states.module').then(m => m.StatesModule),canActivate:[AdministradorGuard] },
      { path: 'ciudades', loadChildren: () => import('./pages/locations/cities/cities.module').then(m => m.CitiesModule) ,canActivate:[AdministradorGuard]},
      { path: 'barrios', loadChildren: () => import('./pages/locations/neighborhoods/neighborhoods.module').then(m => m.NeighborhoodsModule),canActivate:[AdministradorGuard] },
      { path: 'categorias', loadChildren: () => import('./pages/categories/categories.module').then(m => m.CategoriesModule) ,canActivate:[AdministradorGuard]},
      { path: 'accounts', loadChildren: () => import('./pages/accounts/accounts.module').then(m => m.AccountsModule) ,canActivate:[AdministradorGuard]},
      // { path: 'tipos-de-operaciones', loadChildren: () => import('./pages/transaction-types/transaction-types.module').then(m => m.TransactionTypesModule) },
      // { path: 'caracteristicas', loadChildren: () => import('./pages/features/features.module').then(m => m.FeaturesModule) },
      // { path: 'publicaciones', loadChildren: () => import('./pages/publications/publications.module').then(m => m.PublicationsModule) },
      { path: 'moneda', loadChildren: () => import('./pages/currencies/currencies.module').then(m => m.CurrenciesModule),canActivate:[AdministradorGuard] },
      { path: 'docentes', loadChildren: () => import('./pages/instructors/instructors.module').then(m => m.InstructorsModule) ,canActivate:[AdministradorGuard] },
      { path: 'alumnos', loadChildren: () => import('./pages/students/students.module').then(m => m.StudentsModule),canActivate:[AdministradorGuard] },
      { path: 'pagos', loadChildren: () => import('./pages/payments/payments.module').then(m => m.PaymentsModule) ,canActivate:[AdministradorGuard]},
      { path: 'inscripciones', loadChildren: () => import('./pages/enrollments/enrollments.module').then(m => m.EnrollmentsModule),canActivate:[AdministradorGuard] },
      
      
      { path: '**', loadChildren: () => import('./pages/not-found/not-found.module').then(m => m.NotFoundModule) },
    ],
    canActivate:[AuthGuard],
    canActivateChild: [AuthGuard]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
