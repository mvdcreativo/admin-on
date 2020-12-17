import { Component, OnInit, Output, EventEmitter, OnDestroy, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';

import { StatusService } from "src/app/shared/services/status/status.service";
import { Observable } from 'rxjs/internal/Observable';
import { Status } from 'src/app/shared/interfaces/status';
import { Product, LengthUnit, Level, Currency, Category } from '../../interfaces/product';
import { ProductService } from '../../services/product.service';
import { LengthUnitService } from "src/app/shared/services/length-unit/length-unit.service";
import { LevelService } from "src/app/shared/services/levels/level.service";
import { CurrencyService } from "src/app/pages/currencies/services/currency.service";
import { Subscription } from 'rxjs';
import { InstructorsService } from "src/app/pages/instructors/services/instructors.service";

// tslint:disable-next-line:no-duplicate-imports
import {default as _rollupMoment} from 'moment';

import { DateAdapter, MatOptionSelectionChange, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { CategoriesService } from 'src/app/pages/categories/services/categories.service';
import { filter, map } from 'rxjs/operators';
import { Instructor } from 'src/app/pages/instructors/interfaces/instructor';

const moment = _rollupMoment;

@Component({
  selector: 'mvd-form-product',
  templateUrl: './form-product.component.html',
  styleUrls: ['./form-product.component.scss'],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ],
})
export class FormProductComponent implements OnInit, OnDestroy {


  // @Output()changeIndex : EventEmitter<number> = new EventEmitter
  @Output()dataSubmit : EventEmitter<any> = new EventEmitter
  
  
  public form: FormGroup
  statuses: Observable<Status[]>;
  lengthUnits: Observable<LengthUnit[]>;
  productEdit$: Observable<Product>;
  subcriptor: Subscription[] = [];
  productEdit: Product;
  levels : Observable<Level[]>;
  instructors: Observable<Instructor[]>;
  imgInstructor: any = null;
  nameInstructor: string;
  currencies: Observable<Currency[]>;
  messageUpload: string = null;
  imgPreview: string | ArrayBuffer;
  categories: Category[];
  categoriesEdit: Category[];

  constructor(
    private fb: FormBuilder,
    private statusSetvice: StatusService,
    private instructorsService: InstructorsService,
    private lengthUnitsService: LengthUnitService,
    private levelService: LevelService,
    private productServices: ProductService,
    private currencyService: CurrencyService,
    private categoryService: CategoriesService

  ) { 

    this.productEdit$ = this.productServices.productOnEdit
    this.subcriptor.push(this.productEdit$.subscribe(p => {
      this.productEdit = p; 
      this.loadData()
    }))
    // console.log(this.productEdit);
  }



  ngOnInit(): void {

    // this.productEdit$ = this.productServices.productOnEdit
  }

  loadData(){
    this.getCategories()
    this.getStatuses()
    this.getLevels()
    this.getInstructors()
    this.getCurrency()
    this.getLengthUnits()
    this.createForm()
    
    console.log(this.form.value);
  }

  createForm(){
 
    // console.log(this.productEdit);
    
    this.form = this.fb.group(
      {
        title:[this.productEdit?.title, Validators.required],
        cupos:[this.productEdit?.cupos],
        image:[this.productEdit?.image],
        length:[this.productEdit?.length, Validators.required],
        length_unit_id:[this.productEdit?.length_unit_id, Validators.required],
        effort:[this.productEdit?.effort, Validators.required],
        level_id:[this.productEdit?.level_id, Validators.required],
        user_instructor:[this.productEdit?.user_instructor],
        user_instructor_id:[this.productEdit?.user_instructor_id, Validators.required],
        certificate:[this.productEdit?.certificate, Validators.required],
        // discount_uno:[this.productEdit?.discount_uno, Validators.required],
        // discount_dos:[this.productEdit?.discount_dos, Validators.required],
        // discount_tres:[this.productEdit?.discount_tres, Validators.required],
        title_certificate:[this.productEdit?.title_certificate, Validators.required],
        description:[this.productEdit?.description, Validators.required],
        requirements:[this.productEdit?.requirements, Validators.required],
        price:[this.productEdit?.price, Validators.required],
        currency_id:[this.productEdit?.currency_id, Validators.required],
        date_ini:[moment(this.productEdit?.date_ini).format('YYYY-MM-DD HH:mm:ss'), Validators.required],
        status_id:[this.productEdit?.status_id, Validators.required],
        categories:[null, Validators.required]
      }
    )
    // console.log(this.form.value);
    if(this.productEdit){
      this.nameInstructor = this.productEdit.user_instructor.name
      this.imgPreview = this.productEdit.image
    }
    console.log(this.form.value);


  }

  /////Categorias
  getCategories(){
    this.subcriptor.push(this.categoryService.getCategories(1,50).pipe(map(
      v=> {
        return v.data.data
      }
    )).subscribe(res=>{
      this.categories = res
      const categories = res;
      const categoriesEdit = this.productEdit?.categories

      ////select default edit product
      this.categoriesEdit = this.categories.filter(x=>{
        if(categoriesEdit?.find(e=> e.id === x.id)){
          return x
        }
      })

      this.form.get('categories').setValue(this.categoriesEdit)
      
    }))
      
  }


  
  onCategoryRemoved(i: number) {
    console.log(i);
    
    const categoriesSelected = this.form.get('categories').value as string[];



    const remov = this.removeItemFromArr( categoriesSelected, i );
    console.log(remov);
    this.form.get('categories').setValue(remov); // To trigger change detection

  }
  
  removeItemFromArr( arr, item ) {
    return arr.filter( ( e,i) => {
        return i !== item;
    } );
  };
 //////////////


  selectInstructor(e){
    this.imgInstructor = e.value?.image ?? null
    this.form.get('user_instructor_id').patchValue(e.value?.id ?? null) 
    // console.log(this.form.value);
    
    
  }

  editInstructor(){
    this.nameInstructor = null
    this.imgInstructor = null
  }

  public onSelectState() {
    this.form.controls['city'].setValue(null, { emitEvent: false });
    this.form.controls['municipality'].setValue(null, { emitEvent: false });
    this.form.controls['neighborhood_id'].setValue(null, { emitEvent: false });
  }
  public onSelectCity() {
    this.form.controls['municipality'].setValue(null, { emitEvent: false });
    this.form.controls['neighborhood_id'].setValue(null, { emitEvent: false });

  }
  // public onSelectMunicipality() {
  //   this.form.controls['neighborhood_id'].setValue(null, { emitEvent: false });
  // }
  // public onSelectNeighborhood() {
  //   // this.form.controls['street'].setValue(null, {emitEvent: false});
  // }

  onSubmit(){
    
    const fecha = moment(this.form.get('date_ini').value).format('YYYY-MM-DD HH:mm:ss')
    this.form.get('date_ini').patchValue(fecha)
    const data = this.form.value;
    const dataCategories = this.form.get('categories').value.map( v => v.id)
    data.categories = JSON.stringify(dataCategories);
    console.log(data);
    
    this.dataSubmit.emit({data: data, indexTab:0})
  }

  
  getLengthUnits(){
    this.lengthUnits = this.lengthUnitsService.getLengthUnits()
  }

  getLevels(){
    this.levels = this.levelService.getLevels()
  }

  getInstructors(){
    this.instructors = this.instructorsService.getInstructors().pipe(map(v=>v.data.data))
  }

  ngOnDestroy(){
    this.subcriptor.map(v=> v.unsubscribe())
  }

  getCurrency(){
    this.currencies= this.currencyService.getCurrencies()
  }
  getStatuses(){
    this.statuses = this.statusSetvice.getStatuses('CURSOS')
  }

  uploadImage(e){
    console.log(e.target.files);
    if (e?.target?.files[0]) {

      const selectedFile = e.target.files[0];

      var mimeType = selectedFile.type;
      if (mimeType.match(/image\/*/) == null) {
        this.messageUpload = "No es una imágen";
        this.imgPreview = null;
        this.form.get('image').patchValue(null)
        return;
      }

      this.form.get('image').patchValue(selectedFile)
      this.messageUpload = null
      var reader = new FileReader();
        reader.readAsDataURL(selectedFile); 
        reader.onload = (_event) => { 
          this.imgPreview = reader.result; 
      }
      const fileNames = [];
      console.log(selectedFile);

      // console.log(this.files);

      // this.imagesServices.uploadImage(this.data, selectedFiles)
 
    }else{
      const imgExist = this.form.get('image').value
      if (imgExist) {
        this.imgPreview = imgExist
      }else{
        this.imgPreview = null;
        this.form.get('image').patchValue(null)
      }
    }
  }


}
