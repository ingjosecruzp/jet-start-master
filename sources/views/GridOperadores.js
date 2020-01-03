import { JetView } from "webix-jet";
import { unidades } from "models/catalogos/unidades";
import { operador } from "models/pventa/operador";
import { FrmOperador } from "views/pventa/FrmOperador";
import { GridBase } from "views/GridBase";

export default class GridOperadores extends GridBase {
    constructor(app, name) {
        let columns = [
            { id: "_id", hidden: true },
            { id: "Nombre", MongoField:"Nombre",header: ["Nombre", { content: "textFilter" }], fillspace: true }
        ];

        let Operador = new operador();

        super(app, name, columns, Operador);
    }
    init(view) {
        this.$$(this.Grid).attachEvent("onItemDblClick", (id, e, node) => {
            var item = $$(this.Grid).getItem(id);

            console.log("double click");
            this.FrmOperador = this.ui(FrmOperador);
            this.FrmOperador.showWindow(item._id);
        });

        super.init(view);
    }
}