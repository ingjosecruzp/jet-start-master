import { JetView } from "webix-jet";
import { FrmBase } from "views/FrmBase";
import { operador } from "models/pventa/operador";

export class FrmOperador extends FrmBase {
    constructor(app, name) {
        let id = new Date().getTime();
        let form = {
            title: "Operadores",
            width: 400,
            elements: [
                { view: "text", name: "_id", hidden: true },
                { view: "text", name: "Nombre", label: "Nombre", labelWidth: 140 },
                { view: "text", name: "Clave", label: "Clave", labelWidth: 140 }
            ],
            rules: {
                //$all: webix.rules.isNotEmpty
                "Clave": webix.rules.isNotEmpty,
                "Nombre": webix.rules.isNotEmpty
            }
        };

        let Operador = new operador();

        super(app, name, form, Operador, id);
    }
    init(view) {
        webix.extend($$(this.Ventana), webix.ProgressBar);
    }
}