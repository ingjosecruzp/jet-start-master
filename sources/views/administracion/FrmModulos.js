import { JetView } from "webix-jet";
import { FrmBase } from "views/FrmBase";
import { modulo } from "models/administracion/modulo";
import { vista } from "models/administracion/vista";

export class FrmModulos extends FrmBase {
    constructor(app, name) {
        let id = new Date().getTime();

        let form = {
            title: "Modulos",
            width: 400,
            elements: [
                { view: "text", name: "_id", hidden: true },
                { view: "text", name: "idModulo", labelWidth: 100, label: "Id" },
                { view: "text", name: "icon", labelWidth: 100, label: "Icono" },
                { view: "text", name: "Nombre", labelWidth: 100, label: "Nombre" },
                {
                    view: "datatable",
                    id: "gridVistas" + id,
                    height: 300,
                    select: "row",
                    columns: [
                        { id: "ch1", header: { content: "masterCheckbox" }, checkValue: 'on', uncheckValue: 'off', template: "{common.checkbox()}", width: 40 },
                        { id: "_id", header: "_id", hidden: true },
                        { id: "modIcon", header: "", width: 40,template:"<span class='#modIcon#'></span>"},
                        { id: "Vista", header:[ "",{ content:"textFilter" }] ,sort:"text", fillspace: true }
                    ]
                }
            ],
            rules: {
                //$all: webix.rules.isNotEmpty
                "Nombre": webix.rules.isNotEmpty,
                "icon": webix.rules.isNotEmpty,
                "idModulo": webix.rules.isNotEmpty
            }
        };

        let Modulo = new modulo();

        super(app, name, form, Modulo, id);

    }
    init(view) {
        webix.extend($$(this.Ventana), webix.ProgressBar);

        this.showProgressBar();

        $$(this.Ventana).attachEvent("onShow", () => {
            if(this._id == undefined)
            {
                this.loadVistas();
            }
        });

    }
    loadVistas() {
        let promise = new Promise((resolve, reject) => {
            let Vista = new vista();

            Vista.getAllData().then((realdata) => {

                realdata.json().forEach(element => {
                    let vistaFrm = {
                        _id: element._id,
                        Vista: element.Nombre,
                        ch1: "off",
                        modIcon : element.icon
                    }

                    $$("gridVistas" + this.id).add(vistaFrm);
                });
                resolve("Cargado Vistas");
                this.hiddenProgressBar();

            }).fail((error) => {
                webix.alert({
                    type: "alert-error",
                    text: "Error: " + error.statusText
                }).then((result) => {
                    $$(this.Ventana).close();
                    this.hiddenProgressBar();
                });
            });
        });

        return promise;
    }
    loadVistasWS(data){
        //Busca que vistas vienen activas
        data.Vistas.forEach(element => {
            $$("gridVistas" + this.id).eachRow((row) => {
                let record = $$("gridVistas" + this.id).getItem(row);
                if (element._id == record._id) {
                    $$("gridVistas" + this.id).updateItem(row, { chk: 1 });
                    record.ch1 = "on";
                }
            });
        });
    }
    guardar() {
        let data = this.$$(this.Formulario).getValues();

        let Vistas = [];

        $$("gridVistas" + this.id).eachRow((row) => {
            let record = $$("gridVistas" + this.id).getItem(row);

            if (record.ch1 == "on") {

                let empresa = {
                    _id: record._id,
                    //RFC: record.RFC
                }

                Vistas.push(empresa);
            }
        });

        data.Vistas = Vistas;
        super.guardar(data);
    }  
    cargarCombos(data) {
        this.loadVistas().then((successMessage) => {
            this.loadVistasWS(data);
        });
    }
}