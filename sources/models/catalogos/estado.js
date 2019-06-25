import { JetView } from "webix-jet";
import { ModeloBase } from "../ModeloBase";
//modelo no se utiliza
export class estados extends ModeloBase {
    constructor() {
        let servicio = "Servicios/Generales/WcfEstado.svc/";
        let campos = "_id,Nombre,Paises.Nombre";

        super(servicio, campos);
    }
}