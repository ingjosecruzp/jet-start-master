import { JetView } from "webix-jet";
import { paises } from "models/catalogos/paises";
import { FrmProcedencia } from "views/inventarios/FrmProcedencia";
import { GridBase } from "views/GridBase"

export default class GridProcedencia extends GridBase {
    constructor(app, name) {
        let columns = [
            { id: "_id", fillspace: true, hidden: true },
            { id: "Nombre", header: ["Nombre", { content: "textFilter" }], width: 250 },
            { id: "Abreviatura", header: ["Abreviatura", { content: "textFilter" }], fillspace: true }
        ];

        let pais = new paises();

        super(app, name, columns, pais);
    }
    init(view) {
        this.$$(this.Grid).attachEvent("onItemDblClick", (id, e, node) => {
            var item = $$(this.Grid).getItem(id);

            console.log("double click");
            this.FrmProcedencia = this.ui(FrmProcedencia);
            this.FrmProcedencia.showWindow(item._id);
        });

        super.init(view);
    }
}