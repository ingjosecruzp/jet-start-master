import { JetView } from "webix-jet";
import { tipoimpuesto } from "models/pventa/tipoimpuesto";
import { FrmTipoImpuesto } from "views/pventa/FrmTipoImpuesto";
import { GridBase } from "views/GridBase";

export default class GridTipoImpuesto extends GridBase {
    constructor(app, name) {
        let columns = [
            { id: "_id", hidden: true },
            { id: "Nombre", MongoField:"Nombre",header: ["Nombre", { content: "textFilter" }], fillspace: true },
            { id: "Naturaleza", MongoField:"Naturaleza", header: ["Naturaleza", { content: "textFilter" }], width: 350 },            
        ];

        let tipoimpuestos = new tipoimpuesto();

        super(app, name, columns, tipoimpuestos);
    }
    init(view) {
        this.$$(this.Grid).attachEvent("onItemDblClick", (id, e, node) => {
            var item = $$(this.Grid).getItem(id);

            console.log("double click");
            this.FrmTipoImpuesto = this.ui(FrmTipoImpuesto);
            this.FrmTipoImpuesto.showWindow(item._id);
        });

        super.init(view);
    }
}