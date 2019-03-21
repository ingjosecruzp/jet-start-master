import { JetView } from "webix-jet";
import { FrmBase } from "views/FrmBase";
import { peso } from "models/inventarios/peso";

export class FrmPeso extends FrmBase {
    constructor(app, name) {
        let form = {
            title: "Pesos",
            width: 350,
            elements: [
                { view: "text", name: "_id", hidden: true },
                { view: "text", name: "Nombre", label: "Nombre" }
            ],
            rules: {
                //$all: webix.rules.isNotEmpty
                "Nombre": webix.rules.isNotEmpty

            }
        };

        let pesos = new peso();

        super(app, name, form, pesos);
    }
    init(view) {
        webix.extend($$(this.Ventana), webix.ProgressBar);
    }
}