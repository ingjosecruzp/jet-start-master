import { JetView } from "webix-jet";
import { ModeloBase } from "../ModeloBase";

export class proveedor extends ModeloBase {
    constructor() {
        let servicio = "Servicios/Compras/WcfProveedor.svc/";
        let campos = "_id,Nombre,Clave,RFC,Contacto,Direccion,TipoProveedor.Nombre";

        super(servicio, campos);
    }

    searchXGrupo(text, id) {
        return this.url + "?searchBy=getXGrupo&_id=" + id + "&busqueda=" + text;
    }

}