import { Component, OnInit,Input, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Order } from 'src/app/pages/payments/interfaces/order';


// import { PdfMakeWrapper } from 'pdfmake-wrapper';
// import pdfFonts from "pdfmake/build/vfs_fonts";
// import { Ul,Item, Txt } from 'pdfmake-wrapper';
// import moment from 'moment';
// import * as html2PDF from 'html2pdf.js';
import html2canvas from 'html2canvas';
import jspdf from 'jspdf';




@Component({
  selector: 'mvd-order-pdf',
  templateUrl: './order-pdf.component.html',
  styleUrls: ['./order-pdf.component.scss']
})
export class OrderPdfComponent implements OnInit, AfterViewInit {
 @Input() dataPrint: Order
  schedules: any[];
 @ViewChild('container') container: ElementRef


  hidden: boolean = false;

  constructor(
  ) { }

  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    // this.exportAs('pdf')
    // setTimeout(() => {
    //   this.downloadPDF()
    // }, 100);
    // this.orderPDF()
    if(this.dataPrint){
      this.downloadPDF()
    }
  }

  


  downloadPDF() {
    // Extraemos el
    const DATA = this.container.nativeElement;
    const doc = new jspdf('p', 'pt', 'a4');
    const options = {
      background: 'white',
      scale: 3,
      margin:[],
    };
    html2canvas(DATA, options).then((canvas) => {
      console.log(canvas);
      
      const img = canvas.toDataURL('image/PNG');

      // Add image Canvas to PDF
      const bufferX = 30;
      const bufferY = 100;
      const imgProps = (doc as any).getImageProperties(img);
      const pdfWidth = doc.internal.pageSize.getWidth() -2 * bufferX;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight);
      return doc;
    }).then((docResult) => {
      docResult.autoPrint();
      window.open(docResult.output('bloburl'), '_blank');
      this.hidden = true;
      // docResult.save(`comp_or_${this.dataPrint.id}`);
    });
  }
    

    dateVencimiento(date){
      var e = new Date(date)
          e.setMonth(e.getMonth() + 1)
          console.log(e);
          
          return e;
    }
  } 



  // exportAs(type: SupportedExtensions, opt?: string) {
  //   this.config.type = type;
  //   if (opt) {
  //     this.config.options.jsPDF.orientation = opt;
  //   }
  //   // this.exportAsService.output()
  //   this.exportAsService.get(this.config).subscribe(content => {
  //     const link = document.createElement('a');
  //     const fileName = 'export.pdf';
  //     window.open(content, '_blank')
  //     // link.href = content;
  //     // link.download = fileName;
  //     // link.click();
  //     // console.log(content);
  //   });
  // }

  // orderPDF() {
  //   // Extraemos el
  //   this.schedules = this.dataPrint.courses[0].schedules.map(v=>{
  //     return new Item( {text: `${v.day} de ${v.h_ini} a ${v.h_end}` , fontSize: 12,lineHeight:2}).listType('none').end
  //   })

    
  //   PdfMakeWrapper.setFonts(pdfFonts);
  //   const pdf = new PdfMakeWrapper();
  //   pdf.pageSize('A4');
  //   pdf.pageOrientation('portrait');
  //   pdf.pageMargins([ 40, 100, 40, 20 ])


  //   const date = new Txt(moment(this.dataPrint.created_at).locale('es').format('LL')).alignment('right').fontSize(10).margin([0,0,0,0]).end
  //   const title = new Txt('Detalle Incripción').bold().fontSize(16).margin([0,0,0,30]).end
  //   ///RESPONSABLE
  //   const titleResponsable = new Txt('Responsable Legal').bold().fontSize(14).margin([0,0,0,10]).end
  //   const responsable = new Ul([
  //       new Item(
  //         { 
  //           text:[
  //             {text: 'Nombre: ' , fontSize: 12, bold: true},
  //             {text: `${this.dataPrint.name}` , fontSize: 12},
  //             {text: 'Apellido: ' , fontSize: 12, bold: true, margin:[10,10,10,10]},
  //             {text: `${this.dataPrint.last_name}` , fontSize: 12}
  //           ],lineHeight:1
  //         },
  //       ).listType('none').end,
  //       new Item(
  //         { 
  //           text:[
  //             {text: 'Documento: ' , fontSize: 12, bold: true},
  //             {text: `${this.dataPrint.type_doc_iden} ${this.dataPrint.n_doc_iden}` , fontSize: 12}
  //           ],lineHeight:2
  //         },
  //       ).listType('none').end,
  //       new Item(
  //         { 
  //           text:[
  //             {text: 'Email: ' , fontSize: 12, bold: true},
  //             {text: `${this.dataPrint.email}` , fontSize: 12}
  //           ],lineHeight:2
  //         },
  //       ).listType('none').end,
  //       new Item(
  //         { 
  //           text:[
  //             {text: 'Teléfonos: ' , fontSize: 12, bold: true},
  //             {text: `${this.dataPrint.phone_one}` , fontSize: 12}
  //           ],lineHeight:2
  //         },
  //       ).listType('none').end,
  //       new Item(
  //         { 
  //           text:[
  //             {text: 'Dirección: ' , fontSize: 12, bold: true},
  //             {text: `${this.dataPrint.address_one}` , fontSize: 12}
  //           ],lineHeight:2
  //         },
  //       ).listType('none').end,
  //   ]).end;


  //   ///ALUMNO
  //   const titleUser = new Txt('Alumno').bold().fontSize(14).margin([0,0,0,10]).end
  //   const user = new Ul([
  //       new Item(
  //         { 
  //           text:[
  //             {text: 'Nombre: ' , fontSize: 12, bold: true},
  //             {text: `${this.dataPrint.user.name} ${this.dataPrint.user.last_name}` , fontSize: 12}
  //           ],lineHeight:2
  //         },
  //       ).listType('none').end,
  //       new Item(
  //         { 
  //           text:[
  //             {text: 'Documento: ' , fontSize: 12, bold: true},
  //             {text: `${this.dataPrint.user.account.type_doc_iden} ${this.dataPrint.user.account.n_doc_iden}` , fontSize: 12}
  //           ],lineHeight:2
  //         },
  //       ).listType('none').end,
  //       new Item(
  //         { 
  //           text:[
  //             {text: 'Email: ' , fontSize: 12, bold: true},
  //             {text: `${this.dataPrint.user.email}` , fontSize: 12}
  //           ],lineHeight:2
  //         },
  //       ).listType('none').end,
  //       new Item(
  //         { 
  //           text:[
  //             {text: 'Teléfonos: ' , fontSize: 12, bold: true},
  //             {text: `${this.dataPrint.user.account.phone_one} / ${this.dataPrint.user.account.phone_two}` , fontSize: 12}
  //           ],lineHeight:2
  //         },
  //       ).listType('none').end,
  //       new Item(
  //         { 
  //           text:[
  //             {text: 'Dirección: ' , fontSize: 12, bold: true},
  //             {text: `${this.dataPrint.user.account.address_one} - ${this.dataPrint.user.account.neighborhood.name} - ${this.dataPrint.user.account.neighborhood.city.name}` , fontSize: 12}
  //           ],lineHeight:2
  //         },
  //       ).listType('none').end,
  //   ]).end;

  //   /////CURSO
  //   const titleCourse = new Txt('Curso').bold().fontSize(14).margin([0,30,0,10]).end
  //   const course = new Ul([
  //     new Item(
  //       { 
  //         text:[
  //           {text: `${this.dataPrint.courses[0].title}` , fontSize: 12, bold: true}
  //         ],lineHeight:2
  //       },
  //     ).listType('none').end,
  //     new Item(
  //       { 
  //         text:[
  //           {text: 'Inicio: ' , fontSize: 12, bold:true},
  //           {text: `${moment(this.dataPrint.courses[0].date_ini).format('DD/MM/YYYY')}` , fontSize: 12}
  //         ],lineHeight:2
  //       },
  //     ).listType('none').end,
  //     new Item(
  //       new Txt('Horarios: ').bold().end,
  //     ).listType('none').end,      
  //     new Item(
  //         new Ul(this.schedules).end
  //     ).listType('none').end,
  //   ]).end;



  //   pdf.add(date)
  //   pdf.add(title);
  //   pdf.add(titleResponsable);
  //   pdf.add(responsable);
  //   pdf.add(titleUser);
  //   pdf.add(user);
  //   pdf.add(titleCourse);
  //   pdf.add(course)
    

  //   pdf.footer(
  //     new Txt('On Capacitaciones - Av. Giannattasio Km 18.200 M.G S.102 - Tel.(+598) 2681 8368').alignment('center').fontSize(10).end
  //   )
      

  //   pdf.styles({

  //   })

     
  //   pdf.create().print();


  // }





