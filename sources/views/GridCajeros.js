import { JetView } from "webix-jet";
import { cajeros } from "models/pventa/cajeros";
import { FrmCajeros } from "views/pventa/FrmCajeros";
import { GridBase } from "views/GridBase";

export default class GridCajeros extends GridBase {
    constructor(app, name) {
        let columns = [
            { id: "_id", hidden: true },
            { id: "Nombre", MongoField:"Nombre",header: ["Nombre", { content: "textFilter" }], fillspace: true },
            { id: "Usuario", MongoField:"Usuarios.NombreCompleto",template: (obj) => { return obj.Usuarios.NombreCompleto }, header: ["Usuario", { content: "textFilter" }], width: 500 },
        ];

        let cajero = new cajeros();

        super(app, name, columns, cajero);
    }
    init(view) {
        this.$$(this.Grid).attachEvent("onItemDblClick", (id, e, node) => {
            var item = $$(this.Grid).getItem(id);

            console.log("double click");
            this.FrmCajeros = this.ui(FrmCajeros);
            this.FrmCajeros.showWindow(item._id);
        });

        super.init(view);
    }
}