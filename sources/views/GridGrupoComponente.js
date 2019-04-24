import { JetView } from "webix-jet";
import { grupocomponente } from "models/inventarios/grupocomponente";
import { GridBase } from "views/GridBase";
import { FrmTipoComponente } from "views/inventarios/FrmTipoComponente";
import { FrmGrupoComponente } from "views/inventarios/FrmGrupoComponente"

export default class GridGrupoComponente extends GridBase {
    constructor(app, name) {
        let columns = [
            { id: "_id", fillspace: true, hidden: true },
            { id: "Clave", header: ["Clave", { content: "textFilter" }], width: 150 },
            { id: "Nombre", header: ["Nombre", { content: "textFilter" }], width: 150 },
            { id: "Tipo Componente", template: (obj) => { return obj.TipoComponente.Nombre }, header: ["Tipo Componente", { content: "textFilter" }], fillspace: true },
        ];

        let gcomponente = new grupocomponente();

        super(app, name, columns, gcomponente);
    }
    init(view) {
        this.$$(this.Grid).attachEvent("onItemDblClick", (id, e, node) => {
            var item = $$(this.Grid).getItem(id);

            console.log("double click");
            this.FrmGrupoComponente = this.ui(FrmGrupoComponente);
            this.FrmGrupoComponente.showWindow(item._id);
        });

        super.init(view);
    }
}