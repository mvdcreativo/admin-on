import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';

import { environment } from "src/environments/environment";

import { Product, Response, OptionSelect, AdquiredSkills, CourseSection, Lesson, Schedule } from "../interfaces/product";
import { map, take, catchError } from 'rxjs/operators';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ResponsePaginate } from 'src/app/shared/interfaces/response';
import { toFormData } from "src/app/shared/utils/forms/to-form-data";
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
 
  private productEditSubject$ : BehaviorSubject<Product> = new BehaviorSubject<Product>(null)
  private urlUtils = "src/app/shared/utils/data/";

  private resultSubject$: BehaviorSubject<ResponsePaginate> = new BehaviorSubject(null)
  idProduct: any;
  public get resultItems$() {
    return this.resultSubject$
  }
  public setItems(value) {
    this.resultSubject$.next(value)
  }

  
  constructor(
    private http:HttpClient,
    private snackBar: MatSnackBar,
    private router: Router
  ) { 
    // this.prueba = this.getProduct(107).subscribe()
  }

  get productOnEdit():Observable<Product>{
    return this.productEditSubject$
  }

  setProductOnEdit(value){
    this.idProduct = value?.id;
    this.productEditSubject$.next(value)
  }



  storeProduct(data): Observable<Product>{
    const dataStore = toFormData(data);
    return this.http.post<Response>(`${environment.API}${environment.routesCRUD.products}`, dataStore).pipe(
      map( v => {
        if(v.data){
          this.setProductOnEdit(v.data)

        }
        //snacbarr
        this.openSnackBar('Se creó correctamente','success-snack-bar')
        //////////
        return v.data
      }),
      catchError(error => this.errorHandler(error))
    )

  }
  duplicateProduct(id): Observable<Product>{
    const formData = new FormData();
    formData.append('id',id)
    return this.http.post<Response>(`${environment.API}clone`, formData).pipe(
      map( v => {
        if(v.data){
          this.setProductOnEdit(v.data)

          this.router.navigate(['/productos/producto', v.data.id])    
          this.openSnackBar('Se creó correctamente','success-snack-bar')
        }
        //snacbarr

        //////////
        return v.data
      }),
      catchError(error => this.errorHandler(error))
    )

  }

  updateProduct(data): Observable<Product>{
    const id = this.productEditSubject$.value.id
    
    const dataUpdate = toFormData(data);

    dataUpdate.append('_method', 'put');
    return this.http.post<Response>(`${environment.API}${environment.routesCRUD.products}/${id}`, dataUpdate).pipe(
      map( v => {
        this.setProductOnEdit(v.data)
        //snacbarr
        this.openSnackBar('Actualizado correctamente','success-snack-bar')
        //////////
        return v.data
      }),
      catchError(error => this.errorHandler(error))
    )

  }

  deleteProduct(id){
    return this.http.delete<Response>(`${environment.API}${environment.routesCRUD.products}/${id}`).pipe(
      map( v => {
        // console.log(v.data);
        
        this.getProducts(1, 20, '', 'desc').pipe(take(1)).subscribe()
        //snacbarr
        this.openSnackBar('Eliminado correctamente','success-snack-bar')
        //////////
        return v.data
        
      }),
      catchError(error => this.errorHandler(error))
    )
  }
 

  getProduct(id) : Observable<Product>{
    return this.http.get<Response>(`${environment.API}${environment.routesCRUD.products}/${id}`).pipe(map(
      res => {
        this.setProductOnEdit(res.data)
        
        const resp = res.data
        return resp;
      }
    ),
    catchError(error => this.errorHandler(error))
    )
  }


///listar
  getProducts(currentPage = 1, perPage = 20, filter='', sort= 'desc', status = '') : Observable<ResponsePaginate>{
    var status_ids = ''
    if(status){
      status_ids = JSON.stringify(status)
    }
    return this.http.get<ResponsePaginate>(`${environment.API}${environment.routesCRUD.products}`, {
      params: new HttpParams()
        .set('page', currentPage.toString())
        .set('filter', filter)
        .set('sort', sort)
        .set('per_page', perPage.toString())
        .set('status', status_ids)

    }).pipe(map(
      res => {
        // console.log(res);
        
        this.setProductOnEdit(null)
        this.setItems(res)
        const resp = res
        return resp;
      }
    ),
    catchError(error => this.errorHandler(error))
    )
  }



  public getOptionsSelect(): Observable<OptionSelect[]> {
    return this.http.get<OptionSelect[]>(this.urlUtils + 'forms.json').pipe(
      catchError(error => this.errorHandler(error))
    );
  }


  openSnackBar(message: string, refClass:string, action: string = '') {
    this.snackBar.open(message, action, {
      duration: 1000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: refClass 
    });
  }
  
  errorHandler(error: HttpErrorResponse) {
    this.openSnackBar(error.message || "error en la solicitud.",'error-snack-bar')
    return throwError(error.message || "error en la solicitud.");
  }




/////////////////// Adquired Skills /////////////////////////////////

  storeAdquiredSkill(data): Observable<AdquiredSkills>{
    return this.http.post<Response>(`${environment.API}${environment.routesCRUD.adquired_skills}`, data).pipe(
      map( v => {
        // this.getTransactionTypes(1, 20, '', 'desc').pipe(take(1)).subscribe()
        //snacbarr
        this.getProduct(v.data.course_id).pipe(take(1)).subscribe()

        
        this.openSnackBar('Se creó correctamente','success-snack-bar')
        //////////
        return v.data
      }),
      catchError(error => this.errorHandler(error))
    )

  }

  updateAdquiredSkill(data): Observable<AdquiredSkills>{
    return this.http.put<Response>(`${environment.API}${environment.routesCRUD.adquired_skills}/${data.id}`, data).pipe(
      map( v => {
        // this.getTransactionTypes(1, 20, '', 'desc').pipe(take(1)).subscribe()
        //snacbarr
        this.getProduct(v.data.course_id).pipe(take(1)).subscribe()

        this.openSnackBar('Actualizado correctamente','success-snack-bar')
        //////////
        return v.data
      }),
      catchError(error => this.errorHandler(error))
    )

  }


  deleteAdquiredSkill(id){
    console.log(id);
    
    this.http.delete<Response>(`${environment.API}${environment.routesCRUD.adquired_skills}/${id}`).pipe(
      take(1),
      map( v => {
        console.log(id);
        
        this.getProduct(this.productEditSubject$.value.id).pipe(take(1)).subscribe();
        this.openSnackBar('Eliminado correctamente','success-snack-bar')
        //////////
        return v.data
        
      }),
      catchError(error => this.errorHandler(error))
    ).subscribe()
  }
//////////////////////////////////////////////////////



  //////////////// Courses Sections //////////////////

  sectionsUpdate(data){
    return this.http.put<Response>(`${environment.API}${environment.routesCRUD.course_sections}/${data.id}`, data).pipe(
      map( v => {
        // this.getTransactionTypes(1, 20, '', 'desc').pipe(take(1)).subscribe()
        //snacbarr
        this.getProduct(this.idProduct).pipe(take(1)).subscribe()

        this.openSnackBar('Actualizado correctamente','success-snack-bar')
        //////////
        return v.data
      }),
      catchError(error => this.errorHandler(error))
    )

  }

  storeCourseSection(data): Observable<CourseSection>{
    return this.http.post<Response>(`${environment.API}${environment.routesCRUD.course_sections}`, data).pipe(
      map( v => {
        // this.getTransactionTypes(1, 20, '', 'desc').pipe(take(1)).subscribe()
        //snacbarr
        this.getProduct(this.idProduct).pipe(take(1)).subscribe()

        
        this.openSnackBar('Se creó correctamente','success-snack-bar')
        //////////
        return v.data
      }),
      catchError(error => this.errorHandler(error))
    )

  }

  sectionsSortUpdate(data){
    const list = data
    return this.http.put<Response>(`${environment.API}course_sections_sort`, list).pipe(
      map( v => {
        // this.getTransactionTypes(1, 20, '', 'desc').pipe(take(1)).subscribe()
        //snacbarr
        this.getProduct(this.idProduct).pipe(take(1)).subscribe()

        this.openSnackBar('Actualizado correctamente','success-snack-bar')
        //////////
        return v.data
      }),
      catchError(error => this.errorHandler(error))
    )

  }

  deleteCourseSection(id){
    console.log(id);
    
    this.http.delete<Response>(`${environment.API}${environment.routesCRUD.course_sections}/${id}`).pipe(
      take(1),
      map( v => {
        console.log(id);
        
        this.getProduct(this.productEditSubject$.value.id).pipe(take(1)).subscribe();
        this.openSnackBar('Eliminado correctamente','success-snack-bar')
        //////////
        return v.data
        
      }),
      catchError(error => this.errorHandler(error))
    ).subscribe()
  }
/////////////////////////////////////////




////////////// lecciones ////////////////

lessonUpdate(data): Observable<Lesson>{
  console.log(data);
  
  return this.http.put<Response>(`${environment.API}${environment.routesCRUD.lessons}/${data.id}`, data).pipe(
    map( v => {
      // this.getTransactionTypes(1, 20, '', 'desc').pipe(take(1)).subscribe()
      //snacbarr
      this.getProduct(this.idProduct).pipe(take(1)).subscribe()

      this.openSnackBar('Actualizado correctamente','success-snack-bar')
      //////////
      return v.data
    }),
    catchError(error => this.errorHandler(error))
  )

}

storeLesson(data): Observable<Lesson>{
  return this.http.post<Response>(`${environment.API}${environment.routesCRUD.lessons}`, data).pipe(
    map( v => {
      // this.getTransactionTypes(1, 20, '', 'desc').pipe(take(1)).subscribe()
      //snacbarr
      this.getProduct(this.idProduct).pipe(take(1)).subscribe()

      
      this.openSnackBar('Se creó correctamente','success-snack-bar')
      //////////
      return v.data
    }),
    catchError(error => this.errorHandler(error))
  )

}


  lessonsSortUpdate(data){
    const list = data
    return this.http.put<Response>(`${environment.API}lessons_sort`, list).pipe(
      map( v => {
        // this.getTransactionTypes(1, 20, '', 'desc').pipe(take(1)).subscribe()
        //snacbarr
        this.getProduct(this.idProduct).pipe(take(1)).subscribe()

        this.openSnackBar('Actualizado correctamente','success-snack-bar')
        //////////
        return v.data
      }),
      catchError(error => this.errorHandler(error))
    )

  }


  deleteLesson(id){
    console.log(id);
    
    this.http.delete<Response>(`${environment.API}${environment.routesCRUD.lessons}/${id}`).pipe(
      take(1),
      map( v => {
        console.log(id);
        
        this.getProduct(this.productEditSubject$.value.id).pipe(take(1)).subscribe();
        this.openSnackBar('Eliminado correctamente','success-snack-bar')
        //////////
        return v.data
        
      }),
      catchError(error => this.errorHandler(error))
    ).subscribe()
  }





  /////////////////// Schedules - Horarios /////////////////////////////////

  storeSchedule(data): Observable<Schedule>{
    return this.http.post<Response>(`${environment.API}${environment.routesCRUD.schedules}`, data).pipe(
      map( v => {
        // this.getTransactionTypes(1, 20, '', 'desc').pipe(take(1)).subscribe()
        //snacbarr
        this.getProduct(v.data.course_id).pipe(take(1)).subscribe()

        
        this.openSnackBar('Se creó correctamente','success-snack-bar')
        //////////
        return v.data
      }),
      catchError(error => this.errorHandler(error))
    )

  }

  updateSchedule(data): Observable<Schedule>{
    return this.http.put<Response>(`${environment.API}${environment.routesCRUD.schedules}/${data.id}`, data).pipe(
      map( v => {
        // this.getTransactionTypes(1, 20, '', 'desc').pipe(take(1)).subscribe()
        //snacbarr
        this.getProduct(v.data.course_id).pipe(take(1)).subscribe()

        this.openSnackBar('Actualizado correctamente','success-snack-bar')
        //////////
        return v.data
      }),
      catchError(error => this.errorHandler(error))
    )

  }


  deleteSchedule(id){
    console.log(id);
    
    this.http.delete<Response>(`${environment.API}${environment.routesCRUD.schedules}/${id}`).pipe(
      take(1),
      map( v => {
        console.log(id);
        
        this.getProduct(this.productEditSubject$.value.id).pipe(take(1)).subscribe();
        this.openSnackBar('Eliminado correctamente','success-snack-bar')
        //////////
        return v.data
        
      }),
      catchError(error => this.errorHandler(error))
    ).subscribe()
  }
//////////////////////////////////////////////////////
}
