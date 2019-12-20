import { JetView } from "webix-jet";
import { modulo } from "models/administracion/modulo";
import { GridBase } from "views/GridBase";
import { FrmModulos } from "views/administracion/FrmModulos"

export default class GridModulo extends GridBase {
    constructor(app, name) {
        console.log("entrooo");
        let columns = [
            { id: "_id", fillspace: true, hidden: true },
            { id: "icon",MongoField:"icon", header: ["Icono", { content: "textFilter" }], width: 150 },
            { id: "Nombre",MongoField:"Nombre", header: ["Nombre", { content: "textFilter" }], fillspace: true }
        ];

        console.log("entrooo");
        let Modulo = new modulo();

        super(app, name, columns, Modulo);
    }
    init(view) {
        this.$$(this.Grid).attachEvent("onItemDblClick", (id, e, node) => {
            var item = $$(this.Grid).getItem(id);

            console.log("double click");
            this.FrmModulos = this.ui(FrmModulos);
            this.FrmModulos.showWindow(item._id);
        });

        super.init(view);
    }
}