import { JetView } from "webix-jet";
import { ModeloBase } from "../ModeloBase";
//modelo no se utiliza
export class cajas extends ModeloBase {
    constructor() {
        let servicio = "Servicios/PVenta/WcfCajas.svc/";
        let campos = "_id,Nombre,Almacen.Nombre,CobroPredet";

        super(servicio, campos);
    }
    

}