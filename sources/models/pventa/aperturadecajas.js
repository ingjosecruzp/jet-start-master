import { JetView } from "webix-jet";
import { ModeloBase } from "../ModeloBase";

export class aperturadecajas extends ModeloBase {
    constructor() {
        let servicio = "Servicios/PVenta/WcfAperturaCajas.svc/";
        //let campos = "_id,TipoMovto,Fecha,FormaEmitida,Importe";
        let campos = "_id,TipoMovto,Fecha,FormaEmitida,Importe";

        super(servicio, campos);
    }
}
