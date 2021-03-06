import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterMunicipality'
})
export class FilterMunicipalityPipe implements PipeTransform {
  transform(items:Array<any>, id?) {
    // console.log(items);
    
    if(id){
      return items?.filter(item => item.city_id == id);
    } 
    return items;  
  }

}
