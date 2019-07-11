import { JetView } from "webix-jet";
import { FrmBase } from "views/FrmBase";
import { tipoimpuesto } from "models/pventa/tipoimpuesto";
import { impuestos } from "models/pventa/impuestos";
import { getTipoCalculo, getTipoIva } from "models/generales";

export class FrmImpuestos extends FrmBase {
    constructor(app, name) {
        //Genera un idetificador unico para la ventana con el 
        //objetivo de poder generar varias instancias
        let id = new Date().getTime();       

        let form = {
            title: "Impuestos",
            width: 400,
            elements: [                        
                { view: "text", name: "_id", hidden: true },                
                { view: "text", name: "Nombre", labelWidth: 125, label: "Nombre" },
                {
                    view: "combo",
                    name: "TipoImpuesto._id",
                    id: "cmbTipoImpuesto" + id,
                    labelWidth: 125,
                    label: "Tipo de impuesto",
                    options: {
                        body: {
                            template: "#Nombre#",
                            dataFeed: function(text) {
                                let tipoimp = new tipoimpuesto();
                                this.load(tipoimp.searchCombo(text));
                            }
                        }
                    }
                },
                { view: "combo", name: "TipoCalculo", labelWidth: 125, id: "TipoCalculo", label: "Tipo de calculo", options:  getTipoCalculo()},
                { view: "text", name: "Tasa", id: "Tasa", labelWidth: 125, label: "Tasa (%)" },
                { view: "combo", name: "TipoIva", labelWidth: 125, id: "TipoIva", label: "Tipo de IVA", options:  getTipoIva()},
                { view: "text", name: "Clave", id: "Clave", labelWidth: 125, label: "Clave" },
                { view: "checkbox", id: "Predeterminado", name: "Predeterminado",labelRight:"Usar como valor predeterminado",uncheckValue:0, checkValue:1, labelWidth:0}, 
            ],

            rules: {
                //$all: webix.rules.isNotEmpty,
                "Nombre": webix.rules.isNotEmpty,
                "TipoImpuesto._id": webix.rules.isNotEmpty,
                "TipoCalculo": webix.rules.isNotEmpty,
                "Tasa": webix.rules.isNotEmpty
            }
        };

        let impuesto = new impuestos();        

        super(app, name, form, impuesto, id);
    }

    init(view) {
        webix.extend($$(this.Ventana), webix.ProgressBar);

        $$("cmbTipoImpuesto" + this.id).attachEvent("onChange", (newv, oldv) => {
            let tipo = $$("cmbTipoImpuesto" + this.id).getValue();
            //console.log(valorNaturaleza);
            if(tipo=="5d23db9e92a3d90df00280ed"){
                this.$$("TipoIva").enable();   
            }else{
                this.$$("TipoIva").disable();
                this.$$("TipoIva").setValue('');
            }
        });        
    }

    cargarCombos(data) {
        this.cargarCombo(this.$$("cmbTipoImpuesto" + this.id), data.TipoImpuesto);
        //this.cargarCombo(this.$$("cmbPais" + this.id), data.Paises);
    }
    
    cargarChecks(data){
        this.$$("Predeterminado").value=data.Predeterminado;
    }

}