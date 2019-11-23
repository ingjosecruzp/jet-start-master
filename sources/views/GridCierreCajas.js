import { JetView } from "webix-jet";
import { CierreCajas } from "models/pventa/CierreCajas";
import { FrmCierreCajas } from "views/pventa/FrmCierreCajas";
import { GridBase } from "views/GridBase";

export default class GridCierreCajas extends GridBase {
    constructor(app, name) {
        let columns = [
            { id: "_id", hidden: true },
            { id: "TipoMovto", MongoField:"TipoMovto",header: ["TipoMovto", { content: "textFilter" }], fillspace: true },
            { id: "Fecha", MongoField:"Fecha",template: (obj) => { return this.convertToDate(obj.Fecha) }, header: ["Fecha", { content: "textFilter" }] },
            { id: "FormaEmitida", MongoField:"FormaEmitida",header: ["Forma Emitida", { content: "textFilter" }], width: 180 },
            { id: "Importe", MongoField:"Importe",header: ["Importe", { content: "textFilter" }] }
           // { id: "Almacen", MongoField:"Almacen.Nombre",template: (obj) => { return obj.Almacen.Nombre }, header: ["Almacen", { content: "textFilter" }], width: 150 },
        ];

        let CierreCaja = new CierreCajas();

        super(app, name, columns, CierreCaja);
    }
    init(view) {
        this.$$(this.Grid).attachEvent("onItemDblClick", (id, e, node) => {
            var item = $$(this.Grid).getItem(id);

            console.log("double click");
            this.FrmCierreCajas = this.ui(FrmCierreCajas);
            this.FrmCierreCajas.showWindow(item._id);
        });

        super.init(view);
    }
}