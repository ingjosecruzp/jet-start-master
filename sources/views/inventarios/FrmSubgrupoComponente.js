import { JetView } from "webix-jet";
import { FrmBase } from "views/FrmBase";
import { tipocomponente } from "models/inventarios/tipocomponente";
import { grupocomponente } from "models/inventarios/grupocomponente";
import { subgrupocomponente } from "models/inventarios/subgrupocomponente";

export class FrmSubgrupoComponente extends FrmBase {
    constructor(app, name) {
        let id = new Date().getTime();
        let form = {
            title: "Subgrupo Componente",
            width: 400,
            elements: [
                { view: "text", name: "_id", hidden: true },
                { view: "text", name: "Clave", label: "Clave", labelWidth: 140 },
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
                /*,
                {
                    view: "combo",
                    name: "TipoComponente._id",
                    labelWidth: 120,
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
                }*/
            ],
            rules: {
                //$all: webix.rules.isNotEmpty
                "Clave": webix.rules.isNotEmpty,
                "Nombre": webix.rules.isNotEmpty,
                "GrupoComponente._id": webix.rules.isNotEmpty,
                //"TipoComponente._id": webix.rules.isNotEmpty

            }
        };

        let scomponente = new subgrupocomponente();

        super(app, name, form, scomponente, id);
    }
    init(view) {
        webix.extend($$(this.Ventana), webix.ProgressBar);
    }

    cargarCombos(data) {
        this.cargarCombo(this.$$("cmbGrupoComponente" + this.id), data.GrupoComponente);
        /*this.cargarCombo(this.$$("cmbTipoComponente" + this.id), data.TipoComponente);*/
    }
}