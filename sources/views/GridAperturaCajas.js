import { JetView } from "webix-jet";
import { aperturadecajas } from "models/pventa/aperturadecajas";
import { FrmAperturaCajas} from "views/pventa/FrmAperturaCajas";
import { GridBase } from "views/GridBase"

export default class GridAperturaCajas extends GridBase {
    constructor(app, name) {
        let columns = [
            { id: "_id", fillspace: true, hidden: true },
            { id: "TipoMovto",MongoField:"TipoMovto", header: ["Tipo de movimiento", { content: "textFilter" }], fillspace: true },
            { id: "Fecha",MongoField:"Fecha", template: (obj)=> {return this.convertToDate(obj.Fecha)}, header:["Fecha", {content: "textFilter"}]},
            { id: "FormaEmitida",MongoField:"FormaEmitida", header: ["Forma Emitida", { content: "textFilter" }], fillspace: true },
            { id: "Importe",MongoField:"Importe", header: ["Importe", { content: "textFilter" }], fillspace: true }

        ];

        let aperturaCajas = new aperturadecajas();

        super(app, name, columns, aperturaCajas);
    }
    init(view) {
        this.$$(this.Grid).attachEvent("onItemDblClick", (id, e, node) => {
            var item = $$(this.Grid).getItem(id);

            console.log("double click");
            this.FrmAperturaCajas = this.ui(FrmAperturaCajas);
            this.FrmAperturaCajas.showWindow(item._id);
        });

        super.init(view);
    }
}
