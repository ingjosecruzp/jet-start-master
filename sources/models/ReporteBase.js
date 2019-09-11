import { JetView } from "webix-jet";

export class ReporteBase {
    constructor(servicio) {
        this.url = "http://localhost:60493/" + servicio;
    }

    VerReporte(params) {
        console.log(this.url);
        var promise = webix.ajax().headers({
            "Content-type": "application/json"
        }).post(this.url, JSON.stringify(JSON.stringify(params)));

        return promise;
    }
}