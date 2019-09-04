import { JetView } from "webix-jet";

export class ModeloBase {
    
    constructor(servicio, campos, naturaleza) {
        this.skip=false;

        if (naturaleza) this.naturaleza = naturaleza;
        
        this.url = "http://localhost:9090/" + servicio;
        this.fields = "campos/" + campos;
    }

    //Metodo para activar el LazyLoading
    lazyLoading(status) {
        this.skip=status;
    }

    getAllData(skipValue,filters) {
        //console.log(skipValue);

        if(this.skip==false)
        {
            return webix.ajax(this.url + this.fields);
        }
        else
        {   skipValue = skipValue==undefined ? 0 : skipValue;
            if(filters === undefined || filters==="")
                return webix.ajax(this.url + this.fields + "/" + skipValue);
            else
                return webix.ajax(this.url + this.fields + "/" + skipValue + "/" + filters);
        }
    }

    getData(id) {
        var promise = webix.ajax(this.url + id);
        return promise;
    }

    saveData(data) {
        var promise = webix.ajax().headers({
            "Content-type": "application/json"
        }).post(this.url, data);

        return promise;
    }

    updateData(data) {
        var promise = webix.ajax().headers({
            "Content-type": "application/json"
        }).put(this.url + data._id, data);

        return promise;
    }

    deleteData(data) {
        var promise = webix.ajax().headers({
            "Content-type": "application/json"
        }).del(this.url + data._id);

        return promise;
    }

    imprimir(id) {
        //http://localhost:9090/Servicios/Inventarios/WcfMovimientosES.svc/?searchBy=RptDocumento&id=5cc8c31948a4e21e0c44ed6d
        var promise = webix.ajax(this.url + "?searchBy=RptDocumento&id="+ id);
        return promise;
    }

    searchCombo(text) {
        return this.url + "?searchBy=getXNombre&busqueda=" + text;
    }

    searchPorCampo(campo,text) {
        return this.url + "?searchBy=getXCampo&campo="+ campo +"&busqueda=" + text;
    }
}