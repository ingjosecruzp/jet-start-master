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
            width: 500,
            elements: [
                { view: "text", name: "_id", hidden: true },
                {cols: [
                    { view: "datepicker", id: "Fecha" + id, disabled:true, label: "Fecha", labelWidth: 50, inputWidth: 200, name: "Fecha", stringResult: true, format: "%d  %M  %Y", value: new Date() },
                    { view: "datepicker", id: "Hora" + id, disabled:true, label: "Hora", labelWidth: 50, inputWidth: 200, name: "Hora", stringResult: true, format: "%h:%m:%s %A", value: new Date() },
                ]},
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
                            view:"list",
                            dataFeed: function(text) {
                                let caja = new cajas();
                                this.load(caja.searchXCajasCerradas(text));
                            }
                        }
                    }, 
                    required:true
                },
                // {
                //     view: "combo",
                //     name: "Cajeros._id",
                //     labelWidth: 140,
                //     id: "cmbCajeros" + id,
                //     label: "Cajeros",
                //     options: {
                //         body: {
                //             template: "#Nombre#",
                //             dataFeed: function(text) {
                //                 let cajero = new cajeros();
                //                 this.load(cajero.searchCombo(text));
                //             }
                //         }
                //     }
                // },
                // {
                //     view: "combo",
                //     name: "FormaCobro._id",
                //     labelWidth: 140,
                //     id: "cmbformacobro" + id,
                //     label: "Forma de Cobro",
                //     options: {
                //         body: {
                //             template: "#Nombre#",
                //             dataFeed: function(text) {
                //                 let formcobro = new formacobro();
                //                 this.load(formcobro.searchCombo(text));
                //             }
                //         }
                //     }
                // },
                // { view: "text", name: "FormaEmitida", label: "Forma Emitida", labelWidth: 140 },
                // { view: "text", name: "Importe", label: "Importe", labelWidth: 140 }
                {
                    view:"datatable",
                    height: 200,
                    width: 500,
                    id: "gridCierre" + id,
                    select: "cell",
                    liveValidation: true,
                    editable: true,
                    columns:[
                      { id:"id", css:"rank"},
                      { id:"cobro", header:"Forma de cobro", width:225},
                      { id:"moneda", header:"Moneda", width:130},
                      { id:"importe", editor:"text", header:"Importe", width:100}
                    ],
                    data: [
                      {importe: 0.0}
                    ]
                  }

            ],
            rules: {
                $all: webix.rules.isNotEmpty,
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
        
        $$("gridCierre" + this.id).clearAll();

        let formadecobro = new formacobro();
        formadecobro.getAllData().then((realdata) => {
            var data = realdata.json();
            console.log(data);
            for (let index = 0; index < data.length; index++) {
                const element = data[index];
                let forma = {
                    id: element.id,
                    cobro: element.Nombre,
                    moneda: element.Moneda.Simbolo,
                    importe: 0.00
                }
                $$("gridCierre" + this.id).add(forma);
            }
        });
        $$("gridCierre" + this.id).hideColumn("id");
    }
    guardar() {
        let dataF = {};
        let data = this.$$(this.Formulario).getValues();
        data.Fecha = this.convertToJSONDate(data.Fecha);

        dataF._id = data._id;
        dataF.Cajas = data.Cajas;
        dataF.Fecha = data.Fecha;

        let Detalles_ES = [];

        //Obtiene los valores del grid
        $$("gridCierre" + this.id).eachRow((row) => {
            let record = $$("gridCierre" + this.id).getItem(row);

            //Se crea el objecto articulo el cual se añadira al movimiento
            if (record.importe != undefined && record.importe != 0) {
                let forma = {
                    _id: record.id,
                    Nombre: record.cobro,
                    importe: record.importe
                };
                Detalles_ES.push(forma);
            }
        });

        if(Detalles_ES.length == 0){
            webix.message({type:"error", text:"NO SE HA COLOCADO IMPORTE EN LAS FORMAS DE COBRO"});
            return;
        }

        dataF.FormasCobro = Detalles_ES;

        console.log(dataF);
        super.guardar(data);
    }
    cargarCombos(data) {
        console.log(data);
        $$("Fecha" + this.id).setValue(this.convertToDate(data.Fecha));
        this.cargarCombo(this.$$("cmbCajas" + this.id), data.Cajas);
        // this.cargarCombo(this.$$("cmbformacobro" + this.id), data.FormaCobro);
        this.cargarCombo(this.$$("cmbCajeros" + this.id), data.Cajeros);
    }
}