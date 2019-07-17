import { JetView } from "webix-jet";
import { FrmBase } from "views/FrmBase";
import { cajeros } from "models/pventa/cajeros";
import { usuario } from "models/catalogos/usuario";
import { cajas } from "models/pventa/cajas";
import { getCajeroReporte } from "models/generales";

export class FrmCajeros extends FrmBase {
    constructor(app, name) {
        //Genera un idetificador unico para la ventana con el 
        //objetivo de poder generar varias instancias
        let id = new Date().getTime();

        let collectionCajas = new webix.DataCollection({
            data: []
        });

        let form = {
            title: "Cajeros",
            width: 600,
            elements: [{
                view: "tabview",
                borderless: false,
                margin: 10,
                tabbar: {
                    optionWidth: 100
                },
                cells: [
                    {
                        id: "TabDatos",
                        header: "Datos",
                        body: {
                            height: 200,
                            view: "fieldset",
                            label: "Datos Particulares",
                            type: "space",
                            body: {
                                rows: [
                                    { view: "text", name: "Nombre", labelWidth: 75, label: "Nombre" },
                                    {
                                        view: "combo",
                                        name: "Usuarios._id",
                                        id: "Usuarios" + id,
                                        labelWidth: 75,
                                        label: "Usuario",
                                        options: {
                                            body: {
                                                template: "#NombreCompleto#",
                                                dataFeed: function(text) {
                                                    let usuarios = new usuario();
                                                    this.load(usuarios.searchCombo(text));
                                                }
                                            }
                                        }
                                    },
                                    { view: "label", label: ""},
                                    {
                                        view: "fieldset",
                                        label: "",
                                        id: "fieldsetReporte" + id,
                                        type: "space",
                                        body: {
                                            rows: [   
                                                { view: "combo", name: "ImprimirReportes", labelWidth: 180, id: "ImprimirReportes", label: "Imprimir los reportes de", options:  getCajeroReporte()},                                                                             
                                                { view: "checkbox", id: "PermiteImprimir", name: "PermiteImprimir",labelRight:"Permitir imprimirlos cuando la caja esta abierta",uncheckValue:0, checkValue:1, labelWidth:0},                           
                                            ]
                                        }
                                    },                                  
                                ]
                            }

                        }
                    },
                    {
                        header: "Operar Cajas",
                        id: "TabOperarCajas",
                        body: {
                            height: 200,
                            view: "fieldset",
                            label: "Cajas que opera",
                            type: "space",
                            body: {
                                rows: [{
                                        cols: [{
                                                rows: [
                                                    {
                                                        view: "fieldset",
                                                        label: "",
                                                        id: "fieldsetOpera" + id,
                                                        type: "space",
                                                        height: 185,
                                                        width: 200,
                                                        body: {
                                                            rows: [                            
                                                                {
                                                                    view:"radio", 
                                                                    label:"",
                                                                    id: "OperaCajas",
                                                                    name: "OperaCajas",
                                                                    vertical: "true", 
                                                                    value:1, options:[
                                                                        {"id":1, "value":"Todas"}, // the initially selected item
                                                                        {"id":2, "value":"Ninguna"},
                                                                        {"id":3, "value":"Una Lista"}
                                                                    ]
                                                                }                                                                                       
                                                            ]
                                                        }
                                                    },
                                                ]
                                            },
                                            {
                                                rows: [
                                                    {
                                                        view: "fieldset",
                                                        label: "",
                                                        id: "fieldsetOperaCajas" + id,
                                                        type: "space",
                                                        body: {
                                                            rows: [                            
                                                                {
                                                                    view: "datatable",
                                                                    id: "gridOpera",
                                                                    height: 185,
                                                                    width: 310,
                                                                    select: "cell",
                                                                    disabled: true,
                                                                    columns: [                                                                                                                                             
                                                                        {
                                                                            id: "CajasOp",
                                                                            editor: "combo",
                                                                            header: "Cajas Opera",
                                                                            fillspace: true,
                                                                            //width: 257,
                                                                            placeholder: "Cajas que opera",
                                                                            collection: collectionCajas,
                                                                            suggest: { // suggest
                                                                                template: "#value#",
                                                                                body: { // list
                                                                                    template: "#value#",
                                                                                    dataFeed: function(text) {
                                                                                        let caja = new cajas();
                                                                                        this.load(caja.searchCombo(text));
                                                                                    }
                                                                                }
                                                                            }
                                                                        }                              
                                                                    ],
                                                                    rules: {
                                                                        //   $all: webix.rules.isNotEmpty
                                                                    },
                                                                    liveValidation: true,
                                                                    editable: true,
                                                                    //autowidth: true,
                                                                    data: [{}]
                                                                }                                                                                      
                                                            ]
                                                        }
                                                    }
                                                ]
                                            }
                                        ]
                                    }                                
                                ]
                            }
                        },

                    },
                    {
                        header: "Abrir Cajas",
                        id: "TabAbrirCajas",
                        body: {
                            height: 200,
                            view: "fieldset",
                            label: "Cajas que abre",
                            type: "space",
                            body: {
                                rows: [{
                                        cols: [{
                                                rows: [
                                                    {
                                                        view: "fieldset",
                                                        label: "",
                                                        id: "fieldsetAbre" + id,
                                                        type: "space",
                                                        height: 185,
                                                        width: 200,
                                                        body: {
                                                            rows: [                            
                                                                {
                                                                    view:"radio", 
                                                                    label:"",
                                                                    id: "AbreCajas",
                                                                    name: "AbreCajas",
                                                                    vertical: "true", 
                                                                    value:1, options:[
                                                                        {"id":1, "value":"Todas"}, // the initially selected item
                                                                        {"id":2, "value":"Ninguna"},
                                                                        {"id":3, "value":"Una Lista"}
                                                                    ]
                                                                }                                                                                       
                                                            ]
                                                        }
                                                    },
                                                ]
                                            },
                                            {
                                                rows: [
                                                    {
                                                        view: "fieldset",
                                                        label: "",
                                                        id: "fieldsetAbreCajas" + id,
                                                        type: "space",
                                                        body: {
                                                            rows: [                            
                                                                {
                                                                    view: "datatable",
                                                                    id: "gridAbre",
                                                                    height: 185,
                                                                    width: 310,
                                                                    select: "cell",
                                                                    disabled: true,
                                                                    columns: [                                                                                                                                             
                                                                        {
                                                                            id: "CajasAb",
                                                                            editor: "combo",
                                                                            header: "Cajas Abre",
                                                                            fillspace: true,
                                                                            //width: 257,
                                                                            placeholder: "Cajas que Abre",
                                                                            collection: collectionCajas,
                                                                            suggest: { // suggest
                                                                                template: "#value#",
                                                                                body: { // list
                                                                                    template: "#value#",
                                                                                    dataFeed: function(text) {
                                                                                        let caja = new cajas();
                                                                                        this.load(caja.searchCombo(text));
                                                                                    }
                                                                                }
                                                                            }
                                                                        }                              
                                                                    ],
                                                                    rules: {
                                                                        //   $all: webix.rules.isNotEmpty
                                                                    },
                                                                    liveValidation: true,
                                                                    editable: true,
                                                                    //autowidth: true,
                                                                    data: [{}]
                                                                }                                                                                      
                                                            ]
                                                        }
                                                    }
                                                ]
                                            }
                                        ]
                                    }                                
                                ]
                            }
                        },

                    }
                    
                ]

            }],
            rules: {
                //Datos Generales
                "Nombre": webix.rules.isNotEmpty,
                "Usuarios._id": webix.rules.isNotEmpty,
                "ImprimirReportes": webix.rules.isNotEmpty
            }
        };

        let cajero = new cajeros();

        super(app, name, form, cajero, id);
    }
    init(view) {
        webix.extend($$(this.Ventana), webix.ProgressBar);
        let gridOp = $$("gridOpera");
        let gridAb = $$("gridAbre");
        this.LstCajas = [];
        let self = this;

        $$("OperaCajas").attachEvent("onChange", function() {
            let Valor = $$("OperaCajas").getValue();
            if (Valor < 3) {
                $$("gridOpera").disable();    
                $$("gridOpera").eachRow(function(row){ 
                    let id = $$("gridOpera").getItem(row);
                    this.remove(id);                    
                });    
            }
            else  {
                $$("gridOpera").enable();
            }
        });

        $$("AbreCajas").attachEvent("onChange", function() {
            let Valor = $$("AbreCajas").getValue();
            if (Valor < 3) {
                $$("gridAbre").disable();    
                $$("gridAbre").eachRow(function(row){ 
                    let id = $$("gridAbre").getItem(row);
                    this.remove(id);                    
                });    
            }
            else  {
                $$("gridAbre").enable();
            }
        });

        $$("gridOpera").attachEvent("onBeforeEditStop", function(change, editor) {
            var column = editor.config;

            if (column.editor == "combo" && column.collection) {
                var item = editor.getPopup().getList().getItem(change.value);
                try {
                    if (item == undefined) return;

                    if (!column.collection.exists(item.id)) {
                        column.collection.add(item);
                        self.LstCajas = column.collection;
                    }
                } catch (err) {
                    console.log(err);
                }
            }
        });

        this.$$("gridOpera").attachEvent("onKeyPress", function(code, e) {
            if (code == 46) {
                console.log("eliminar");
                let id = $$("gridOpera").getSelectedId();
                if (id) $$("gridOpera").remove(id);

            } else if (code == 13) {
                var editor = this.getEditor();
                setTimeout(function() {
                        gridOp.add({});                    
                }, 50);
            }
        });

        $$("gridAbre").attachEvent("onBeforeEditStop", function(change, editor) {
            var column = editor.config;

            if (column.editor == "combo" && column.collection) {
                var item = editor.getPopup().getList().getItem(change.value);
                try {
                    if (item == undefined) return;

                    if (!column.collection.exists(item.id)) {
                        column.collection.add(item);
                        self.LstCajas = column.collection;
                    }
                } catch (err) {
                    console.log(err);
                }
            }
        });

        this.$$("gridAbre").attachEvent("onKeyPress", function(code, e) {
            if (code == 46) {
                console.log("eliminar");
                let id = $$("gridAbre").getSelectedId();
                if (id) $$("gridAbre").remove(id);

            } else if (code == 13) {
                var editor = this.getEditor();
                setTimeout(function() {
                        gridAb.add({});                    
                }, 50);
            }
        });
    }

    guardar() {
        //console.log($$("gridGravables").validate());
        if (!$$("gridOpera").validate()) return;
        let data = this.$$(this.Formulario).getValues();
        let CajerosCajas = [];
        let CajerosCajasAbrir = [];

        //Obtiene los valores del grid
        $$("gridOpera").eachRow((row) => {
            let record = $$("gridOpera").getItem(row);
            //Se crea el objecto articulo el cual se añadira al movimiento
            if (record.CajasOp != undefined) {
                let cajasope = {
                    CajasOp: {
                        _id: record.CajasOp
                    }
                };
                CajerosCajas.push(cajasope);
            }
        });

        $$("gridAbre").eachRow((row) => {
            let record = $$("gridAbre").getItem(row);
            //Se crea el objecto articulo el cual se añadira al movimiento
            if (record.CajasAb != undefined) {
                let cajasabr = {
                    CajasAb: {
                        _id: record.CajasAb
                    }
                };
                CajerosCajasAbrir.push(cajasabr);
            }
        });

        data.CajerosCajas = CajerosCajas;
        data.CajerosCajasAbrir = CajerosCajasAbrir;
        console.log(data);
        
        //console.log($$("OperaCajas").getValue());
        //console.log($$("AbreCajas").getValue());
        super.guardar(data);
    }


    cargarCombos(data) {
        this.cargarCombo(this.$$("Usuarios" + this.id), data.Usuarios);
        
        $$("gridOpera").clearAll();
        data.CajerosCajas.forEach(element => {
            $$("gridOpera").config.columns[0].collection.add(element.CajasOp);

            let cajao = {
                CajasOp: element.CajasOp._id       
            }
            console.log(cajao);

            $$("gridOpera").add(cajao);
        });

        $$("gridAbre").clearAll();
        data.CajerosCajasAbrir.forEach(element => {
            $$("gridAbre").config.columns[0].collection.add(element.CajasAb);

            let cajaa = {
                CajasAb: element.CajasAb._id       
            }
            console.log(cajaa);

            $$("gridAbre").add(cajaa);
        });
    }

    cargarChecks(data){
        this.$$("OperaCajas").value=data.OperaCajas;
        this.$$("AbreCajas").value=data.AbreCajas;
    }
    
}