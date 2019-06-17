import { JetView } from "webix-jet";
import { FrmBase } from "views/FrmBase";
import { politicadecomisiones } from "models/pventa/politicadecomisiones";
import { getSiNo } from "models/generales";

export class FrmPoliticadeComisiones extends FrmBase {
    constructor(app, name) {
        let id = new Date().getTime();
        let form = {
            title: "Politica de Comisiones",
            width: 400,
            elements: [
                { view: "text", name: "_id", hidden: true },
                { view: "text", name: "Nombre", label: "Nombre", labelWidth: 140 },
                { view: "combo", name: "SegunArticulos", labelWidth: 140, label: "Segun Articulos", options: getSiNo() },
                { view: "combo", name: "SegunClientes", labelWidth: 140, label: "Segun Clientes", options: getSiNo() },
                { view: "text", name: "ComisionGeneral", label: "Comision General", labelWidth: 140 }

            ],
            rules: {
                //$all: webix.rules.isNotEmpty
                "SegunArticulos": webix.rules.isNotEmpty,
                "Nombre": webix.rules.isNotEmpty,
                "SegunClientes": webix.rules.isNotEmpty,
                "ComisionGeneral": webix.rules.isNotEmpty

            }
        };

        let pcomisiones = new politicadecomisiones();

        super(app, name, form, pcomisiones, id);
    }
    init(view) {
        webix.extend($$(this.Ventana), webix.ProgressBar);
    }
}