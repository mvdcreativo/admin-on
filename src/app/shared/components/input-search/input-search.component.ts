import { Component, OnInit, Output, EventEmitter, Input, ChangeDetectionStrategy} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounce, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'mvd-input-search',
  templateUrl: './input-search.component.html',
  styleUrls: ['./input-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputSearchComponent implements OnInit {

  @Output() changeSearch :EventEmitter<string> = new EventEmitter;
  @Input() noteFilterBy : string;
  @Input() value : string = null

  searchInput: FormControl

  
  constructor() { }

  ngOnInit(): void {
    this.searchInput = new FormControl(this.value,[])
    this.searchInput.valueChanges
    .pipe(debounceTime(500))
    .subscribe( 
      value => {
        console.log(value);
  
          this.changeSearch.emit(value)

  
      },
      error => console.log(error)
    )
  }



}
