import { JetView } from "webix-jet";
import { ModeloBase } from "../ModeloBase";

export class articulos extends ModeloBase {
    constructor() {
        let servicio = "Servicios/Inventarios/WcfArticulos.svc/";
        let campos = "_id,Clave,Nombre,Marca.Nombre,Activo,GrupoComponente.Nombre,SubGrupoComponente.Nombre";

        super(servicio, campos);
    }

    searchLimitIds(text,ids) {
        return this.url + "?searchBy=getXLimitIds&busqueda=" + text + "&ids=" + ids;
    }

    searchArticuloCodigo(codigo) {
        var promise = webix.ajax(this.url + "?searchBy=getXCodigo&busqueda=" + codigo);
        return promise;
    }
}