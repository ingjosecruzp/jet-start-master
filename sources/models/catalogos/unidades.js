import { JetView } from "webix-jet";
import { ModeloBase } from "../ModeloBase";

export class unidades extends ModeloBase {
    constructor() {
        let servicio = "Servicios/Inventarios/WcfUnidades.svc/";
        let campos = "_id,Nombre,Abreviatura";

        super(servicio, campos);
    }
}