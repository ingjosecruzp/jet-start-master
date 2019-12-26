import { JetView } from "webix-jet";
import { ModeloBase } from "../ModeloBase";

export class operador extends ModeloBase {
    constructor() {
        let servicio = "Servicios/PVenta/WcfOperador.svc/";
        let campos = "_id,Nombre";
        super(servicio, campos);
    }
}