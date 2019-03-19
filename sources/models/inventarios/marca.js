import { JetView } from "webix-jet";
import { ModeloBase } from "../ModeloBase";

export class marca extends ModeloBase {
    constructor() {
        let servicio = "Servicios/Generales/WcfMarcas.svc/";
        super(servicio);
    }
}