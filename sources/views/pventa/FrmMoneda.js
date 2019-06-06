import { JetView } from "webix-jet";
import { FrmBase } from "views/FrmBase";
import { moneda } from "models/pventa/moneda";
import { getSiNo } from "models/generales";

export class FrmMoneda extends FrmBase {
    constructor(app, name) {
        let id = new Date().getTime();
        let form = {
            title: "Moneda",
            width: 400,
            elements: [
                { view: "text", name: "_id", hidden: true },
                { view: "text", name: "Nombre", label: "Nombre", labelWidth: 140 },
                { view: "text", name: "TextoImporte", label: "TextoImporte", labelWidth: 140 },
                { view: "text", name: "Simbolo", label: "Simbolo", labelWidth: 140 },
                { view: "text", name: "ClaveInterna", label: "ClaveInterna", labelWidth: 140 },
                { view: "text", name: "ClaveFiscal", label: "ClaveFiscal", labelWidth: 140 },
                { view: "combo", name: "ValorPredeterminado", labelWidth: 140, label: "ValorPredeterminado", options: getSiNo() },
                { view: "combo", name: "MonedaNac", labelWidth: 140, label: "MonedaNac", options: getSiNo() }

            ],
            rules: {
                //$all: webix.rules.isNotEmpty
                "TextoImporte": webix.rules.isNotEmpty,
                "Nombre": webix.rules.isNotEmpty,
                "Simbolo": webix.rules.isNotEmpty,
                "ClaveFiscal": webix.rules.isNotEmpty,
                "ClaveInterna": webix.rules.isNotEmpty

            }
        };

        let monedas = new moneda();

        super(app, name, form, monedas, id);
    }
    init(view) {
        webix.extend($$(this.Ventana), webix.ProgressBar);
    }
}