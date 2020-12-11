import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalSearchComponent } from "src/app/shared/components/modals/modal-search/modal-search.component";

@Component({
  selector: 'mvd-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  constructor(
    public dialog: MatDialog,

  ) { }

  ngOnInit(): void {
  }

  search(){
    this.openDialog('any')
  }


  openDialog(data?) {
    
    const dialogRef = this.dialog.open(ModalSearchComponent, {
      width: '850px',
      data: ''
    });

    return dialogRef.afterClosed().subscribe(result => {
      // this.animal = result;
      if(result){
        if (result) {
          
        }else{

        }

      }
      
    });
  }
}
