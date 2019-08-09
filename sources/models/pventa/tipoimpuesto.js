import { JetView } from "webix-jet";
import { ModeloBase } from "../ModeloBase";
//modelo no se utiliza
export class tipoimpuesto extends ModeloBase {
    constructor() {
        let servicio = "Servicios/PVenta/WcfTipoImpuesto.svc/";
        let campos = "_id,Nombre,Naturaleza";

        super(servicio, campos);
    }

    searchXTipo(text) {
        return this.url + "?searchBy=getXTipo&busqueda=" + text;
    }
}