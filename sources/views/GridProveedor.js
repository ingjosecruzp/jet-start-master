import { JetView } from "webix-jet";
import { FrmProveedor } from "views/compras/FrmProveedor";
import { proveedor } from "models/compras/proveedor";
import { GridBase } from "views/GridBase";

export default class GridProveedor extends GridBase {
    constructor(app, name) {
        let columns = [
            { id: "_id", hidden: true },
            { id: "Nombre", MongoField: "Nombre", header: ["Nombre", { content: "textFilter" }], fillspace: true },
            { id: "Clave", MongoField: "Clave", header: ["Clave", { content: "textFilter" }], width: 150 },
            { id: "RFC", MongoField: "RFC", header: ["RFC", { content: "textFilter" }], width: 150 },
            { id: "Contacto", MongoField: "Contacto", header: ["Contacto", { content: "textFilter" }], width: 150 },
            { id: "Direccion", MongoField: "Direccion", header: ["Direccion", { content: "textFilter" }], width: 150 },
            { id: "TipoProveedor", MongoField: "TipoProveedor.Nombre", template: (obj) => { return obj.TipoProveedor.Nombre }, header: ["TipoProveedor", { content: "textFilter" }], width: 150 },
        ];

        let proveedores = new proveedor();

        super(app, name, columns, proveedores);
    }
    init(view) {
        this.$$(this.Grid).attachEvent("onItemDblClick", (id, e, node) => {
            var item = $$(this.Grid).getItem(id);

            this.FrmProveedor = this.ui(FrmProveedor);
            this.FrmProveedor.showWindow(item._id);
        });

        super.init(view);
    }
}