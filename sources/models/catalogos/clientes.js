import { JetView } from "webix-jet";
import { ModeloBase } from "../ModeloBase";
//modelo no se utiliza
export class clientes extends ModeloBase {
    constructor() {
        let servicio = "Servicios/Generales/WcfClientes.svc/";
        let campos = "_id,Nombre,Puntos";

        super(servicio, campos);
    }
}