import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, map, take } from 'rxjs/operators';
import { ResponsePaginate, Response } from 'src/app/shared/interfaces/response';
import { environment } from 'src/environments/environment';
import { Carousel } from "../interfaces/carousel";

@Injectable({
  providedIn: 'root'
})
export class CarouselService {
  idCarousel: any;

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) { }

  private carouselEditSubject$ : BehaviorSubject<Carousel> = new BehaviorSubject<Carousel>(null)

  private resultSubject$: BehaviorSubject<ResponsePaginate> = new BehaviorSubject(null)
  public get resultItems$() {
    return this.resultSubject$
  }
  public setItems(value) {
    this.resultSubject$.next(value)
  }

  get carouselOnEdit():Observable<Carousel>{
    return this.carouselEditSubject$
  }

  setCarouselOnEdit(value){
    this.idCarousel = value?.id;
    this.carouselEditSubject$.next(value)
  }


  storeCarousel(data): Observable<Carousel>{
    return this.http.post<Response>(`${environment.API}carousels`, data).pipe(
      map( v => {
        this.setCarouselOnEdit(v.data)

        //snacbarr
        this.openSnackBar('Se creó correctamente','success-snack-bar')
        //////////
        return v.data
      }),
      catchError(error => this.errorHandler(error))
    )

  }

  updateCarousel(data): Observable<Carousel>{
    return this.http.put<Response>(`${environment.API}carousels/${data.id}`, data).pipe(
      map( v => {
        this.setCarouselOnEdit(v.data)
        this.getCarousels(1, 20, '', 'desc').pipe(take(1)).subscribe()
        //snacbarr
        this.openSnackBar('Actualizado correctamente','success-snack-bar')
        //////////
        return v.data
      }),
      catchError(error => this.errorHandler(error))
    )

  }

  ///listar
  getCarousels(currentPage = 1, perPage = 20, filter = '', sort = 'desc'): Observable<ResponsePaginate> {
    return this.http.get<ResponsePaginate>(`${environment.API}carousels`, {
      params: new HttpParams()
        .set('page', currentPage.toString())
        .set('filter', filter)
        .set('sort', sort)
        .set('per_page', perPage.toString())

    }).pipe(map(
      res => {
        console.log(res);


        this.setItems(res)
        const resp = res
        return resp;
      }
    ),
      catchError(error => this.errorHandler(error))
    )
  }


  deleteCarousel(id){
    return this.http.delete<Response>(`${environment.API}carousels/${id}`).pipe(
      map( v => {
        // console.log(v.data);

        this.getCarousels(1, 20, '', 'desc').pipe(take(1)).subscribe()
        //snacbarr
        this.openSnackBar('Eliminado correctamente','success-snack-bar')
        //////////
        return v.data

      }),
      catchError(error => this.errorHandler(error))
    )
  }

  getCarousel(id) : Observable<Carousel>{
    return this.http.get<Response>(`${environment.API}carousels/${id}`).pipe(map(
      res => {
        this.setCarouselOnEdit(res.data)

        const resp = res.data
        return resp;
      }
    ),
    catchError(error => this.errorHandler(error))
    )
  }

  openSnackBar(message: string, refClass: string, action: string = '') {
    this.snackBar.open(message, action, {
      duration: 1000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: refClass
    });
  }

  errorHandler(error: HttpErrorResponse) {
    this.openSnackBar(error.message || "error en la solicitud.", 'error-snack-bar')
    return Observable.throw(error.message || "error en la solicitud.");
  }
}
