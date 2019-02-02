import { JetView } from "webix-jet";
import { ModeloBase } from "../ModeloBase";

export class almacenes extends ModeloBase {
    constructor() {
        let servicio = "Servicios/Inventarios/WcfAlmacenes.svc/";
        super(servicio);
    }
}