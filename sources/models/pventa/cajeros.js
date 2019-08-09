import { JetView } from "webix-jet";
import { ModeloBase } from "../ModeloBase";

export class cajeros extends ModeloBase {
    constructor() {
        let servicio = "Servicios/PVenta/WcfCajeros.svc/";
        let campos = "_id,Nombre,Usuarios.NombreCompleto";

        super(servicio, campos);
    }    
}