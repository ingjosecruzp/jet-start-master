import { JetView } from "webix-jet";
import { FrmBase } from "views/FrmBase";
import { articulos } from "models/catalogos/articulos";
import { marca } from "models/catalogos/marca";
import { grupounidad } from "models/catalogos/grupounidad";
import { grupocomponente } from "models/catalogos/grupocomponente";
import { unidades } from "models/catalogos/unidades";
import { subgrupocomponente } from "models/catalogos/subgrupocomponente";
import { pureza } from "models/inventarios/pureza";
import { peso } from "models/inventarios/peso";
import { paises } from "models/catalogos/paises";
import { tipoconceptos } from "models/catalogos/tipoconceptos";
import { getSiNo, getNaturaleza } from "models/generales";

export class FrmArticulos extends FrmBase {
    constructor(app, name) {
        //Genera un idetificador unico para la ventana con el 
        //objetivo de poder generar varias instancias
        let id = new Date().getTime();

        let collectionUnidades = new webix.DataCollection({
            data: []
        });

        let form = {
            title: "Articulos",
            width: 750,
            elements: [{
                view: "tabview",
                borderless: false,
                margin: 10,
                tabbar: {
                    optionWidth: 100
                },
                cells: [{
                        id: "TabGeneral",
                        header: "General",
                        body: {
                            cols: [{
                                    width: 400,
                                    rows: [{
                                            cols: [
                                                { view: "text", name: "Clave", labelWidth: 75, label: "Clave", readonly: true }
                                            ]
                                        },
                                        { view: "text", name: "Nombre", labelWidth: 75, label: "Nombre" },
                                        {
                                            view: "combo",
                                            name: "GrupoComponente._id",
                                            id: "CmbGrupoComponente" + id,
                                            labelWidth: 75,
                                            label: "Grupo",
                                            options: {
                                                body: {
                                                    template: "#Nombre#",
                                                    dataFeed: function(text) {
                                                        let grupocomponentes = new grupocomponente();
                                                        this.load(grupocomponentes.searchCombo(text));
                                                    }
                                                }
                                            }
                                        },
                                        {
                                            view: "combo",
                                            name: "SubGrupoComponente._id",
                                            labelWidth: 75,
                                            id: "CmbSubGrupoComponente" + id,
                                            label: "SubGrupo",
                                            options: {
                                                body: {
                                                    template: "#Nombre#",
                                                    dataFeed: function(text) {
                                                        let GrupoComponenteId = $$("CmbGrupoComponente" + id).getValue();
                                                        if (GrupoComponenteId == "") return;
                                                        let subgrupocomponentes = new subgrupocomponente();
                                                        this.load(subgrupocomponentes.searchXGrupo(text, GrupoComponenteId));
                                                    }
                                                }
                                            }
                                        },
                                        {
                                            cols: [{
                                                    view: "combo",
                                                    name: "GrupoUnidad._id",
                                                    id: "CmbGrupoUnidad" + id,
                                                    labelWidth: 75,
                                                    label: "Grp. Unidad",
                                                    options: {
                                                        body: {
                                                            template: "#Nombre#",
                                                            dataFeed: function(text) {
                                                                let grupounidades = new grupounidad();
                                                                this.load(grupounidades.searchCombo(text));
                                                            }
                                                        }
                                                    }
                                                },
                                                { view: "combo", name: "Activo", labelWidth: 50, width: 150, label: "Activo", options: getSiNo() }
                                            ]
                                        },
                                        {
                                            view: "combo",
                                            name: "Marca._id",
                                            id: "cmbMarca" + id,
                                            labelWidth: 75,
                                            label: "Marca",
                                            options: {
                                                body: {
                                                    template: "#Nombre#",
                                                    dataFeed: function(text) {
                                                        let marcas = new marca();
                                                        this.load(marcas.searchCombo(text));
                                                    }
                                                }
                                            }
                                        },
                                        {
                                            margin: 11,
                                            rows: [{
                                                    cols: [
                                                        { view: "text", name: "Modelo", labelWidth: 75, label: "Modelo" },
                                                        { view: "text", name: "NoParte", labelWidth: 75, label: "No. Parte" }
                                                    ]
                                                },
                                                {
                                                    view: "fieldset",
                                                    label: "Codigos de barra",
                                                    id: "fieldsetCodigos" + id,
                                                    type: "space",
                                                    body: {
                                                        rows: [{
                                                            view: "datatable",
                                                            id: "gridCodigos" + id,
                                                            height: 150,
                                                            select: "cell",
                                                            //editaction: "none",
                                                            columns: [{
                                                                    id: "Unidad",
                                                                    header: "Unidad",
                                                                    editor: "combo",
                                                                    width: 120,
                                                                    css: "Clave",
                                                                    collection: collectionUnidades,
                                                                    suggest: { // suggest
                                                                        template: "#value#",
                                                                        body: { // list
                                                                            template: "#value#",
                                                                            dataFeed: function(text) {
                                                                                let unidad = new unidades();
                                                                                this.load(unidad.searchCombo(text));
                                                                            }
                                                                        }
                                                                    }
                                                                },
                                                                { id: "Codigo", editor: "text", header: "Codigo", width: 120, css: { "text-align": "center" } },
                                                                { id: "Activo", editor: "combo", header: "Activo", width: 120, options: getSiNo() },
                                                            ],
                                                            rules: {
                                                                $all: webix.rules.isNotEmpty
                                                            },
                                                            liveValidation: true,
                                                            editable: true,
                                                            autowidth: true,
                                                            data: [{}]
                                                        }]
                                                    }
                                                }
                                            ]
                                        },

                                    ]
                                },
                                {
                                    rows: [{
                                            cols: [{
                                                view: "toolbar",
                                                autoWidth: true,
                                                width: 315,
                                                cols: [
                                                    { gravity: 4 },
                                                    { view: "icon", id: "btnImagenes" + id, icon: "mdi mdi-image-search", align: "right" },
                                                    { view: "icon", id: "btnEliminarImg" + id, icon: "mdi mdi-delete", align: "right" }
                                                ]
                                            }, ]
                                        },
                                        {
                                            view: "dataview",
                                            id: "carousel" + id,
                                            css: "webix_dark",
                                            select: 1,
                                            width: 315,
                                            xCount: 1, //the number of items in a row
                                            yCount: 1,
                                            type: {
                                                width: 313,
                                                height: 403,
                                                template: "<img src='#Source#' style='width:300px;height:403px'><br>#title#"
                                            },
                                            //data: ,
                                            on: {
                                                onAfterSelect: function(id) {
                                                    //webix.message(JSON.stringify(this.getItem(id)));
                                                }
                                            }
                                        },
                                        {
                                            height: 0,
                                            width: 0,
                                            rows: [{
                                                view: "uploader",
                                                id: "btnUploader" + id,
                                                width: 0,
                                                height: 0,
                                                accept: "image/jpeg, image/png",
                                                autosend: false,
                                                multiple: false
                                            }]
                                        }
                                    ]

                                }
                            ]
                        }
                    },
                    {
                        id: "TabParticulares",
                        header: "Particulares",
                        body: {
                            height: 423,
                            view: "fieldset",
                            label: "Datos Particulares",
                            type: "space",
                            body: {
                                rows: [{
                                        view: "combo",
                                        name: "Pureza._id",
                                        labelWidth: 90,
                                        id: "CmbPureza" + id,
                                        label: "Pureza",
                                        options: {
                                            body: {
                                                template: "#Nombre#",
                                                dataFeed: function(text) {
                                                    let purezas = new pureza();
                                                    this.load(purezas.searchCombo(text));
                                                }
                                            }
                                        }
                                    },
                                    {
                                        view: "combo",
                                        name: "Peso._id",
                                        labelWidth: 90,
                                        id: "CmbPeso" + id,
                                        label: "Peso",
                                        options: {
                                            body: {
                                                template: "#Nombre#",
                                                dataFeed: function(text) {
                                                    let pesos = new peso();
                                                    this.load(pesos.searchCombo(text));
                                                }
                                            }
                                        }
                                    },
                                    {
                                        view: "combo",
                                        name: "Paises._id",
                                        labelWidth: 90,
                                        id: "CmbPaises" + id,
                                        label: "Procedencia",
                                        options: {
                                            body: {
                                                template: "#Nombre#",
                                                dataFeed: function(text) {
                                                    let pais = new paises();
                                                    this.load(pais.searchCombo(text));
                                                }
                                            }
                                        }
                                    }
                                ]
                            }

                        }
                    },
                    {
                        header: "Inventarios y unidades",
                        id: "TabInventariosUnidades",
                        margin: 250,
                        body: {
                            margin: 10,
                            rows: [{
                                    margin: 20,
                                    cols: [{
                                            rows: [
                                                { view: "template", template: "Datos de inventarios", type: "header" },
                                                {
                                                    css: { "border-width": "1px", "width": "343px !important", "height": "118px !important" },
                                                    height: 120,
                                                    //width: 351,
                                                    minWidth: 345,
                                                    rows: [{
                                                            rows: [
                                                                { view: "combo", name: "Inventariable", labelWidth: 100, width: 340, label: "Inventariable", options: getSiNo() }
                                                            ]
                                                        },
                                                        {
                                                            rows: [
                                                                { view: "combo", name: "TipoSeguimiento", labelWidth: 100, width: 340, label: "Seguimiento", options: getSiNo() }
                                                            ]
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            rows: [
                                                { view: "template", template: "Unidades", type: "header" },
                                                {
                                                    css: { "border-width": "1px", "width": "343px !important", "height": "118px !important" },
                                                    height: 120,
                                                    //width: 351,
                                                    minWidth: 345,
                                                    rows: [{
                                                            rows: [{
                                                                view: "combo",
                                                                name: "UnidadInventario._id",
                                                                id: "cmbUnidadInventario" + id,
                                                                labelWidth: 100,
                                                                width: 340,
                                                                label: "Inventario",
                                                                options: {
                                                                    body: {
                                                                        template: "#Nombre#",
                                                                        dataFeed: function(text) {
                                                                            let GrupoUnidadId = $$("CmbGrupoUnidad" + id).getValue();
                                                                            if (GrupoUnidadId == "") return;

                                                                            let grupounidades = new grupounidad();
                                                                            this.load(grupounidades.searchXUnidad(text, GrupoUnidadId));
                                                                        }
                                                                    }
                                                                }
                                                            }]
                                                        },
                                                        {
                                                            rows: [{
                                                                view: "combo",
                                                                name: "UnidadVenta._id",
                                                                labelWidth: 100,
                                                                id: "cmbUnidadVenta" + id,
                                                                width: 340,
                                                                label: "Venta",
                                                                options: {
                                                                    body: {
                                                                        template: "#Nombre#",
                                                                        dataFeed: function(text) {
                                                                            let GrupoUnidadId = $$("CmbGrupoUnidad" + id).getValue();
                                                                            console.log(GrupoUnidadId);
                                                                            if (GrupoUnidadId == "") return;

                                                                            let grupounidades = new grupounidad();
                                                                            this.load(grupounidades.searchXUnidad(text, GrupoUnidadId));
                                                                        }
                                                                    }
                                                                }
                                                            }]
                                                        },
                                                        {
                                                            rows: [{
                                                                view: "combo",
                                                                name: "UnidadCompra._id",
                                                                labelWidth: 100,
                                                                id: "cmbUnidadCompra" + id,
                                                                width: 340,
                                                                label: "Compra",
                                                                options: {
                                                                    body: {
                                                                        template: "#Nombre#",
                                                                        dataFeed: function(text) {
                                                                            let GrupoUnidadId = $$("CmbGrupoUnidad" + id).getValue();
                                                                            console.log(GrupoUnidadId);
                                                                            if (GrupoUnidadId == "") return;

                                                                            let grupounidades = new grupounidad();
                                                                            this.load(grupounidades.searchXUnidad(text, GrupoUnidadId));
                                                                        }
                                                                    }
                                                                }
                                                            }]
                                                        }

                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    rows: [
                                        { view: "template", template: "Configuración Almacenes", type: "header" },
                                        {
                                            view: "datatable",
                                            id: "gridAlmacenes" + id,
                                            height: 231,
                                            select: "cell",
                                            //editaction: "none",
                                            columns: [{
                                                    id: "Almacen",
                                                    header: "Almacen",
                                                    editor: "combo",
                                                    width: 210,
                                                    collection: collectionUnidades,
                                                    suggest: { // suggest
                                                        template: "#value#",
                                                        body: { // list
                                                            template: "#value#",
                                                            dataFeed: function(text) {
                                                                let unidad = new unidades();
                                                                this.load(unidad.searchCombo(text));
                                                            }
                                                        }
                                                    }
                                                },
                                                { id: "Maximo", editor: "text", header: { text: "Maximo", css: { "text-align": "center" } }, width: 120, css: { "text-align": "center" } },
                                                { id: "Reorden", editor: "text", header: { text: "Reorden", css: { "text-align": "center" } }, width: 120, css: { "text-align": "center" } },
                                                { id: "Minimo", editor: "text", header: { text: "Minimo", css: { "text-align": "center" } }, width: 120, css: { "text-align": "center" } },
                                                { id: "Localización", editor: "text", header: { text: "Localización", css: { "text-align": "center" } }, width: 120, css: { "text-align": "center" } },
                                            ],
                                            rules: {
                                                $all: webix.rules.isNotEmpty
                                            },
                                            liveValidation: true,
                                            editable: true,
                                            autowidth: true
                                                // data: [{}]
                                        }
                                    ]
                                }

                            ]
                        },

                    }
                ]

            }],
            rules: {
                //Datos Generales
                //"Clave": webix.rules.isNotEmpty,
                "Nombre": webix.rules.isNotEmpty,
                "GrupoComponente._id": webix.rules.isNotEmpty,
                "SubGrupoComponente._id": webix.rules.isNotEmpty,
                "GrupoUnidad._id": webix.rules.isNotEmpty,
                "Activo": webix.rules.isNotEmpty,
                ///Inventario y unidades
                "Inventariable": webix.rules.isNotEmpty,
                "TipoSeguimiento": webix.rules.isNotEmpty,
                "UnidadInventario._id": webix.rules.isNotEmpty,
                "UnidadVenta._id": webix.rules.isNotEmpty,
                "UnidadCompra._id": webix.rules.isNotEmpty
            }
        };

        let articulo = new articulos();

        super(app, name, form, articulo, id);
    }
    init(view) {
        let self = this;
        webix.extend($$(this.Ventana), webix.ProgressBar);

        $$("CmbGrupoComponente" + this.id).attachEvent("onChange", (newv, oldv) => {
            $$("CmbSubGrupoComponente" + this.id).setValue("");
            $$("CmbSubGrupoComponente" + this.id).getPopup().getList().clearAll();
        });

        $$("CmbGrupoUnidad" + this.id).attachEvent("onChange", (newv, oldv) => {

            $$("cmbUnidadInventario" + this.id).setValue("");
            $$("cmbUnidadInventario" + this.id).getPopup().getList().clearAll();

            $$("cmbUnidadVenta" + this.id).setValue("");
            $$("cmbUnidadVenta" + this.id).getPopup().getList().clearAll();

            $$("cmbUnidadCompra" + this.id).setValue("");
            $$("cmbUnidadCompra" + this.id).getPopup().getList().clearAll();
        });

        let grid = $$("gridCodigos" + this.id);

        this.$$("gridCodigos" + this.id).attachEvent("onBeforeEditStop", function(change, editor) {
            var column = editor.config;

            if (column.editor == "combo" && column.collection) {
                var item = editor.getPopup().getList().getItem(change.value);
                try {
                    if (item == undefined) return;

                    if (!column.collection.exists(item.id)) {
                        console.log(item);
                        column.collection.add(item);
                        //self.LstArticulos = column.collection;
                    }
                } catch (err) {
                    console.log(err);
                }
            }
        });

        this.$$("gridCodigos" + this.id).attachEvent("onKeyPress", function(code, e) {
            if (code == 46) {
                if (grid.count() == 1) return;

                let id = grid.getSelectedId();
                if (id) grid.remove(id);

            } else if (code == 13) {
                var editor = this.getEditor();
                setTimeout(function() {
                    if (editor.column == "Activo" && editor.row == grid.getLastId()) {
                        grid.add({});
                    }
                    grid.editNext(true, editor);
                }, 50);
            }
        });

        let Carousel = $$("carousel" + this.id);

        this.$$("btnImagenes" + this.id).attachEvent("onItemClick", function() {
            $$("btnUploader" + self.id).fileDialog();
        });

        this.$$("btnEliminarImg" + this.id).attachEvent("onItemClick", function() {
            if (!Carousel.getSelectedId()) {
                return;
            }
            Carousel.remove(Carousel.getSelectedId());
        });

        this.$$("btnUploader" + this.id).attachEvent("onBeforeFileAdd", function(upload) {
            var file = upload.file;
            var reader = new FileReader();

            reader.onload = function(event) {
                Carousel.add({ Source: event.target.result });
                setTimeout(function() {
                    Carousel.showItem(Carousel.getLastId());
                }, 100);
            };

            reader.readAsDataURL(file)
            return false;
        });

    }
    guardar() {
        //if (!$$("gridCodigos" + this.id).validate()) return;

        let data = this.$$(this.Formulario).getValues();

        //Agrega las Imagenes
        data.Imagen = $$("carousel" + this.id).serialize();

        let CodigosBarra = [];

        //Obtiene los valores del grid
        $$("gridCodigos" + this.id).eachRow((row) => {
            let record = $$("gridCodigos" + this.id).getItem(row);

            if (record.Unidad != undefined) {
                console.log(record);
                console.log(record.Unidad._id);

                let codigo = {
                    Codigo: record.Codigo,
                    Activo: record.Activo,
                    //Unidad: record.Unidad._id
                    Unidad: {
                        _id: record.Unidad
                    }
                }

                CodigosBarra.push(codigo);
            }
        });

        data.CodigosBarra = CodigosBarra;

        //console.log(this.$$(this.Formulario));
        console.log(data);
        //return;
        super.guardar(data);
    }
    cargarCombos(data) {
        console.log(data);
        //console.log("cargando");

        this.cargarCombo($$("CmbGrupoComponente" + this.id), data.GrupoComponente);
        this.cargarCombo($$("CmbSubGrupoComponente" + this.id), data.SubGrupoComponente);
        this.cargarCombo($$("CmbGrupoUnidad" + this.id), data.GrupoUnidad);

        this.cargarCombo($$("cmbUnidadCompra" + this.id), data.UnidadCompra);
        this.cargarCombo($$("cmbUnidadInventario" + this.id), data.UnidadInventario);
        this.cargarCombo($$("cmbUnidadVenta" + this.id), data.UnidadVenta);

        if (data.Marca != undefined)
            this.cargarCombo($$("cmbMarca" + this.id), data.Marca);
        if (data.Pureza != undefined)
            this.cargarCombo($$("CmbPureza" + this.id), data.Pureza);
        if (data.Peso != undefined)
            this.cargarCombo($$("CmbPeso" + this.id), data.Peso);
        if (data.Paises != undefined)
            this.cargarCombo($$("CmbPaises" + this.id), data.Paises);

        let Carousel = $$("carousel" + this.id);
        data.Imagen.forEach(element => {
            let url = "http://localhost:60493/img/" + element.Source;
            Carousel.add({ Source: url });
        });

        $$("gridCodigos" + this.id).clearAll();

        data.CodigosBarra.forEach(element => {
            console.log(element);
            $$("gridCodigos" + this.id).config.columns[0].collection.add(element.Unidad);

            let codigo = {
                Activo: element.Activo,
                Codigo: element.Codigo,
                Unidad: element.Unidad._id
            }

            console.log(codigo);
            $$("gridCodigos" + this.id).add(codigo);
        });
    }

}