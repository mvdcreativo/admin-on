import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

import { LengthUnit } from 'src/app/pages/products/interfaces/product';
import { ResponsePaginate, Response } from '../../interfaces/response';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LengthUnitService {



  constructor(
    private http: HttpClient
  ) { }


  getLengthUnits():Observable<LengthUnit[]>{
    return this.http.get<Response>(`${environment.API}length_units`).pipe(
      map(v=> v.data)
    )
  }
}
