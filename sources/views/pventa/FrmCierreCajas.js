import { JetView } from "webix-jet";
import { FrmBase } from "views/FrmBase";
import { CierreCajas } from "models/pventa/CierreCajas";
//import { almacenes } from "models/catalogos/almacenes";
//import { getCajasRegVta, getCajasCobroDefault } from "models/generales";

export class FrmCierreCajas extends FrmBase {
	 constructor(app, name) {
        let id = new Date().getTime();
        let form = {
            title: "Cierre Cajas",
            width: 400,
            elements: [
                { view: "text", name: "_id", hidden: true },
                { view: "text", name: "TipoMovto", label: "Tipo Movimiento", labelWidth: 140 },
                { view: "datepicker", id: "Fecha" + id, label: "Fecha", labelWidth: 140, name: "Fecha", stringResult: true, format: "%d  %M %Y", value: new Date() },
                { view: "text", name: "FormaEmitida", label: "Forma Emitida", labelWidth: 140 },
                { view: "text", name: "Importe", label: "Importe", labelWidth: 140 },

            ],
            rules: {
                //$all: webix.rules.isNotEmpty
                //"TextoImporte": webix.rules.isNotEmpty,
                "TipoMovto": webix.rules.isNotEmpty,
                //"Simbolo": webix.rules.isNotEmpty,
                //"ClaveFiscal": webix.rules.isNotEmpty,
                //"ClaveInterna": webix.rules.isNotEmpty

            }
        };

        let CierreCaja = new CierreCajas();

        super(app, name, form, CierreCaja, id);
    }
    init(view) {
        webix.extend($$(this.Ventana), webix.ProgressBar);
    }
}