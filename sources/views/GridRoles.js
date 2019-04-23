import { JetView } from "webix-jet";
import { movimientosES } from "models/inventarios/movimientosES";
import { roles } from "models/administracion/roles";
import { GridBase } from "views/GridBase";
import { FrmRoles } from "views/administracion/FrmRoles";

export default class GridRoles extends GridBase {
    constructor(app, name) {
        let columns = [
            { id: "_id", fillspace: true, hidden: true },
            { id: "Nombre", header: ["Nombre", { content: "textFilter" }], fillspace: true }
        ];

        let rol = new roles();

        super(app, name, columns, rol);
    }
    init(view) {
        this.$$(this.Grid).attachEvent("onItemDblClick", (id, e, node) => {
            var item = $$(this.Grid).getItem(id);

            console.log("double click");
            this.FrmRoles = this.ui(FrmRoles);
            this.FrmRoles.showWindow(item._id);
        });

        super.init(view);
    }
}