import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages/pages.component';
import { ButtonsComponent } from './layout/patrones/buttons/buttons.component';
import { PatronesComponent } from './layout/patrones/patrones.component';
import { CardComponent } from './layout/patrones/card/card.component';

const routes: Routes = [
  { 
    path: '', 
    component: PagesComponent,
    children: [
      { path: '', loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule) },
      { path: 'productos', loadChildren: () => import('./pages/products/products.module').then(m => m.ProductsModule) },
      { path: 'departamentos', loadChildren: () => import('./pages/locations/states/states.module').then(m => m.StatesModule) },
      { path: 'ciudades', loadChildren: () => import('./pages/locations/cities/cities.module').then(m => m.CitiesModule) },
      { path: 'barrios', loadChildren: () => import('./pages/locations/neighborhoods/neighborhoods.module').then(m => m.NeighborhoodsModule) },
      { path: 'categorias', loadChildren: () => import('./pages/categories/categories.module').then(m => m.CategoriesModule) },
      { path: 'accounts', loadChildren: () => import('./pages/accounts/accounts.module').then(m => m.AccountsModule) },
      // { path: 'tipos-de-operaciones', loadChildren: () => import('./pages/transaction-types/transaction-types.module').then(m => m.TransactionTypesModule) },
      // { path: 'caracteristicas', loadChildren: () => import('./pages/features/features.module').then(m => m.FeaturesModule) },
      // { path: 'publicaciones', loadChildren: () => import('./pages/publications/publications.module').then(m => m.PublicationsModule) },
      { path: 'moneda', loadChildren: () => import('./pages/currencies/currencies.module').then(m => m.CurrenciesModule) },
      { path: 'docentes', loadChildren: () => import('./pages/instructors/instructors.module').then(m => m.InstructorsModule) },
      { path: 'alumnos', loadChildren: () => import('./pages/students/students.module').then(m => m.StudentsModule) },
      { path: 'pagos', loadChildren: () => import('./pages/payments/payments.module').then(m => m.PaymentsModule) },
      { path: 'inscripciones', loadChildren: () => import('./pages/enrollments/enrollments.module').then(m => m.EnrollmentsModule) },
      
      
      { path: '**', loadChildren: () => import('./pages/not-found/not-found.module').then(m => m.NotFoundModule) },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
