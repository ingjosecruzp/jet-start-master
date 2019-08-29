import { JetView } from "webix-jet";
import { ModeloBase } from "../ModeloBase";

export class puntoVenta extends ModeloBase {
    constructor() {
        let servicio = "Servicios/PVenta/WcfPuntoVenta_Documento.svc/";
        let campos = "_id,Folio,Fecha,TotalVenta";
        super(servicio, campos);
        this.fields = "campos=" + campos;

    }
    /*getAllData() {
        return webix.ajax(this.url + this.fields + "/tipoMovimiento=" + this.naturaleza);
    }*/
}