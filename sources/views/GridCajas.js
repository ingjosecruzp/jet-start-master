import { JetView } from "webix-jet";
import { cajas } from "models/pventa/cajas";
import { FrmCajas } from "views/pventa/FrmCajas";
import { GridBase } from "views/GridBase";

export default class GridCajas extends GridBase {
    constructor(app, name) {
        let columns = [
            { id: "_id", hidden: true },
            { id: "Nombre", MongoField:"Nombre",header: ["Nombre", { content: "textFilter" }], fillspace: true },
            { id: "Almacen", MongoField:"Almacen.Nombre",template: (obj) => { return obj.Almacen.Nombre }, header: ["Almacen", { content: "textFilter" }], width: 150 },
            { id: "CobroPredet", MongoField:"CobroPredet",header: ["Cobro Default", { content: "textFilter" }], width: 180 },
        ];

        let caja = new cajas();

        super(app, name, columns, caja);
    }
    init(view) {
        this.$$(this.Grid).attachEvent("onItemDblClick", (id, e, node) => {
            var item = $$(this.Grid).getItem(id);

            console.log("double click");
            this.FrmCajas = this.ui(FrmCajas);
            this.FrmCajas.showWindow(item._id);
        });

        super.init(view);
    }
}