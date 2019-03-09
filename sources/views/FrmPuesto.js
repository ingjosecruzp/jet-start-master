import { JetView } from "webix-jet";
import { FrmBase } from "views/FrmBase";
import { puesto } from "models/catalogos/puesto";
import { departamento } from "models/catalogos/departamento";

export class FrmPuesto extends FrmBase {
    constructor(app, name) {
        let id = new Date().getTime();
        let form = {
            title: "Puesto",
            width: 400,
            elements: [
                { view: "text", name: "_id", hidden: true },
                { view: "text", name: "Nombre", label: "Nombre", labelWidth: 120 },
                {
                    view: "combo",
                    name: "Departamento._id",
                    labelWidth: 120,
                    id: "cmbDepartamento" + id,
                    label: "Departamento",
                    options: {
                        body: {
                            template: "#Nombre#",
                            dataFeed: function(text) {
                                let departamentos = new departamento();
                                this.load(departamentos.searchCombo(text));
                            }
                        }
                    }
                }
            ],
            rules: {
                //$all: webix.rules.isNotEmpty
                "Nombre": webix.rules.isNotEmpty,
                "Departamento._id": webix.rules.isNotEmpty

            }
        };

        let pto = new puesto();

        super(app, name, form, pto, id);
    }
    init(view) {
        webix.extend($$(this.Ventana), webix.ProgressBar);
    }

    cargarCombos(data) {
        console.log(data);
        this.cargarCombo(this.$$("cmbDepartamento" + this.id), data.departamento);
    }
}