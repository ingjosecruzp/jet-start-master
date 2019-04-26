import { JetView } from "webix-jet";
//import {data} from "models/records";

export class GridBase extends JetView {
    constructor(app, name, columns, model, formulario) {
        super(app, name);

        this.Grid = "Grid" + new Date().getTime();
        this.columns = columns;
        this.Modelo = model;
        this.Formulario = formulario;
    }
    config() {
        return {
            view: "datatable",
            //autoConfig: true,
            columns: this.columns,
            //autoheight: true,
            //autowidth: true,
            //data: data,
            //css: "webix_shadow_medium",
            id: this.Grid,
            select: "row",
            on: {
                onBeforeLoad: function() {
                    this.showOverlay("Loading...");
                },
                onAfterLoad: function() {
                    this.hideOverlay();
                }
            }
        };
    }
    init(view) {
        view.parse(this.Modelo.getAllData());
        this.$$(this.Grid).showOverlay("Cargando...");
    }
    convertToJSONDate(strDate) {
        var dt = new Date(strDate);
        var newDate = new Date(Date.UTC(dt.getFullYear(), dt.getMonth(), dt.getDate(), dt.getHours(), dt.getMinutes(), dt.getSeconds(), dt.getMilliseconds()));
        return '/Date(' + newDate.getTime() + ')/';
    }
    convertToDate(strDate) {
        var seconds = parseInt(strDate.replace(/\/Date\(([0-9]+)[^+]\//i, "$1"));
        var date = new Date(seconds);

        var dateString =
            date.getUTCFullYear() + "/" +
            ("0" + (date.getUTCMonth() + 1)).slice(-2) + "/" +
            ("0" + date.getUTCDate()).slice(-2)
            /* + " " +
                        ("0" + date.getUTCHours()).slice(-2) + ":" +
                        ("0" + date.getUTCMinutes()).slice(-2) + ":" +
                        ("0" + date.getUTCSeconds()).slice(-2)*/
        ;

        return dateString;
    }
}