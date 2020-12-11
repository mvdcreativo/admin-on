import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  templateUrl: './dialog-cupos.component.html',
  styleUrls: ['./dialog-cupos.component.scss']
})
export class DialogCuposComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogCuposComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ){}

  ngOnInit(){}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
