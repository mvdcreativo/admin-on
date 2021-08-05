import { Component, OnInit, AfterViewInit, SimpleChanges, OnChanges, Input, ViewChild } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Observable } from 'rxjs';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { ImagesService } from '../services/images.service';
import { Carousel } from '../../../interfaces/carousel';
import { Image } from "src/app/pages/products/interfaces/product";
import { CarouselService } from '../../../services/carousel.service';

@Component({
  selector: 'mvd-images-drag-drop',
  templateUrl: './images-drag-drop.component.html',
  styleUrls: ['./images-drag-drop.component.scss']
})
export class ImagesDragDropComponent implements OnInit {
  // @Input('data') data : any;
  publication_res: Object;
  progress: number = 0;
  showDelete: boolean = false;
  data: Carousel;
  images: Image[] = [];
  progresUpload$: Observable<number>;
  loadingImage$: Observable<boolean>;


  constructor(
    private imagesServices: ImagesService,
    private carouselServices: CarouselService
  ) { }

  ngOnInit(): void {
    // console.log(this.images);
    this.carouselServices.carouselOnEdit.subscribe(
      data => {
        this.data = data;
        this.images = data?.images ?? []
        this.progresUpload$ = this.imagesServices.getProsess$()
        this.loadingImage$ = this.imagesServices.getImageLoading$()
        return this.data
      }
    )
  }



  drop(event: CdkDragDrop<string[]>) {
    console.log(event);

    moveItemInArray(this.images, event.previousIndex, event.currentIndex);
    console.log(this.images);
    const imagePosition = this.images.map((v, i) => {
      v.position = i
      this.imagesServices.updateImage(v).subscribe(res => {
        this.images.map(v => {
          if(v.id === res.id){
            return res;
          }
          return v;
        })
      })
    })
    console.log(imagePosition);


  }


  uploadImage(e) {

    console.log(e);

    if (e.target.files && e.target.files[0]) {
      const selectedFiles = <FileList>e.target.files;

      const fileNames = [];
      // console.log(selectedFiles);

      // console.log(this.files);

      this.imagesServices.uploadImage(this.data, selectedFiles)

    }

  }

  updateRotateImage(e){
    console.log(e);
    const rotate = e?.rotate
    const imageRotate = e?.image
    // const files = <FileList>e;

    imageRotate.rotate = rotate;
    this.imagesServices.updateImage(imageRotate).subscribe(res => {
      const imgMod = this.images.map(v => {

        if(v.id === res.id){
          return res;
        }

        return v;
      })

      this.images = imgMod;
    })

  }






  removeImage(id_image: number) {
    this.imagesServices.removeImageId(id_image, this.data.id)
  }


}
