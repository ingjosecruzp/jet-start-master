import { JetView } from "webix-jet";
import { FrmBase } from "views/FrmBase";
import { conceptos } from "models/catalogos/conceptos";
import { articulos } from "models/catalogos/articulos";
import { almacenes } from "models/catalogos/almacenes";
import { puntoVenta } from "models/pventa/puntoVenta";

export class FrmDevolucion extends FrmBase {
    constructor(app, name) {
        //Genera un idetificador unico para la ventana con el 
        //objetivo de poder generar varias instancias
        let id = new Date().getTime();

        let collection = new webix.DataCollection({
            data: []
        });

        let form = {
            title: "Devolución de compra",
            width: 750,
            elements: [
                { view: "text", name: "_id", hidden: true },
                {
                    cols: [{
                            rows: [{
                                    cols: [
                                        { view: "datepicker", id: "Fecha" + id, disabled: true, label: "Fecha", labelWidth: 50, name: "Fecha", stringResult: true, format: "%d  %M %Y", value: new Date() },
                                        { view: "text", id: "Folio" + id, name: "Folio", labelWidth: 50, label: "Folio" , disabled: true},
                                    ]
                                },
                                {
                                    view: "combo",
                                    name: "Almacen._id",
                                    labelWidth: 50,
                                    disabled: true,
                                    id: "cmbAlmacen" + id,
                                    label: "Almacen",
                                    options: {
                                        body: {
                                            template: "#Nombre#",
                                            dataFeed: function(text) {
                                                let almacen = new almacenes();
                                                this.load(almacen.searchCombo(text));
                                            }
                                        }
                                    }
                                }
                            ],
                        },
                        {
                            rows: [{
                                    cols: [
                                        { view: "text", id: "Total" + id, name: "Total", labelWidth: 60, label: "Importe" , disabled: true},
                                        { view: "text", id: "Impuesto" + id, name: "Impuesto", labelWidth: 60, label: "Impuestos" , disabled: true},
                                    ]
                                },
                                { view: "text", id: "TotalN" + id, name: "TotalN", labelWidth: 60, label: "Total" , disabled: true},
                            ]
                        }
                    ]

                },
                {
                    view: "datatable",
                    id: "gridArticulos" + id,
                    height: 400,
                    width: 500,
                    select: "row",
                    editaction: "none",
                    /*on:{
                        onAfterSelect: function (data,prevent) {
                            console.log(data);
                            console.log(prevent);
                            this.editCell(data.row, data.column);
                        }
                    },*/
                    //editaction: "none",
                    columns: [
                        { id: "Clave", header: "Clave", css: "Clave", width: 120, css: { "text-align": "center" } },
                        {
                            id: "Articulo",
                            editor: "combo",
                            header: "Articulo",
                            fillspace: true,
                            //width: 257,
                            placeholder: "Type something... ",
                            collection: collection,
                            //select: "row",
                            //navigation: true,
                            suggest: { // suggest
                                template: "#value#",
                                body: { // list
                                    template: "#value#",
                                    dataFeed: function(text) {
                                        let LstArticulos=[];

                                        $$("gridArticulos" + id).eachRow((row) => {
                                            let record = $$("gridArticulos" + id).getItem(row);
                                        
                                            //console.log(record.Articulo);
                                            if(record.Articulo != undefined)
                                                LstArticulos.push(record.Articulo);
                                        });

                                        console.log(LstArticulos.join(','));

                                        let articulo = new articulos();
                                        //this.load(articulo.searchCombo(text));
                                        this.load(articulo.searchLimitIds(text,LstArticulos.join(',')));
                                    }
                                }
                            }
                        },
                        { id: "PrecioU", editor: "text", header: "Precio Unitario", format: webix.i18n.numberFormat, width: 100, css: { "text-align": "center" } },
                        { id: "Existencia", editor: "text", header: "Cantidad", format: webix.i18n.numberFormat, width: 100, css: { "text-align": "center" } },
                        { id: "PrecioT", editor: "text", header: "Precio", format: webix.i18n.numberFormat, width: 100, css: { "text-align": "center" } },
                    ],
                    rules: {
                        //   $all: webix.rules.isNotEmpty
                        "Existencia" : function(value){ return value > -1 }
                    },
                    liveValidation: true,
                    editable: true,
                    //autowidth: true,
                    data: [{
                        Existencia:0
                    }]
                }
            ],
            rules: {
                //$all: webix.rules.isNotEmpty,
                //"Folio": webix.rules.isNotEmpty,
                "Almacen._id": webix.rules.isNotEmpty,
                "Fecha": webix.rules.isNotEmpty
            }
        };

        let pventa = new puntoVenta();

        super(app, name, form, pventa, id);
    }
    init(view) {
        webix.extend($$(this.Ventana), webix.ProgressBar);
        let CostoAutomatico;
        let grid = $$("gridArticulos" + this.id);

        this.LstArticulos = [];
        let self = this;

        // webix.UIManager.addHotKey("enter", function(view){
        //     var pos = view.getSelectedId();
        //     view.edit(pos);
        // }, this.$$("gridArticulos" + this.id));


        // this.$$("gridArticulos" + this.id).attachEvent("onAfterEditStop", function(state, editor) {

        //     var column = editor.config;

        //     /*console.log(self.CostoAutomatico);
        //     if (self.CostoAutomatico == "SI")
        //         this.getItem(editor.row)["Clave"].disable(true);*/

        //     if (editor.column == "Articulo") {
        //         var item = editor.getPopup().getList().getItem(state.value);

        //         if (item == undefined)
        //             return;

        //         this.getItem(editor.row)["Clave"] = item.Clave;
        //         this.getItem(editor.row)["Unidad"] = item.UnidadInventario.Abreviatura;

        //     } else if (editor.column == "Cantidad" || editor.column == "Costo") {
        //         if (this.getItem(editor.row)["Cantidad"] == undefined || this.getItem(editor.row)["Costo"] == undefined)
        //             return;

        //         let Costo = this.getItem(editor.row)["Cantidad"] * this.getItem(editor.row)["Costo"];
        //         this.getItem(editor.row)["CostoTotal"] = Costo;
        //     }

        // });

        // this.$$("gridArticulos" + this.id).attachEvent("onBeforeEditStop", function(change, editor) {
        //     var column = editor.config;

        //     if (column.editor == "combo" && column.collection) {
        //         var item = editor.getPopup().getList().getItem(change.value);
        //         try {
        //             if (item == undefined) return;

        //             if (!column.collection.exists(item.id)) {
        //                 column.collection.add(item);
        //                 self.LstArticulos = column.collection;
        //             }
        //         } catch (err) {
        //             console.log(err);
        //         }
        //     }
        // });

        // this.$$("gridArticulos" + this.id).attachEvent("onKeyPress", function(code, e) {
        //     if (code == 46) {
        //         console.log("eliminar");
        //         let id = $$("gridArticulos" + self.id).getSelectedId();
        //         if (id) $$("gridArticulos" + self.id).remove(id);
        //     } else if (code == 13) {
        //         var editor = this.getEditor();
        //         setTimeout(function() {
        //             if (editor.column == "Existencia" && editor.row == grid.getLastId()) {
        //                 grid.add({
        //                     Existencia:0
        //                 });
        //             }
        //             //grid.editNext(true, editor);
        //         }, 50);
        //     }
        // });
    }
    guardar() {
        
    }

    update(data) {
        let ptovta =  new puntoVenta();
        ptovta.saveDevolucion(data).then((realdata) => {
            this.hiddenProgressBar();

            webix.alert("Guardado con exito", (result) => {
                $$(this.Ventana).close();
            });
        }).fail((error) => {
            webix.alert({
                type: "alert-error",
                text: "Error: " + error.statusText
            });
            this.hiddenProgressBar();
        });
    }
    
    cargarCombos(data) {
        //this.cargarCombo(this.$$("cmbConcepto" + this.id), data.TipoConcepto);
        $$("Fecha" + this.id).setValue(this.convertToDate(data.Fecha));
        $$("TotalN" + this.id).setValue(webix.i18n.priceFormat(data.TotalVenta));
        $$("Total" + this.id).setValue(webix.i18n.priceFormat(data.ImporteNeto));
        $$("Impuesto" + this.id).setValue(webix.i18n.priceFormat(data.TotalImpuestos));

        this.cargarCombo($$("cmbAlmacen" + this.id), data.Almacen);


        $$("gridArticulos" + this.id).clearAll();

        console.log(data.PuntoVtaDet);
        
        data.PuntoVtaDet.forEach(element => {
            $$("gridArticulos" + this.id).config.columns[1].collection.add(element.Articulo);

            let articulo = {
                Clave: element.Articulo.Clave,
                Articulo: element.Articulo._id,
                Existencia: element.Cantidad,
                PrecioU: element.PrecioUnitario,
                PrecioT: element.PrecioTotalNeto,
            }

            $$("gridArticulos" + this.id).add(articulo);
        });
    }
}