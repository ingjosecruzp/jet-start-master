import { JetView } from "webix-jet";
import { FrmBase } from "views/FrmBase";
import { bdempresas } from "models/catalogos/bdempresas";
import { getSiNo, getTipoAlmacen, getEstatus, getMetodoCosteo } from "models/generales";

export class FrmRoles extends FrmBase {
    constructor(app, name) {
        let id = new Date().getTime();
        let form = {
            title: "Roles",
            width: 600,
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
                        body: {}
                    },
                    {
                        header: "Permisos",
                        id: "TabPermisos",
                        margin: 250,
                        body: {},

                    }
                ]

            }],
            rules: {
                //$all: webix.rules.isNotEmpty
                //"Nombre": webix.rules.isNotEmpty,
                //"TipoComponente._id": webix.rules.isNotEmpty

            }
        };

        let Empresa = new bdempresas();

        super(app, name, form, Empresa, id);
    }
    init(view) {
        webix.extend($$(this.Ventana), webix.ProgressBar);
    }
    guardar() {
        let data = this.$$(this.Formulario).getValues();
        console.log(data.InicioPeriodo);
        data.InicioPeriodo = this.convertToJSONDate(data.InicioPeriodo);
        data.FinPeriodo = this.convertToJSONDate(data.FinPeriodo);
        return;
        data.Nombre = "";
        super.guardar(data);
    }

    cargarCombos(data) {
        $$("DtpFechaInicio" + this.id).setValue(this.convertToDate(data.InicioPeriodo));
        $$("DtpFechaFin" + this.id).setValue(this.convertToDate(data.FinPeriodo));
    }
}