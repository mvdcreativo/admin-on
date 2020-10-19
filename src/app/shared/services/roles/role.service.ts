import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Role } from 'src/app/pages/accounts/interfaces/account';
import { environment } from 'src/environments/environment';
import { Response } from "src/app/shared/interfaces/response";
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(
    private http: HttpClient
    ) { }
  
  
    getRoles():Observable<Role[]>{
      return this.http.get<Response>(`${environment.API}roles`).pipe(
        map(v => v.data)
      )
    }
}
