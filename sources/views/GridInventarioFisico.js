import { JetView } from "webix-jet";
import { inventariofisico } from "models/inventarios/inventariofisico";
import { GridBase } from "views/GridBase";
import { FrmInventarioFisico } from "views/inventarios/FrmInventarioFisico"

export default class GridInventarioFisico extends GridBase {
    constructor(app, name) {          
        let columns = [
            { id: "_id", fillspace: true, hidden: true },
            { id: "Fecha",MongoField:"Fecha",template: (obj) => { return this.convertToDate(obj.Fecha) }, header: ["Fecha", { content: "textFilter" }], width: 150 },
            { id: "Folio",MongoField:"Folio", header: ["Folio", { content: "textFilter" }], width: 80 },
            { id: "Almacen",MongoField:"Almacen.Nombre", template: (obj) => { return obj.Almacen.Nombre }, header: ["Almacen", { content: "textFilter" }] ,width: 150 },
            { id: "Estado",MongoField:"Estado", header: ["Estado", { content: "textFilter" }], width: 150 },
            { id: "Descripcion",MongoField:"Descripcion", header: ["Descripcion", { content: "textFilter" }], fillspace: true }
        ];

        let inventario = new inventariofisico();

        super(app, name, columns, inventario);
    }
    init(view) {
        let self= this;

        //Se crea el context Menu
        var menu = this.ui({
            view:"contextmenu",
            data:["Aplicar Invetario"],
            on:{
              onItemClick:function(id){
                //webix.message(this.getItem(id).value);
                var context = this.getContext();

                let idToma=context.obj.getItem(context.id)._id;
                let folio=context.obj.getItem(context.id).Folio;

                webix.confirm({
                    title: "Inventario",
                    ok: "Si",
                    cancel: "No",
                    text: "¿Estas seguro de aplicar la toma de inventario con folio: "+ folio +" ?",
                    callback: (result) => {
                        if (result == false)
                            return;
    
                        self.showProgressBar();
    
                        self.Modelo.aplicarInventario(idToma).then((realdata) => {
                            let dataServer = realdata.json();
    
                            self.hiddenProgressBar();
    
                           console.log(dataServer);
    
                        }).fail((error) => {
                            webix.alert({
                                type: "alert-error",
                                text: "Error: " + error.statusText
                            });
                            self.hiddenProgressBar();
                        });;
    
                        return false; //here it blocks default behavior
                    }
                });
              }
            }
        });

        menu.attachTo(this.$$(this.Grid));

        //Agrega el icono de cargando
        webix.extend($$(this.Grid), webix.ProgressBar);

        this.$$(this.Grid).attachEvent("onItemDblClick", (id, e, node) => {
            var item = $$(this.Grid).getItem(id);

            console.log("double click");
            this.FrmInventarioFisico = this.ui(FrmInventarioFisico);
            this.FrmInventarioFisico.showWindow(item._id);
        });

        super.init(view);
    }
    showProgressBar() {
        $$(this.Grid).showProgress({
            type: "icon",
            delay: 3000
        });
        $$(this.Grid).disable();
    }
    hiddenProgressBar() {
        $$(this.Grid).enable();
        $$(this.Grid).hideProgress();
    }
}