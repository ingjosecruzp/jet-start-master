import { JetView } from "webix-jet";
import { FrmArticulos } from "views/generales/FrmArticulos";
import { articulos } from "models/catalogos/articulos";
import { GridBase } from "views/GridBase";

export default class GridArticulos extends GridBase {
    constructor(app, name) {
        let columns = [
            { id: "_id", hidden: true },
            { id: "Clave", header: ["Clave", { content: "textFilter" }], width: 150 },
            { id: "NombreCorto", header: ["Nombre Corto", { content: "textFilter" }], fillspace: true },
            { id: "Marca", template: (obj) => { return obj.Marca.Nombre }, header: ["Marca", { content: "textFilter" }], width: 150 },
            { id: "Activo", header: ["Activo", { content: "textFilter" }], width: 150 },
            { id: "GrupoComponente", template: (obj) => { return obj.GrupoComponente.Nombre }, header: ["GrupoComponente", { content: "textFilter" }], width: 150 },
            { id: "SubGrupoComponente", template: (obj) => { return obj.SubGrupoComponente.Nombre }, header: ["SubGrupoComponente", { content: "textFilter" }], width: 150 },
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