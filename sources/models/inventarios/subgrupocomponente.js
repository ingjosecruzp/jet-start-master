import { JetView } from "webix-jet";
import { ModeloBase } from "../ModeloBase";

export class subgrupocomponente extends ModeloBase {
    constructor() {
        let servicio = "Servicios/Inventarios/WcfSubgruposComponentes.svc/";
        let campos = "_id,Nombre,GrupoComponente.Nombre,GrupoComponente.TipoComponente.Nombre";
        super(servicio, campos);
    }
}