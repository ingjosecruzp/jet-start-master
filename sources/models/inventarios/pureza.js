import { JetView } from "webix-jet";
import { ModeloBase } from "../ModeloBase";

export class pureza extends ModeloBase {
    constructor() {
        let servicio = "Servicios/Inventarios/WcfPureza.svc/";
        super(servicio);
    }
}