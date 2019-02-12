import { JetView } from "webix-jet";
import { ModeloBase } from "../ModeloBase";

export class paises extends ModeloBase {
    constructor() {
        let servicio = "Servicios/Inventarios/WcfTipoComponente.svc/";
        super(servicio);
    }
}