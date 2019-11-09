import { JetView } from "webix-jet";
import { ModeloBase } from "../ModeloBase";

export class tipoproveedor extends ModeloBase {
    constructor() {
        let servicio = "Servicios/Compras/WcfTipoProveedor.svc/";
        let campos = "_id,Nombre,Clave";
        super(servicio, campos);
    }
}