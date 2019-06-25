import { JetView } from "webix-jet";
import { FrmBase } from "views/FrmBase";
import { municipios } from "models/catalogos/municipios";
import { getSiNo, getNaturaleza } from "models/generales";

export class FrmMunicipios extends FrmBase {
    constructor(app, name) {
        //Genera un idetificador unico para la ventana con el 
        //objetivo de poder generar varias instancias
        let id = new Date().getTime();

        let form = {
            title: "Municipios",
            width: 500,
            elements: [
                { view: "text", name: "_id", hidden: true },                
                { view: "text", name: "Nombre", labelWidth: 105, label: "Nombre" },
                {
                    view: "combo",
                    name: "Estado._id",
                    labelWidth: 105,
                    id: "cmbEstado" + id,
                    label: "Estado",
                    options: {
                        body: {
                            template: "#Nombre#",
                            dataFeed: function(text) {
                                let Estado = new Estado();
                                this.load(tipoconcepto.searchCombo(text));
                            }
                        }
                    }
                },
                {
                    //margin: 5,
                    cols: [
                        { view: "combo", name: "Predefinido", labelWidth: 105, label: "Predefinido", options: getSiNo() },
                        { view: "combo", name: "CostoAutomatico", labelWidth: 105, label: "Costo Automatico", options: getSiNo() },
                    ]
                },
            ],
            rules: {
                //$all: webix.rules.isNotEmpty,
                "Clave": webix.rules.isNotEmpty,
                "FolioAutomatico": webix.rules.isNotEmpty,
                "Nombre": webix.rules.isNotEmpty,
                "Naturaleza": webix.rules.isNotEmpty,
                "TipoConcepto._id": webix.rules.isNotEmpty,
                "Predefinido": webix.rules.isNotEmpty,
                "CostoAutomatico": webix.rules.isNotEmpty
            }
        };

        let concepto = new conceptos();

        super(app, name, form, concepto, id);
    }
    init(view) {
        webix.extend($$(this.Ventana), webix.ProgressBar);
    }

    cargarCombos(data) {
        this.cargarCombo(this.$$("cmbTipoConcepto" + this.id), data.TipoConcepto);
    }

}