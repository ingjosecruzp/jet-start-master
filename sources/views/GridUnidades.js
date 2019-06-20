import { JetView } from "webix-jet";
import { unidades } from "models/catalogos/unidades";
import { FrmUnidades } from "views/FrmUnidades";
import { GridBase } from "views/GridBase";

export default class GridUnidades extends GridBase {
    constructor(app, name) {
        let columns = [
            { id: "_id", fillspace: true, hidden: true },
            { id: "Abreviatura",MongoField:"Abreviatura", header: ["Abreviatura", { content: "textFilter" }], width: 150  },
            { id: "Nombre", MongoField:"Nombre",header: ["Nombre", { content: "textFilter" }], fillspace: true },
        ];

        let unidad = new unidades();

        super(app, name, columns, unidad);
    }
    init(view) {
        this.$$(this.Grid).attachEvent("onItemDblClick", (id, e, node) => {
            var item = $$(this.Grid).getItem(id);

            console.log("double click");
            this.FrmUnidades = this.ui(FrmUnidades);
            this.FrmUnidades.showWindow(item._id);
        });

        super.init(view);
    }
}