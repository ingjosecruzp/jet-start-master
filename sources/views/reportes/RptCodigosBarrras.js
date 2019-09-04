import { JetView } from "webix-jet";
import { FrmReporteBase } from "views/FrmReporteBase";
import { codigosbarra } from "models/reportes/codigosbarra";
import { almacenes } from "models/catalogos/almacenes";
import { grupocomponente } from "models/catalogos/grupocomponente";
import { subgrupocomponente } from "models/catalogos/subgrupocomponente";
import { getValoracion } from "models/generales";
import { articulos } from "models/catalogos/articulos";

export class RptCodigosBarrras extends FrmReporteBase {

    constructor(app, name) {
        let id = new Date().getTime();

        let form = {
            title: "Reporte codigo de barras",
            width: 350,
            elements: [
                {
                    cols: [
                        { view: "checkbox", id: "check_cmbArticulo" + id, value: 0, gravity: 0.1 },
                        {
                            view: "combo",
                            name: "ArticuloId",
                            labelWidth: 80,
                            id: "cmbArticulo" + id,
                            disabled: true,
                            label: "Articulo",
                            options: {
                                body: {
                                    template: "#Nombre#",
                                    dataFeed: function(text) {
                                        let articulo = new articulos();
                                        this.load(articulo.searchCombo(text));
                                    }
                                }
                            }
                        }
                    ]

                },
                {
                    cols: [
                        { view: "checkbox", id: "check_cmbGrupo" + id, value: 0, gravity: 0.1 },
                        {
                            view: "combo",
                            name: "GrupoId",
                            labelWidth: 80,
                            id: "cmbGrupo" + id,
                            disabled: true,
                            label: "Grupo",
                            options: {
                                body: {
                                    template: "#Nombre#",
                                    dataFeed: function(text) {
                                        let grupo = new grupocomponente();
                                        this.load(grupo.searchCombo(text));
                                    }
                                }
                            }
                        }
                    ]

                },
                {
                    cols: [
                        { view: "checkbox", id: "check_cmbSubGrupo" + id, value: 0, gravity: 0.1 },
                        {
                            view: "combo",
                            name: "SubGrupoId",
                            labelWidth: 80,
                            disabled: true,
                            id: "cmbSubGrupo" + id,
                            label: "Subgrupo",
                            options: {
                                body: {
                                    template: "#Nombre#",
                                    dataFeed: function(text) {
                                        let subgrupo = new subgrupocomponente();
                                        this.load(subgrupo.searchCombo(text));
                                    }
                                }
                            }
                        }
                    ]

                }
            ],
            rules: {
                //$all: webix.rules.isNotEmpty
            }
        };

        let codigos = new codigosbarra();
        super(app, name, form, codigos, id);
    }
    init(view) {
        let self = this;
        webix.extend($$(this.Ventana), webix.ProgressBar);

        this.$$("check_cmbArticulo" + this.id).attachEvent("onItemClick", function(id, e) {
            self.bloquearFiltros(this);
        });

        this.$$("check_cmbGrupo" + this.id).attachEvent("onItemClick", function(id, e) {
            self.bloquearFiltros(this);
        });

        this.$$("check_cmbSubGrupo" + this.id).attachEvent("onItemClick", function(id, e) {
            self.bloquearFiltros(this);
        });
    }

}