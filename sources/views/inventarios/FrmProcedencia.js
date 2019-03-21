import { JetView } from "webix-jet";
import { FrmBase } from "views/FrmBase";
import { paises } from "models/catalogos/paises";

export class FrmProcedencia extends FrmBase {
    constructor(app, name) {
        let form = {
            title: "Procedencia",
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

        let pais = new paises();

        super(app, name, form, pais);
    }
    init(view) {
        webix.extend($$(this.Ventana), webix.ProgressBar);
    }
}