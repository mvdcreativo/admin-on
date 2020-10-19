import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InstructorsRoutingModule } from './instructors-routing.module';
import { InstructorsComponent } from './instructors.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [InstructorsComponent],
  imports: [
    CommonModule,
    InstructorsRoutingModule,
    SharedModule
  ]
})
export class InstructorsModule { }
