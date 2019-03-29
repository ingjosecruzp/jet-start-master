import { JetView } from "webix-jet";
import { ReporteBase } from "../ReporteBase";

export class existencias extends ReporteBase {
    constructor() {
        //let servicio = "/Servicios/Reportes/Inventarios/WcfExistenciaValorInventario.svc/?searchBy=VerRptExistencia";
        let servicio = "/Servicios/Reportes/Inventarios/WcfExistenciaValorInventario.svc/";
        super(servicio);
    }
}