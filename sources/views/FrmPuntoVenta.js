import { FrmBase } from "views/FrmBase";
import { cajeros } from "models/pventa/cajeros";
//import { clientes } from "models/pventa/cajeros";
//import { usuario } from "models/catalogos/usuario";
//import { cajas } from "models/pventa/cajas";
//import { getCajeroReporte } from "models/generales";

export class FrmPuntoVenta extends FrmBase {
    constructor(app, name) {
        //Genera un idetificador unico para la ventana con el 
        //objetivo de poder generar varias instancias
       // console.log("Form 1")
        let id = new Date().getTime();
        let ancho = (document.body.offsetWidth)-((document.body.offsetWidth)*.03);
        let Wdet = ancho/2;
        let WContainer = Wdet/2;
        let areaCte = Wdet*.85;
        let areaLogo = Wdet*.15;
        //let areaTecyPagos = WContainer/2;
        //let areaPagos = WContainer/2;

        let alto = (document.body.offsetHeight)-((document.body.offsetHeight)*.15);
        let altoTecyPag = alto-210;
        let botonesTec = altoTecyPag/6;
        console.log(ancho);
        console.log(Wdet);
        console.log(WContainer);

//-------------------- PANEL IZQUIERDO DETALLE COMPRA ---------------------
        let detalle = [            
            {cols:[
                { view:"text", label:"Articulo", labelWidth:60, value:"" },
                { view:"icon", icon:"mdi mdi-feature-search"},
                { view:"icon", icon:"mdi mdi-cart-plus"}
            ]},
            {cols:[
                {view:"label", label:"Detalle de la compra", align:"left"},
                {view:"label", label:"X Artículos", align:"right"}
            ]},
            //-------------------- GRID ---------------------
            {view:"datatable", elements:gridDetalle},            
            {cols:[
                { //-------------------- DESCUENTO Y BTN COBRAR ---------------------
                    view: "form", container: "descuento", width: WContainer, height: 140,
                    elements: [
                        {view:"text", label:"Descto.", align:"left"},
                        {view: "button", label: "COBRAR", height:70} 
                    ]
                },
                { //-------------------- SUBTOTAL IVA Y TOTAL ---------------------
                    view: "form", container: "totales", width: WContainer, height: 140, paddingY: 5,
                    elements: [
                        {view:"text", label:"Subtotal:", align:"right", width:200},                
                        {view:"text", label:"IVA:", align:"right", width:200},
                        {view:"text", label:"TOTAL:", align:"right", width:200}     
                    ]
                }
            ]}
        ];        

//-------------------- PANEL DERECHO DATOS Y PAGO ---------------------
        let fpago = [            
            {cols:[
                //-------------------- VENDEDOR FECHA Y CLIENTE ---------------------
                { view: "form", container: "datosGral", width: areaCte, height: 90 , paddingY: 1,
                    elements: [
                        {cols:[
                            {view:"label", label:"Nombre del VENDEDOR", align:"left"},
                            {view:"label", label:"MIERCOLES 24 DE JULIO 2019", align:"right"}
                        ]},
                        {cols:[
                            {view: "combo", elements: cmbcte, label: "Cliente", inputWidth: 300},
                            {view:"label", label:"PUNTOS: 0", align:"right"}
                        ]}
                    ]
                },  
                //-------------------- LOGO DE LA EMPRESA ---------------------              
                { view: "form", container: "logo", width: areaLogo, height: 90, paddingY: 1, paddingX:0,
                    elements: [
                        {
                            view: "dataview", id: "carousel" + id, select: 1, xCount: 1, yCount: 1,
                            type: { width: 100, height: 90, template: "<img src='#Source#' style='width:80;height:80' align='center'><br>"}
                        }
                    ]
                },                
            ]},
            //-------------------- FORMA DE PAGO ---------------------
            { rows: [	
                { view: "fieldset", label: "Forma de pago", type:"clean", height: 70, 
                body:{ cols:[			
                        { view: "button", label: "EFECTIVO"},
                        { view: "button", label: "TARJETA"},
                        { view: "button", label: "PUNTOS"},
                        { view: "button", label: "VALES"}				
                    ]}
                }
            ]},
            {
                cols:[
                    //-------------------- TECLADO NUMERICO  ---------------------
                    { view: "form", width: WContainer, height: altoTecyPag,
                        elements: [
                            {cols:[
                                { view: "button", label: " 7 ", height: botonesTec},
                                { view: "button", label: " 8 ", height: botonesTec},
                                { view: "button", label: " 9 ", height: botonesTec}
                            ]},
                            {cols:[
                                { view: "button", label: " 4 ", height: botonesTec},
                                { view: "button", label: " 5 ", height: botonesTec},
                                { view: "button", label: " 6 ", height: botonesTec}
                            ]},
                            {cols:[
                                { view: "button", label: " 1 ", height: botonesTec},
                                { view: "button", label: " 2 ", height: botonesTec},
                                { view: "button", label: " 3 ", height: botonesTec}
                            ]},
                            {cols:[
                                { view: "button", label: " 0 ", height: botonesTec},
                                { view: "button", label: " X ", height: botonesTec},
                                { view: "button", label: " <-- ", height: botonesTec}
                            ]},
                            {cols:[
                                { view: "button", label: " PAGAR ", height: botonesTec}
                            ]},
                        ]
                    },  
                    //-------------------- LISTA DE PAGOS HECHOS Y TOTALES ---------------------              
                    { view: "form", width: WContainer, paddingY: 1, height: altoTecyPag,
                        elements: [
                            { rows:[
                                {view:"datatable", elements:gridPagos}
                            ]},
                            { rows:[
                                {view:"text", label:"Total:", align:"right", labelWidth:85, inputWidth:210},
                                {view:"text", label:"Su Pago:", align:"right", labelWidth:85, inputWidth:210},
                                {view:"text", label:"Su Cambio:", align:"right", labelWidth:85, inputWidth:210, height:50} 
                            ]}
                        ]
                    },                
                ]
            }
        ]; 
//-------------------- FIN PANEL DERECHO ---------------------       

//-------------------- FORMULARIO PRINCIPAL ---------------------       
        let form = {
            title: "PUNTO DE VENTA",           
            elements: [{
                cols: [
                    {view:"form", elements:detalle, width: Wdet, height: alto, padding:1 },
                    {view:"form", elements:fpago, width: Wdet, height: alto, padding:1}
                ]}                
            ],
            rules: {
                //Datos Generales
                /*"Nombre": webix.rules.isNotEmpty,
                "Usuarios._id": webix.rules.isNotEmpty,
                "ImprimirReportes": webix.rules.isNotEmpty*/
            }        
        };
//------GRID DETALLE DE LA COMPRA-----------------------------------------------------------
        let gridDetalle= [{
            view: "datatable", id: "gridDetalle", select: "cell", disabled: true, liveValidation: true, editable: true, autowidth: true, data: [{}],
            columns: [{
                id: "CajasOp", editor: "combo", header: "Cajas Opera", fillspace: true, //collection: collectionCajas,                
            }],
            rules: {},                       
        }];

        let gridPagos= [{
            view: "datatable", id: "gridPagos", select: "cell", disabled: true, liveValidation: true, editable: true, autowidth: true, data: [{}],
            columns: [
                { id: "tipo", editor: "text", header: { text: "Forma", css: { "text-align": "center" } }, width: WContainer/2, css: { "text-align": "left" } },
                { id: "montotipo", editor: "text", header: { text: "Importe", css: { "text-align": "center" } }, width: WContainer/2, css: { "text-align": "right" } },
            ],
            rules: {},                       
        }];

        let cmbcte= [
            { view: "combo", name: "Cajeros._id", id: "cmbClientes", 
                options: {
                    body: {
                        template: "#Nombre#", dataFeed: function(text) {
                            let cte = new cajeros();
                            this.load(cte.searchCombo(text));
                        }
                    }
                }
            }
        ];

        let puntodeventa = new cajeros();

        super(app, name, form, puntodeventa, id);
    }

    init(view) {
        webix.extend($$(this.Ventana), webix.ProgressBar);
       
        let Carousel = $$("carousel" + this.id);
        let url = "http://localhost:60493/img/ptovta.png";
        Carousel.add({ Source: url });        
    }   
    
    config(){
        return {
            view: "window",            
            fullscreen: true,
            id: this.Ventana,
            move: true,
            position: "center",
            head: {
                view: "toolbar",
                margin: -4,
                height: 35,
                css: "webix_dark",
                cols: [
                    { view: "label", label: this.form.title, align: "center" },
                    {
                        view: "icon",
                        icon: "mdi mdi-close",
                        click: () => {
                            $$(this.Ventana).close();
                        }
                    }
                ]
            },
            body: {
                rows: [{
                    view: "toolbar",
                    height: 35,
                    cols: [
                        { view: "icon", icon: "mdi mdi-content-save", align: "left", click: () => this.guardar() },
                        { view: "icon", icon: "mdi mdi-content-save-all", align: "center" },
                        { view: "icon", icon: "mdi mdi-delete", align: "right", click: () => this.eliminar() },
                        { view: "icon", icon: "mdi mdi-arrow-left-bold", align: "right", click: () => this.upRow() },
                        { view: "icon", icon: "mdi mdi-arrow-right-bold", align: "right", click: () => this.downRow() },
                        { view: "icon", icon: "mdi mdi-printer", align: "right", click: () => this.imprimir() }
                    ]
                }, {
                    view: "form",
                    id: this.Formulario,
                    width: this.form.width,
                    complexData: true,
                    rules: this.form.rules,
                    elements: this.form.elements,
                    elementsConfig: {
                        attributes: { autocomplete: "off" }
                    }
                }]
            }
        };
    }
}