import { JetView } from "webix-jet";
import { pureza } from "models/inventarios/pureza";
import { GridBase } from "views/GridBase";
import { FrmPureza } from "views/inventarios/FrmPureza"

export default class GridPureza extends GridBase {
    constructor(app, name) {
        let columns = [
            { id: "_id", fillspace: true, hidden: true },
            { id: "Nombre", header: ["Nombre", { content: "textFilter" }], width: 150 },
            { id: "Grupo Componente", template: (obj) => { return obj.GrupoComponente.Nombre }, header: ["Grupo Componente", { content: "textFilter" }], fillspace: true },
        ];

        let preza = new pureza();

        super(app, name, columns, preza);
    }
    init(view) {
        this.$$(this.Grid).attachEvent("onItemDblClick", (id, e, node) => {
            var item = $$(this.Grid).getItem(id);

            console.log("double click");
            this.FrmPureza = this.ui(FrmPureza);
            this.FrmPureza.showWindow(item._id);
        });

        super.init(view);
    }
}