import { JetView } from "webix-jet";
import { ModeloBase } from "../ModeloBase";
//modelo no se utiliza
export class CierreCajas extends ModeloBase {
    constructor() {
        let servicio = "Servicios/PVenta/WcfCierreCaja.svc/";
        //let campos = "_id,TipoMovto,Fecha,FormaEmitida,Importe";
        let campos = "_id,TipoMovto,Fecha,FormaEmitida,Importe";

        super(servicio, campos);
    }
    searchXGrupo(text, id) {
        return this.url + "?searchBy=getXGrupo&_id=" + id + "&busqueda=" + text;
    }
}