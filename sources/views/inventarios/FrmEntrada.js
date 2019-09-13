import { JetView } from "webix-jet";
import { FrmBase } from "views/FrmBase";
import { conceptos } from "models/catalogos/conceptos";
import { articulos } from "models/catalogos/articulos";
import { almacenes } from "models/catalogos/almacenes";
import { movimientosES } from "models/inventarios/movimientosES";

export class FrmEntrada extends FrmBase {
    constructor(app, name) {
        //Genera un idetificador unico para la ventana con el 
        //objetivo de poder generar varias instancias
        let id = new Date().getTime();

        let collection = new webix.DataCollection({
            data: []
        });

        let form = {
            title: "Entrada",
            width: 750,
            elements: [
                { view: "text", name: "_id", hidden: true },
                {
                    cols: [{
                            rows: [{
                                    cols: [
                                        { view: "datepicker", id: "Fecha" + id, label: "Fecha", labelWidth: 50, name: "Fecha", stringResult: true, format: "%d  %M %Y", value: new Date() },
                                        { view: "text", id: "Folio", name: "Folio", labelWidth: 50, label: "Folio" },
                                    ]
                                },
                                {
                                    view: "combo",
                                    name: "Concepto._id",
                                    labelWidth: 50,
                                    id: "cmbConcepto" + id,
                                    label: "Concepto",
                                    options: {
                                        body: {
                                            template: "#Nombre#",
                                            dataFeed: function(text) {
                                                let concepto = new conceptos("ENTRADA");
                                                this.load(concepto.searchXNaturaleza(text));
                                            }
                                        }
                                    }
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
                                },
                            ],
                        },
                        {
                            rows: [
                                { view: "textarea", height: 112, name: "Descripcion", label: "Descripción:", labelPosition: "top" }
                            ]
                        }
                    ]

                },
                {
                    view: "datatable",
                    id: "gridArticulos" + id,
                    height: 300,
                    width: 500,
                    resizeColumn: true,
                    resizeRow: true,
                    select: "cell",
                    //editaction: "none",
                    columns: [
                        { id: "Clave", editor: "text", header: "Clave", css: "Clave", width: 90, css: { "text-align": "center" } },
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
                                        let articulo = new articulos();
                                        this.load(articulo.searchCombo(text));
                                    }
                                }
                            }
                        },
                        { id: "Cantidad", editor: "text", header: "Cantidad", format: webix.i18n.numberFormat, width: 100, css: { "text-align": "center" } },
                        { id: "Unidad", header: "Unidad", width: 70, css: { "text-align": "center" } },
                        { id: "Costo", editor: "text", header: "Costo", format: webix.i18n.priceFormat, width: 100, css: { "text-align": "center" } },
                        { id: "CostoTotal", header: "Costo Total", format: webix.i18n.priceFormat, width: 100, css: { "text-align": "center" } }
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
                "Concepto._id": webix.rules.isNotEmpty,
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

        $$("cmbConcepto" + this.id).attachEvent("onChange", (newv, oldv) => {
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
        });


        this.$$("gridArticulos" + this.id).attachEvent("onAfterEditStop", function(state, editor) {

            var column = editor.config;

            /*console.log(self.CostoAutomatico);
            if (self.CostoAutomatico == "SI")
                this.getItem(editor.row)["Clave"].disable(true);*/

            if (editor.column == "Articulo") {
                var item = editor.getPopup().getList().getItem(state.value);
                if (item == undefined)
                    return;

                console.log("row " + editor.row);
                this.getItem(editor.row)["Clave"] = item.Clave;
                this.getItem(editor.row)["Unidad"] = item.UnidadInventario.Abreviatura;

            } else if (editor.column == "Cantidad" || editor.column == "Costo") {
                if (this.getItem(editor.row)["Cantidad"] == undefined || this.getItem(editor.row)["Costo"] == undefined)
                    return;

                let Costo = this.getItem(editor.row)["Cantidad"] * this.getItem(editor.row)["Costo"];
                this.getItem(editor.row)["CostoTotal"] = Costo;
            } else if(editor.column == "Clave") {

                console.log(this.getItem(editor.row)["Clave"]);

                if(this.getItem(editor.row)["Clave"]==undefined || this.getItem(editor.row)["Clave"]=="")
                    return;

                let articulo = new articulos();

                self.showProgressBar();

                articulo.searchArticuloCodigo(this.getItem(editor.row)["Clave"]).then((realdata) => {
                    //console.log(realdata.json());

                    let element =realdata.json();
                    console.log(element);
                    console.log(element.Activo);
                    $$("gridArticulos" + self.id).config.columns[1].collection.add(element);

                    setTimeout(()=>{ 
                        console.log("entro");
                        console.log(editor);
                        this.getItem(editor.row)["Articulo"] = element._id;
                        this.getItem(editor.row)["Unidad"] = element.UnidadInventario.Abreviatura;

                        $$("gridArticulos" + self.id).refresh();
                    }, 50);
        
                    self.hiddenProgressBar();
                }).fail((error) => {
                    webix.alert({
                        type: "alert-error",
                        text: "Error: " + error.statusText
                    }).then((result) => {
                        //$$(self.Ventana).close();
                        self.hiddenProgressBar();
                    });
                });
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

        /*this.$$("gridArticulos" + this.id).attachEvent("onBeforeEditStart", function(cell) {
            if (cell.column === "Costo" && self.CostoAutomatico == "SI") {
                return false;
            }
        });*/

        this.$$("gridArticulos" + this.id).attachEvent("onKeyPress", function(code, e) {
            if (code == 46) {
                console.log("eliminar");
                let id = $$("gridArticulos" + self.id).getSelectedId();
                if (id) $$("gridArticulos" + self.id).remove(id);

            } else if (code == 13) {
                var editor = this.getEditor();
                setTimeout(function() {
                    //grid.editCell(editor.row, "Cantidad");
                    if (editor.column == "Costo" && editor.row == grid.getLastId()) {
                        grid.add({});
                    }
                    if (editor.column == "Cantidad" && editor.row == grid.getLastId() && self.CostoAutomatico == "SI") {
                        grid.add({});
                    }
                    if(editor.column=="Clave")
                    {
                        grid.editCell(editor.row, "Cantidad");
                        return;
                    }
                    grid.editNext(true, editor);
                }, 50);
            }
        });
    }
    guardar() {
        console.log($$("gridArticulos" + this.id).validate());
        if (!$$("gridArticulos" + this.id).validate()) return;

        let data = this.$$(this.Formulario).getValues();
        console.log(this.$$(this.Formulario).getValues());

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