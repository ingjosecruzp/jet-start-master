import { JetView } from "webix-jet";
import { movimientosES } from "models/inventarios/movimientosES";
import { GridBase } from "views/GridBase";
import { FrmSalida } from "views/inventarios/FrmSalida";

export default class GridSalida extends GridBase {
    constructor(app, name) {
        let columns = [
            { id: "_id", fillspace: true, hidden: true },
            { id: "Fecha", MongoField:"Fecha",template: (obj) => { return this.convertToDate(obj.Fecha) }, header: ["Fecha", { content: "textFilter" }] },
            { id: "Folio", MongoField:"Folio",header: ["Folio", { content: "textFilter" }] },
            { id: "Almacen", MongoField:"Almacen.Nombre",template: (obj) => { return obj.Almacen.Nombre }, header: ["Almacen", { content: "textFilter" }] },
            { id: "Concepto",MongoField:"Concepto.Nombre", template: (obj) => { return obj.Concepto.Nombre }, header: ["Concepto", { content: "textFilter" }], fillspace: true }
        ];

        let movimientos = new movimientosES("SALIDA");

        super(app, name, columns, movimientos);
    }
    init(view) {
        this.$$(this.Grid).attachEvent("onItemDblClick", (id, e, node) => {
            var item = $$(this.Grid).getItem(id);

            this.FrmSalida = this.ui(FrmSalida);
            this.FrmSalida.showWindow(item._id);
        });

        super.init(view);
    }
}