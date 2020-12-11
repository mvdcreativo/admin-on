import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { LayoutModule } from 'src/app/layout/layout.module';
import { FormProductComponent } from './components/form-product/form-product.component';
import { ProductComponent } from './product/product.component';
import { Tab2Component } from './components/tab2/tab2.component';
import { AdquiredSkillsComponent } from './components/tab2/adquired-skills/adquired-skills.component';
import { SectionsLesonsComponent } from './components/sections-lesons/sections-lesons.component';
import { LessonsComponent } from './components/sections-lesons/lessons/lessons.component';
import { SchedulesComponent } from './components/schedules/schedules.component';
import { InscripcionesComponent } from './components/inscripciones/inscripciones.component';


@NgModule({
  declarations: [
    ProductsComponent, 
    FormProductComponent, 
    ProductComponent, 
    Tab2Component, 
    AdquiredSkillsComponent, 
    SectionsLesonsComponent, 
    LessonsComponent, 
    SchedulesComponent, InscripcionesComponent, 
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    SharedModule,
  ],
  exports: [
    ProductsComponent
  ]
})
export class ProductsModule { }
