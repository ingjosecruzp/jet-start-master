import { JetView } from "webix-jet";
import { tipodecambio } from "models/pventa/tipodecambio";
import { GridBase } from "views/GridBase";
import { FrmTipodeCambio } from "views/pventa/FrmTipodeCambio"

export default class GridTipodeCambio extends GridBase {
    constructor(app, name) {
        let columns = [
            { id: "_id", fillspace: true, hidden: true },
            { id: "Nombre", header: ["Nombre", { content: "textFilter" }], width: 350 },
            { id: "Fecha", header: ["Fecha", { content: "textFilter" }], width: 150 },
            { id: "TipoCambio", header: ["TipoCambio", { content: "textFilter" }], width: 150 },
            { id: "EnCobros", header: ["EnCobros", { content: "textFilter" }], fillspace: true },
        ];

        let tiposdecambios = new tipodecambio();

        super(app, name, columns, tiposdecambios);
    }
    init(view) {
        this.$$(this.Grid).attachEvent("onItemDblClick", (id, e, node) => {
            var item = $$(this.Grid).getItem(id);

            console.log("double click");
            this.FrmTipodeCambio = this.ui(FrmTipodeCambio);
            this.FrmTipodeCambio.showWindow(item._id);
        });

        super.init(view);
    }
}