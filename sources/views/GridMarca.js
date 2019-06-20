import { JetView } from "webix-jet";
import { marca } from "models/inventarios/marca";
import { GridBase } from "views/GridBase";
import { FrmMarca } from "views/inventarios/FrmMarca"

export default class GridMarca extends GridBase {
    constructor(app, name) {
        let columns = [
            { id: "_id", fillspace: true, hidden: true },
            { id: "Clave",MongoField:"Clave", header: ["Clave", { content: "textFilter" }], width: 150 },
            { id: "Nombre",MongoField:"Nombre", header: ["Nombre", { content: "textFilter" }], fillspace: true }
        ];

        let marcas = new marca();

        super(app, name, columns, marcas);
    }
    init(view) {
        this.$$(this.Grid).attachEvent("onItemDblClick", (id, e, node) => {
            var item = $$(this.Grid).getItem(id);

            console.log("double click");
            this.FrmMarca = this.ui(FrmMarca);
            this.FrmMarca.showWindow(item._id);
        });

        super.init(view);
    }
}