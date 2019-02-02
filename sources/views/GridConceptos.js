import { JetView } from "webix-jet";
import { unidades } from "models/catalogos/unidades";
import { conceptos } from "models/catalogos/conceptos";
import { FrmConceptos } from "views/FrmConceptos";
import { GridBase } from "views/GridBase";

export default class GridConceptos extends GridBase {
    constructor(app, name) {
        let columns = [
            { id: "_id", hidden: true },
            { id: "Clave", header: ["Clave", { content: "textFilter" }], width: 150 },
            { id: "Nombre", header: ["Nombre", { content: "textFilter" }], fillspace: true },
            { id: "Naturaleza", header: ["Naturaleza", { content: "textFilter" }], width: 150 },
            { id: "Tipo Concepto", template: (obj) => { return obj.TipoConcepto.Nombre }, header: ["Tipo Concepto", { content: "textFilter" }], width: 150 },
            { id: "Predefinido", header: ["Predefinido", { content: "textFilter" }], width: 150 },
        ];

        let concepto = new conceptos();

        super(app, name, columns, concepto);
    }
    init(view) {
        this.$$(this.Grid).attachEvent("onItemDblClick", (id, e, node) => {
            var item = $$(this.Grid).getItem(id);

            console.log("double click");
            this.FrmConceptos = this.ui(FrmConceptos);
            this.FrmConceptos.showWindow(item._id);
        });

        super.init(view);
    }
}