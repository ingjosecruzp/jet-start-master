import { JetView } from "webix-jet";
import { ModeloBase } from "../ModeloBase";

export class vista extends ModeloBase {
    constructor() {
        let servicio = "Servicios/Administracion/WcfVistas.svc/";
        let campos = "_id,Nombre,icon";

        super(servicio, campos);
    }
}