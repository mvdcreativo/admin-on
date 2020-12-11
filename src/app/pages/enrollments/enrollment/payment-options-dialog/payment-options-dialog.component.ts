import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalReutilComponent } from 'src/app/shared/components/modals/modal-reutil/modal-reutil.component';

@Component({
  templateUrl: './payment-options-dialog.component.html',
  styleUrls: ['./payment-options-dialog.component.scss']
})
export class PaymentOptionsDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ModalReutilComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any 
  ) { }

  paymentMethod: string = "PL"

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


  action(){
    this.dialogRef.close(this.paymentMethod);
  }

}
