import { JetView } from "webix-jet";
import { ModeloBase } from "../ModeloBase";

export class movimientosES extends ModeloBase {
    constructor(naturaleza) {
        let servicio = "Servicios/Inventarios/WcfMovimientosES.svc/";
        let campos = "_id,Fecha,Folio,Almacen.Nombre,Concepto.Nombre";
        super(servicio, campos, naturaleza);
        this.fields = "campos=" + campos;

    }
    getAllData() {
        return webix.ajax(this.url + this.fields + "/tipoMovimiento=" + this.naturaleza);
    }
}