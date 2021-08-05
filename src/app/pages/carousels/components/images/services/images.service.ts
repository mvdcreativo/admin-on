import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpEventType, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { Image } from 'src/app/pages/products/interfaces/product';
import { CarouselService } from '../../../services/carousel.service';
import { Carousel } from '../../../interfaces/carousel';
import { ResponsePaginate, Response } from 'src/app/shared/interfaces/response';


@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  public progressSubject$: BehaviorSubject<number> = new BehaviorSubject<number>(100);
  public loadingImage$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);


  constructor(
    private http: HttpClient,
    private carouselService: CarouselService
  ) {
    this.loadingImage$.next(false)
   }


  // updateImages(data){
  //   this.http.post<Carousel>(`${environment.API}carousels`, data)
  // }

  getImages() {
    this.http.get<Carousel>(`${environment.API}carousels`)


  }

  updateImage(data): Observable<Image> {

    return this.http.put<Response>(`${environment.API}images/${data.id}`, data).pipe(map(v=>v.data))


  }

  uploadImage(data: Carousel, files: FileList, index?: number) {

    const formData = new FormData();
    console.log(files);
    const position = data?.images?.length -1;

    for (let i = 0; i < files.length; i++) {
      formData.append('images[]', files[i])
      // formData.append("_method", "PUT")
    }

    formData.append("_method", "PUT")

    return this.http.post(`${environment.API}carousels/${data.id}`, formData, {
      observe: 'events',
      reportProgress: true
    }).subscribe(
      (event: HttpEvent<Object>) => {

        // console.log(event);
        if (event.type === HttpEventType.Response) {
          console.log('Upload Concluído');
          console.log(event.body);
          const carousel: any = event.body
          console.log(carousel.data);
          this.loadingImage$.next(false)
          this.carouselService.setCarouselOnEdit(carousel.data);

        } else if (event.type === HttpEventType.UploadProgress) {
          const percentDone = Math.round((event.loaded * 100) / event.total);
          console.log('Progresso', percentDone);
          this.progressSubject$.next(percentDone)
          this.loadingImage$.next(true)
        }
      }
    )
  }


  removeImageId(imageID, id) {
    let httpParams = new HttpParams().set('image_id', imageID);
    let options = { params: httpParams };
    return this.http.delete<Response>(`${environment.API}carousels/${id}`, options).pipe(
      take(1),
      map( v => v.data)
    ).subscribe(
      res => {
        if(res){
          const carouselEdit = this.carouselService.carouselOnEdit.pipe( map( v => {
            v.images = res.images;
            return v
          }),take(5)).subscribe(
            res =>  this.carouselService.setCarouselOnEdit(res)
          )

        }



      }

    )
  }

  getImageLoading$():Observable<any>{
    return this.loadingImage$;
  }
  setImageLoading(status):void{
    this.loadingImage$.next(status)
  }
  getProsess$():Observable<number>{
    return this.progressSubject$;
  }
  setProsess(status):void{
    this.progressSubject$.next(status)
  }
}
