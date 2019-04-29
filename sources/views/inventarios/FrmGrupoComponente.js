import { JetView } from "webix-jet";
import { FrmBase } from "views/FrmBase";
import { tipocomponente } from "models/inventarios/tipocomponente";
import { grupocomponente } from "models/inventarios/grupocomponente";

export class FrmGrupoComponente extends FrmBase {
    constructor(app, name) {
        let id = new Date().getTime();
        let form = {
            title: "Grupo Componente",
            width: 400,
            elements: [
                { view: "text", name: "_id", hidden: true },
                { view: "text", name: "Clave", label: "Clave", labelWidth: 140 },
                { view: "text", name: "Nombre", label: "Nombre", labelWidth: 140 },
                {
                    view: "combo",
                    name: "TipoComponente._id",
                    labelWidth: 140,
                    id: "cmbTipoComponente" + id,
                    label: "Tipo Componente",
                    options: {
                        body: {
                            template: "#Nombre#",
                            dataFeed: function(text) {
                                let tipocomponentes = new tipocomponente();
                                this.load(tipocomponentes.searchCombo(text));
                            }
                        }
                    }
                }
            ],
            rules: {
                //$all: webix.rules.isNotEmpty
                "Clave": webix.rules.isNotEmpty,
                "Nombre": webix.rules.isNotEmpty,
                "TipoComponente._id": webix.rules.isNotEmpty

            }
        };

        let gcomponente = new grupocomponente();

        super(app, name, form, gcomponente, id);
    }
    init(view) {
        webix.extend($$(this.Ventana), webix.ProgressBar);
    }

    cargarCombos(data) {
        console.log(data);
        this.cargarCombo(this.$$("cmbTipoComponente" + this.id), data.TipoComponente);
    }
}