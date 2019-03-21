import { JetView } from "webix-jet";
import { paises } from "models/catalogos/paises";
import { FrmPaises } from "views/FrmPaises";
import { GridBase } from "views/GridBase";

export default class GridPaises extends GridBase {
    constructor(app, name) {
        let columns = [
            { id: "_id", fillspace: true, hidden: true },
            { id: "Abreviatura", header: ["Abreviatura", { content: "textFilter" }], width: 150 },
            { id: "Nombre", header: ["Nombre", { content: "textFilter" }], fillspace: true },
        ];

        let pais = new paises();

        super(app, name, columns, pais);
    }
    init(view) {
        this.$$(this.Grid).attachEvent("onItemDblClick", (id, e, node) => {
            var item = $$(this.Grid).getItem(id);
            this.FrmPaises = this.ui(FrmPaises);
            this.FrmPaises.showWindow(item._id);
        });

        super.init(view);
    }
}