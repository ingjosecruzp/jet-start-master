import { JetView } from "webix-jet";
import { FrmBase } from "views/FrmBase";
import { formacobro } from "models/pventa/formacobro";
import { moneda } from "models/pventa/moneda";
import { getSiNo } from "models/generales";

export class FrmFormaCobro extends FrmBase {
    constructor(app, name) {
        let id = new Date().getTime();
        let form = {
            title: "Formas de Cobro",
            width: 400,
            elements: [
                { view: "text", name: "_id", hidden: true },
                { view: "text", name: "Nombre", label: "Nombre", labelWidth: 140 },
                {
                    view: "combo",
                    name: "FormadeCobro._id",
                    labelWidth: 140,
                    id: "cmbFormadeCobro" + id,
                    label: "Moneda",
                    options: {
                        body: {
                            template: "#Nombre#",
                            dataFeed: function(text) {
                                let monedas = new moneda();
                                this.load(monedas.searchCombo(text));
                            }
                        }
                    }
                },
                { view: "text", name: "DiasTransito", label: "Dias de Transito", labelWidth: 140 },
                { view: "text", name: "ClaveFiscal", label: "Clave Fiscal", labelWidth: 140 },
                { view: "combo", name: "ValorPredeterminado", labelWidth: 140, label: "Valor Predeterminado", options: getSiNo() }
            ],
            rules: {
                //$all: webix.rules.isNotEmpty
                "ClaveFiscal": webix.rules.isNotEmpty,
                "Nombre": webix.rules.isNotEmpty,
                "FormadeCobro._id": webix.rules.isNotEmpty

            }
        };

        let formascobros = new formacobro();

        super(app, name, form, formascobros, id);
    }
    init(view) {
        webix.extend($$(this.Ventana), webix.ProgressBar);
    }

    cargarCombos(data) {
        console.log(data);
        this.cargarCombo(this.$$("cmbFormadeCobro" + this.id), data.Moneda);
    }
}