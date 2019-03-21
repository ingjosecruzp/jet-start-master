import { JetView } from "webix-jet";
import { ModeloBase } from "../ModeloBase";

export class paises extends ModeloBase {
    constructor() {
        let servicio = "Servicios/Generales/WcfPaises.svc/";
        let campos = "_id,Nombre,Abreviatura";

        super(servicio, campos);
    }
}