import { JetView } from "webix-jet";
import { vista } from "models/administracion/vista";
import { GridBase } from "views/GridBase";
import { FrmVista } from "views/administracion/FrmVista"

export default class GridVistas extends GridBase {
    constructor(app, name) {
        let columns = [
            { id: "_id", fillspace: true, hidden: true },
            { id: "icon",MongoField:"idVista", header: ["Id", { content: "textFilter" }], width: 150 },
            { id: "icon",MongoField:"icon", header: ["Icono", { content: "textFilter" }], width: 200 },
            { id: "Nombre",MongoField:"Nombre", header: ["Nombre", { content: "textFilter" }], fillspace: true }
        ];

        let Vista = new vista();

        super(app, name, columns, Vista);
    }
    init(view) {
        this.$$(this.Grid).attachEvent("onItemDblClick", (id, e, node) => {
            var item = $$(this.Grid).getItem(id);

            console.log("double click");
            this.FrmVista = this.ui(FrmVista);
            this.FrmVista.showWindow(item._id);
        });

        super.init(view);
    }
}