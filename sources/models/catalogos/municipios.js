import { JetView } from "webix-jet";
import { ModeloBase } from "../ModeloBase";
//modelo no se utiliza
export class municipios extends ModeloBase {
    constructor() {
        let servicio = "Servicios/Generales/WcfMunicipio.svc/";
        let campos = "_id,Nombre,Estado.Nombre,Paises.Nombre";

        super(servicio, campos);
    }

}