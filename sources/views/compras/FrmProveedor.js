import { JetView } from "webix-jet";
import { FrmBase } from "views/FrmBase";
import { proveedor } from "models/compras/proveedor";
import { tipoproveedor } from "models/compras/tipoproveedor";
import { getSiNo, getTipoAlmacen, getEstatus, getMetodoCosteo } from "models/generales";

export class FrmProveedor extends FrmBase {
    constructor(app, name) {
        let id = new Date().getTime();
        let form = {
            title: "Proveedor",
            width: 600,
            elements: [{
                    view: "fieldset",
                    label: "Datos Generales",
                    id: "fieldsetDatosProveedor" + id,
                    type: "space",
                    body: {
                        rows: [
                            { view: "text", name: "_id", hidden: true },
                            { view: "text", name: "Nombre", label: "Nombre:", labelWidth: 140 },
                            {
                                cols: [
                                    { view: "text", name: "Clave", labelWidth: 140, label: "Clave" },
                                    { view: "text", name: "RFC", labelWidth: 140, label: "RFC" },
                                ]
                            },
                            {
                                cols: [
                                    { view: "text", name: "Contacto", labelWidth: 140, label: "Contacto" },
                                    {
                                        view: "combo",
                                        name: "TipoProveedor._id",
                                        labelWidth: 140,
                                        id: "cmbTipoProveedor" + id,
                                        label: "Tipo Proveedor",
                                        options: {
                                            body: {
                                                template: "#Nombre#",
                                                dataFeed: function(text) {
                                                    let tipoproveedors = new tipoproveedor();
                                                    this.load(tipoproveedors.searchCombo(text));
                                                }
                                            }
                                        }
                                    },
                                ]
                            }
                        ]
                    }
                },
                {
                    view: "fieldset",
                    label: "Datos Proveedor",
                    id: "fieldsetDatosProveedor" + id,
                    type: "space",
                    body: {
                        rows: [
                            { view: "text", name: "Direccion", label: "Direccion:", labelWidth: 140 },
                        ]
                    }
                },
            ],
            rules: {

                "Nombre": webix.rules.isNotEmpty,
                "RFC": webix.rules.isNotEmpty,
                "Clave": webix.rules.isNotEmpty,
                "Contacto": webix.rules.isNotEmpty,
                "Direccion": webix.rules.isNotEmpty,
                "TipoProveedor._id": webix.rules.isNotEmpty,
                //"PorcentajeVariacionCosto": webix.rules.isNotEmpty
                //$all: webix.rules.isNotEmpty

            }
        };

        let proveedors = new proveedor();

        super(app, name, form, proveedors, id);
    }
    init(view) {
        webix.extend($$(this.Ventana), webix.ProgressBar);
    }

    cargarCombos(data) {
        console.log(data);
        this.cargarCombo(this.$$("cmbTipoProveedor" + this.id), data.TipoProveedor);
    }
}