import { JetView } from "webix-jet";
import { ModeloBase } from "../ModeloBase";

export class grupocomponente extends ModeloBase {
    constructor() {
        let servicio = "Servicios/Inventarios/WcfGruposComponentes.svc/";
        let campos = "_id,Nombre,TipoComponente.Nombre";
        super(servicio, campos);
    }
}