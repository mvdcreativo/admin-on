import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, map, take } from 'rxjs/operators';
import { ResponsePaginate } from 'src/app/shared/interfaces/response';
import { environment } from 'src/environments/environment';
import { Response } from "src/app/shared/interfaces/response";
import { toFormData } from 'src/app/shared/utils/forms/to-form-data';
import { User } from '../../accounts/interfaces/account';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) { }



  private resultSubject$: BehaviorSubject<ResponsePaginate> = new BehaviorSubject(null)
  public get resultItems$() {
    return this.resultSubject$
  }
  public setItems(value) {
    this.resultSubject$.next(value)
  }

  storeUser(data): Observable<User>{
    const dataStore = toFormData(data);
    return this.http.post<Response>(`${environment.API}${environment.routesCRUD.users}`, dataStore).pipe(
      map( v => {
        this.getUsers(1, 20, '', 'desc').pipe(take(1)).subscribe()
        //snacbarr
        this.openSnackBar('Se creó correctamente','success-snack-bar')
        //////////
        return v.data
      }),
      catchError(error => this.errorHandler(error))
    )

  }

  updateUser(data): Observable<User>{
    const dataStore = toFormData(data);
    dataStore.append('_method', 'put');
    return this.http.post<Response>(`${environment.API}${environment.routesCRUD.users}/${data.id}`, dataStore).pipe(
      map( v => {
        this.getUsers(1, 20, '', 'desc').pipe(take(1)).subscribe()
        //snacbarr
        this.openSnackBar('Actualizado correctamente','success-snack-bar')
        //////////
        return v.data
      }),
      catchError(error => this.errorHandler(error))
    )

  }

  ///listar
  getUsers(currentPage = 1, perPage = 20, filter = '', sort = 'desc'): Observable<ResponsePaginate> {
    return this.http.get<ResponsePaginate>(`${environment.API}${environment.routesCRUD.users}`, {
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


  getUser(id):Observable<Response>{
    return this.http.get<Response>(`${environment.API}${environment.routesCRUD.users}/${id}`)
 
  }

  deleteUser(id){
    return this.http.delete<Response>(`${environment.API}${environment.routesCRUD.users}/${id}`).pipe(
      map( v => {
        // console.log(v.data);
        
        this.getUsers(1, 20, '', 'desc').pipe(take(1)).subscribe()
        //snacbarr
        this.openSnackBar('Eliminado correctamente','success-snack-bar')
        //////////
        return v.data
        
      }),
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