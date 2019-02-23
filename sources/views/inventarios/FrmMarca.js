import { JetView } from "webix-jet";
import { FrmBase } from "views/FrmBase";
import { marca } from "models/inventarios/marca";

export class FrmMarca extends FrmBase {
    constructor(app, name) {
        let form = {
            title: "Marcas",
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

        let marcas = new marca();

        super(app, name, form, marcas);
    }
    init(view) {
        webix.extend($$(this.Ventana), webix.ProgressBar);
    }
}