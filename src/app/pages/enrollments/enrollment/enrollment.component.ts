import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../../accounts/interfaces/account';
import { UsersService } from '../../edit-user/services/users.service';
import { Product } from '../../products/interfaces/product';
import { ProductService } from '../../products/services/product.service';
import { PaymentOptionsDialogComponent } from './payment-options-dialog/payment-options-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { PaymentsService } from '../../payments/services/payments.service';
import { DataPersonPaymentComponent } from '../../payments/components/data-person-payment/data-person-payment.component';
import { DialogCuposComponent } from '../../payments/components/dialog-cupos/dialog-cupos.component';
// import { get } from 'scriptjs';
import { PdfService } from "src/app/shared/components/pdfs/services/pdf.service";
import { Order } from '../../payments/interfaces/order';

@Component({
  selector: 'mvd-enrollment',
  templateUrl: './enrollment.component.html',
  styleUrls: ['./enrollment.component.scss']
})
export class EnrollmentComponent implements OnInit {
  resSearch: Observable<User[]>;
  valueSearch: string;
  resValue:string;
  searched: boolean=false;
  user: User;
  display = [['account','n_doc_iden'],'name']
  course: Observable<Product>;
  typesDocIden: { name: string; value: string; }[];
  print: boolean = false;
  dataPrint: Order;
  order: Observable<Order>;
  view: boolean = false;
  
  constructor(
    public dialog: MatDialog,
    private userService: UsersService,
    private activateRoute: ActivatedRoute,
    private productService: ProductService,
    private stateRoute: Location,
    private router: Router,
    private paymentService: PaymentsService,
    private pdfService: PdfService
  ) { }

  subscriptions: Subscription[]=[]


  ngOnInit(): void {
    
    // get("https://www.mercadopago.com.uy/integrations/v1/web-payment-checkout.js", () => {
    //   //library has been loaded...
    // });
    this.activateRoute.paramMap.subscribe(
      (params:Params) => {
        console.log(params);
        const course_id = params.params.course_id
        if (params.params.course_id) {
          this.course = this.productService.getProduct(course_id)
        }
        if (params.params.user_id) {
          this.getUser(params.params.user_id)
        }
        if (params.params.id) {
          const order_id = params.params.id
          this.view = true;
            this.order = this.paymentService.getPayment(order_id).pipe(map(v=>{
              this.course = this.productService.getProduct(v.courses[0].id)
              this.getUser(v.user_id)
              this.dataPrint = v
              return v
            }))

        }
        
      }
    )
    
   
  }

  getUser(id){
    this.subscriptions.push(
      this.userService.getUser(id).subscribe(res=> {
        this.user= res.data
        console.log(this.user)
        this.resValue = null
        this.valueSearch = null
        this.resSearch=null
        
        
      })
    )
  }
  search(value:string){
    this.user = null;
    if(value && value.length >= 3){
      this.valueSearch = value
      this.resSearch = this.userService.getUsers(1,10,value).pipe(map(v=>v.data.data))
     
    }else{
      this.valueSearch =null
    }

  }

  ngOnDestroy(): void {
    this.subscriptions.map(v=>v.unsubscribe())
    
  }

  selectUser(item){
    this.user = item
    this.resValue = null
    this.valueSearch = null
    this.resSearch=null
    this.searched= !this.searched
  }

  clikBuscar(){
    this.searched = !this.searched;
  }


  addUser(){
    this.router.navigate(['/alumnos/editar-usuario'],{ queryParams: { returnUrl: this.router.url } } )
  }


  pay(course){

    this.openPaymentOption(course)
  }

  storeOrder(data, typePay?){
    // console.log(data);
    
    let dataForm = data

    dataForm.products = data.products.map(v=> { 
      return {
        quantity: 1, 
        course_id : v.id, 
        price: v.price, 
        currency_id: v.currency_id,
        user_id: this.user.id
      } 
    })

    dataForm.user_id = this.user.id;
    dataForm.total = data.products[0].price;
    dataForm.currency_id = data.products[0].currency_id
    dataForm.type_pay = typePay;

    this.subscriptions.push(
      this.paymentService.storeOrder(dataForm).subscribe(
        res=> {
          const init_point = res.init_point;
          const newCourse = res.new_course
          if(newCourse){
            this.openDialogCupos(newCourse)
          }
          if(init_point){
            window.location.href = init_point;
          }

          if(res?.data){
            console.log(res?.data);
            this.dataPrint = res.data
            this.pdf()
            setTimeout(()=>this.router.navigate(['/inscripciones']), 500)
            // this.router.navigate(['/inscripciones'])
            
          }
          
        },
        // err => this.openDialogCupos()
        
        
      )
    )
    // this.paymentService.storeOrder(dataForm)
  }


  openDataPayment(data?) {
    
    const dialogRef = this.dialog.open(DataPersonPaymentComponent, {
      width: '800px',
      maxWidth: '100%',
      data: data
    });

    return dialogRef.afterClosed().subscribe(result => {
      // this.animal = result;
      if(result){
        this.storeOrder(result,"MP")
      }
      
    });
  }

  openPaymentOption(data?) {
    
    const dialogRef = this.dialog.open(PaymentOptionsDialogComponent, {
      width: '300px',
      data:""
    });

    return dialogRef.afterClosed().subscribe(result => {
      // this.animal = result;
      if(result){
        if(result==="MP"){

          const dat = {user: this.user, course: data}
          this.openDataPayment(dat)

        }else{

          const dat = {
            user_id: this.user.id,
            name: this.user?.name,
            last_name: this.user?.last_name,
            email: this.user?.email,
            n_doc_iden: this.user?.account?.n_doc_iden,
            type_doc_iden: 'CI',
            address_one: this.user?.account?.address_one,
            phone_one: this.user?.account?.phone_one,
            products: [data]
          }

          this.storeOrder(dat,"PL")
        }


      }


      
    });
  }

  openDialogCupos(course): void {
    const dialogRef = this.dialog.open(DialogCuposComponent, {
      maxWidth: '100%',
      width: '550px',
      data: course
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      
    });
  }


  setFields() {
    // console.log(elementEdit);

    this.typesDocIden = [
      {name: 'CI', value:'CI'},
      {name: 'Pasaporte', value:'Pasaporte'}
    ]
    
    const fields = [
      { nameControl: 'id', type: 'hidden', value: this.user?.id, label: 'Id' },
      { nameControl: 'name', type: 'text', value: this.user?.name, label: 'Nombre', validators: [Validators.required] },
      { nameControl: 'last_name', type: 'text', value: this.user?.last_name, label: 'Apellido', validators: [Validators.required] },
      { nameControl: 'type_doc_iden', type: 'select', value: this.user?.account.type_doc_iden, label: 'Tipo documento de identidad',options: this.typesDocIden , validators: [Validators.required] },
      { nameControl: 'n_doc_iden', type: 'text', value: this.user?.account.n_doc_iden, label: 'Nº documento', validators: [Validators.required] },
      { nameControl: 'email', type: 'text', value: this.user?.email, label: 'Email', validators: [Validators.required] },
      { nameControl: 'phone_one', type: 'text', value: this.user?.account.phone_one, label: 'Teléfono' },
      { nameControl: 'address_one', type: 'text', value: this.user?.account.address_one, label: 'Dirección',class:'mvd-col1--1' },

    ]
    return fields
    
  }


  pdf(){
    this.print = true;
    // this.print = false;
  }
}