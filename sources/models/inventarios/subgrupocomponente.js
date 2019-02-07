import { JetView } from "webix-jet";
import { ModeloBase } from "../ModeloBase";

export class subgrupocomponente extends ModeloBase {
    constructor() {
        let servicio = "Servicios/Inventarios/WcfSubgruposComponentes.svc/";
        super(servicio);
    }
}