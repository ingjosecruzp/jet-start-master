import { JetView } from "webix-jet";
import { ModeloBase } from "./ModeloBase";

export class login extends ModeloBase {
    constructor() {
        let servicio = "Servicios/WSLogin.svc/";
        super(servicio);
    }
}