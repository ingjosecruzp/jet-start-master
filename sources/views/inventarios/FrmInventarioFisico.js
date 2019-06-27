import { JetView } from "webix-jet";
import { FrmBase } from "views/FrmBase";
import { conceptos } from "models/catalogos/conceptos";
import { articulos } from "models/catalogos/articulos";
import { almacenes } from "models/catalogos/almacenes";
import { movimientosES } from "models/inventarios/movimientosES";

export class FrmInventarioFisico extends FrmBase {
    constructor(app, name) {
        //Genera un idetificador unico para la ventana con el 
        //objetivo de poder generar varias instancias
        let id = new Date().getTime();

        let collection = new webix.DataCollection({
            data: []
        });

        let form = {
            title: "Inventario Físico",
            width: 750,
            elements: [
                { view: "text", name: "_id", hidden: true },
                {
                    cols: [{
                            rows: [{
                                    cols: [
                                        { view: "datepicker", id: "Fecha" + id, label: "Fecha", labelWidth: 50, name: "Fecha", stringResult: true, format: "%d  %M %Y", value: new Date() },
                                        { view: "text", id: "Folio", name: "Folio", labelWidth: 50, label: "Folio" , disabled: true},
                                    ]
                                },
                                {
                                    view: "combo",
                                    name: "Almacen._id",
                                    labelWidth: 50,
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
                            rows: [
                                { view: "textarea", height: 75, name: "Descripcion", label: "Descripción:", labelPosition: "top" }
                            ]
                        }
                    ]

                },
                {
                    view: "datatable",
                    id: "gridArticulos" + id,
                    height: 400,
                    width: 500,
                    select: "cell",
                    editaction: "custom",
                    /*on:{
                        onAfterSelect: function (data,prevent) {
                            console.log(data);
                            console.log(prevent);
                            this.editCell(data.row, data.column);
                        }
                    },*/
                    //editaction: "none",
                    columns: [
                        { id: "Clave", header: "Clave", css: "Clave", width: 70, css: { "text-align": "center" } },
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
                        { id: "Existencia", editor: "text", header: "Existencia", format: webix.i18n.numberFormat, width: 100, css: { "text-align": "center" } },
                        { id: "Unidad", header: "Unidad", width: 70, css: { "text-align": "center" } }
                    ],
                    rules: {
                        //   $all: webix.rules.isNotEmpty
                    },
                    liveValidation: true,
                    editable: true,
                    //autowidth: true,
                    data: [{}]
                }
            ],
            rules: {
                //$all: webix.rules.isNotEmpty,
                //"Folio": webix.rules.isNotEmpty,
                "Almacen._id": webix.rules.isNotEmpty,
                "Fecha": webix.rules.isNotEmpty
            }
        };

        let movimientoES = new movimientosES();

        super(app, name, form, movimientoES, id);
    }
    init(view) {
        webix.extend($$(this.Ventana), webix.ProgressBar);
        let CostoAutomatico;
        let grid = $$("gridArticulos" + this.id);

        this.LstArticulos = [];
        let self = this;

        /*$$("cmbConcepto" + this.id).attachEvent("onChange", (newv, oldv) => {
            setTimeout(() => {
                let concepto = $$("cmbConcepto" + self.id).getPopup().getList().getItem(newv);

                self.CostoAutomatico = concepto.CostoAutomatico;

                if (self.CostoAutomatico == "SI" && this._id == undefined) {
                    grid.hideColumn("Costo");
                    grid.hideColumn("CostoTotal");
                } else if (self.CostoAutomatico == "" && this._id == undefined) {
                    grid.showColumn("Costo");
                    grid.showColumn("CostoTotal");
                }

                if (concepto.FolioAutomatico == "SI") {
                    if (this._id == undefined)
                        $$("Folio").setValue("");
                    $$("Folio").disable(true);
                } else {
                    $$("Folio").enable(true);
                }
            }, 50);
        });*/
        webix.UIManager.addHotKey("enter", function(view){
            console.log("entro enter");
            var pos = view.getSelectedId();
            view.edit(pos);
        }, this.$$("gridArticulos" + this.id));


        this.$$("gridArticulos" + this.id).attachEvent("onAfterEditStop", function(state, editor) {

            var column = editor.config;

            /*console.log(self.CostoAutomatico);
            if (self.CostoAutomatico == "SI")
                this.getItem(editor.row)["Clave"].disable(true);*/

            if (editor.column == "Articulo") {
                var item = editor.getPopup().getList().getItem(state.value);

                if (item == undefined)
                    return;

                this.getItem(editor.row)["Clave"] = item.Clave;
                this.getItem(editor.row)["Unidad"] = item.UnidadInventario.Abreviatura;

            } else if (editor.column == "Cantidad" || editor.column == "Costo") {
                if (this.getItem(editor.row)["Cantidad"] == undefined || this.getItem(editor.row)["Costo"] == undefined)
                    return;

                let Costo = this.getItem(editor.row)["Cantidad"] * this.getItem(editor.row)["Costo"];
                this.getItem(editor.row)["CostoTotal"] = Costo;
            }

        });

        this.$$("gridArticulos" + this.id).attachEvent("onBeforeEditStop", function(change, editor) {
            var column = editor.config;

            if (column.editor == "combo" && column.collection) {
                var item = editor.getPopup().getList().getItem(change.value);
                try {
                    if (item == undefined) return;

                    if (!column.collection.exists(item.id)) {
                        column.collection.add(item);
                        self.LstArticulos = column.collection;
                    }
                } catch (err) {
                    console.log(err);
                }
            }
        });

        this.$$("gridArticulos" + this.id).attachEvent("onKeyPress", function(code, e) {
            if (code == 46) {
                console.log("eliminar");
                let id = $$("gridArticulos" + self.id).getSelectedId();
                if (id) $$("gridArticulos" + self.id).remove(id);
            } else if (code == 13) {
                var editor = this.getEditor();
                setTimeout(function() {
                    if (editor.column == "Existencia" && editor.row == grid.getLastId()) {
                        grid.add({});
                    }
                    //grid.editNext(true, editor);
                }, 50);
            }
        });
    }
    guardar() {
        console.log($$("gridArticulos" + this.id).validate());
        if (!$$("gridArticulos" + this.id).validate()) return;

        let data = this.$$(this.Formulario).getValues();

        data.Fecha = this.convertToJSONDate(data.Fecha);

        let Detalles_ES = [];

        //Obtiene los valores del grid
        $$("gridArticulos" + this.id).eachRow((row) => {
            let record = $$("gridArticulos" + this.id).getItem(row);
            //record.Articulo = this.LstArticulos.getItem(record.Articulo);

            //Se crea el objecto articulo el cual se añadira al movimiento
            if (record.Articulo != undefined) {
                let articulo = {
                    Articulo: {
                        _id: record.Articulo
                    },
                    Cantidad: record.Cantidad,
                    Clave: record.Clave,
                    Costo: record.Costo,
                    CostoTotal: record.CostoTotal,
                    Unidad: null
                };

                Detalles_ES.push(articulo);
            }
        });

        data.Detalles_ES = Detalles_ES;
        console.log(data);

        super.guardar(data);
    }
    cargarCombos(data) {
        //this.cargarCombo(this.$$("cmbConcepto" + this.id), data.TipoConcepto);

        $$("Fecha" + this.id).setValue(this.convertToDate(data.Fecha));

        this.cargarCombo($$("cmbConcepto" + this.id), data.Concepto);
        this.cargarCombo($$("cmbAlmacen" + this.id), data.Almacen);

        if (data.Almacen_Destino != undefined)
            console.log("vacio");

        $$("gridArticulos" + this.id).clearAll();

        data.Detalles_ES.forEach(element => {
            $$("gridArticulos" + this.id).config.columns[1].collection.add(element.Articulo);

            let articulo = {
                Clave: element.Clave,
                Articulo: element.Articulo._id,
                Cantidad: element.Cantidad,
                Unidad: element.Articulo.UnidadInventario.Abreviatura,
                Costo: element.Costo,
                CostoTotal: element.CostoTotal,
            }

            $$("gridArticulos" + this.id).add(articulo);
        });
    }
}