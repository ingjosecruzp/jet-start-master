import { JetView } from "webix-jet";
import { ModeloBase } from "../ModeloBase";

export class movimientosES extends ModeloBase {
    constructor() {
        let servicio = "Servicios/Inventarios/WcfMovimientosEs.svc/";
        super(servicio);
    }
}