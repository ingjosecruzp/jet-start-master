import { JetView } from "webix-jet";
import { FrmBase } from "views/FrmBase";
import { municipios } from "models/catalogos/municipios";
import { estados } from "models/catalogos/estado";
import { paises } from "models/catalogos/paises";
import { getSiNo, getNaturaleza } from "models/generales";

export class FrmMunicipios extends FrmBase {
    constructor(app, name) {
        //Genera un idetificador unico para la ventana con el 
        //objetivo de poder generar varias instancias
        let id = new Date().getTime();

        let form = {
            title: "Municipios",
            width: 400,
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
                            template: "#Nombre#", //es el campo que sem mostrara lo agarra del json
                            dataFeed: function(text) {
                                let Estado = new estados(); //modelo para cargar el combo
                                this.load(Estado.searchCombo(text));
                            }
                        }
                    }
                },
                {
                    view: "combo",
                    name: "Paises._id",
                    labelWidth: 105,
                    id: "cmbPais" + id,
                    label: "Pais",
                    options: {
                        body: {
                            template: "#Nombre#", //es el campo que sem mostrara lo agarra del json
                            dataFeed: function(text) {
                                let Pais = new paises(); //modelo para cargar el combo
                                this.load(Pais.searchCombo(text));
                            }
                        }
                    }
                }
            ],
            rules: {
                //$all: webix.rules.isNotEmpty,
                "Nombre": webix.rules.isNotEmpty,
                "Estado._id": webix.rules.isNotEmpty,
                "Paises._id": webix.rules.isNotEmpty
            }
        };

        let municipio = new municipios();

        super(app, name, form, municipio, id);
    }
    init(view) {
        webix.extend($$(this.Ventana), webix.ProgressBar);
    }

    cargarCombos(data) {
        this.cargarCombo(this.$$("cmbEstado" + this.id), data.Estado);
        this.cargarCombo(this.$$("cmbPais" + this.id), data.Paises);
    }

}