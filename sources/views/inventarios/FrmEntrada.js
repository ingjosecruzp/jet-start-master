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
                                        { view: "datepicker", label: "Fecha", labelWidth: 50, name: "Fecha", stringResult: true, format: "%d  %M %Y", value: new Date() },
                                        { view: "text", name: "Folio", labelWidth: 50, label: "Folio" },
                                    ]
                                },
                                {
                                    view: "combo",
                                    name: "Concepto.id",
                                    labelWidth: 50,
                                    id: "cmbConcepto" + id,
                                    label: "Concepto",
                                    options: {
                                        body: {
                                            template: "#Nombre#",
                                            dataFeed: function(text) {
                                                let concepto = new conceptos();
                                                this.load(concepto.searchCombo(text));
                                            }
                                        }
                                    }
                                },
                                {
                                    view: "combo",
                                    name: "Almacen.id",
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
                                { view: "textarea", height: 112, label: "Descripción:", labelPosition: "top" }
                            ]
                        }
                    ]

                },
                {
                    view: "datatable",
                    id: "gridArticulos" + id,
                    height: 300,
                    select: "cell",
                    //editaction: "none",
                    columns: [
                        { id: "Clave", header: "Clave", css: "Clave", width: 70, css: { "text-align": "center" } },
                        {
                            id: "Articulo",
                            editor: "combo",
                            header: "Articulo",
                            width: 257,
                            placeholder: "Type something... ",
                            collection: collection,
                            fillspace: true,
                            //select: "row",
                            //navigation: true,
                            suggest: { // suggest
                                //template: "#Nombre#",
                                body: { // list
                                    template: "#Nombre#",
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
                    editable: true,
                    autowidth: true,
                    data: [
                        {},
                        {}
                    ]
                }
            ],
            rules: {
                //$all: webix.rules.isNotEmpty,
                //"TipoConcepto.Nombre": webix.rules.isNotEmpty
            }
        };

        let movimientoES = new movimientosES();

        super(app, name, form, movimientoES, id);
    }
    init(view) {
        webix.extend($$(this.Ventana), webix.ProgressBar);

        this.LstArticulos = [];

        let self = this;
        let grid = $$("gridArticulos" + this.id);
        this.$$("gridArticulos" + this.id).attachEvent("onAfterEditStop", function(state, editor) {

            var column = editor.config;

            if (editor.column == "Articulo") {
                var item = editor.getPopup().getList().getItem(state.value);

                if (item == undefined)
                    return;

                this.getItem(editor.row)["Clave"] = item.Clave;
                this.getItem(editor.row)["Unidad"] = item.UnidadInventario.Abreviatura;

                /*console.log(grid);
                console.log(self.$$('gridArticulos' + this.id));
                grid.editCell(editor.row, "Cantidad");
                //grid.editNext();*/

            } else if (editor.column == "Cantidad" || editor.column == "Costo") {
                if (this.getItem(editor.row)["Cantidad"] == undefined || this.getItem(editor.row)["Costo"] == undefined)
                    return;

                let Costo = this.getItem(editor.row)["Cantidad"] * this.getItem(editor.row)["Costo"];
                this.getItem(editor.row)["CostoTotal"] = Costo;
            }

            //webix.UIManager.setFocus($$("gridArticulos" + this.id));

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

                        //var now = this.getEditor();
                        //console.log(now);
                        //$$("gridArticulos" + this.id).editNext();
                        //$$("gridArticulos" + this.id).focusEditor({ row: 1, column: "Cantidad" });

                        //console.log($$("gridArticulos" + this.id));
                        //editor.focus();
                        //$$("gridArticulos" + this.id).select(1, "Cantidad", false);
                        //$$("gridArticulos" + this.id).moveSelection("left");
                        //$$("gridArticulos" + this.id).moveSelection("left");
                    }
                } catch (err) {
                    console.log(err);
                }
            }
        });

        this.$$("gridArticulos" + this.id).attachEvent("onKeyPress", function(code, e) {
            console.log(code);
            //console.log($$("gridArticulos" + this.id).getColumnIndex());
            if (code == 46) {
                console.log("eliminar");
                let id = $$("gridArticulos" + self.id).getSelectedId();
                if (id)
                    $$("gridArticulos" + self.id).remove(id);
            } else if (code == 13) {
                console.log("enter");
                var editor = this.getEditor();
                let thisParent = this;
                setTimeout(function() {
                    //grid.editCell(editor.row, "Cantidad");
                    console.log(editor);
                    //thisParent.editNext(true, editor);
                    grid.editNext(true, editor);
                }, 50);
            }
        });
    }
    guardar() {
        /*this.$$('gridArticulos' + this.id).editStop()
        console.log($$('gridArticulos' + this.id));*/

        //this.$$('gridArticulos' + this.id).editRow(2);
        //this.$$("gridArticulos" + this.id).focusEditor({ row: 1, column: "Cantidad" });
        //this.$$('gridArticulos' + this.id).editColumn("Cantidad");
        //this.$$('gridArticulos' + this.id).editCell(1, "Cantidad", true, true);

        //$$("gridArticulos" + this.id).add({});

        let ConceptoId = this.$$("cmbConcepto" + this.id).getValue();
        let AlmacenId = this.$$("cmbAlmacen" + this.id).getValue();

        let data = this.$$(this.Formulario).getValues();
        /*console.log(data);
        return;*/
        data.Concepto = this.$$("cmbConcepto" + this.id).getPopup().getList().getItem(ConceptoId);
        data.Almacen = this.$$("cmbAlmacen" + this.id).getPopup().getList().getItem(AlmacenId);

        let detalle_entrada = [];
        //Obtiene los valores del grid
        $$("gridArticulos" + this.id).eachRow((row) => {
            let record = $$("gridArticulos" + this.id).getItem(row);

            record.Articulo = this.LstArticulos.getItem(record.Articulo);
            detalle_entrada.push(record);
        });

        data.detalle_entrada = detalle_entrada;
        console.log(data);

        return;
        super.guardar(data);
    }
    cargarCombos(data) {
        this.cargarCombo(this.$$("cmbConcepto" + this.id), data.TipoConcepto);
    }
}