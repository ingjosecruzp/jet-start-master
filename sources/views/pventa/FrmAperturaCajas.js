import { JetView } from "webix-jet";
import { FrmBase } from "views/FrmBase";
import { aperturadecajas } from "models/pventa/aperturadecajas";
import {cajeros} from "models/pventa/cajeros";
import { getSiNo } from "models/generales";
import {formacobro} from "models/pventa/formacobro";
import {cajas} from "models/pventa/cajas";

export class FrmAperturaCajas extends FrmBase {
    constructor(app, name) {
        let id = new Date().getTime();
        let form = {
            title: "Apertura de cajas",
            width: 400,
            elements: [
                { view: "text", name: "_id", hidden: true },
                {   view: "combo", 
                    name: "Cajas", 
                    id:"cmbCajas",
                    label: "Caja", 
                    labelWidth: 140,
                    options: {
                        body: {
                            template: "#TipoMovto#",
                            dataFeed: function(text) {
                                let caja = new cajas();
                                this.load(caja.searchCombo(text));
                            }
                        }
                    }
                },
                
                {   view: "combo", 
                    name: "Cajeros", 
                    id:"cmbCajeros",
                    label: "Cajero", 
                    labelWidth: 140,
                    options: {
                        body: {
                            template: "#Nombre#",
                            dataFeed: function(text) {
                                let cajero = new cajeros();
                                this.load(cajero.searchCombo(text));
                            }
                        }
                    }
                },
                {   view: "combo", 
                    name: "FormadeCobro", 
                    id:"cmbFormaCobro",
                    label: "Forma de cobro", 
                    labelWidth: 140,
                    options: {
                        body: {
                            template: "#Nombre#",
                            dataFeed: function(text) {
                                let formadecobro = new formacobro();
                                this.load(formadecobro.searchCombo(text));
                            }
                        }
                    }
                },
               // { view: "combo", name: "Cajeros", label: "Cajeros", labelWidth: 140 },
                { view: "text", name: "FormaEmitida", label: "Forma emitida", labelWidth: 140 },
                //{ view: "text", name: "FormaCobro", label: "Forma de cobra", labelWidth: 140 },
                { view: "text", name: "Importe", label: "Importe", labelWidth: 140 }

            ],
            rules: {
                $all: webix.rules.isNotEmpty
               // "Nombre": webix.rules.isNotEmpty
            }
        };

        let aperturaCajas = new aperturadecajas();

        super(app, name, form, aperturaCajas, id);
    }
    init(view) {
        webix.extend($$(this.Ventana), webix.ProgressBar);
    }

    cargarCombos(data) {
        this.cargarCombo(this.$$("cmbTipoMovto" + this.id), data.Movtos_Cajas);
        this.cargarCombo(this.$$("cmbCajeros" + this.id), data.cajeros);
        this.cargarCombo(this.$$("cmbFormaCobro" + this.id), data.formacobro);
    }
    
}

