import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'mvd-input-autocomplete',
  templateUrl: './input-autocomplete.component.html',
  styleUrls: ['./input-autocomplete.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputAutocompleteComponent implements OnInit {

  @Output() changeSearch :EventEmitter<string> = new EventEmitter;
  @Output() selectChange :EventEmitter<string> = new EventEmitter;

  @Input() noteFilterBy : string;
  @Input() valueSet : string = null
  @Input() displayProperties: any[]

  @Input() resSearch : any = null
  searchInput: FormControl
  valueInput: any;

  
  constructor() { }

  ngOnInit(): void {
    this.searchInput = new FormControl('',[])
    this.searchInput.valueChanges
    .pipe(debounceTime(500))
    .subscribe( 
      value => {
        if(value && value.length >= 3){
          this.valueInput = value
          this.changeSearch.emit(value)
        }else{
          this.valueInput = null
        }

  
      },
      error => console.log(error)
    )
  }

  selected(item){
    this.selectChange.emit(item)
  }

  displayItem(item){
    console.log(this.displayProperties);
    
    const d = this.displayProperties.map( v => {
      console.log(v);
      
      if(Array.isArray( v )){
        let itm = item
        v.forEach(element => {
          itm = itm[element]
        });
        return itm;
      }
      return item[v]
    
    })
    console.log(d);
    
    return d.join(" - ")
  }
}
