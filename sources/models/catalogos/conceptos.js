import { JetView } from "webix-jet";
import { ModeloBase } from "../ModeloBase";

export class conceptos extends ModeloBase {
    constructor(naturaleza) {
        let servicio = "Servicios/Inventarios/WcfConceptos.svc/";
        let campos = "_id,Clave,Nombre,Naturaleza,TipoConcepto.Nombre,Predefinido";

        super(servicio, campos, naturaleza);
    }

    searchXNaturaleza(text) {
        //return this.url + "Nombrebusqueda=" + this.fields + "/tipoMovimiento=" + this.naturaleza;
        return this.url + "?searchBy=getXNaturaleza&Nombrebusqueda=" + text + "&tipoMovimiento=" + this.naturaleza;
    }
}