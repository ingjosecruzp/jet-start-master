import { JetView } from "webix-jet";
import { ModeloBase } from "../ModeloBase";

export class tipocomponente extends ModeloBase {
    constructor() {
        let servicio = "Servicios/Inventarios/WcfTipoComponente.svc/";
        let campos = "_id,Nombre";
        super(servicio, campos);
    }
}