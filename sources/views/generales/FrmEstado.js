import { JetView } from "webix-jet";
import { FrmBase } from "views/FrmBase";
import { estados } from "models/catalogos/estado";

export class FrmEstado extends FrmBase {
    constructor(app, name) {
        let form = {
            title: "Estados",
            width: 350,
            elements: [
                { view: "text", name: "_id", hidden: true },
                { view: "text", name: "Nombre", labelWidth: 120, label: "Nombre" }
                //{ view: "combotext", name: "Paises", labelWidth: 120, label: "Paises" }
            ],
            rules: {
                //$all: webix.rules.isNotEmpty
                // "Nombre": webix.rules.isNotEmpty,
                // "Abreviatura": webix.rules.isNotEmpty
            }
        };

        let estado = new estados();

        super(app, name, form, estado);
    }
    init(view) {
        webix.extend($$(this.Ventana), webix.ProgressBar);
    }
}