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
}