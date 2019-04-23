import { JetView } from "webix-jet";
import { FrmBase } from "views/FrmBase";
import { bdempresas } from "models/catalogos/bdempresas";
import { roles } from "models/administracion/roles";

export class FrmRoles extends FrmBase {
    constructor(app, name) {
        let id = new Date().getTime();
        let form = {
            title: "Roles",
            width: 400,
            elements: [{
                view: "tabview",
                borderless: false,
                margin: 10,
                tabbar: {
                    optionWidth: 100
                },
                cells: [{
                        id: "TabEmpresas",
                        header: "Empresas",
                        body: {
                            rows: [
                                { view: "text", name: "Nombre", labelWidth: 75, label: "Nombre" },
                                { gravity: 1000 },
                                {
                                    view: "datatable",
                                    id: "gridEmpresas" + id,
                                    height: 350,
                                    columns: [
                                        { id: "ch1", header: { content: "masterCheckbox" }, checkValue: 'on', uncheckValue: 'off', template: "{common.checkbox()}", width: 40 },
                                        { id: "_id", header: "_id", hidden: true },
                                        { id: "RFC", header: "RFC", width: 100 },
                                        { id: "RazonSocial", header: "Razon Social", fillspace: true }
                                    ]
                                }
                            ]
                        }
                    },
                    {
                        header: "Permisos",
                        id: "TabPermisos",
                        margin: 250,
                        body: {
                            rows: [{
                                view: "tree",
                                template: "{common.icon()} {common.checkbox()} {common.folder()} #value#",
                                height: 385,
                                //data: webix.copy(smalltreedata),
                                ready: function() {
                                    this.openAll();
                                    this.checkItem("1.2");
                                }
                            }]
                        },

                    }
                ]

            }],
            rules: {
                //$all: webix.rules.isNotEmpty
                "Nombre": webix.rules.isNotEmpty,
                //"TipoComponente._id": webix.rules.isNotEmpty
            }
        };

        let rol = new roles();

        super(app, name, form, rol, id);
    }
    init(view) {
        webix.extend($$(this.Ventana), webix.ProgressBar);

        let Empresas = new bdempresas();

        this.showProgressBar();
        Empresas.getAllData().then((realdata) => {

            realdata.json().forEach(element => {
                let empresa = {
                    _id: element._id,
                    RFC: element.RFC,
                    RazonSocial: element.RazonSocial,
                    ch1: "off"
                }

                $$("gridEmpresas" + this.id).add(empresa);
            });

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

    }
    guardar() {
        let data = this.$$(this.Formulario).getValues();

        let BDEmpresas = [];

        $$("gridEmpresas" + this.id).eachRow((row) => {
            let record = $$("gridEmpresas" + this.id).getItem(row);

            if (record.ch1 == "on") {

                let empresa = {
                    _id: record._id,
                    RFC: record.RFC
                }

                BDEmpresas.push(empresa);
            }
        });

        data.BDEmpresas = BDEmpresas;
        super.guardar(data);
    }

    cargarCombos(data) {

        setTimeout(() => {
            //Busca que empresas vienen activas
            data.BDEmpresas.forEach(element => {
                $$("gridEmpresas" + this.id).eachRow((row) => {
                    let record = $$("gridEmpresas" + this.id).getItem(row);
                    if (element._id == record._id) {
                        $$("gridEmpresas" + this.id).updateItem(row, { chk: 1 });
                        record.ch1 = "on";
                    }
                });
            });
        }, 200);
    }
}