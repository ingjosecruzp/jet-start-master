import { JetView } from "webix-jet";
import { ModeloBase } from "../ModeloBase";

export class impuesto extends ModeloBase {
    constructor() {
        let servicio = "Servicios/Administracion/WcfImpuesto.svc/";
        let campos = "_id,Nombre";

        super(servicio, campos);
    }
}