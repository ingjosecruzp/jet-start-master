import { JetView } from "webix-jet";
import { FrmBase } from "views/FrmBase";
import { tipodecambio } from "models/pventa/tipodecambio";
import { moneda } from "models/pventa/moneda";

export class FrmTipodeCambio extends FrmBase {
    constructor(app, name) {
        let id = new Date().getTime();
        let form = {
            title: "Tipo de Cambio",
            width: 400,
            elements: [
                { view: "text", name: "_id", hidden: true },
                { view: "text", name: "Nombre", label: "Nombre", labelWidth: 140 },
                {
                    view: "combo",
                    name: "Moneda._id",
                    labelWidth: 140,
                    id: "cmbMoneda" + id,
                    label: "Moneda",
                    options: {
                        body: {
                            template: "#Nombre#",
                            dataFeed: function(text) {
                                let monedas = new moneda();
                                this.load(monedas.searchCombo(text));
                            }
                        }
                    }
                },
                { view: "text", name: "Fecha", label: "Fecha", labelWidth: 140 },
                { view: "text", name: "TipoCambio", label: "Tipo de Cambio", labelWidth: 140 },
                { view: "text", name: "EnCobros", label: "En Cobros", labelWidth: 140 }
            ],
            rules: {
                //$all: webix.rules.isNotEmpty
                "TipoCambio": webix.rules.isNotEmpty,
                "Nombre": webix.rules.isNotEmpty,
                "EnCobros": webix.rules.isNotEmpty,
                "Moneda._id": webix.rules.isNotEmpty
            }
        };

        let tiposdecambios = new tipodecambio();

        super(app, name, form, tiposdecambios, id);
    }
    init(view) {
        webix.extend($$(this.Ventana), webix.ProgressBar);
    }

    cargarCombos(data) {
        console.log(data);
        this.cargarCombo(this.$$("cmbMoneda" + this.id), data.Moneda);
    }
}