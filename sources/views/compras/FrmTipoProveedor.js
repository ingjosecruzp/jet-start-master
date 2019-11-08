import { JetView } from "webix-jet";
import { FrmBase } from "views/FrmBase";
import { tipoproveedor } from "models/compras/tipoproveedor";

export class FrmTipoProveedor extends FrmBase {
    constructor(app, name) {
        let form = {
            title: "Tipo Proveedor",
            width: 350,
            elements: [
                { view: "text", name: "_id", hidden: true },
                { view: "text", name: "Nombre", label: "Nombre" },
                { view: "text", name: "Clave", label: "Clave" }
            ],
            rules: {
                //$all: webix.rules.isNotEmpty
                "Nombre": webix.rules.isNotEmpty

            }
        };

        let tproveedor = new tipoproveedor();

        super(app, name, form, tproveedor);
    }
    init(view) {
        webix.extend($$(this.Ventana), webix.ProgressBar);
    }
}