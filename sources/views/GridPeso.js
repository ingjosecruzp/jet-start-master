import { JetView } from "webix-jet";
import { peso } from "models/inventarios/peso";
import { GridBase } from "views/GridBase";
import { FrmPeso } from "views/inventarios/FrmPeso"

export default class GridPeso extends GridBase {
    constructor(app, name) {
        let columns = [
            { id: "_id", fillspace: true, hidden: true },
            { id: "Nombre", header: ["Nombre", { content: "textFilter" }], fillspace: true }
        ];

        let pesos = new peso();

        super(app, name, columns, pesos);
    }
    init(view) {
        this.$$(this.Grid).attachEvent("onItemDblClick", (id, e, node) => {
            var item = $$(this.Grid).getItem(id);

            console.log("double click");
            this.FrmPeso = this.ui(FrmPeso);
            this.FrmPeso.showWindow(item._id);
        });

        super.init(view);
    }
}