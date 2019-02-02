import { JetView } from "webix-jet";
import { ModeloBase } from "../ModeloBase";

export class conceptos extends ModeloBase {
    constructor() {
        let servicio = "Servicios/Inventarios/WcfConceptos.svc/";
        super(servicio);
    }
}