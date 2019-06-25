import { JetView } from "webix-jet";
import { estados } from "models/catalogos/estado";
import { GridBase } from "views/GridBase";
import { FrmSubgrupoComponente } from "views/inventarios/FrmSubgrupoComponente"

export default class GridEstado extends GridBase {
    constructor(app, name) {
        let columns = [
            { id: "_id", fillspace: true, hidden: true },
            { id: "Nombre", MongoField: "Nombre", header: ["Nombre", { content: "textFilter" }], width: 150 },
            { id: "Paises", MongoField: "Paises.Nombre", template: (obj) => { return obj.Paises.Nombre }, header: ["Pais", { content: "textFilter" }], fillspace: true }
        ];

        //Declaras el modelo
        let estado = new estados();

        super(app, name, columns, estado);
    }
    init(view) {
        /*this.$$(this.Grid).attachEvent("onItemDblClick", (id, e, node) => {
            var item = $$(this.Grid).getItem(id);

            this.FrmSubgrupoComponente = this.ui(FrmSubgrupoComponente);
            this.FrmSubgrupoComponente.showWindow(item._id);
        });*/


        super.init(view);
    }
}