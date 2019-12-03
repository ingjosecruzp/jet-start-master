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
                { view: "datepicker", id: "Fecha" + id,disabled:true, label: "Fecha", labelWidth: 140, name: "Fecha", stringResult: true, format: "%d  %M  %Y", value: new Date() },
                {   view: "combo", 
                    name: "Cajas._id", 
                    id:"cmbCajas",
                    label: "Caja", 
                    labelWidth: 140,
                    options: {
                        body: {
                            template: "#Nombre#",
                            dataFeed: function(text) {
                                let caja = new cajas();
                                this.load(caja.searchCombo(text));
                            }
                        }
                    }
                },
                
                {   view: "combo", 
                    name: "Cajeros._id", 
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
                    name: "FormaCobro._id", 
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
                { view: "text", name: "FormaEmitida", label: "Forma emitida", labelWidth: 140 },
                { view: "text", name: "Importe", label: "Importe", labelWidth: 140 }

            ],
            rules: {
               // $all: webix.rules.isNotEmpty
               // "Nombre": webix.rules.isNotEmpty
            }
        };

        let aperturaCajas = new aperturadecajas();

        super(app, name, form, aperturaCajas, id);
    }
    init(view) {
        webix.extend($$(this.Ventana), webix.ProgressBar);
    }
    guardar() {
        let data = this.$$(this.Formulario).getValues();

      data.Fecha = this.convertToJSONDate(data.Fecha);
        console.log(data);
        super.guardar(data);
   }
    cargarCombos(data) {
        console.log(data);
        $$("Fecha" + this.id).setValue(this.convertToDate(data.Fecha));
        this.cargarCombo(this.$$("cmbCajas" + this.id), data.Cajas);
     //   this.cargarCombo(this.$$("cmbCajeros" + this.id), data.Cajeros);
       // this.cargarCombo(this.$$("cmbFormaCobro" + this.id), data.FormaCobro);
    }
    
}

