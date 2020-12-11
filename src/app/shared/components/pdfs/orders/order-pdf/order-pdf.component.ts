import { Component, OnInit,Input, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Order } from 'src/app/pages/payments/interfaces/order';

import { PdfService } from '../../services/pdf.service';

import { PdfMakeWrapper } from 'pdfmake-wrapper';
import pdfFonts from "pdfmake/build/vfs_fonts";
import { Ul,Item, Txt } from 'pdfmake-wrapper';
import moment from 'moment';
import 'moment/min/locales';


@Component({
  selector: 'mvd-order-pdf',
  templateUrl: './order-pdf.component.html',
  styleUrls: ['./order-pdf.component.scss']
})
export class OrderPdfComponent implements OnInit, AfterViewInit {
 @Input() dataPrint: Order
  schedules: any[];
//  @ViewChild('contentpdf') contentpdf: ElementRef

  constructor(
    private pdfService: PdfService
  ) { }

  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    
    this.orderPDF()
  }

  orderPDF() {
    // Extraemos el
    this.schedules = this.dataPrint.courses[0].schedules.map(v=>{
      return new Item( {text: `${v.day} de ${v.h_ini} a ${v.h_end}` , fontSize: 12,lineHeight:2}).listType('none').end
    })

    
    PdfMakeWrapper.setFonts(pdfFonts);
    const pdf = new PdfMakeWrapper();
    pdf.pageSize('A4');
    pdf.pageOrientation('portrait');
    pdf.pageMargins([ 40, 100, 40, 20 ])


    const date = new Txt(moment(this.dataPrint.created_at).locale('es').format('LL')).alignment('right').fontSize(10).margin([0,0,0,0]).end
    const title = new Txt('Detalle Incripción').bold().fontSize(16).margin([0,0,0,30]).end

    ///USUARIO
    const titleUser = new Txt('Alumno').bold().fontSize(14).margin([0,0,0,10]).end
    const user = new Ul([
        new Item(
          { 
            text:[
              {text: 'Nombre: ' , fontSize: 12, bold: true},
              {text: `${this.dataPrint.user.name} ${this.dataPrint.user.last_name}` , fontSize: 12}
            ],lineHeight:2
          },
        ).listType('none').end,
        new Item(
          { 
            text:[
              {text: 'Documento: ' , fontSize: 12, bold: true},
              {text: `${this.dataPrint.user.account.type_doc_iden} ${this.dataPrint.user.account.n_doc_iden}` , fontSize: 12}
            ],lineHeight:2
          },
        ).listType('none').end,
        new Item(
          { 
            text:[
              {text: 'Email: ' , fontSize: 12, bold: true},
              {text: `${this.dataPrint.user.email}` , fontSize: 12}
            ],lineHeight:2
          },
        ).listType('none').end,
        new Item(
          { 
            text:[
              {text: 'Teléfonos: ' , fontSize: 12, bold: true},
              {text: `${this.dataPrint.user.account.phone_one} / ${this.dataPrint.user.account.phone_two}` , fontSize: 12}
            ],lineHeight:2
          },
        ).listType('none').end,
        new Item(
          { 
            text:[
              {text: 'Dirección: ' , fontSize: 12, bold: true},
              {text: `${this.dataPrint.user.account.address_one} - ${this.dataPrint.user.account.neighborhood.name} - ${this.dataPrint.user.account.neighborhood.city.name}` , fontSize: 12}
            ],lineHeight:2
          },
        ).listType('none').end,
    ]).end;

    /////CURSO
    const titleCourse = new Txt('Curso').bold().fontSize(14).margin([0,30,0,10]).end
    const course = new Ul([
      new Item(
        { 
          text:[
            {text: `${this.dataPrint.courses[0].title}` , fontSize: 12, bold: true}
          ],lineHeight:2
        },
      ).listType('none').end,
      new Item(
        { 
          text:[
            {text: 'Inicio: ' , fontSize: 12, bold:true},
            {text: `${moment(this.dataPrint.courses[0].date_ini).format('DD/MM/YYYY')}` , fontSize: 12}
          ],lineHeight:2
        },
      ).listType('none').end,
      new Item(
        new Txt('Horarios: ').bold().end,
      ).listType('none').end,      
      new Item(
          new Ul(this.schedules).end
      ).listType('none').end,
    ]).end;



    pdf.add(date)
    pdf.add(title);
    pdf.add(titleCourse);
    pdf.add(course)
    
    pdf.add(titleUser);
    pdf.add(user);

    pdf.footer(
      new Txt('On Capacitaciones - Av. Giannattasio Km 18.200 M.G S.102 - Tel.(+598) 2681 8368').alignment('center').fontSize(10).end
    )
      

    pdf.styles({

    })

     
    pdf.create().print();


  }




}
