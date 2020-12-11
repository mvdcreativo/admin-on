import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { DataTableComponent } from './components/data-table/data-table.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { PipesModule } from "./pipes/pipes.module";
import { InputSearchComponent } from './components/input-search/input-search.component';
import { ModalLocationsComponent } from './components/modals/modal-locations/modal-locations.component';
import { ConfirmComponent } from './components/modals/confirm/confirm.component';
import { SnackBarComponent } from './components/snack-bar/snack-bar.component';
import { ModalReutilComponent } from './components/modals/modal-reutil/modal-reutil.component';
import { DinamicFormComponent } from './components/dinamic-form/dinamic-form.component';
import { SelectIconsComponent } from './components/modals/select-icons/select-icons.component';
import { FormLocationsComponent } from './components/forms/form-locations/form-locations.component';
import { ModalSearchComponent } from './components/modals/modal-search/modal-search.component';
import { ProductsModule } from '../pages/products/products.module';
import { ProductComponent } from '../pages/products/product/product.component';
import { InputAutocompleteComponent } from './components/forms/input-autocomplete/input-autocomplete.component';
import { OrderPdfComponent } from './components/pdfs/orders/order-pdf/order-pdf.component';

@NgModule({
  declarations: [
    DataTableComponent,
    InputSearchComponent,
    ModalLocationsComponent,
    ConfirmComponent,
    SnackBarComponent,
    ModalReutilComponent,
    DinamicFormComponent,
    SelectIconsComponent,
    FormLocationsComponent,
    ModalSearchComponent,
    InputAutocompleteComponent,
    OrderPdfComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    PipesModule,
  ],
  exports: [
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    DataTableComponent,
    PipesModule,
    InputSearchComponent,
    ModalLocationsComponent,
    ModalReutilComponent,
    DinamicFormComponent,
    FormLocationsComponent,
    InputAutocompleteComponent,
    OrderPdfComponent
  ]
})
export class SharedModule { }
