import { JetView } from "webix-jet";
import { ModeloBase } from "../ModeloBase";

export class roles extends ModeloBase {
    constructor() {
        let servicio = "Servicios/Administracion/WcfRoles.svc/";
        let campos = "_id,Nombre";

        super(servicio, campos);
    }
}