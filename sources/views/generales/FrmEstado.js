import { JetView } from "webix-jet";
import { FrmBase } from "views/FrmBase";
import { paises } from "models/catalogos/paises";

export class FrmPaises extends FrmBase {
    constructor(app, name) {
        let form = {
            title: "Paises",
            width: 350,
            elements: [
                { view: "text", name: "_id", hidden: true },
                { view: "text", name: "Nombre", labelWidth: 120, label: "Nombre" },
                { view: "text", name: "Abreviatura", labelWidth: 120, label: "Abreviatura" }
            ],
            rules: {
                //$all: webix.rules.isNotEmpty
                // "Nombre": webix.rules.isNotEmpty,
                // "Abreviatura": webix.rules.isNotEmpty
            }
        };

        let pais = new paises();

        super(app, name, form, pais);
    }
    init(view) {
        webix.extend($$(this.Ventana), webix.ProgressBar);
    }
}