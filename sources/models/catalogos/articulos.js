import { JetView } from "webix-jet";
import { ModeloBase } from "../ModeloBase";

export class articulos extends ModeloBase {
    constructor() {
        let servicio = "Servicios/Inventarios/WcfArticulos.svc/";
        let campos = "_id,Clave,NombreCorto,Marca.Nombre,Activo,GrupoComponente.Nombre,SubGrupoComponente.Nombre";

        super(servicio, campos);
    }
}