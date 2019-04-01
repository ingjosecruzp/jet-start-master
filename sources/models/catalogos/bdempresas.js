import { JetView } from "webix-jet";
import { ModeloBase } from "../ModeloBase";
//modelo no se utiliza
export class bdempresas extends ModeloBase {
    constructor() {
        let servicio = "Servicios/Generales/WcfEmpresas.svc/";
        let campos = "_id,Clave,Nombre,TipoAlmacen,Activo";

        super(servicio, campos);
    }

    getEmpresasUsuarios() {
        var promise = webix.ajax().headers({
            "token": localStorage.getItem("token")
        }).get(this.url + "?searchBy=getEmpresasUsuario");
        return promise;
    }

    selectEmpresa(EmpresaId) {
        var promise = webix.ajax().headers({
            "token": localStorage.getItem("token")
        }).get(this.url + "?searchBy=selectEmpresa&id=" + EmpresaId);
        return promise;
    }
}