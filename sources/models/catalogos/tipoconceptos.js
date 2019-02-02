import { JetView } from "webix-jet";
import { ModeloBase } from "../ModeloBase";

export class tipoconceptos extends ModeloBase {
    constructor() {
        let servicio = "Servicios/Inventarios/WcfTipoConceptos.svc/";
        super(servicio);
    }
}