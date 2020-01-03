import { JetView } from "webix-jet";
import { FrmBase } from "views/FrmBase";
import { usuario } from "models/catalogos/usuario";
import { getSiNo, getTipoAlmacen, getEstatus, getMetodoCosteo } from "models/generales";
import { roles } from "models/administracion/roles";
import { unidades } from "models/catalogos/unidades";

export class FrmUsuarios extends FrmBase {
    constructor(app, name) {
        let id = new Date().getTime();

        let form = {
            title: "Usuarios",
            width: 400,
            elements: [
                { view: "text", name: "_id", hidden: true },
                { view: "text", name: "Nombre", labelWidth: 100, label: "Usuario" },
                { view: "text", name: "NombreCompleto", labelWidth: 100, label: "Nombre" },
                { view: "text", type: "password", name: "Contrasena", labelWidth: 100, label: "Contraseña" },
                { view: "text", type: "password", name: "Clave", labelWidth: 100, label: "Clave" },
                { view: "combo", name: "Status", labelWidth: 100, label: "Estatus", options: getEstatus() },
                {
                    view: "multicombo",
                    name: "Roles",
                    label: "Roles",
                    id: "cmbRoles" + id,
                    labelWidth: 100,
                    //value: "1,7,9,12",
                    //button: true,
                    suggest: { // suggest
                        template: "#value#",
                        body: { // list
                            template: "#value#",
                            dataFeed: function(text) {
                                let rol = new roles();
                                this.load(rol.searchCombo(text));
                            }
                        }
                    }
                }
            ],
            rules: {
                //$all: webix.rules.isNotEmpty
                "Nombre": webix.rules.isNotEmpty,
                "NombreCompleto": webix.rules.isNotEmpty,
                //"Contrasena": webix.rules.isNotEmpty,
                "Status": webix.rules.isNotEmpty,
                "Roles": webix.rules.isNotEmpty
                    //"TipoComponente._id": webix.rules.isNotEmpty
            }
        };

        let usr = new usuario();

        super(app, name, form, usr, id);

    }
    init(view) {
        webix.extend($$(this.Ventana), webix.ProgressBar);
    }
    guardar() {
        let data = this.$$(this.Formulario).getValues();

        let Roles = [];

        data.Roles.split(",").forEach((item) => {
            console.log(item);

            let rol = {
                _id: item
            }

            Roles.push(rol);

        });

        data.Roles = Roles;
        super.guardar(data);
    }
}