import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CarouselService } from '../services/carousel.service';

@Component({
  selector: 'mvd-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {
  carouselEdit: any;
  edit: boolean = false;
  indexTab: number = 0

  constructor(
    private carouselService: CarouselService,
    private activateRouter: ActivatedRoute,
    private router : Router
  ) {
    this.activateRouter.paramMap.subscribe(
      (params:Params) => {
        if(params.params.id){
          this.carouselEdit = this.carouselService.getCarousel(params.params.id)
          this.edit= true;

        }

        if(!this.edit && !params.params.id){
          this.carouselEdit = null
        }

      }
    )

  }

  ngOnInit(): void {
  }

  onSubmit(e){
    if (this.edit) {
      this.carouselService.updateCarousel(e).subscribe(res=> this.indexTab = 1)
    } else {
      this.carouselService.storeCarousel(e).subscribe(
        res=> this.router.navigate(['/carousels/edit', res.id])
      )

    }
  }
}
