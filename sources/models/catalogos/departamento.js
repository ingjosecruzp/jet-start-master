import { JetView } from "webix-jet";
import { ModeloBase } from "../ModeloBase";

export class departamento extends ModeloBase {
    constructor() {
        let servicio = "Servicios/Generales/WcfDepartamentos.svc/";
        super(servicio);
    }
}