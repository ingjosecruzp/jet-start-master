import { JetView } from "webix-jet";
import { ModeloBase } from "../ModeloBase";

export class modulo extends ModeloBase {
    constructor() {
        let servicio = "Servicios/Administracion/WcfModulos.svc/";
        let campos = "_id,Nombre,icon";

        super(servicio, campos);
    }
}