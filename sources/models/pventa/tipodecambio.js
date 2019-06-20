import { JetView } from "webix-jet";
import { ModeloBase } from "../ModeloBase";

export class tipodecambio extends ModeloBase {
    constructor() {
        let servicio = "Servicios/PVenta/WcfTipodeCambio.svc/";
        let campos = "_id,Nombre,Fecha,TipoCambio,EnCobros";
        super(servicio, campos);
    }

    searchXGrupo(text, id) {
        return this.url + "?searchBy=getXGrupo&_id=" + id + "&busqueda=" + text;
    }
}