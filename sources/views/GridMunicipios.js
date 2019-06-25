import { JetView } from "webix-jet";
import { municipios } from "models/catalogos/municipios";
import { FrmMunicipios } from "views/generales/FrmMunicipios";
import { GridBase } from "views/GridBase";

export default class GridMunicipios extends GridBase {
    constructor(app, name) {
        let columns = [
            { id: "_id", hidden: true },
            { id: "Nombre", MongoField:"Nombre",header: ["Nombre", { content: "textFilter" }], fillspace: true },
            { id: "Estado", MongoField:"Estado.Nombre",template: (obj) => { return obj.Estadp.Nombre }, header: ["Estado", { content: "textFilter" }], width: 150 },
            { id: "Pais", MongoField:"Paises.Nombre",template: (obj) => { return obj.Paises.Nombre }, header: ["Paises", { content: "textFilter" }], width: 150 },
        ];

        let municipio = new municipios();

        super(app, name, columns, municipio);
    }
    init(view) {
        /*this.$$(this.Grid).attachEvent("onItemDblClick", (id, e, node) => {
            var item = $$(this.Grid).getItem(id);

            console.log("double click");
            this.FrmConceptos = this.ui(FrmConceptos);
            this.FrmConceptos.showWindow(item._id);
        });*/

        super.init(view);
    }
}