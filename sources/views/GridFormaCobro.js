import { JetView } from "webix-jet";
import { formacobro } from "models/pventa/formacobro";
import { GridBase } from "views/GridBase";
import { FrmFormaCobro } from "views/pventa/FrmFormaCobro"

export default class GridFormaCobro extends GridBase {
    constructor(app, name) {
        let columns = [
            { id: "_id", fillspace: true, hidden: true },
            { id: "Nombre", header: ["Nombre", { content: "textFilter" }], width: 350 },
            { id: "DiasTransito", header: ["DiasTransito", { content: "textFilter" }], width: 150 },
            { id: "ClaveFiscal", header: ["ClaveFiscal", { content: "textFilter" }], width: 150 },
            { id: "ValorPredeterminado", header: ["ValorPredeterminado", { content: "textFilter" }], fillspace: true },
        ];

        let formascobros = new formacobro();

        super(app, name, columns, formascobros);
    }
    init(view) {
        this.$$(this.Grid).attachEvent("onItemDblClick", (id, e, node) => {
            var item = $$(this.Grid).getItem(id);

            console.log("double click");
            this.FrmFormaCobro = this.ui(FrmFormaCobro);
            this.FrmFormaCobro.showWindow(item._id);
        });

        super.init(view);
    }
}