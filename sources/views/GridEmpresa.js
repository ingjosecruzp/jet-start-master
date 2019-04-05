import { JetView } from "webix-jet";
import { bdempresas } from "models/catalogos/bdempresas";
import { GridBase } from "views/GridBase";
import { FrmEmpresa } from "views/administracion/FrmEmpresa";

export default class GridEmpresa extends GridBase {
    constructor(app, name) {
        let columns = [
            { id: "_id", fillspace: true, hidden: true },
            { id: "RazonSocial", header: ["RazonSocial", { content: "textFilter" }], width: 150 },
            { id: "RFC", header: ["RFC", { content: "textFilter" }], width: 150 },
            { id: "Status", header: ["Status", { content: "textFilter" }], width: 150 },
            { id: "MetodoCosteo", header: ["MetodoCosteo", { content: "textFilter" }], fillspace: true }
        ];

        let empresa = new bdempresas();

        super(app, name, columns, empresa);
    }
    init(view) {
        this.$$(this.Grid).attachEvent("onItemDblClick", (id, e, node) => {
            var item = $$(this.Grid).getItem(id);

            console.log("double click");
            this.FrmEmpresa = this.ui(FrmEmpresa);
            this.FrmEmpresa.showWindow(item._id);
        });

        super.init(view);
    }
}