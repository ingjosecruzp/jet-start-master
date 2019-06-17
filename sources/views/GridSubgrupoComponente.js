import { JetView } from "webix-jet";
import { subgrupocomponente } from "models/inventarios/subgrupocomponente";
import { GridBase } from "views/GridBase";
import { FrmSubgrupoComponente } from "views/inventarios/FrmSubgrupoComponente"

export default class GridSubgrupoComponente extends GridBase {
    constructor(app, name) {
        let columns = [
            { id: "_id", fillspace: true, hidden: true },
            { id: "Clave", MongoField:"Clave",header: ["Clave", { content: "textFilter" }], width: 150},
            { id: "Nombre",MongoField:"Nombre", header: ["Nombre", { content: "textFilter" }], width: 150 },
            { id: "Grupo Componente",MongoField:"GrupoComponente.Nombre", template: (obj) => { return obj.GrupoComponente.Nombre }, header: ["Grupo Componente", { content: "textFilter" }], fillspace: true },
            { id: "Tipo Componente",MongoField:"GrupoComponente.TipoComponente.Nombre", template: (obj) => { return obj.GrupoComponente.TipoComponente.Nombre }, header: ["Tipo Componente", { content: "textFilter" }], fillspace: true },
        ];

        let scomponente = new subgrupocomponente();

        super(app, name, columns, scomponente);
    }
    init(view) {
        this.$$(this.Grid).attachEvent("onItemDblClick", (id, e, node) => {
            var item = $$(this.Grid).getItem(id);

            this.FrmSubgrupoComponente = this.ui(FrmSubgrupoComponente);
            this.FrmSubgrupoComponente.showWindow(item._id);
        });

        /*this.$$(this.Grid).attachEvent("onAfterScroll", function(){
            var pos = this.getScrollState();
        });*/

        super.init(view);
    }
}