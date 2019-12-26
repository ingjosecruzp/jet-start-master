import { JetView } from "webix-jet";
import { ModeloBase } from "../ModeloBase";

export class puntoVenta extends ModeloBase {
    constructor() {
        let servicio = "Servicios/PVenta/WcfPuntoVenta_Documento.svc/";
        let campos = "_id,Folio,Fecha,TotalVenta,Estatus,Caja,Cajero";
        super(servicio, campos);
        this.fields = "campos/" + campos;

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

    saveDevolucion(data) {  
        var promise = webix.ajax().headers({
            "Content-type": "application/json"
        }).post(this.url + "?searchBy=crearDevolucion", data);
        return promise;
    }

    saveCancelacionN(data) {        
        var promise = webix.ajax().headers({
            "Content-type": "application/json"
        }).post(this.url + "?searchBy=crearCancelacion", data);
        return promise;
    }

    saveCancelacion(data) {        
        var promise = webix.ajax().headers({
            "Content-type": "application/json"
        }).post(this.url + "?searchBy=cancelacionCompra", data);
        return promise;
    }
    
    getACancelar(start, end) {  
        var data = {
            Inicio: start, 
            Fin: end
        };      
        var promise = webix.ajax().headers({
            "Content-type": "application/json"
        }).post(this.url +  "?searchBy=comprasACancelar&cadena="+this.fields, data);
        return promise;
    }

    validarApertura() {
        var promise = webix.ajax(this.url +  "?searchBy=validarApertura");
        return promise;
    }
}