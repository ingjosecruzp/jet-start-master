import { JetView } from "webix-jet";
import { FrmBase } from "views/FrmBase";
import { tipocomponente } from "models/inventarios/tipocomponente";

export class FrmTipoComponente extends FrmBase {
    constructor(app, name) {
        let form = {
            title: "Tipo Componente",
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

        let tcomponente = new tipocomponente();

        super(app, name, form, tcomponente);
    }
    init(view) {
        webix.extend($$(this.Ventana), webix.ProgressBar);
    }
}