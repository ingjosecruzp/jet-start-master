import { JetView } from "webix-jet";
import { FrmBase } from "views/FrmBase";
import { cajas } from "models/pventa/cajas";
import { almacenes } from "models/catalogos/almacenes";
import { getCajasRegVta, getCajasCobroDefault } from "models/generales";

export class FrmCajas extends FrmBase {
    constructor(app, name) {
        //Genera un idetificador unico para la ventana con el 
        //objetivo de poder generar varias instancias
        let id = new Date().getTime();

        let form = {
            title: "Cajas",
            width: 400,
            elements: [
                {
                    view: "fieldset",
                    label: "Datos",
                    id: "fieldsetDatosCaja" + id,
                    type: "space",
                    body: {
                        rows: [
                            { view: "text", name: "_id", hidden: true },                
                            { view: "text", name: "Nombre", labelWidth: 82, label: "Nombre" },
                            {
                                view: "combo",
                                name: "Almacen._id",
                                labelWidth: 82,
                                id: "CmbAlmacen" + id,
                                label: "Almacen",
                                options: {
                                    body: {
                                        template: "#Nombre#", //es el campo que sem mostrara lo agarra del json
                                        dataFeed: function(text) {
                                            let Almacen = new almacenes(); //modelo para cargar el combo
                                            this.load(Almacen.searchCombo(text));
                                        }
                                    }
                                }
                            },
                            { view: "checkbox", id: "ModAlmacenVta", name: "ModAlmacenVta",labelRight:"Modificar el almacén en las ventas",uncheckValue:0, checkValue:1},
                        ]
                    }
                },
                {
                    view: "fieldset",
                    label: "Configuracion",
                    id: "fieldsetDatosConfiguracion" + id,
                    type: "space",
                    body: {
                        rows: [
                            { view: "combo", name: "RegVtaApartir", labelWidth: 190, id: "cmbRegVtaApartir" + id, label: "Registrar ventas a partir de", options:  getCajasRegVta()},
                            { view: "combo", name: "CobroPredet", labelWidth: 190, id: "cmbCobroPredet" + id, label: "Cobro predeterminado", options:  getCajasCobroDefault()},
                            { view: "label", label: ""},
                            { view: "checkbox", id: "ManejaVendCaja", name: "ManejaVendCaja",labelRight:"Manejar vendedores en la caja",uncheckValue:0, checkValue:1, labelWidth:0}, 
                            { view: "checkbox", id: "RecibeCobroCaja",name: "RecibeCobroCaja",labelRight:"Recibir cobros en la caja",uncheckValue:0, checkValue:1, labelWidth:0},
                            { view: "checkbox", id: "PausaCobro", name: "PausaCobro",labelRight:"Presentar pausa al terminar cada cobro",uncheckValue:0, checkValue:1, labelWidth:0}
                        ]
                    }
                }                                
            ],
            rules: {
                //$all: webix.rules.isNotEmpty,
                "Nombre": webix.rules.isNotEmpty,
                "Almacen._id": webix.rules.isNotEmpty,
                "RegVtaApartir": webix.rules.isNotEmpty,
                "CobroPredet": webix.rules.isNotEmpty
            }
        };

        let caja = new cajas();

        super(app, name, form, caja, id);
    }
    init(view) {
        webix.extend($$(this.Ventana), webix.ProgressBar);
    }

    cargarCombos(data) {
        this.cargarCombo(this.$$("CmbAlmacen" + this.id), data.Almacen);
        //this.cargarCombo(this.$$("cmbPais" + this.id), data.Paises);
    }

    cargarChecks(data){
        this.$$("ModAlmacenVta").value=data.ModAlmacenVta;
        this.$$("ManejaVendCaja").value=data.ManejaVendCaja;
        this.$$("RecibeCobroCaja").value=data.RecibeCobroCaja;
        this.$$("PausaCobro").value=data.PausaCobro;
    }

}