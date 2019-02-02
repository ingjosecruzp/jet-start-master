import { JetView } from "webix-jet";

export class ModeloBase {
    constructor(servicio) {
        this.url = "http://localhost:60493/" + servicio;
    }

    getAllData() {
        return webix.ajax(this.url);
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
    searchCombo(text) {
        return this.url + "?searchBy=getXNombre&busqueda=" + text;
    }
}