import { JetView, JetApp, plugins } from "webix-jet";
import { menu_data_multi } from "models/menu";
import { FrmUnidades } from "views/FrmUnidades";
import { FrmConceptos } from "views/FrmConceptos";
import { FrmEntrada } from "views/inventarios/FrmEntrada";
import { FrmSalida } from "views/inventarios/FrmSalida";
import { FrmArticulos } from "views/generales/FrmArticulos";
import { FrmTipoComponente } from "views/inventarios/FrmTipoComponente";
import { FrmGrupoComponente } from "views/inventarios/FrmGrupoComponente";
import { FrmSubgrupoComponente } from "views/inventarios/FrmSubgrupoComponente";
import { FrmMarca } from "views/inventarios/FrmMarca";
import { FrmDepartamento } from "views/FrmDepartamento";
import { FrmPuesto } from "views/FrmPuesto";
import { FrmPureza } from "views/inventarios/FrmPureza";
import { FrmPeso } from "views/inventarios/FrmPeso";
import { FrmProcedencia } from "views/inventarios/FrmProcedencia";
import { FrmAlmacen } from "views/inventarios/FrmAlmacen";
import { FrmEstado } from "views/generales/FrmEstado";
import { FrmInventarioFisico } from "views/inventarios/FrmInventarioFisico";
import { FrmMunicipios } from "views/generales/FrmMunicipios";

/*********PUNTO DE VENTA******************/
import { FrmMoneda } from "views/pventa/FrmMoneda";
import { FrmFormaCobro } from "views/pventa/FrmFormaCobro";
import { FrmTipodeCambio } from "views/pventa/FrmTipodeCambio";
import { FrmPoliticadeComisiones } from "views/pventa/FrmPoliticadeComisiones";
import { FrmVendedor } from "views/pventa/FrmVendedor";
import { FrmCajas } from "views/pventa/FrmCajas";
import { FrmCajeros } from "views/pventa/FrmCajeros";
import { FrmTipoImpuesto } from "views/pventa/FrmTipoImpuesto";
import { FrmImpuestos } from "views/pventa/FrmImpuestos";
import { FrmPuntoVenta } from "views/FrmPuntoVenta";
import { FrmCierreCajas } from "views/pventa/FrmCierreCajas";///////
import { FrmAperturaCajas } from "views/pventa/FrmAperturaCajas";///////
import { GridCancelaciones } from "views/cancelaciones/GridCancelaciones";///////
import { FrmOperador } from "views/pventa/FrmOperador";///////
/*******************************************/
/*********ADMINISTRACION******************/
import { FrmEmpresa } from "views/administracion/FrmEmpresa";
import { FrmUsuarios } from "views/administracion/FrmUsuarios";
import { FrmRoles } from "views/administracion/FrmRoles";
import { FrmModulos } from "views/administracion/FrmModulos";
import { FrmVista } from "views/administracion/FrmVista";

/*******************************************/

/*********COMPRAS**************************/
import { FrmTipoProveedor } from "views/compras/FrmTipoProveedor";
import { FrmProveedor } from "views/compras/FrmProveedor";
/*******************************************/

/*********REPORTES**************************/
import { RptExistencias } from "views/reportes/RptExistencias";
import { RptKardex } from "views/reportes/RptKardex";
import { RptCodigosBarrras } from "views/reportes/RptCodigosBarrras";
/*******************************************/

import { menu } from "models/administracion/menu";

export default class TopView extends JetView {
    config() {

        //Activa el scroll customisado de webix
        if (!webix.env.touch && webix.env.scrollSize)
            webix.CustomScroll.init();

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
                            icon: "mdi mdi-plus-circle",
                            //badge: 4,
                            click: () => {
                                //console.log(this.getUrl()[1].page);
                                if (this.getUrl()[1].page == "GridUnidades") {
                                    this.FrmUnidades = this.ui(FrmUnidades);
                                    this.FrmUnidades.showWindow();
                                } else if (this.getUrl()[1].page == "GridConceptos") {
                                    this.FrmConceptos = this.ui(FrmConceptos);
                                    this.FrmConceptos.showWindow();
                                } else if (this.getUrl()[1].page == "GridArticulos") {
                                    this.FrmArticulos = this.ui(FrmArticulos);
                                    this.FrmArticulos.showWindow();
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
                                } else if (this.getUrl()[1].page == "GridEntradas") {
                                    this.FrmEntrada = this.ui(FrmEntrada);
                                    this.FrmEntrada.showWindow();
                                } else if (this.getUrl()[1].page == "GridSalida") {
                                    this.FrmSalida = this.ui(FrmSalida);
                                    this.FrmSalida.showWindow();
                                } else if (this.getUrl()[1].page == "GridPeso") {
                                    this.FrmPeso = this.ui(FrmPeso);
                                    this.FrmPeso.showWindow();
                                } else if (this.getUrl()[1].page == "GridProcedencia") {
                                    this.FrmProcedencia = this.ui(FrmProcedencia);
                                    this.FrmProcedencia.showWindow();
                                } else if (this.getUrl()[1].page == "GridAlmacen") {
                                    this.FrmAlmacen = this.ui(FrmAlmacen);
                                    this.FrmAlmacen.showWindow();
                                } else if (this.getUrl()[1].page == "GridEmpresa") {
                                    this.FrmEmpresa = this.ui(FrmEmpresa);
                                    this.FrmEmpresa.showWindow();
                                } else if (this.getUrl()[1].page == "GridUsuarios") {
                                    this.FrmUsuarios = this.ui(FrmUsuarios);
                                    this.FrmUsuarios.showWindow();
                                } else if (this.getUrl()[1].page == "GridRoles") {
                                    this.FrmRoles = this.ui(FrmRoles);
                                    this.FrmRoles.showWindow();
                                } else if (this.getUrl()[1].page == "GridMoneda") {
                                    this.FrmMoneda = this.ui(FrmMoneda);
                                    this.FrmMoneda.showWindow();
                                } else if (this.getUrl()[1].page == "GridFormaCobro") {
                                    this.FrmFormaCobro = this.ui(FrmFormaCobro);
                                    this.FrmFormaCobro.showWindow();
                                } else if (this.getUrl()[1].page == "GridTipodeCambio") {
                                    this.FrmTipodeCambio = this.ui(FrmTipodeCambio);
                                    this.FrmTipodeCambio.showWindow();
                                } else if (this.getUrl()[1].page == "GridPoliticadeComisiones") {
                                    this.FrmPoliticadeComisiones = this.ui(FrmPoliticadeComisiones);
                                    this.FrmPoliticadeComisiones.showWindow();
                                } else if (this.getUrl()[1].page == "GridVendedor") {
                                    this.FrmVendedor = this.ui(FrmVendedor);
                                    this.FrmVendedor.showWindow();
                                } else if (this.getUrl()[1].page == "GridEstado") {
                                    this.FrmEstado = this.ui(FrmEstado);
                                    this.FrmEstado.showWindow();
                                } else if (this.getUrl()[1].page == "GridInventarioFisico") {
                                    this.FrmInventarioFisico = this.ui(FrmInventarioFisico);
                                    this.FrmInventarioFisico.showWindow();
                                } else if (this.getUrl()[1].page == "GridMunicipios") {
                                    this.FrmMunicipios = this.ui(FrmMunicipios);
                                    this.FrmMunicipios.showWindow();
                                } else if (this.getUrl()[1].page == "GridCajas") {
                                    this.FrmCajas = this.ui(FrmCajas);
                                    this.FrmCajas.showWindow();
                                } else if (this.getUrl()[1].page == "GridCajeros") {
                                    this.FrmCajeros = this.ui(FrmCajeros);
                                    this.FrmCajeros.showWindow();
                                } else if (this.getUrl()[1].page == "GridTipoImpuesto") {
                                    this.FrmTipoImpuesto = this.ui(FrmTipoImpuesto);
                                    this.FrmTipoImpuesto.showWindow();
                                } else if (this.getUrl()[1].page == "GridImpuestos") {
                                    this.FrmImpuestos = this.ui(FrmImpuestos);
                                    this.FrmImpuestos.showWindow();
                                } else if (this.getUrl()[1].page == "PuntoVenta") {
                                    //console.log(this.getUrl()[1].page.value);
                                    //this.app.show("/FrmPuntoVenta");
                                    //this.FrmPuntoVenta = this.ui(FrmPuntoVenta);
                                    //this.FrmPuntoVenta.showWindow();
                                } else if (this.getUrl()[1].page == "GridTipoProveedor") {
                                    this.FrmTipoProveedor = this.ui(FrmTipoProveedor);
                                    this.FrmTipoProveedor.showWindow();
                                } else if (this.getUrl()[1].page == "GridProveedor") {
                                    this.FrmProveedor = this.ui(FrmProveedor);
                                    this.FrmProveedor.showWindow();
                                }
                                else if (this.getUrl()[1].page == "GridAperturaCajas") {
                                    this.FrmAperturaCajas = this.ui(FrmAperturaCajas);
                                    this.FrmAperturaCajas.showWindow();
                                }
                                else if (this.getUrl()[1].page == "GridCierreCajas") {
                                    this.FrmCierreCajas = this.ui(FrmCierreCajas);
                                    this.FrmCierreCajas.showWindow();
                                }
                                else if (this.getUrl()[1].page == "GridModulo") {
                                    this.FrmModulos = this.ui(FrmModulos);
                                    this.FrmModulos.showWindow();
                                }
                                else if (this.getUrl()[1].page == "GridVistas") {
                                    this.FrmVista = this.ui(FrmVista);
                                    this.FrmVista.showWindow();
                                }
                                else if (this.getUrl()[1].page == "GridOperadores") {
                                    this.FrmOperador = this.ui(FrmOperador);
                                    this.FrmOperador.showWindow();
                                }
                            }
                        },
                        {
                            view: "button",
                            type: "icon",
                            width: 45,
                            css: "app_button",
                            icon: "mdi mdi-refresh",
                            //badge: 10,
                            click: () => {
                                $$("GridBase").$scope.refresh();
                            }
                        },
                        {
                            view: "button",
                            type: "icon",
                            width: 45,
                            css: "app_button",
                            icon: "mdi mdi-exit-to-app",
                            //badge: 10,
                            click: () => {;
                                webix.confirm({
                                    title: "Salir",
                                    ok: "Si",
                                    cancel: "No",
                                    text: "¿Estas seguro de cerrar sesión?",
                                    callback: (result) => {
                                        if (result == false)
                                            return;

                                        localStorage.removeItem("token");
                                        this.app.show("/FrmLogin");
                                    }
                                });
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
                                scroll: "auto",
                                id: "sidebar1",
                                width: 300,
                                //data: menu_data_multi,
                                on: {
                                    onAfterSelect: (id) => {
                                        // webix.message("Selected: " + this.getItem(id).value);
                                        //webix.message("Selected: " + this.getItem(id).url);
                                        //RptKardex
                                        if (id == "RptExistencia") {
                                            this.RptExistencias = this.ui(RptExistencias);
                                            this.RptExistencias.showWindow();
                                        } else if (id == "RptKardex") {
                                            this.RptKardex = this.ui(RptKardex);
                                            this.RptKardex.showWindow();
                                        } else if (id == "RptCodigosBarrras") {
                                            this.RptCodigosBarrras = this.ui(RptCodigosBarrras);
                                            this.RptCodigosBarrras.showWindow();
                                        }  else if (id == "GridCancelaciones") {
                                            this.GridCancelaciones = this.ui(GridCancelaciones);
                                            this.GridCancelaciones.showWindow();
                                        } else {
                                            // Se abre el grid seleccionado
                                            let grid = id.split("_") //Limpiar la cadena para elminar el timestamp
                                            this.app.show("/top/" + grid[0]);
                                        }
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

        //Conecta al socket para monitorear la informacion

        /*socket = io.connect('http://localhost:90/', {*/

        /*var socket = io.connect('http://localhost:90/', {

            'forceNew': true,
            query: { token: localStorage.getItem("token") }
            //transport: ['websocket', 'flashsocket', 'htmlfile', 'xhr-polling', 'jsonp-polling']
        });*/

        /*socket = io.connect('http://localhost:90/', {*/

        /*var socket = io.connect('http://localhost:900/', {
            'forceNew': true,
            query: { token: localStorage.getItem("token") }
            //transport: ['websocket', 'flashsocket', 'htmlfile', 'xhr-polling', 'jsonp-polling']
        });*/

        webix.attachEvent("onBeforeAjax",
            function(mode, url, data, request, headers, files, promise) {
                //headers["Content-type"] = "application/json";
                headers["token"] = localStorage.getItem("token");
            }
        );

        //Filtro para contar las filas
        webix.ui.datafilter.rowCount = webix.extend({
            refresh: function(master, node, value) {
                let total = master.count();
                node.firstChild.innerHTML = total <= 1 ? total + " registro" : total + " registros";
            }
        }, webix.ui.datafilter.summColumn);

        webix.UIManager.addHotKey("esc", function(view){
            console.log(view);
            return;
            if (view){
              var top = view.getTopParentView();
              if (top && top.setPosition)
                top.hide();
            }
          });

          let Menu = new menu();
          Menu.getMenuUsuario().then((realdata) => {
              $$("sidebar1").parse(realdata.json());
          }).fail((error) => {
              webix.alert({
                  type: "alert-error",
                  text: "Error: " + error.statusText
              }).then((result) => {
                  //this.hiddenProgressBar();
              });
          });

        //Formatea la fecha para que solo se obtenga la misma y no fecha y hora
        //webix.i18n.parseFormat = "%Y-%m-%d";
        //webix.i18n.setLocale();

        //comentario dany
    }
}