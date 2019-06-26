import { JetView } from "webix-jet";
import { ModeloBase } from "../ModeloBase";

export class grupocomponente extends ModeloBase {
    constructor() {
        let servicio = "Servicios/Inventarios/WcfGruposComponentes.svc/";
        let campos = "_id,Fecha,Folio,Almacen.Nombre,Estado,Descripcion";
        super(servicio, campos);
    }
}