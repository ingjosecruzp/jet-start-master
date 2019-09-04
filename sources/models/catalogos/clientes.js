import { JetView } from "webix-jet";
import { ModeloBase } from "../ModeloBase";
//modelo no se utiliza
export class clientes extends ModeloBase {
    constructor() {
        let servicio = "Servicios/Ventas/WcfClientes.svc/";
        let campos = "_id,Nombre,Rfc,RazonSocial,Pais,Contacto1,Contacto2,CondicionesDePago,TipoCliente,ZonaCliente,Moneda,Vendedor,Cobrador,LimiteCredito";

        super(servicio, campos);
    }
}