import { JetView } from "webix-jet";
import { ModeloBase } from "../ModeloBase";

export class puesto extends ModeloBase {
    constructor() {
        let servicio = "Servicios/Generales/WcfPuestos.svc/";
        super(servicio);
    }
}