import { JetView } from "webix-jet";
import { movimientosES } from "models/inventarios/movimientosES";
import { GridBase } from "views/GridBase";
import { FrmDepartamento } from "views/FrmDepartamento";

export default class GridEntradas extends GridBase {
    constructor(app, name) {
        let columns = [
            { id: "_id", fillspace: true, hidden: true },
            { id: "Fecha", header: ["Fecha", { content: "textFilter" }] },
            { id: "Folio", header: ["Folio", { content: "textFilter" }] },
            { id: "Almacen", template: (obj) => { return obj.Almacen.Nombre }, header: ["Almacen", { content: "textFilter" }] },
            { id: "Concepto", template: (obj) => { return obj.Concepto.Nombre }, header: ["Concepto", { content: "textFilter" }], fillspace: true }
        ];

        let movimientos = new movimientosES("ENTRADA");

        super(app, name, columns, movimientos);
    }
    init(view) {
        this.$$(this.Grid).attachEvent("onItemDblClick", (id, e, node) => {
            var item = $$(this.Grid).getItem(id);

            console.log("double click");
            this.FrmDepartamento = this.ui(FrmDepartamento);
            this.FrmDepartamento.showWindow(item._id);
        });

        super.init(view);
    }
}