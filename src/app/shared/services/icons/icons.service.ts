import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Icon } from '../../components/modals/select-icons/insterfaces/icon';



@Injectable({
  providedIn: 'root'
})
export class IconsService {
  data: any;

  constructor(
    private http: HttpClient
  ) { }




  getDataIcons():Observable<Icon[]>{
    return this.http.get<any>("https://raw.githubusercontent.com/google/material-design-icons/master/update/current_versions.json")
      .pipe(map(v => {
        console.log(v)

        let a = JSON.stringify(v)
        let b = a.replace(/{|}|"/g,'')
        let c = b.split(',')
        let d = c.map(v=> v.split(':'))
        let e = d.map( v=> { return {"category": v[0], "icon_name": v[2], "icons": []} })       

        let agrupa = function (arr, prop) {
          return arr.reduce(function(groups, item) {
              var val = item[prop];
              groups[val] = groups[val] || { category: item[prop],icons:[] };
              groups[val].icons.push({"icon_name" : item.icon_name})
              

              return groups;
          }, {});
        }

        const resultData: Icon[] = Object.values(agrupa(e,'category'));
        
        
        return resultData;
      }))

  }

  
}
