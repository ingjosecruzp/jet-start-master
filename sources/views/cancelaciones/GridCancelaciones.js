import { JetView } from "webix-jet";
import { GridCancelacionesBase } from "views/cancelaciones/GridCancelacionesBase";
import { puntoVenta } from "models/pventa/puntoVenta";

export class GridCancelaciones extends GridCancelacionesBase {

    constructor(app, name) {
        let id = new Date().getTime();

        let form = {
            title: "Cancelaciones",
            width: 750,
            elements: [{
                    cols: [
                        {
                            view: "datatable",
                            footer:true,
                            id: "gridVentas" + id,
                            height: 450,
                            columns: [
                                { id: "_id", header: "_id", hidden: true },
                                { id: "ch1", header: { content: "masterCheckbox" }, checkValue: 'on', uncheckValue: 'off', template: "{common.checkbox()}", width: 40,},
                                { id: "Folio", width: 80, MongoField:"Folio",header: ["Folio", { content: "textFilter" }]},
                                { id: "Fecha", MongoField:"Fecha",header: ["Fecha", { content: "dateRangeFilter" }], format:webix.i18n.longDateFormatStr, width: 150},
                                { id: "Caja", MongoField:"Caja.Nombre",header: ["Caja", { content: "textFilter" }], fillspace: true },
                                { id: "Cajero", MongoField:"Cajero.Nombre",header: ["Cajero", { content: "textFilter" }], fillspace: true,
                                    footer: { content:"rowCount",css: { "text-align": "right  !important" }} },
                                { id: "Total", MongoField:"TotalVenta",header: ["Total", { content: "numberFilter" }], fillspace: true, 
                                    footer: { content:"totalVentaColumna",css: { "text-align": "right  !important" }}},
                            ]
                        }
                    ]

                }
            ],
            rules: {
                //$all: webix.rules.isNotEmpty
            }
        };

        let pventa = new puntoVenta();
        super(app, name, form, pventa, id);

        webix.ui.datafilter.totalVentaColumna = webix.extend({
            refresh:function(master, node, value){ 
                var result = 0;
                master.data.each(function(obj){
                if (obj.ch1 == "on") 
                    result += obj.Total;
                });
                node.firstChild.innerHTML = "TOTAL: " + webix.i18n.priceFormat(result);
            }
          }, webix.ui.datafilter.summColumn);

          webix.ui.datafilter.serverDateRangeFilter = webix.extend({
            $server:true
          }, webix.ui.datafilter.dateRangeFilter);
    }
    init(view) {
        let self = this;
        webix.extend($$(this.Ventana), webix.ProgressBar);
        $$("gridVentas" + this.id).getFilter("Fecha").attachEvent("onChange", (newv, oldv) => {
            if(newv.end != null && newv.start != null){
                $$("gridVentas" + this.id).clearAll();
                this.cargarVentas(newv);
            }
        });
    }

    cargarVentas(date){
        let self = this;
        let start = this.convertToJSONDate(date.start);
        let end = this.convertToJSONDate(date.end);

        this.showProgressBar();
        let puntoventa = new puntoVenta();
        puntoventa.getACancelar(start, end).then((realdata) => {
            let data = realdata.json();
            for (let index = 0; index < data.length; index++) {
                let element = data[index];
                $$("gridVentas" + this.id).add({
                    _id: element._id,
                    Folio: element.Folio,
                    Fecha: new Date(self.convertToDate(element.Fecha)),
                    Caja: element.hasOwnProperty("Caja") ? element.Caja.Nombre : "S/C",
                    Cajero: element.Cajero.Nombre,
                    Total: element.TotalVenta,
                    ch1: "off"
                });
            }
            this.hiddenProgressBar();
        }).fail((error) => {
            webix.alert({
                type: "alert-error",
                text: "Error: " + error.statusText
            });
            this.hiddenProgressBar();
        });
    }


    guardar(){
        let data = {};
        let PuntoVenta_Documentos = [];
        $$("gridVentas" + this.id).eachRow((row) => {
            let record = $$("gridVentas" + this.id).getItem(row);
            if (record.ch1 == "on") {
                PuntoVenta_Documentos.push({
                    _id: record._id,
                    Folio: record.Folio
                });
            }
        });

        if(data.length == 0){
            webix.alert({
                type: "alert-error",
                text: "Se debe de seleccionar al menos una venta."
            });
            return;
        }
        data.PuntoVenta_Documentos = PuntoVenta_Documentos;
        super.guardar(data);
    }

    save(data) {
        let self = this;
        let pventa = new puntoVenta();
        pventa.saveCancelacion(data).then((realdata) => {
            this.hiddenProgressBar();
            webix.alert("Guardado con exito", (result) => {
                $$("gridVentas" + this.id).clearAll();
                $$("gridVentas" + self.id).getFilter("Fecha").setValue(null);
            });
        }).fail((error) => {
            webix.alert({
                type: "alert-error",
                text: "Error: " + error.statusText
            });
            this.hiddenProgressBar();
        });
    }
}