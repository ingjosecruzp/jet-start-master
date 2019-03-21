import { JetView } from "webix-jet";
import { ModeloBase } from "../ModeloBase";

export class marca extends ModeloBase {
    constructor() {
        let servicio = "Servicios/Generales/WcfMarcas.svc/";
        let campos = "_id,Nombre";

        super(servicio, campos);
    }
}