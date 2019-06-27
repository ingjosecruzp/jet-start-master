import { JetView } from "webix-jet";
import { ModeloBase } from "../ModeloBase";

export class inventariofisico extends ModeloBase {
    constructor() {
        let servicio = "Servicios/Inventarios/WcfInventarioFisico.svc/";
        let campos = "_id,Fecha,Folio,Almacen.Nombre,Estado,Descripcion";
        super(servicio, campos);
    }

}