(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{U5Jw:function(e,t,a){"use strict";a.r(t),a.d(t,"CategoriesModule",(function(){return F}));var i=a("SVse"),o=a("iInd"),r=a("5QHs"),s=a("GH7h"),c=a("lJxs"),n=a("IzEk"),l=a("s7LF"),d=a("8Y7J"),b=a("FUhj"),u=a("iELJ"),p=a("c2LI"),g=a("GDfQ"),h=a("PDjf"),m=a("Dxy4"),v=a("Tj54"),C=a("JhQZ"),f=a("lkLn");const y=function(){return[20,50,100]},S=[{path:"",component:(()=>{class e{constructor(e,t,a,i){this.categoriesService=e,this.dialog=t,this.statusService=a,this.iconsService=i,this.columns=[{title:"ID",col:"id"},{title:"Nombre",col:"name"},{title:"Descripci\xf3n",col:"description"},{title:"Color",col:"color"}],this.pageDefault=1,this.perPage=10,this.orden="desc",this.filter="",this.result=this.categoriesService.resultItems$}ngOnInit(){this.getCategories(this.pageDefault,this.perPage,this.filter,this.orden),this.iconsService.getDataIcons().subscribe(e=>console.log(e))}paginatorChange(e){console.log(e),this.getCategories(e.pageIndex+1,e.pageSize)}getCategories(e,t,a,i){this.subscroption=this.categoriesService.getCategories(e,t,a,i).subscribe(e=>this.loadData())}loadData(){this.dataSource=this.result.pipe(Object(c.a)(e=>e.data.data.map(e=>({id:e.id,name:e.name,description:e.description,color:e.color,ico:e.ico,image:e.image})))),this.totalResut=this.result.pipe(Object(c.a)(e=>e.data.total))}search(e){this.getCategories(this.pageDefault,this.perPage,e,this.orden)}deleteItem(e){return this.categoriesService.deleteCategory(e)}itemAction(e){console.log(e),"delete"===e.action&&this.deleteItem(e.element.id).pipe(Object(n.a)(1)).subscribe(e=>console.log(e)),"edit"===e.action&&this.openDialog(e.element)}ngOnDestroy(){this.subscroption.unsubscribe()}add(){}openDialog(e){return this.dialog.open(s.a,{width:"850px",data:this.setFields(e)}).afterClosed().subscribe(e=>{e&&(e.id?this.updateCategory(e):this.storeCategory(e))})}setFields(e){return[{nameControl:"id",type:"hidden",value:null==e?void 0:e.id,label:"Id"},{nameControl:"name",type:"text",value:null==e?void 0:e.name,label:"Nombre",validators:[l.G.required]},{nameControl:"color",type:"color",value:null==e?void 0:e.color,label:"Color",validators:[l.G.required]},{nameControl:"ico",type:"select_ico",value:null==e?void 0:e.ico,label:"Icono"},{nameControl:"description",type:"textarea",value:null==e?void 0:e.description,label:"Descripci\xf3n"}]}storeCategory(e){this.categoriesService.storeCategory(e).pipe(Object(n.a)(1)).subscribe(e=>{console.log(e)})}updateCategory(e){this.categoriesService.updateCategory(e).pipe(Object(n.a)(1)).subscribe(e=>{console.log(e)})}}return e.\u0275fac=function(t){return new(t||e)(d.Ob(b.a),d.Ob(u.b),d.Ob(p.a),d.Ob(g.a))},e.\u0275cmp=d.Ib({type:e,selectors:[["mvd-categories"]],viewQuery:function(e,t){var a;1&e&&d.zc(r.a,!0),2&e&&d.pc(a=d.cc())&&(t.paginator=a.first)},decls:22,vars:11,consts:[[1,"card","mat-elevation-z16","animate__animated","animate__slideInRight"],[1,"actions"],["mat-flat-button","","color","primary",3,"click"],[1,"material-icons-round"],["mat-flat-button","","color","","disabled","",1,"btn-simple"],[3,"noteFilterBy","changeSearch"],[3,"columns","dataSource","actionChange"],["showFirstLastButtons","",3,"length","pageSize","pageSizeOptions","page"],[1,"border"]],template:function(e,t){1&e&&(d.Ub(0,"mat-card",0),d.Ub(1,"mat-card-header"),d.Ub(2,"mat-card-title"),d.Fc(3,"Categorias"),d.Tb(),d.Ub(4,"mat-card-subtitle"),d.Fc(5,"Administrar Categoria"),d.Tb(),d.Ub(6,"div",1),d.Ub(7,"button",2),d.bc("click",(function(){return t.openDialog()})),d.Ub(8,"mat-icon",3),d.Fc(9,"add"),d.Tb(),d.Fc(10," Crear "),d.Tb(),d.Ub(11,"button",4),d.Ub(12,"mat-icon",3),d.Fc(13,"save_alt"),d.Tb(),d.Fc(14," Exportar "),d.Tb(),d.Tb(),d.Ub(15,"mvd-input-search",5),d.bc("changeSearch",(function(e){return t.search(e)})),d.Tb(),d.Tb(),d.Ub(16,"mat-card-content"),d.Ub(17,"mvd-data-table",6),d.bc("actionChange",(function(e){return t.itemAction(e)})),d.gc(18,"async"),d.Tb(),d.Ub(19,"mat-paginator",7),d.bc("page",(function(e){return t.paginatorChange(e)})),d.gc(20,"async"),d.Tb(),d.Tb(),d.Pb(21,"span",8),d.Tb()),2&e&&(d.Cb(15),d.lc("noteFilterBy","Filtra por Nombre"),d.Cb(2),d.lc("columns",t.columns)("dataSource",d.hc(18,6,t.dataSource)),d.Cb(2),d.lc("length",d.hc(20,8,t.totalResut))("pageSize",t.perPage)("pageSizeOptions",d.mc(10,y)))},directives:[h.a,h.f,h.m,h.l,m.b,v.a,C.a,h.d,f.a,r.a],pipes:[i.b],styles:[""]}),e})()}];let D=(()=>{class e{}return e.\u0275mod=d.Mb({type:e}),e.\u0275inj=d.Lb({factory:function(t){return new(t||e)},imports:[[o.f.forChild(S)],o.f]}),e})();var U=a("PCNd");let F=(()=>{class e{}return e.\u0275mod=d.Mb({type:e}),e.\u0275inj=d.Lb({factory:function(t){return new(t||e)},imports:[[i.c,D,U.a]]}),e})()}}]);