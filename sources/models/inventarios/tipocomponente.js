import { JetView } from "webix-jet";
import { ModeloBase } from "../ModeloBase";

export class tipocomponente extends ModeloBase {
    constructor() {
        let servicio = "Servicios/Inventarios/WcfTipoComponente.svc/";
        super(servicio);
    }
}