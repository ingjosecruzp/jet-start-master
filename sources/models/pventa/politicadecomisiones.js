import { JetView } from "webix-jet";
import { ModeloBase } from "../ModeloBase";

export class politicadecomisiones extends ModeloBase {
    constructor() {
        let servicio = "Servicios/PVenta/WcfPoliticadeComisiones.svc/";
        let campos = "_id,Nombre,SegunArticulos,SegunClientes,ComisionGeneral";
        super(servicio, campos);
    }
}