import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, map, take } from 'rxjs/operators';
import { ResponsePaginate, Response } from 'src/app/shared/interfaces/response';
import { environment } from 'src/environments/environment';
import { Order } from "../interfaces/order";

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {
  idOrder: number;


  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) { }



  private resultSubject$: BehaviorSubject<ResponsePaginate> = new BehaviorSubject(null)
  private orderEditSubject$ : BehaviorSubject<Order> = new BehaviorSubject<Order>(null)


  public get resultItems$() {
    return this.resultSubject$
  }
  setProductOnEdit(value){
    this.idOrder = value?.id;
    this.orderEditSubject$.next(value)
  }
  public setItems(value) {
    this.resultSubject$.next(value)
  }

  storePayment(data): Observable<Order>{
    return this.http.post<Response>(`${environment.API}${environment.routesCRUD.orders}`, data).pipe(
      map( v => {
        
        //snacbarr
        this.openSnackBar('Se creó correctamente','success-snack-bar')
        //////////
        return v.data
      }),
      catchError(error => this.errorHandler(error))
    )

  }

  storeOrder(data): Observable<any>{
    return this.http.post<Response>(`${environment.API}${environment.routesCRUD.orders}`, data)

  }

  updatePayment(data): Observable<Order>{
    return this.http.put<Response>(`${environment.API}${environment.routesCRUD.orders}/${data.id}`, data).pipe(
      map( v => {
        this.getPayments(1, 20, '', 'desc').pipe(take(1)).subscribe()
        //snacbarr
        this.openSnackBar('Actualizado correctamente','success-snack-bar')
        //////////
        return v.data
      }),
      catchError(error => this.errorHandler(error))
    )

  }

  ///listar
  getPayments(currentPage = 1, perPage = 20, filter = '', sort = 'desc', course_id = ''): Observable<ResponsePaginate> {
    return this.http.get<ResponsePaginate>(`${environment.API}${environment.routesCRUD.orders}`, {
      params: new HttpParams()
        .set('page', currentPage.toString())
        .set('filter', filter)
        .set('sort', sort)
        .set('per_page', perPage.toString())
        .set('course_id', course_id)
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


  deletePayment(id){
    return this.http.delete<Response>(`${environment.API}${environment.routesCRUD.orders}/${id}`).pipe(
      map( v => {
        // console.log(v.data);
        
        this.getPayments(1, 20, '', 'desc').pipe(take(1)).subscribe()
        //snacbarr
        this.openSnackBar('Eliminado correctamente','success-snack-bar')
        //////////
        return v.data
        
      }),
      catchError(error => this.errorHandler(error))
    )
  }

  getPayment(id):Observable<Order>{
    return this.http.get<Response>(`${environment.API}${environment.routesCRUD.orders}/${id}`).pipe(map(
      res => {
        this.setItems(res.data)
        
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
