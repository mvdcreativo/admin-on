import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Column } from 'src/app/shared/components/data-table/interfaces/table';
import { ResponsePaginate } from 'src/app/shared/interfaces/response';
import { CarouselService } from "./services/carousel.service";

@Component({
  selector: 'mvd-carousels',
  templateUrl: './carousels.component.html',
  styleUrls: ['./carousels.component.scss']
})
export class CarouselsComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  ////COLUMNAS TABLA
  public columns: Column[] = [
    { title: 'ID ', col: 'id' },
    { title: 'Nombre ', col: 'name' },
    { title: 'Images', col: 'images' },
    { title: 'Plataforma', col: 'platform' },
    { title: 'Activo', col: 'toggle' },

  ]

  constructor(
    private carouselService: CarouselService,
    private router: Router
  ) {
    this.result = this.carouselService.resultItems$

  }

  dataSource:Observable<any[]>;
  totalResut: Observable<number>;
  pageDefault = 1;
  perPage: number = 10;
  orden: string = 'desc';
  filter: string = '';
  result: Observable<ResponsePaginate>;
  subscriptions: Subscription[]=[];

  ngOnInit(): void {
    this.getCarousels(this.pageDefault, this.perPage, this.filter, this.orden)

  }


  paginatorChange(e: PageEvent) {
    console.log(e);
    this.getCarousels(e.pageIndex + 1, e.pageSize)

  }

  getCarousels(currentPage?, perPage?, filter?, sort?) {
    this.subscriptions.push(
      this.carouselService.getCarousels(currentPage, perPage, filter, sort).subscribe(next => this.loadData())
    )
  }

  loadData() {

    this.dataSource = this.result.pipe(map(v => {
      const dataTable = v.data.data.map(x => {
        return {
          id: x.id,
          name: x.name,
          platform: x.platform,
          toggle: x.status,
          images: x.images
        }
      })
      return dataTable;
    }))

    this.totalResut = this.result.pipe(map(v => v.data.total))
  }

  deleteItem(id): Observable<any> {
    return this.carouselService.deleteCarousel(id)
  }

  itemAction(event) {

    if (event.action === "delete") {
      this.deleteItem(event.element.id).pipe(take(1)).subscribe(res => console.log(res))
    }

    if (event.action === "edit") {

      this.router.navigate(['/carousels/edit', event.element.id])
    }
    if (event.action === "toggle") {
      const data = {
        id: event.element.id,
        status: !event.element.toggle
      }
      this.carouselService.updateCarousel(data).subscribe()
    }

  }

}
