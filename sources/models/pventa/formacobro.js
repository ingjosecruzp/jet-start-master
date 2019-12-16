import { JetView } from "webix-jet";
import { ModeloBase } from "../ModeloBase";

export class formacobro extends ModeloBase {
    constructor() {
        let servicio = "Servicios/PVenta/WcfFormadeCobro.svc/";
        let campos = "_id,Nombre,DiasTransito,ClaveFiscal,ValorPredeterminado,Moneda";
        super(servicio, campos);
    }

    searchXGrupo(text, id) {
        return this.url + "?searchBy=getXGrupo&_id=" + id + "&busqueda=" + text;
    }
}