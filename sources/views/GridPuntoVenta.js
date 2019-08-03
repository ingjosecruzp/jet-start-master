import { JetView } from "webix-jet";
import { cajeros } from "models/pventa/cajeros";
import { GridBase } from "views/GridBase";
import { FrmTipoComponente } from "views/inventarios/FrmTipoComponente";
import { FrmPuntoVenta } from "views/FrmPuntoVenta"


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
        this.FrmPuntoVenta = this.ui(FrmPuntoVenta);
        this.FrmPuntoVenta.showWindow();
    }
    
}