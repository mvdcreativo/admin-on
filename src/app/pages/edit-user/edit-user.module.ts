import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditUserRoutingModule } from './edit-user-routing.module';
import { EditUserComponent } from './edit-user.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CoursesComponent } from './courses/courses.component';


@NgModule({
  declarations: [EditUserComponent, CoursesComponent],
  imports: [
    CommonModule,
    EditUserRoutingModule,
    SharedModule
  ]
})
export class EditUserModule { }
