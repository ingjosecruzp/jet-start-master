import { JetView } from "webix-jet";
import { ReporteBase } from "../ReporteBase";

export class kardex extends ReporteBase {
    constructor() {
        //let servicio = "/Servicios/Reportes/Inventarios/WcfExistenciaValorInventario.svc/?searchBy=VerRptExistencia";
        let servicio = "Servicios/Reportes/Inventarios/WcfKardexArticulos.svc/";
        super(servicio);
    }
}