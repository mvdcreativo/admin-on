import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CarouselsRoutingModule } from './carousels-routing.module';
import { CarouselsComponent } from './carousels.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CarouselComponent } from './carousel/carousel.component';
import { ImagesDragDropComponent } from "./components/images/images-drag-drop/images-drag-drop.component";
import { ThumbnailComponent } from './components/images/images-drag-drop/thumbnail/thumbnail.component';
import { FormCarouselComponent } from './components/form-carousel/form-carousel.component';
import { ImagesComponent } from './components/images/images.component';


@NgModule({
  declarations: [
    CarouselsComponent,
    CarouselComponent,
    ImagesDragDropComponent,
    ThumbnailComponent,
    FormCarouselComponent,
    ImagesComponent,
  ],
  imports: [
    CommonModule,
    CarouselsRoutingModule,
    SharedModule,
  ]
})
export class CarouselsModule { }
