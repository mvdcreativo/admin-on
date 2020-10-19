import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Level } from 'src/app/pages/products/interfaces/product';
import { Response } from 'src/app/shared/interfaces/response';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LevelService {

  constructor(
    private http: HttpClient
  ) { }


  getLevels():Observable<Level[]>{
    return this.http.get<Response>(`${environment.API}levels`).pipe(
      map(v=> v.data)
    )
  }
}
