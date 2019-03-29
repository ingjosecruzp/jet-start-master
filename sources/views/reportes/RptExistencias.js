import { JetView } from "webix-jet";
import { FrmReporteBase } from "views/FrmReporteBase";
import { existencias } from "models/reportes/existencias";
import { almacenes } from "models/catalogos/almacenes";
import { grupocomponente } from "models/catalogos/grupocomponente";
import { subgrupocomponente } from "models/catalogos/subgrupocomponente";
import { getValoracion } from "models/generales";
import { articulos } from "models/catalogos/articulos";

export class RptExistencias extends FrmReporteBase {

    constructor(app, name) {
        let id = new Date().getTime();

        let form = {
            title: "Reporte Existencias",
            width: 350,
            elements: [
                { view: "datepicker", disabled: false, label: "Fecha", labelWidth: 80, id: "Fecha" + id, name: "Fecha", stringResult: true, format: "%d  %M %Y", value: new Date() },
                {
                    cols: [{
                        view: "combo",
                        name: "AlmacenID",
                        labelWidth: 80,
                        id: "cmbAlmacen" + id,
                        label: "Almacen",
                        disabled: false,
                        options: {
                            body: {
                                template: "#Nombre#",
                                dataFeed: function(text) {
                                    let almacen = new almacenes();
                                    this.load(almacen.searchCombo(text));
                                }
                            }
                        }
                    }]
                },
                {
                    cols: [
                        { view: "combo", id: "Valoracion" + id, name: "Valoracion", labelWidth: 80, label: "Valoracion", options: getValoracion(), disabled: false }
                    ]
                },
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
                "Nombre": webix.rules.isNotEmpty,
                "Abreviatura": webix.rules.isNotEmpty
            }
        };

        let existencia = new existencias();
        super(app, name, form, existencia, id);
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