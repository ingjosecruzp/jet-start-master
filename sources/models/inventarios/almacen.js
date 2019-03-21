import { JetView } from "webix-jet";
import { ModeloBase } from "../ModeloBase";

export class almacen extends ModeloBase {
    constructor() {
        let servicio = "Servicios/Inventarios/WcfAlmacenes.svc/";
        super(servicio);
    }
}