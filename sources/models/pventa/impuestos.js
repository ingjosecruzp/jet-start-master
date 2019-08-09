import { JetView } from "webix-jet";
import { ModeloBase } from "../ModeloBase";
//modelo no se utiliza
export class impuestos extends ModeloBase {
    constructor() {
        let servicio = "Servicios/PVenta/WcfImpuestos.svc/";
        let campos = "_id,Nombre,TipoImpuesto.Nombre,TipoCalculo,Tasa";

        super(servicio, campos);
    }

}