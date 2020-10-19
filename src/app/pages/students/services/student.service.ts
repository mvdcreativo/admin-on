import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, map, take } from 'rxjs/operators';
import { ResponsePaginate } from 'src/app/shared/interfaces/response';
import { environment } from 'src/environments/environment';
import { Student } from "../interfaces/student";
import { Response } from "src/app/shared/interfaces/response";
import { toFormData } from 'src/app/shared/utils/forms/to-form-data';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

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

  storeStudent(data): Observable<Student>{
    const dataStore = toFormData(data);
    return this.http.post<Response>(`${environment.API}${environment.routesCRUD.students}`, dataStore).pipe(
      map( v => {
        this.getStudents(1, 20, '', 'desc').pipe(take(1)).subscribe()
        //snacbarr
        this.openSnackBar('Se creó correctamente','success-snack-bar')
        //////////
        return v.data
      }),
      catchError(error => this.errorHandler(error))
    )

  }

  updateStudent(data): Observable<Student>{
    const dataStore = toFormData(data);
    dataStore.append('_method', 'put');
    return this.http.post<Response>(`${environment.API}${environment.routesCRUD.students}/${data.user_id}`, dataStore).pipe(
      map( v => {
        this.getStudents(1, 20, '', 'desc').pipe(take(1)).subscribe()
        //snacbarr
        this.openSnackBar('Actualizado correctamente','success-snack-bar')
        //////////
        return v.data
      }),
      catchError(error => this.errorHandler(error))
    )

  }

  ///listar
  getStudents(currentPage = 1, perPage = 20, filter = '', sort = 'desc'): Observable<ResponsePaginate> {
    return this.http.get<ResponsePaginate>(`${environment.API}${environment.routesCRUD.students}`, {
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


  deleteStudent(id){
    return this.http.delete<Response>(`${environment.API}${environment.routesCRUD.students}/${id}`).pipe(
      map( v => {
        // console.log(v.data);
        
        this.getStudents(1, 20, '', 'desc').pipe(take(1)).subscribe()
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
