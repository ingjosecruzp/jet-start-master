import { JetView } from "webix-jet";
import { departamento } from "models/catalogos/departamento";
import { GridBase } from "views/GridBase";
import { FrmDepartamento } from "views/FrmDepartamento"

export default class GridDepartamento extends GridBase {
    constructor(app, name) {
        let columns = [
            { id: "_id", fillspace: true, hidden: true },
            { id: "Nombre",MongoField:"Nombre", header: ["Nombre", { content: "textFilter" }], fillspace: true }
        ];

        let depto = new departamento();

        super(app, name, columns, depto);
    }
    init(view) {
        this.$$(this.Grid).attachEvent("onItemDblClick", (id, e, node) => {
            var item = $$(this.Grid).getItem(id);

            console.log("double click");
            this.FrmDepartamento = this.ui(FrmDepartamento);
            this.FrmDepartamento.showWindow(item._id);
        });

        super.init(view);
    }
}