import { JetView } from "webix-jet";
import { almacen } from "models/inventarios/almacen";
import { GridBase } from "views/GridBase";
import { FrmAlmacen } from "views/inventarios/FrmAlmacen"


export default class GridAlmacen extends GridBase {
    constructor(app, name) {
        let columns = [
            { id: "_id", fillspace: true, hidden: true },
            { id: "Clave", header: ["Clave", { content: "textFilter" }], width: 150 },
            { id: "Nombre", header: ["Nombre", { content: "textFilter" }], width: 150 },
            { id: "TipoAlmacen", header: ["Tipo Almacen", { content: "textFilter" }], width: 150 },
            { id: "Activo", header: ["Activo", { content: "textFilter" }], width: 150 },
            { id: "Tipo Componente", template: (obj) => { return obj.TipoComponente.Nombre }, header: ["Tipo Componente", { content: "textFilter" }], fillspace: true },
        ];

        let almacenes = new almacen();

        super(app, name, columns, almacenes);
    }
    init(view) {
        this.$$(this.Grid).attachEvent("onItemDblClick", (id, e, node) => {
            var item = $$(this.Grid).getItem(id);

            console.log("double click");
            this.FrmAlmacen = this.ui(FrmAlmacen);
            this.FrmAlmacen.showWindow(item._id);
        });

        super.init(view);
    }
}