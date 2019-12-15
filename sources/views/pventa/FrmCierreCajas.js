import { JetView } from "webix-jet";
import { FrmBase } from "views/FrmBase";
import { CierreCajas } from "models/pventa/CierreCajas";
import { getSiNo } from "models/generales";

import { cajas } from "models/pventa/cajas";
import { cajeros } from "models/pventa/cajeros";
import { formacobro } from "models/pventa/formacobro";


//import { almacenes } from "models/catalogos/almacenes";
//import { getCajasRegVta, getCajasCobroDefault } from "models/generales";

export class FrmCierreCajas extends FrmBase {
	 constructor(app, name) {
        let id = new Date().getTime();
        
        let form = {
            title: "Cierre Cajas",
            width: 400,
            elements: [
                { view: "text", name: "_id", hidden: true },
                { view: "datepicker", id: "Fecha" + id,disabled:true, label: "Fecha", labelWidth: 140, name: "Fecha", stringResult: true, format: "%d  %M  %Y", value: new Date() },
                //{ view: "text", name: "TipoMovto", label: "Tipo Movimiento", labelWidth: 140 },
                {
                    view: "combo",
                    name: "Cajas._id",
                    labelWidth: 140,
                    id: "cmbCajas" + id,
                    label: "Cajas",
                    options: {
                        body: {
                            template: "#Nombre#",
                            dataFeed: function(text) {
                                let caja = new cajas();
                                this.load(caja.searchXCajasCerradas(text));
                            }
                        }
                    }
                },
                {
                    view: "combo",
                    name: "Cajeros._id",
                    labelWidth: 140,
                    id: "cmbCajeros" + id,
                    label: "Cajeros",
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
                {
                    view: "combo",
                    name: "FormaCobro._id",
                    labelWidth: 140,
                    id: "cmbformacobro" + id,
                    label: "Forma de Cobro",
                    options: {
                        body: {
                            template: "#Nombre#",
                            dataFeed: function(text) {
                                let formcobro = new formacobro();
                                this.load(formcobro.searchCombo(text));
                            }
                        }
                    }
                },
                { view: "text", name: "Importe", label: "Importe", labelWidth: 140 }

            ],
            rules: {
                //$all: webix.rules.isNotEmpty
                //"Importe": webix.rules.isNotEmpty,
                //"TipoMovto": webix.rules.isNotEmpty
                //"Simbolo": webix.rules.isNotEmpty,
                //"ClaveFiscal": webix.rules.isNotEmpty,
                //"ClaveInterna": webix.rules.isNotEmpty

            }
        };

        let CierreCaja = new CierreCajas();
        super(app, name, form, CierreCaja, id);
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
        this.cargarCombo(this.$$("cmbformacobro" + this.id), data.FormaCobro);
        this.cargarCombo(this.$$("cmbCajeros" + this.id), data.Cajeros);
    }
}