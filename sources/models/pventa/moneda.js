import { JetView } from "webix-jet";
import { ModeloBase } from "../ModeloBase";

export class moneda extends ModeloBase {
    constructor() {
        let servicio = "Servicios/Generales/WcfMoneda.svc/";
        let campos = "_id,Nombre,TextoImporte,Simbolo,ClaveInterna,ClaveFiscal,ValorPredeterminado,MonedaNac";
        super(servicio, campos);
    }
}