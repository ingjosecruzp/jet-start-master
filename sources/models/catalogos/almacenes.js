import { JetView } from "webix-jet";
import { ModeloBase } from "../ModeloBase";

export class almacenes extends ModeloBase {
    constructor() {
        let servicio = "Servicios/Inventarios/WcfAlmacenes.svc/";
        let campos = "_id, Clave, Nombre, TipoAlmacen, Activo, TipoComponente.Nombre";

        super(servicio, campos);
    }
}