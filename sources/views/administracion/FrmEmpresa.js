import { JetView } from "webix-jet";
import { FrmBase } from "views/FrmBase";
import { bdempresas } from "models/catalogos/bdempresas";
import { getSiNo, getTipoAlmacen, getEstatus, getMetodoCosteo } from "models/generales";

export class FrmEmpresa extends FrmBase {
    constructor(app, name) {
        let id = new Date().getTime();
        let form = {
            title: "Empresa",
            width: 600,
            elements: [{
                    view: "fieldset",
                    label: "Datos De La Empresa",
                    id: "fieldsetDatosEmpresa" + id,
                    type: "space",
                    body: {
                        rows: [
                            { view: "text", name: "_id", hidden: true },
                            { view: "text", name: "RazonSocial", label: "Razon Social", labelWidth: 140 },
                            {
                                cols: [
                                    { view: "text", name: "RFC", labelWidth: 140, label: "RFC" },
                                    { view: "combo", name: "Status", labelWidth: 100, label: "Estatus", options: getEstatus() },
                                ]
                            }
                        ]
                    }
                },
                {
                    view: "fieldset",
                    label: "Configuracion de Inventarios",
                    id: "fieldsetConfiguracionInventarios" + id,
                    type: "space",
                    body: {
                        rows: [{
                                cols: [
                                    { view: "combo", name: "MetodoCosteo", labelWidth: 140, label: "Metodo de Costeo", options: getMetodoCosteo() },
                                    { view: "combo", name: "SalidasSinExistencia", labelWidth: 140, label: "Salidas Sin Existencia", options: getSiNo() },
                                ]
                            },
                            {
                                cols: [
                                    { view: "combo", name: "ValidaVariacionCosto", labelWidth: 140, label: "Variacion de Costo", options: getSiNo() },
                                    { view: "text", name: "PorcentajeVariacionCosto", labelWidth: 140, label: "Porcentaje Variacion de Costo" },
                                ]
                            }
                        ]
                    }
                },
                {
                    view: "fieldset",
                    label: "Configuracion del Periodo",
                    id: "fieldsetConfiguracionPeriodo" + id,
                    type: "space",
                    body: {
                        rows: [{
                            cols: [
                                { view: "datepicker", id: "DtpFechaInicio" + id, label: "Fecha Inicio", labelWidth: 100, name: "InicioPeriodo", stringResult: true, format: "%d  %M %Y", value: new Date() },
                                { view: "datepicker", id: "DtpFechaFin" + id, label: "Fecha Fin", labelWidth: 100, name: "FinPeriodo", stringResult: true, format: "%d  %M %Y", value: new Date() },
                            ]
                        }, ]
                    }
                },
            ],
            rules: {

                "RazonSocial": webix.rules.isNotEmpty,
                "RFC": webix.rules.isNotEmpty,
                "Status": webix.rules.isNotEmpty,
                "MetodoCosteo": webix.rules.isNotEmpty,
                "SalidasSinExistencia": webix.rules.isNotEmpty,
                "ValidaVariacionCosto": webix.rules.isNotEmpty,
                "PorcentajeVariacionCosto": webix.rules.isNotEmpty
                    //$all: webix.rules.isNotEmpty

            }
        };

        let Empresa = new bdempresas();

        super(app, name, form, Empresa, id);
    }
    init(view) {
        webix.extend($$(this.Ventana), webix.ProgressBar);
    }
    guardar() {
        let data = this.$$(this.Formulario).getValues();
        console.log(data.InicioPeriodo);
        data.InicioPeriodo = this.convertToJSONDate(data.InicioPeriodo);
        data.FinPeriodo = this.convertToJSONDate(data.FinPeriodo);
        //return;
        data.Nombre = "";
        super.guardar(data);
    }

    cargarCombos(data) {
        $$("DtpFechaInicio" + this.id).setValue(this.convertToDate(data.InicioPeriodo));
        $$("DtpFechaFin" + this.id).setValue(this.convertToDate(data.FinPeriodo));
    }
}