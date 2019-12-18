import { JetView } from "webix-jet";
import { cajeros } from "models/pventa/cajeros";
import { GridBase } from "views/GridBase";
import { FrmTipoComponente } from "views/inventarios/FrmTipoComponente";
import { FrmPuntoVenta } from "views/FrmPuntoVenta"
import { puntoVenta } from "models/pventa/puntoVenta";


export default class GridPuntoVenta extends JetView {
    constructor(app, name) {
        super(app,name);
    }

    config() { 
        return{
            
        };
    }

    init(view) {
        //console.log("grid init");
        let puntoventa = new puntoVenta();
        this.FrmPuntoVenta = this.ui(FrmPuntoVenta);
        
        puntoventa.validarApertura().then((realdata) => {
            this.FrmPuntoVenta.setApertura(realdata.json())
            this.FrmPuntoVenta.showWindow();
        }).fail((error) => {
            webix.alert({
                type: "alert-error",
                text: "Error: " + error.statusText
            });
        });
    }
    
}