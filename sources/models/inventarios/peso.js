import { JetView } from "webix-jet";
import { ModeloBase } from "../ModeloBase";

export class peso extends ModeloBase {
    constructor() {
        let servicio = "Servicios/Inventarios/WcfPesos.svc/";
        let campos = "_id,Nombre";

        super(servicio, campos);
    }
}