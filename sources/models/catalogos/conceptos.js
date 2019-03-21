import { JetView } from "webix-jet";
import { ModeloBase } from "../ModeloBase";

export class conceptos extends ModeloBase {
    constructor() {
        let servicio = "Servicios/Inventarios/WcfConceptos.svc/";
        let campos = "_id,Clave,Nombre,Naturaleza,TipoConcepto.Nombre,Predefinido";

        super(servicio, campos);
    }
}