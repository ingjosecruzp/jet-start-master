import { JetView } from "webix-jet";
import { FrmImpuestos } from "views/pventa/FrmImpuestos";
import { GridBase } from "views/GridBase";
import { impuestos } from "../models/pventa/impuestos";

export default class GridImpuestos extends GridBase {
    constructor(app, name) {
        let columns = [
            { id: "_id", hidden: true },
            { id: "Nombre", MongoField:"Nombre",header: ["Nombre", { content: "textFilter" }], fillspace: true },
            { id: "TipoImpuesto", MongoField:"TipoImpuesto.Nombre",template: (obj) => { return obj.TipoImpuesto.Nombre }, header: ["Tipo Impuesto", { content: "textFilter" }], width: 150 },
            { id: "TipoCalculo", MongoField:"TipoCalculo",header: ["Tipo de Calculo", { content: "textFilter" }], width: 250 },
            { id: "Tasa", MongoField:"Tasa",header: ["Tasa (%)", { content: "textFilter" }], width: 150 }
        ];

        let impuesto = new impuestos();

        super(app, name, columns, impuesto);
    }
    init(view) {
        this.$$(this.Grid).attachEvent("onItemDblClick", (id, e, node) => {
            var item = $$(this.Grid).getItem(id);

            console.log("double click");
            this.FrmImpuestos = this.ui(FrmImpuestos);
            this.FrmImpuestos.showWindow(item._id);
        });

        super.init(view);
    }
}