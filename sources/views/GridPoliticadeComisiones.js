import { JetView } from "webix-jet";
import { politicadecomisiones } from "models/pventa/politicadecomisiones";
import { GridBase } from "views/GridBase";
import { FrmPoliticadeComisiones } from "views/pventa/FrmPoliticadeComisiones"

export default class GridPoliticadeComisiones extends GridBase {
    constructor(app, name) {
        let columns = [
            { id: "_id", fillspace: true, hidden: true },
            { id: "Nombre", header: ["Nombre", { content: "textFilter" }], fillspace: true },
            { id: "SegunArticulos", header: ["Segun Articulos", { content: "textFilter" }], width: 250 },
            { id: "SegunClientes", header: ["Segun Clientes", { content: "textFilter" }], width: 150 },
            { id: "ComisionGeneral", header: ["Comision General", { content: "textFilter" }], width: 150 },

        ];

        let pcomisiones = new politicadecomisiones();

        super(app, name, columns, pcomisiones);
    }
    init(view) {
        this.$$(this.Grid).attachEvent("onItemDblClick", (id, e, node) => {
            var item = $$(this.Grid).getItem(id);
            this.FrmPoliticadeComisiones = this.ui(FrmPoliticadeComisiones);
            this.FrmPoliticadeComisiones.showWindow(item._id);
        });

        super.init(view);
    }
}