import { JetView } from "webix-jet";
import { ModeloBase } from "../ModeloBase";

export class menu extends ModeloBase {
    constructor() {
        let servicio = "Servicios/Administracion/WcfMenu.svc/";
        let campos = "_id,Nombre,icon";

        super(servicio, campos);
    }

    getMenu() {
        var promise = webix.ajax(this.url + "/?searchBy=getMenu");
        return promise;
    }
    
    getMenuUsuario(){
        var promise = webix.ajax(this.url + "/?searchBy=getMenuUsuario");
        return promise;
    }
}