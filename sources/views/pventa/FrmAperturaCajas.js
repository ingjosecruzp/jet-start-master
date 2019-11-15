import { JetView } from "webix-jet";
import { FrmBase } from "views/FrmBase";
import { aperturadecajas } from "models/pventa/aperturadecajas";
import { getSiNo } from "models/generales";

export class FrmAperturaCajas extends FrmBase {
    constructor(app, name) {
        let id = new Date().getTime();
        let form = {
            title: "Moneda",
            width: 400,
            elements: [
                { view: "text", name: "_id", hidden: true },
                { view: "text", name: "Nombre", label: "Nombre", labelWidth: 140 }

            ],
            rules: {
                //$all: webix.rules.isNotEmpty
                "Nombre": webix.rules.isNotEmpty
            }
        };

        let aperturaCajas = new aperturadecajas();

        super(app, name, form, aperturaCajas, id);
    }
    init(view) {
        webix.extend($$(this.Ventana), webix.ProgressBar);
    }
}
