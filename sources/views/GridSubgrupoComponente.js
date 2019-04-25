import { JetView } from "webix-jet";
import { subgrupocomponente } from "models/inventarios/subgrupocomponente";
import { GridBase } from "views/GridBase";
import { FrmSubgrupoComponente } from "views/inventarios/FrmSubgrupoComponente"

export default class GridSubgrupoComponente extends GridBase {
    constructor(app, name) {
        let columns = [
            { id: "_id", fillspace: true, hidden: true },
            { id: "Clave", header: ["Clave", { content: "textFilter" }], width: 150 },
            { id: "Nombre", header: ["Nombre", { content: "textFilter" }], width: 150 },
            { id: "Grupo Componente", template: (obj) => { return obj.GrupoComponente.Nombre }, header: ["Grupo Componente", { content: "textFilter" }], fillspace: true },
            { id: "Tipo Componente", template: (obj) => { return obj.GrupoComponente.TipoComponente.Nombre }, header: ["Tipo Componente", { content: "textFilter" }], fillspace: true },
        ];

        let scomponente = new subgrupocomponente();

        super(app, name, columns, scomponente);
    }
    init(view) {
        this.$$(this.Grid).attachEvent("onItemDblClick", (id, e, node) => {
            var item = $$(this.Grid).getItem(id);

            console.log("double click");
            this.FrmSubgrupoComponente = this.ui(FrmSubgrupoComponente);
            this.FrmSubgrupoComponente.showWindow(item._id);
        });

        super.init(view);
    }
}