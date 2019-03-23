import { JetView } from "webix-jet";
import { ModeloBase } from "../ModeloBase";
//modelo no se utiliza
export class almacenes extends ModeloBase {
    constructor() {
        let servicio = "Servicios/Inventarios/WcfAlmacenes.svc/";
        let campos = "_id,Clave,Nombre,TipoAlmacen,Activo";

        super(servicio, campos);
    }
}