import { JetView } from "webix-jet";
import { ModeloBase } from "../ModeloBase";

export class aperturadecajas extends ModeloBase {
    constructor() {
        let servicio = "Servicios/PVenta/WcfAperturaCajas.svc/";
        let campos = "_id,Fecha,FormaEmitida,Importe";

        super(servicio, campos);
    }
}
