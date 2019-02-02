import { JetView } from "webix-jet";
import { FrmBase } from "views/FrmBase";
import { conceptos } from "models/catalogos/conceptos";
import { almacenes } from "models/catalogos/almacenes";
import { movimientosES } from "models/inventarios/movimientosES";

export class FrmEntrada extends FrmBase {
    constructor(app, name) {
        //Genera un idetificador unico para la ventana con el 
        //objetivo de poder generar varias instancias
        let id = new Date().getTime();

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
                                    name: "Concepto.Nombre",
                                    labelWidth: 50,
                                    id: "cmbConcepto" + id,
                                    label: "Tipo Concepto",
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
                                    name: "Almacen.Nombre",
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
    }
    guardar() {


        super.guardar(data);
    }
    cargarCombos(data) {
        this.cargarCombo(this.$$("cmbTipoConcepto" + this.id), data.TipoConcepto);
    }
}