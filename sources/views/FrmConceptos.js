import { JetView } from "webix-jet";
import { FrmBase } from "views/FrmBase";
import { conceptos } from "models/catalogos/conceptos";
import { tipoconceptos } from "models/catalogos/tipoconceptos";
import { getSiNo, getNaturaleza } from "models/generales";

export class FrmConceptos extends FrmBase {
    constructor(app, name) {
        //Genera un idetificador unico para la ventana con el 
        //objetivo de poder generar varias instancias
        let id = new Date().getTime();

        let form = {
            title: "Conceptos",
            width: 500,
            elements: [
                { view: "text", name: "_id", hidden: true },
                {
                    //margin: 5,
                    cols: [
                        { view: "text", name: "Clave", labelWidth: 105, label: "Clave" },
                        { view: "combo", name: "FolioAutomatico", labelWidth: 105, label: "Folio Automatico", options: getSiNo() },
                    ]
                },
                { view: "text", name: "Nombre", labelWidth: 105, label: "Nombre" },
                { view: "combo", name: "Naturaleza", labelWidth: 105, label: "Naturaleza", options: getNaturaleza() },
                {
                    view: "combo",
                    name: "TipoConcepto._id",
                    labelWidth: 105,
                    id: "cmbTipoConcepto" + id,
                    label: "Tipo Concepto",
                    options: {
                        body: {
                            template: "#Nombre#",
                            dataFeed: function(text) {
                                let tipoconcepto = new tipoconceptos();
                                this.load(tipoconcepto.searchCombo(text));
                            }
                        }
                    }
                },
                {
                    //margin: 5,
                    cols: [
                        { view: "combo", name: "Predefinido", labelWidth: 105, label: "Predefinido", options: getSiNo() },
                        { view: "combo", name: "CostoAutomatico", labelWidth: 105, label: "Costo Automatico", options: getSiNo() },
                    ]
                },
            ],
            rules: {
                $all: webix.rules.isNotEmpty,
                "TipoConcepto._id": webix.rules.isNotEmpty
            }
        };

        let concepto = new conceptos();

        super(app, name, form, concepto, id);
    }
    init(view) {
        webix.extend($$(this.Ventana), webix.ProgressBar);
    }

    cargarCombos(data) {
        this.cargarCombo(this.$$("cmbTipoConcepto" + this.id), data.TipoConcepto);
    }

}