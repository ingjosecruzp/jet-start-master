import { JetView, JetApp, plugins } from "webix-jet";
import { menu_data_multi } from "models/menu";
import { FrmUnidades } from "views/FrmUnidades";
import { FrmConceptos } from "views/FrmConceptos";
import { FrmEntrada } from "views/inventarios/FrmEntrada";
import { FrmTipoComponente } from "views/inventarios/FrmTipoComponente";
import { FrmGrupoComponente } from "views/inventarios/FrmGrupoComponente";
import { FrmSubgrupoComponente } from "views/inventarios/FrmSubgrupoComponente";
import { FrmMarca } from "views/inventarios/FrmMarca";
import { FrmDepartamento } from "views/FrmDepartamento";
import { FrmPuesto } from "views/FrmPuesto";
import { FrmPureza } from "views/inventarios/FrmPureza"
import { FrmPeso } from "views/inventarios/FrmPeso"


export default class TopView extends JetView {
    config() {
        var header = {
            type: "header",
            template: this.app.config.name,
            css: "webix_header app_header"
        };

        var menu = {
            view: "menu",
            id: "top:menu",
            css: "webix_dark",
            width: 180,
            layout: "y",
            select: true,
            template: "<span class='webix_icon #icon#'></span> #value# ",
            data: [
                { value: "Dashboard", id: "start", icon: "wxi-columns" },
                { value: "Data", id: "data", icon: "wxi-pencil" }
            ]
        };

        /*var ui = {
            type: "clean",
            paddingX: 5,
            css: "app_layout",
            cols: [
                { paddingX: 5, paddingY: 10, rows: [{ css: "webix_shadow_medium", rows: [header, menu] }] },
                {
                    rows: [{
                        type: "wide",
                        paddingY: 10,
                        paddingX: 5,
                        rows: [
                            { $subview: true }
                        ]
                    }]
                }
            ]
		};*/

        var uix = {
            rows: [{
                    view: "toolbar",
                    css: "webix_dark",
                    padding: 3,
                    elements: [{
                            view: "button",
                            type: "icon",
                            icon: "mdi mdi-menu",
                            width: 37,
                            align: "left",
                            css: "app_button",
                            click: function() {
                                $$("$sidebar1").toggle();
                            }
                        },
                        { view: "label", label: "CLG" },
                        {},
                        {
                            view: "button",
                            type: "icon",
                            width: 45,
                            css: "app_button",
                            icon: "mdi mdi-comment",
                            badge: 4,
                            click: () => {
                                console.log(this.getUrl()[1].page);
                                if (this.getUrl()[1].page == "GridUnidades") {
                                    /*this.FrmUnidades = this.ui(FrmUnidades);
                                    this.FrmUnidades.showWindow();*/
                                    this.FrmEntrada = this.ui(FrmEntrada);
                                    this.FrmEntrada.showWindow();
                                } else if (this.getUrl()[1].page == "GridConceptos") {
                                    this.FrmConceptos = this.ui(FrmConceptos);
                                    this.FrmConceptos.showWindow();
                                } else if (this.getUrl()[1].page == "GridTipoComponente") {
                                    this.FrmTipoComponente = this.ui(FrmTipoComponente);
                                    this.FrmTipoComponente.showWindow();
                                } else if (this.getUrl()[1].page == "GridGrupoComponente") {
                                    this.FrmGrupoComponente = this.ui(FrmGrupoComponente);
                                    this.FrmGrupoComponente.showWindow();
                                } else if (this.getUrl()[1].page == "GridSubgrupoComponente") {
                                    this.FrmSubgrupoComponente = this.ui(FrmSubgrupoComponente);
                                    this.FrmSubgrupoComponente.showWindow();
                                } else if (this.getUrl()[1].page == "GridMarca") {
                                    this.FrmMarca = this.ui(FrmMarca);
                                    this.FrmMarca.showWindow();
                                } else if (this.getUrl()[1].page == "GridDepartamento") {
                                    this.FrmDepartamento = this.ui(FrmDepartamento);
                                    this.FrmDepartamento.showWindow();
                                } else if (this.getUrl()[1].page == "GridPuesto") {
                                    this.FrmPuesto = this.ui(FrmPuesto);
                                    this.FrmPuesto.showWindow();
                                } else if (this.getUrl()[1].page == "GridPureza") {
                                    this.FrmPureza = this.ui(FrmPureza);
                                    this.FrmPureza.showWindow();
                                } else if (this.getUrl()[1].page == "GridPeso") {
                                    this.FrmPeso = this.ui(FrmPeso);
                                    this.FrmPeso.showWindow();
                                }
                            }
                        },
                        {
                            view: "button",
                            type: "icon",
                            width: 45,
                            css: "app_button",
                            icon: "mdi mdi-bell",
                            badge: 10,
                            click: () => {
                                //$$('grid').clearAll();
                                //$$('grid').refresh();
                                console.log("refrescar");
                                this.refresh();
                                //$$('grid').loadNext(-1, 0);
                            }
                        }
                    ]
                },
                {
                    cols: [{
                            rows: [{
                                view: "sidebar",
                                css: "webix_dark",
                                name: "sidebar1",
                                width: 300,
                                data: menu_data_multi,
                                on: {
                                    onAfterSelect: (id) => {
                                        //webix.message("Selected: " + this.getItem(id).value);
                                        //webix.message("Selected: " + this.getItem(id).url);

                                        this.app.show("/top/" + id);
                                    }
                                }
                            }]
                        },
                        { $subview: true }
                    ]
                }
            ]
        };

        return uix;
    }
    init(view) {
        //console.log(menu_data_multi);
        //view.parse(menu_data_multi);
        //this.use(plugins.Menu, "top:menu");
        //this.use(plugins.SideBar, "top:menu");
        //this.FrmUnidades = this.ui(FrmUnidades);
    }
}