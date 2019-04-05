import { JetView } from "webix-jet";
import { usuario } from "models/catalogos/usuario";
import { GridBase } from "views/GridBase";
import { FrmUsuarios } from "views/administracion/FrmUsuarios";

export default class GridUsuarios extends GridBase {
    constructor(app, name) {
        let columns = [
            { id: "_id", fillspace: true, hidden: true },
            { id: "Nombre", header: ["Nombre", { content: "textFilter" }], width: 150 },
            { id: "NombreCompleto", header: ["NombreCompleto", { content: "textFilter" }], fillspace: true },
            { id: "Status", header: ["Status", { content: "textFilter" }], width: 150 }
        ];

        let usr = new usuario();

        super(app, name, columns, usr);
    }
    init(view) {
        this.$$(this.Grid).attachEvent("onItemDblClick", (id, e, node) => {
            var item = $$(this.Grid).getItem(id);

            console.log("double click");
            this.FrmUsuarios = this.ui(FrmUsuarios);
            this.FrmUsuarios.showWindow(item._id);
        });

        super.init(view);
    }
}