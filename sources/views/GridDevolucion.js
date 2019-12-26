import { JetView } from "webix-jet";
import { puntoVenta } from "models/pventa/puntoVenta";
import { GridBase } from "views/GridBase";
import { FrmDevolucion } from "views/pventa/FrmDevolucion"
import { FrmCancelacionNormal } from "views/cancelaciones/FrmCancelacionNormal"

export default class GridDevolucion extends GridBase {
    constructor(app, name) {          
        let columns = [
            { id: "_id", fillspace: true, hidden: true },
            { id: "Folio",MongoField:"Folio", header: ["Folio", { content: "textFilter" }], width: 150},
            { id: "Fecha",MongoField:"Fecha",template: (obj) => { return this.convertToDate(obj.Fecha) }, header: ["Fecha", { content: "textFilter" }], width: 150 },
            { id: "Estado",MongoField:"Estatus",template: (obj) => { return obj.Estatus == "N" ? "VENDIDO" : obj.Estatus }, header: ["Estado", { content: "textFilter" }], fillspace: true},
            { id: "TotalVenta",MongoField:"TotalVenta",template: (obj) => { return webix.i18n.priceFormat(obj.TotalVenta) }, header: ["Total de la Venta", { content: "textFilter" }], width: 150 },
        ];

        let puntodeventa = new puntoVenta();

        super(app, name, columns, puntodeventa);
    }
    init(view) {
        let self= this;

        webix.extend($$(this.Grid), webix.ProgressBar);
        //Se crea el context Menu
        var menu = this.ui({
            view:"contextmenu",
            data:["Aplicar Devolución",{ $template:"Separator" }, "Cancelar ticket"],
            on:{
              onItemClick:function(id){
                //webix.message(this.getItem(id).value);
                var context = this.getContext();

                let idToma = context.obj.getItem(context.id)._id;
                let folio  = context.obj.getItem(context.id).Folio;

                if(this.getItem(id).value == "Cancelar ticket"){
                    webix.confirm({
                        title: "Cancelación",
                        ok: "Si",
                        cancel: "No",
                        text: "¿Estas seguro de cancelar la compra con folio: "+ folio +"?",
                        callback: (result) => {
                            if (result == false)
                                return;
        
                            self.FrmCancelacionNormal = self.ui(FrmCancelacionNormal);
                            self.FrmCancelacionNormal.showWindow(idToma);
                                
                            return false; //here it blocks default behavior
                        }
                    });
                }else{
                    webix.confirm({
                        title: "Devolución",
                        ok: "Si",
                        cancel: "No",
                        text: "¿Estas seguro de aplicar la devolución de la compra con folio: "+ folio +"?",
                        callback: (result) => {
                            if (result == false)
                                return;
        
                            self.FrmDevolucion = self.ui(FrmDevolucion);
                            self.FrmDevolucion.showWindow(idToma);
                                
                            return false; //here it blocks default behavior
                        }
                    });
                }
              }
            }
        }, 
        {
            view:"contextmenu",
            data:["Cancelar ticket"],
            on:{
              onItemClick:function(id){
                //webix.message(this.getItem(id).value);
                var context = this.getContext();

                let idToma = context.obj.getItem(context.id)._id;
                let folio  = context.obj.getItem(context.id).Folio;

                
              }
            }
        });

        menu.attachTo(this.$$(this.Grid));
      
        super.init(view);
    }
}