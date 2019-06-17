import { JetView } from "webix-jet";
import { vendedor } from "models/pventa/vendedor";
import { GridBase } from "views/GridBase";
import { FrmVendedor } from "views/pventa/FrmVendedor"

export default class GridVendedor extends GridBase {
    constructor(app, name) {
        let columns = [
            { id: "_id", fillspace: true, hidden: true },
            { id: "Nombre", header: ["Nombre", { content: "textFilter" }], width: 350 },
            { id: "Clave", header: ["Clave", { content: "textFilter" }], width: 150 },
            { id: "ValorPredeterminado", header: ["ValorPredeterminado", { content: "textFilter" }], width: 150 },
        ];

        let vendedores = new vendedor();

        super(app, name, columns, vendedores);
    }
    init(view) {
        this.$$(this.Grid).attachEvent("onItemDblClick", (id, e, node) => {
            var item = $$(this.Grid).getItem(id);

            console.log("double click");
            this.FrmVendedor = this.ui(FrmVendedor);
            this.FrmVendedor.showWindow(item._id);
        });

        super.init(view);
    }
}