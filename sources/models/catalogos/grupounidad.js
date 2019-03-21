import { JetView } from "webix-jet";
import { ModeloBase } from "../ModeloBase";

export class grupounidad extends ModeloBase {
    constructor() {
        let servicio = "Servicios/Generales/WcfGrupoUnidades.svc/";
        let campos = "_id,Nombre";

        super(servicio, campos);
    }
    searchXUnidad(text, id) {
        return this.url + "?searchBy=getXUnidad&_id=" + id + "&busqueda=" + text;
    }
}