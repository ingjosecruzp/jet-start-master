import { JetView } from "webix-jet";
import { FrmBase } from "views/FrmBase";
import { bdempresas } from "models/catalogos/bdempresas";
import { roles } from "models/administracion/roles";
import { menu } from "models/administracion/menu";

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
                                id: "treePermisos" + id,
                                threeState: true,
                                //template: "{common.icon()} {common.checkbox()} {common.folder()} #value#",
                                template: "{common.icon()} {common.checkbox()}  #value#",
                                height: 385,
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

        this.showProgressBar();

        $$(this.Ventana).attachEvent("onShow", () => {
            if(this._id == undefined)
            {
                this.loadEmpresas();
                this.loadMenuPermisos();
            }
        });
    }
    loadMenuPermisos() {
        let promise = new Promise((resolve, reject) => {
            let Menu = new menu();
            Menu.getMenu().then((realdata) => {
                $$("treePermisos" + this.id).parse(realdata.json().data);
                this.hiddenProgressBar();
                resolve("Cargado");
                //this.loadMenuPermisosWs();
            }).fail((error) => {
                webix.alert({
                    type: "alert-error",
                    text: "Error: " + error.statusText
                }).then((result) => {
                    $$(this.Ventana).close();
                    this.hiddenProgressBar();
                });

                reject(error);
            });
        });

        return promise;
    }
    loadMenuPermisosWs(data) {
        data.Modulos.forEach(element => {                

            element.Vistas.forEach(vista => {
                //$$("treePermisos" + this.id).uncheckItem(vista.idVista);
                $$("treePermisos" + this.id).checkItem(vista.idVista);
                //console.log($$("treePermisos" + this.id).getItem(vista.idVista));
                //$$("treePermisos" + this.id).getItem(vista.idVista).checked = true;
            });
        });
    }
    loadEmpresas() {
        let promise = new Promise((resolve, reject) => {
            let Empresas = new bdempresas();

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
                
                resolve("Cargado Empresas");
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
    loadPermisosEmpresas(data) {
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
    }
    guardar() {
        let data = this.$$(this.Formulario).getValues();

        let BDEmpresas = [];
        let VistasPermisos = [];

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

        $$("treePermisos" + this.id).data.each((item) => {
            //$count: 0
            //$level: 2
            //$parent: "administracion"

            if (item.EsPadre == false && item.checked==true) {
                let parent = $$("treePermisos" + this.id).getItem(item.$parent);

                //Busca si ya se encuntra generado el nodo papa
                let buscarPapa=VistasPermisos.find(padre => padre._id === parent._id);

                let hijo = {
                    _id : item._id,
                    idVista : item.id
                };
                
                if(buscarPapa==undefined)
                {
                    let padre = {
                        _id : parent._id,
                        idModulo: parent.id,
                        Vistas: []
                    };

                    padre.Vistas.push(hijo);
                    VistasPermisos.push(padre);
                }
                else
                {
                    buscarPapa.Vistas.push(hijo);
                }
            }
        });

        data.Modulos = VistasPermisos;
        data.BDEmpresas = BDEmpresas;
        super.guardar(data);
    }

    cargarCombos(data) {
        this.loadEmpresas().then((successMessage) => {
            this.loadPermisosEmpresas(data);
        });

        this.loadMenuPermisos().then((successMessage) => {
            this.loadMenuPermisosWs(data);
        });
    }
}