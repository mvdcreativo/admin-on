import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { IconsService } from 'src/app/shared/services/icons/icons.service';
import { Icon } from "../select-icons/insterfaces/icon";

@Component({
  templateUrl: './select-icons.component.html',
  styleUrls: ['./select-icons.component.scss']
})
export class SelectIconsComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<SelectIconsComponent>,
    @Inject(MAT_DIALOG_DATA) public icons: Observable<Icon[]>
  ) { }

  ngOnInit(): void {

  }

  select(icon){
    this.dialogRef.close(icon);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
