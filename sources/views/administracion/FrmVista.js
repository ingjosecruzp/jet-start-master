import { JetView } from "webix-jet";
import { FrmBase } from "views/FrmBase";
import { vista } from "models/administracion/vista";

export class FrmVista extends FrmBase {
    constructor(app, name) {
        let id = new Date().getTime();

        let form = {
            title: "Vistas",
            width: 400,
            elements: [
                { view: "text", name: "_id", hidden: true },
                { view: "text", name: "idVista", labelWidth: 100, label: "Id" },
                { view: "text", name: "icon", labelWidth: 100, label: "Icono" },
                { view: "text", name: "Nombre", labelWidth: 100, label: "Nombre" }
            ],
            rules: {
                //$all: webix.rules.isNotEmpty
                "Nombre": webix.rules.isNotEmpty,
                "icon": webix.rules.isNotEmpty,
                "idVista": webix.rules.isNotEmpty
            }
        };

        let Vista = new vista();

        super(app, name, form, Vista, id);

    }
    init(view) {
        webix.extend($$(this.Ventana), webix.ProgressBar);
    }  
}