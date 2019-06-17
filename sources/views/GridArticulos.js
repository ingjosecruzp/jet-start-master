import { JetView } from "webix-jet";
import { FrmArticulos } from "views/generales/FrmArticulos";
import { articulos } from "models/catalogos/articulos";
import { GridBase } from "views/GridBase";

export default class GridArticulos extends GridBase {
    constructor(app, name) {
        let columns = [
            { id: "_id", hidden: true },
            { id: "Clave",MongoField:"Clave", header: ["Clave", { content: "textFilter" }], width: 150 },
            { id: "Nombre",MongoField:"Nombre", header: ["Nombre", { content: "textFilter" }], fillspace: true },
            { id: "Marca",MongoField:"Marca", template: (obj) => { return obj.Marca == undefined ? "Sin Marca" : obj.Marca.Nombre }, header: ["Marca", { content: "textFilter" }], width: 150 },
            { id: "Activo",MongoField:"Activo", header: ["Activo", { content: "textFilter" }], width: 150 },
            { id: "GrupoComponente",MongoField:"GrupoComponente.Nombre", template: (obj) => { return obj.GrupoComponente.Nombre }, header: ["GrupoComponente", { content: "textFilter" }], width: 150 },
            { id: "SubGrupoComponente", MongoField:"SubGrupoComponente.Nombre",template: (obj) => { return obj.SubGrupoComponente.Nombre }, header: ["SubGrupoComponente", { content: "textFilter" }], width: 150 },
        ];

        let articulo = new articulos();

        super(app, name, columns, articulo);
    }
    init(view) {
        this.$$(this.Grid).attachEvent("onItemDblClick", (id, e, node) => {
            var item = $$(this.Grid).getItem(id);

            this.FrmArticulos = this.ui(FrmArticulos);
            this.FrmArticulos.showWindow(item._id);
        });

        super.init(view);
    }
}