import { JetView } from "webix-jet";
import { ModeloBase } from "../ModeloBase";
//modelo no se utiliza
export class usuario extends ModeloBase {
    constructor() {
        let servicio = "Servicios/Administracion/WcfUsuarios.svc/";
        let campos = "_id,Nombre,NombreCompleto,Status";

        super(servicio, campos);
    }
}