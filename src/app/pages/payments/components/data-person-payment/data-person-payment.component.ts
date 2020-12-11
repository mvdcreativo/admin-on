import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { User } from 'src/app/pages/accounts/interfaces/account';
import { Product } from 'src/app/pages/products/interfaces/product';
import { ModalReutilComponent } from 'src/app/shared/components/modals/modal-reutil/modal-reutil.component';

@Component({
  templateUrl: './data-person-payment.component.html',
  styleUrls: ['./data-person-payment.component.scss']
})
export class DataPersonPaymentComponent implements OnInit {

  form: FormGroup;
  
  subscriptions: Subscription[] = [];
  user: User;
  course: Product;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ModalReutilComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {

    if (this.data.user && this.data.course) {
      this.user = this.data.user
      this.course = this.data.course
      this.createForm()
    }
  }



  createForm() {
    console.log(this.user);
    
    this.form = this.fb.group({
      name: [this.user?.name, Validators.required],
      last_name: [this.user?.last_name, Validators.required],
      email: [this.user?.email, [Validators.required, Validators.email]],
      n_doc_iden: [this.user?.account?.n_doc_iden, Validators.required],
      type_doc_iden: ['CI', Validators.required],
      address_one: [this.user?.account?.address_one, Validators.required],
      phone_one: [this.user?.account?.phone_one, Validators.required],
    })
    

  }



  onNoClick(): void {
    this.dialogRef.close();
  }


  action(){
    const data = this.form.value;
    data.products = [this.course]
    this.dialogRef.close(data);
  }
}
