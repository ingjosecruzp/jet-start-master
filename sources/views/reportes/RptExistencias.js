import { JetView } from "webix-jet";
import { FrmBase } from "views/FrmBase";
import { unidades } from "models/catalogos/unidades";
import { almacenes } from "models/catalogos/almacenes";

export class RptExistencias extends FrmBase {
    constructor(app, name) {
        let form = {
            title: "Unidades",
            width: 350,
            elements: [{
                view: "combo",
                name: "Almacen._id",
                labelWidth: 105,
                id: "cmbAlmacen" + id,
                label: "Almacen",
                options: {
                    body: {
                        template: "#Nombre#",
                        dataFeed: function(text) {
                            let almacenes = new almacenes();
                            this.load(almacenes.searchCombo(text));
                        }
                    }
                }
            }, ],
            rules: {
                //$all: webix.rules.isNotEmpty
                "Nombre": webix.rules.isNotEmpty,
                "Abreviatura": webix.rules.isNotEmpty
            }
        };

        let unidad = new unidades();

        super(app, name, form, unidad);
    }
    init(view) {
        webix.extend($$(this.Ventana), webix.ProgressBar);
    }
}