import { JetView } from "webix-jet";
import { puesto } from "models/catalogos/puesto";
import { GridBase } from "views/GridBase";
import { FrmPuesto } from "views/FrmPuesto"

export default class GridPuesto extends GridBase {
    constructor(app, name) {
        let columns = [
            { id: "_id", fillspace: true, hidden: true },
            { id: "Nombre", header: ["Nombre", { content: "textFilter" }], width: 150 },
            { id: "Departamento", template: (obj) => { return obj.Departamento.Nombre }, header: ["Departamento", { content: "textFilter" }], fillspace: true },
        ];

        let puest = new puesto();

        super(app, name, columns, puest);
    }
    init(view) {
        this.$$(this.Grid).attachEvent("onItemDblClick", (id, e, node) => {
            var item = $$(this.Grid).getItem(id);

            console.log("double click");
            this.FrmPuesto = this.ui(FrmPuesto);
            this.FrmPuesto.showWindow(item._id);
        });

        super.init(view);
    }
}