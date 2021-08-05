import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, of, Subscription } from 'rxjs';
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
// import { PdfService } from "src/app/shared/components/pdfs/services/pdf.service";
import { Order } from '../../payments/interfaces/order';

@Component({
  selector: 'mvd-enrollment',
  templateUrl: './enrollment.component.html',
  styleUrls: ['./enrollment.component.scss'],
})
export class EnrollmentComponent implements OnInit {
  resSearch: Observable<User[]>;
  valueSearch: string;
  resValue: string;
  searched: boolean = false;
  user: User;
  display = [['account', 'n_doc_iden'], 'name'];
  course: Observable<Product>;
  typesDocIden: { name: string; value: string }[];
  print: boolean = false;
  dataPrint: Order;
  order: Observable<Order>;
  view: boolean = false;
  fields: any;
  form: FormGroup;
  amount: any;
  amount_cuota: any;
  cuotas: number;

  constructor(
    public dialog: MatDialog,
    private userService: UsersService,
    private activateRoute: ActivatedRoute,
    private productService: ProductService,
    private stateRoute: Location,
    private router: Router,
    private paymentService: PaymentsService,
    private fb: FormBuilder
  ) {
    this.createForm();
  }

  subscriptions: Subscription[] = [];

  ngOnInit(): void {
    // get("https://www.mercadopago.com.uy/integrations/v1/web-payment-checkout.js", () => {
    //   //library has been loaded...
    // });
    this.activateRoute.paramMap.subscribe((params: Params) => {
      console.log(params);
      const course_id = params.params.course_id;
      if (params.params.course_id) {
        this.course = this.productService.getProduct(course_id);
        this.subscriptions.push(
          this.course.subscribe((res) => {
            const discount = res.discount_uno;

            this.amount = !discount
              ? res.price
              : (+res.price - +res.price * +discount / 100).toString();
          })
        );
      }
      if (params.params.user_id) {
        this.getUser(params.params.user_id);
      }
      if (params.params.id) {
        const order_id = params.params.id;
        this.view = true;
        this.form.disable();
        this.order = this.paymentService.getPayment(order_id).pipe(
          map((v) => {
            console.log(v);
            this.amount_cuota = v.amount_cuota;
            this.cuotas = v.cuotas;
            // this.course = this.productService.getProduct(v.courses[0].id)
            this.course = of(v.courses[0]);
            this.subscriptions.push(
              this.course.subscribe((res) => {
                this.amount = res.pivot.price;
              })
            );
            this.getUser(v.user_id);
            this.dataPrint = v;
            return v;
          })
        );
      }
    });
  }

  getUser(id) {
    this.subscriptions.push(
      this.userService.getUser(id).subscribe((res) => {
        this.user = res.data;
        console.log(this.user);
        this.resValue = null;
        this.valueSearch = null;
        this.resSearch = null;
        if (this.user) {
          this.setForm();
        }
      })
    );
  }
  search(value: string) {
    this.user = null;
    if (value && value.length >= 3) {
      this.valueSearch = value;
      this.resSearch = this.userService
        .getUsers(1, 10, value)
        .pipe(map((v) => v.data.data));
    } else {
      this.valueSearch = null;
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.map((v) => v.unsubscribe());
  }

  selectUser(item) {
    this.user = item;
    this.resValue = null;
    this.valueSearch = null;
    this.resSearch = null;
    this.searched = !this.searched;
    if (this.user) {
      this.setForm();
    }
  }

  clikBuscar() {
    this.searched = !this.searched;
  }

  addUser() {
    this.router.navigate(['/alumnos/editar-usuario'], {
      queryParams: { returnUrl: this.router.url },
    });
  }

  editUser() {
    this.router.navigate(['/alumnos/editar-usuario', this.user.id], {
      queryParams: { returnUrl: this.router.url },
    });
  }

  pay(course) {
    this.openPaymentOption(course);
  }

  storeOrder(data, typePay?) {
    // console.log(data);

    let dataForm = data;

    dataForm.products = data.products.map((v) => {
      return {
        quantity: 1,
        course_id: v.id,
        price: this.amount,
        currency_id: v.currency_id,
        user_id: this.user.id,
      };
    });

    dataForm.user_id = this.user.id;
    dataForm.total = this.amount;
    dataForm.currency_id = data.products[0].currency_id;
    dataForm.type_pay = typePay;

    this.subscriptions.push(
      this.paymentService.storeOrder(dataForm).subscribe(
        (res) => {
          const init_point = res.init_point;
          const newCourse = res.new_course;
          if (newCourse) {
            this.openDialogCupos(newCourse);
          }
          if (init_point) {
            window.location.href = init_point;
          }
          if (res?.data) {
            console.log(res?.data);
            this.dataPrint = res.data;
            this.pdf();
            setTimeout(() => this.router.navigate(['/inscripciones']), 500);
            // this.router.navigate(['/inscripciones'])
          }
        }
        // err => this.openDialogCupos()
      )
    );
    // this.paymentService.storeOrder(dataForm)
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
      cuotas: [1],
      amount_cuota: [null],
    });
  }

  setForm() {
    this.form.patchValue({
      name: this.user?.name,
      last_name: this.user?.last_name,
      email: this.user?.email,
      n_doc_iden: this.user?.account?.n_doc_iden,
      type_doc_iden: 'CI',
      address_one: this.user?.account?.address_one,
      phone_one: this.user?.account?.phone_one,
      cuotas: this.cuotas || 1,
      amount_cuota: this.amount_cuota || parseFloat(this.amount).toFixed(2),
    });
    this.form.get('cuotas').valueChanges.subscribe((data) => {
      if (data >= 1) {
        const valorCuota = parseFloat(this.amount) / data;
        this.form.get('amount_cuota').setValue(valorCuota.toFixed(2));
        console.log(this.form.value);
      } else {
        this.form
          .get('amount_cuota')
          .setValue(parseFloat(this.amount).toFixed(2));
        console.log(this.form.value);
      }
    });
    console.log(this.form.value);
  }

  openDataPayment(data?) {
    const dialogRef = this.dialog.open(DataPersonPaymentComponent, {
      width: '800px',
      maxWidth: '100%',
      data: data,
    });

    return dialogRef.afterClosed().subscribe((result) => {
      // this.animal = result;
      if (result) {
        this.storeOrder(result, 'MP');
      }
    });
  }

  openPaymentOption(data?) {
    const dialogRef = this.dialog.open(PaymentOptionsDialogComponent, {
      width: '300px',
      data: '',
    });

    return dialogRef.afterClosed().subscribe((result) => {
      // this.animal = result;
      if (result) {
        if (result === 'MP') {
          const dat = { user: this.user, course: data };
          this.openDataPayment(dat);
        } else {
          let dat = this.form.value;
          dat.products = [data];

          dat.payment_status_slug = 'pago_en_local';
          this.storeOrder(dat, 'PL');
        }
      }
    });
  }

  openDialogCupos(course): void {
    const dialogRef = this.dialog.open(DialogCuposComponent, {
      maxWidth: '100%',
      width: '550px',
      data: course,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
    });
  }

  getErrorMessage(validator) {
    let message;
    switch (validator) {
      case 'notIncludedIn': {
        message = 'El email ya existe';
        break;
      }
      case 'email': {
        message = 'Email no válido';
        break;
      }
      case 'date': {
        message = 'Formato de fecha inválido';
        break;
      }
      case 'number': {
        message = 'Solo números';
        break;
      }
      case 'required': {
        message = 'Campo requerido';
        break;
      }

      default:
        message = 'No válido';
        break;
    }

    return message;
  }

  pdf() {
    this.print = true;

    // this.print = false;
  }
}
