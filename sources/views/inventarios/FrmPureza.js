import { JetView } from "webix-jet";
import { FrmBase } from "views/FrmBase";
import { grupocomponente } from "models/inventarios/grupocomponente";
import { pureza } from "models/inventarios/pureza";

export class FrmPureza extends FrmBase {
    constructor(app, name) {
        let id = new Date().getTime();
        let form = {
            title: "Pureza",
            width: 400,
            elements: [
                { view: "text", name: "_id", hidden: true },
                { view: "text", name: "Nombre", label: "Nombre", labelWidth: 140 },
                {
                    view: "combo",
                    name: "GrupoComponente._id",
                    labelWidth: 140,
                    id: "cmbGrupoComponente" + id,
                    label: "Grupo Componente",
                    options: {
                        body: {
                            template: "#Nombre#",
                            dataFeed: function(text) {
                                let grupocomponentes = new grupocomponente();
                                this.load(grupocomponentes.searchCombo(text));
                            }
                        }
                    }
                }
            ],
            rules: {

                "Nombre": webix.rules.isNotEmpty,
                "GrupoComponente._id": webix.rules.isNotEmpty,


            }
        };

        let preza = new pureza();

        super(app, name, form, preza, id);
    }
    init(view) {
        webix.extend($$(this.Ventana), webix.ProgressBar);
    }

    cargarCombos(data) {
        console.log(data);
        this.cargarCombo(this.$$("cmbGrupoComponente" + this.id), data.GrupoComponente);
    }
}