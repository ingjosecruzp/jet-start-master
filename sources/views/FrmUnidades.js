import { JetView } from "webix-jet";
import { FrmBase } from "views/FrmBase";
import { unidades } from "models/catalogos/unidades";

export class FrmUnidades extends FrmBase {
    constructor(app, name) {
        let form = {
            title: "Unidades",
            width: 350,
            elements: [
                { view: "text", name: "_id", hidden: true },
                { view: "text", name: "Nombre", label: "Nombre" },
                { view: "text", name: "Abreviatura", label: "Abreviatura" }
            ],
            rules: {
                //$all: webix.rules.isNotEmpty
                "Nombre": webix.rules.isNotEmpty,
                "Abreviatura": webix.rules.isNotEmpty
            }
        };

        let unidad = new unidades();

        super(app, name, form, unidad);
    }
    init(view) {
        webix.extend($$(this.Ventana), webix.ProgressBar);
    }
}