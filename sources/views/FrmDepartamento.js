import { JetView } from "webix-jet";
import { FrmBase } from "views/FrmBase";
import { departamento } from "models/catalogos/departamento";

export class FrmDepartamento extends FrmBase {
    constructor(app, name) {
        let form = {
            title: "Departamento",
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

        let depto = new departamento();

        super(app, name, form, depto);
    }
    init(view) {
        webix.extend($$(this.Ventana), webix.ProgressBar);
    }
}