import { JetView } from "webix-jet";
import { FrmBase } from "views/FrmBase";
import { vendedor } from "models/pventa/vendedor";
import { politicadecomisiones } from "models/pventa/politicadecomisiones";
import { getSiNo } from "models/generales";

export class FrmVendedor extends FrmBase {
    constructor(app, name) {
        let id = new Date().getTime();
        let form = {
            title: "Vendedor",
            width: 400,
            elements: [
                { view: "text", name: "_id", hidden: true },
                { view: "text", name: "Nombre", label: "Nombre", labelWidth: 140 },
                {
                    view: "combo",
                    name: "PoliticadeComisiones._id",
                    labelWidth: 140,
                    id: "cmbPoliticadeComisiones" + id,
                    label: "PoliticadeComisiones",
                    options: {
                        body: {
                            template: "#Nombre#",
                            dataFeed: function(text) {
                                let pcomisiones = new politicadecomisiones();
                                this.load(pcomisiones.searchCombo(text));
                            }
                        }
                    }
                },
                { view: "text", name: "Clave", label: "Clave", labelWidth: 140 },
                { view: "combo", name: "ValorPredeterminado", labelWidth: 140, label: "Valor Predeterminado", options: getSiNo() }
            ],
            rules: {
                //$all: webix.rules.isNotEmpty
                "Clave": webix.rules.isNotEmpty,
                "Nombre": webix.rules.isNotEmpty,
                "ValorPredeterminado": webix.rules.isNotEmpty,
                "PoliticadeComisiones._id": webix.rules.isNotEmpty
            }
        };

        let vendedores = new vendedor();

        super(app, name, form, vendedores, id);
    }
    init(view) {
        webix.extend($$(this.Ventana), webix.ProgressBar);
    }

    cargarCombos(data) {
        console.log(data);
        this.cargarCombo(this.$$("cmbPoliticadeComisiones" + this.id), data.PoliticadeComisiones);
    }
}