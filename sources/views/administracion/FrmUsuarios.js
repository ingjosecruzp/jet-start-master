import { JetView } from "webix-jet";
import { FrmBase } from "views/FrmBase";
import { usuario } from "models/catalogos/usuario";
import { getSiNo, getTipoAlmacen, getEstatus, getMetodoCosteo } from "models/generales";

export class FrmUsuarios extends FrmBase {
    constructor(app, name) {
        let id = new Date().getTime();
        let form = {
            title: "Empresa",
            width: 600,
            elements: [
                { view: "text", name: "_id", hidden: true },
                { view: "text", name: "Nombre", labelWidth: 150, label: "Nombre" },
                { view: "text", name: "NombreCompleto", labelWidth: 150, label: "Nombre Completo" },
                { view: "text", name: "Contrasena", labelWidth: 150, label: "Contrasena" },
                { view: "combo", name: "Status", labelWidth: 100, label: "Estatus", options: getEstatus() }

            ],
            rules: {
                //$all: webix.rules.isNotEmpty
                //"Nombre": webix.rules.isNotEmpty,
                //"TipoComponente._id": webix.rules.isNotEmpty

            }
        };

        let usr = new usuario();

        super(app, name, form, usr, id);
    }
    init(view) {
        webix.extend($$(this.Ventana), webix.ProgressBar);
    }

}