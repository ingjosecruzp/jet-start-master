import { JetView } from "webix-jet";
import { tipocomponente } from "models/inventarios/tipocomponente";
import { GridBase } from "views/GridBase";
import { FrmTipoComponente } from "views/inventarios/FrmTipoComponente"

export default class GridTipoComponente extends GridBase {
    constructor(app, name) {
        let columns = [
            { id: "_id", fillspace: true, hidden: true },
            { id: "Nombre",MongoField:"Nombre", header: ["Nombre", { content: "textFilter" }], fillspace: true }
        ];

        let tcomponente = new tipocomponente();

        super(app, name, columns, tcomponente);
    }
    init(view) {
        this.$$(this.Grid).attachEvent("onItemDblClick", (id, e, node) => {
            var item = $$(this.Grid).getItem(id);

            console.log("double click");
            this.FrmTipoComponente = this.ui(FrmTipoComponente);
            this.FrmTipoComponente.showWindow(item._id);
        });

        super.init(view);
    }
}