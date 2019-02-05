import { JetView } from "webix-jet";
import { ModeloBase } from "../ModeloBase";

export class articulos extends ModeloBase {
    constructor() {
        let servicio = "Servicios/Inventarios/WcfArticulos.svc/";
        super(servicio);
    }
}