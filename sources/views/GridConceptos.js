import { JetView } from "webix-jet";
import { unidades } from "models/catalogos/unidades";
import { conceptos } from "models/catalogos/conceptos";
import { FrmConceptos } from "views/FrmConceptos";
import { GridBase } from "views/GridBase";

export default class GridConceptos extends GridBase {
    constructor(app, name) {
        let columns = [
            { id: "_id", hidden: true },
            { id: "Clave",MongoField:"Clave", header: ["Clave", { content: "textFilter" }], width: 150 },
            { id: "Nombre", MongoField:"Nombre",header: ["Nombre", { content: "textFilter" }], fillspace: true },
            { id: "Naturaleza", MongoField:"Naturaleza",header: ["Naturaleza", { content: "textFilter" }], width: 150 },
            { id: "Tipo Concepto", MongoField:"TipoConcepto.Nombre",template: (obj) => { return obj.TipoConcepto.Nombre }, header: ["Tipo Concepto", { content: "textFilter" }], width: 150 },
            { id: "Predefinido", MongoField:"Predefinido",header: ["Predefinido", { content: "textFilter" }], width: 150 },
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