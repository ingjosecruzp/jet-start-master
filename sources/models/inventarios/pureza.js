import { JetView } from "webix-jet";
import { ModeloBase } from "../ModeloBase";

export class pureza extends ModeloBase {
    constructor() {
        let servicio = "Servicios/Inventarios/WcfPureza.svc/";
        let campos = "_id,Nombre,GrupoComponente.Nombre,GrupoComponente.TipoComponente.Nombre";

        super(servicio, campos);
    }
}