import { JetView } from "webix-jet";
import { ModeloBase } from "../ModeloBase";

export class puntoVenta extends ModeloBase {
    constructor() {
        let servicio = "Servicios/PVenta/WcfPuntoVenta_Documento.svc/";
        let campos = "_id,Folio,Fecha,TotalVenta";
        super(servicio, campos);
        this.fields = "campos=" + campos;

    }
    /*getAllData() {
        return webix.ajax(this.url + this.fields + "/tipoMovimiento=" + this.naturaleza);
    }*/

    saveData(data) {        
        var promise = webix.ajax().headers({
            "Content-type": "application/json"
        }).post(this.url, data);
        //console.log(this.url);
        //console.log(data);

        return promise;
    }

    validarApertura() {
        var promise = webix.ajax(this.url +  "?searchBy=validarApertura");
        return promise;
    }
}