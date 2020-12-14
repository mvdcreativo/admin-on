import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Fields } from "./interfaces/fields";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';

import { default as _rollupMoment } from 'moment';

import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { MatDialog } from '@angular/material/dialog';
import { SelectIconsComponent } from '../modals/select-icons/select-icons.component';
import { IconsService } from '../../services/icons/icons.service';
import { Icon } from '../modals/select-icons/insterfaces/icon';
import { User } from 'src/app/pages/accounts/interfaces/account';

@Component({
  selector: 'mvd-dinamic-form',
  templateUrl: './dinamic-form.component.html',
  styleUrls: ['./dinamic-form.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
  ],
})
export class DinamicFormComponent implements OnInit {

  @Input() fields: Fields[] = null;
  @Input() locationFieldsData: any;
  @Input() userEdit: User;
  @Output() value: EventEmitter<any> = new EventEmitter

  subscription: Subscription
  colorField: Fields[];
  icons: Observable<Icon[]>;
  messageUpload: string = null;
  imgPreview: string | ArrayBuffer;
  dataLocation: { typeLocation: string; elementEdit: { city: any; city_id: any; code: any; neighborhood_id: any; name: any; state_id: any; }; } = null;
  neighborhood_id: number = null;
  formLocation: FormGroup = null;
  formValid = false;
  colorPreview
  public form: FormGroup

  configEditor = {
    modules: {
      syntax: false,

      toolbar: [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        // ['blockquote', 'code-block'],
        [{ 'color': [] }],          // dropdown with defaults from theme
        // [{ 'font': [] }],
        [{ 'align': [] }],
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

        [{ 'header': 1 }, { 'header': 2 }],               // custom button values
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        // [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
        [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
        [{ 'direction': 'rtl' }],                         // text direction

        // [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown


        // ['clean'],                                         // remove formatting button

        // ['link', 'image', 'video']
      ]
    }
  }

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private iconsService: IconsService
  ) {
    this.form = this.fb.group({})
  }

  ngOnInit(): void {
    this.buildForm()
    console.log(this.form.value);

  }


  changeForm(value) {
    // console.log(value);
    const valueform = value;
    if (this.neighborhood_id && this.dataLocation) {
      valueform.neighborhood_id = this.neighborhood_id
    } else {
      this.form.setErrors({ 'invalid': true })
    }

    this.value.emit(value)
  }

  private buildForm() {

    if (this.fields) {
      const controls = this.fields.map(
        v => {
          if (v.type === 'image' && v.value) {
            this.imgPreview = v.value
          }
          return this.form.addControl(v.nameControl, this.fb.control(v.value, v.validators));
        }
      )


      const fieldColorControl = this.fields.filter(x => x.type === 'color').map(v => v.nameControl);

      if (this.form.get(fieldColorControl)) {
        this.colorPreview = this.form.get(fieldColorControl).value

      }


      this.icons = this.iconsService.getDataIcons()
    }


  }


  chanhgeColor() {

    const fieldColorControl = this.fields.filter(x => x.type === 'color').map(v => v.nameControl);
    this.form.get(fieldColorControl).patchValue(
      this.colorPreview
    )
    console.log(this.colorPreview);

  }



  selectIco() {
    const dialogRef = this.dialog.open(SelectIconsComponent, {
      width: '950px',
      maxWidth: '100%',
      height: '90vh',
      data: this.icons
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if (result) {
        const nameControl = this.fields.filter(x => x.type === 'select_ico').map(v => {
          v.value = result?.icon_name
          return v.nameControl
        });
        this.form.get(nameControl).patchValue(result.icon_name)
        console.log(this.form.value);

      }

    });
  }



  uploadImage(e) {
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

    } else {
      const imgExist = this.form.get('image').value
      if (imgExist) {
        this.imgPreview = imgExist
      } else {
        this.imgPreview = null;
        this.form.get('image').patchValue(null)
      }
    }
  }



  setFormLocation(e: FormGroup) {
    this.formLocation = e;
    if (!this.form.get('neighborhood_id')) {
      this.form.addControl('neighborhood_id', this.fb.control(e.get('neighborhood_id').value, Validators.required));
    } else {
      this.form.get('neighborhood_id').setValue(e.get('neighborhood_id').value)
    }
    console.log(this.form.value);


  }
  setDataLocation() {
    const neighborhood = this.userEdit?.account?.neighborhood
    const formatNeighborhood = {
      city: neighborhood?.city.name,
      city_id: neighborhood?.city_id,
      code: neighborhood?.code,
      neighborhood_id: neighborhood?.id,
      name: neighborhood?.name,
      state_id: neighborhood?.city.state_id,
    }
    this.dataLocation = {
      typeLocation: "user",
      elementEdit: formatNeighborhood
    }
  }


}
