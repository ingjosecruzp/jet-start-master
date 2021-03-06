import { JetView } from "webix-jet";
import { tipoproveedor } from "models/compras/tipoproveedor";
import { GridBase } from "views/GridBase";
import { FrmTipoProveedor } from "views/compras/FrmTipoProveedor"

export default class GridTipoProveedor extends GridBase {
    constructor(app, name) {
        let columns = [
            { id: "_id", fillspace: true, hidden: true },
            { id: "Nombre", MongoField: "Nombre", header: ["Nombre", { content: "textFilter" }], width: 150 },
            { id: "Clave", MongoField: "Clave", header: ["Clave", { content: "textFilter" }], fillspace: true }
        ];

        let tproveedor = new tipoproveedor();

        super(app, name, columns, tproveedor);
    }
    init(view) {
        this.$$(this.Grid).attachEvent("onItemDblClick", (id, e, node) => {
            var item = $$(this.Grid).getItem(id);

            console.log("double click");
            this.FrmTipoProveedor = this.ui(FrmTipoProveedor);
            this.FrmTipoProveedor.showWindow(item._id);
        });

        super.init(view);
    }
}