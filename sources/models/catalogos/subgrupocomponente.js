import { JetView } from "webix-jet";
import { ModeloBase } from "../ModeloBase";

export class subgrupocomponente extends ModeloBase {
    constructor() {
        let servicio = "Servicios/Inventarios/WcfSubgruposComponentes.svc/";
        let campos   = "_id,Clave,Nombre";

        super(servicio, campos);
    }

    searchXGrupo(text, id) {
        return this.url + "?searchBy=getXGrupo&_id=" + id + "&busqueda=" + text;
    }

}