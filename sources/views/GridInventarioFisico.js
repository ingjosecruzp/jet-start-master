import { JetView } from "webix-jet";
import { inventariofisico } from "models/inventarios/inventariofisico";
import { GridBase } from "views/GridBase";
import { FrmGrupoComponente } from "views/inventarios/FrmGrupoComponente"

export default class GridInventarioFisico extends GridBase {
    constructor(app, name) {
        let columns = [
            { id: "_id", fillspace: true, hidden: true },
            { id: "Fecha",MongoField:"Fecha", header: ["Fecha", { content: "textFilter" }], width: 150 },
            { id: "Nombre",MongoField:"Nombre", header: ["Nombre", { content: "textFilter" }], width: 150 },
            { id: "Almacen",MongoField:"Almacen.Nombre", template: (obj) => { return obj.Almacen.Nombre }, header: ["Almacen", { content: "textFilter" }], fillspace: true },
            { id: "Estado",MongoField:"Estado", header: ["Estado", { content: "textFilter" }], width: 150 },
            { id: "Descripcion",MongoField:"Descripcion", header: ["Descripcion", { content: "textFilter" }], width: 150 }
        ];

        let inventario = new inventariofisico();

        super(app, name, columns, inventario);
    }
    init(view) {
        /*this.$$(this.Grid).attachEvent("onItemDblClick", (id, e, node) => {
            var item = $$(this.Grid).getItem(id);

            console.log("double click");
            this.FrmGrupoComponente = this.ui(FrmGrupoComponente);
            this.FrmGrupoComponente.showWindow(item._id);
        });*/

        super.init(view);
    }
}