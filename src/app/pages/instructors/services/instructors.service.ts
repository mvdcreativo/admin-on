import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, map, take } from 'rxjs/operators';
import { ResponsePaginate } from 'src/app/shared/interfaces/response';
import { environment } from 'src/environments/environment';
import { Instructor } from "../interfaces/instructor";
import { Response } from "src/app/shared/interfaces/response";
import { toFormData } from 'src/app/shared/utils/forms/to-form-data';

@Injectable({
  providedIn: 'root'
})
export class InstructorsService {

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

  storeInstructor(data): Observable<Instructor>{
    const dataStore = toFormData(data);
    return this.http.post<Response>(`${environment.API}${environment.routesCRUD.instructors}`, dataStore).pipe(
      map( v => {
        this.getInstructors(1, 20, '', 'desc').pipe(take(1)).subscribe()
        //snacbarr
        this.openSnackBar('Se creó correctamente','success-snack-bar')
        //////////
        return v.data
      }),
      catchError(error => this.errorHandler(error))
    )

  }

  updateInstructor(data): Observable<Instructor>{
    const dataStore = toFormData(data);
    dataStore.append('_method', 'put');
    return this.http.post<Response>(`${environment.API}${environment.routesCRUD.instructors}/${data.user_id}`, dataStore).pipe(
      map( v => {
        this.getInstructors(1, 20, '', 'desc').pipe(take(1)).subscribe()
        //snacbarr
        this.openSnackBar('Actualizado correctamente','success-snack-bar')
        //////////
        return v.data
      }),
      catchError(error => this.errorHandler(error))
    )

  }

  ///listar
  getInstructors(currentPage = 1, perPage = 20, filter = '', sort = 'desc'): Observable<ResponsePaginate> {
    return this.http.get<ResponsePaginate>(`${environment.API}${environment.routesCRUD.instructors}`, {
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


  getInstructor(id):Observable<Response>{
    return this.http.get<Response>(`${environment.API}${environment.routesCRUD.instructors}/${id}`)
 
  }

  deleteInstructor(id){
    return this.http.delete<Response>(`${environment.API}${environment.routesCRUD.instructors}/${id}`).pipe(
      map( v => {
        // console.log(v.data);
        
        this.getInstructors(1, 20, '', 'desc').pipe(take(1)).subscribe()
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