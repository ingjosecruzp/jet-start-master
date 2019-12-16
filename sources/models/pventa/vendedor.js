import { JetView } from "webix-jet";
import { ModeloBase } from "../ModeloBase";

export class vendedor extends ModeloBase {
    constructor() {
        let servicio = "Servicios/PVenta/WcfVendedor.svc/";
        let campos = "_id,Nombre,Clave,ValorPredeterminado";
        super(servicio, campos);
    }

    searchXGrupo(text, id) {
        return this.url + "?searchBy=getXGrupo&_id=" + id + "&busqueda=" + text;
    }
    
}