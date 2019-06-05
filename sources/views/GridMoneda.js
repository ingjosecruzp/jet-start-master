import { JetView } from "webix-jet";
import { moneda } from "models/pventa/moneda";
import { GridBase } from "views/GridBase";
import { FrmMoneda } from "views/pventa/FrmMoneda"

export default class GridMoneda extends GridBase {
    constructor(app, name) {
        let columns = [
            { id: "_id", fillspace: true, hidden: true },
            { id: "Nombre", header: ["Nombre", { content: "textFilter" }], width: 150 },
            { id: "TextoImporte", header: ["Texto Importe", { content: "textFilter" }], width: 150 },
            { id: "Simbolo", header: ["Simbolo", { content: "textFilter" }], width: 150 },
            { id: "ClaveInterna", header: ["Clave Interna", { content: "textFilter" }], width: 150 },
            { id: "ClaveFiscal", header: ["Clave Fiscal", { content: "textFilter" }], width: 150 },
            { id: "ValorPredeterminado", header: ["Valor Predeterminado", { content: "textFilter" }], width: 150 },
            { id: "MonedaNac", header: ["Moneda Nac", { content: "textFilter" }], width: 150 },
        ];

        let monedas = new moneda();

        super(app, name, columns, monedas);
    }
    init(view) {
        this.$$(this.Grid).attachEvent("onItemDblClick", (id, e, node) => {
            var item = $$(this.Grid).getItem(id);

            console.log("double click");
            this.FrmMoneda = this.ui(FrmMoneda);
            this.FrmMoneda.showWindow(item._id);
        });

        super.init(view);
    }
}