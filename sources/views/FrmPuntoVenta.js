import { FrmBase } from "views/FrmBase";
import { cajeros } from "models/pventa/cajeros";
//import { clientes } from "models/pventa/cajeros";
import { articulos } from "models/catalogos/articulos";
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
        let gpago = (WContainer/2)-20;
        //let areaTecyPagos = WContainer/2;
        //let areaPagos = WContainer/2;        

        let alto = (document.body.offsetHeight)-((document.body.offsetHeight)*.08);
        let altoTecyPag = alto-210;
        let botonesTec = altoTecyPag/6;
        
        let funcionx=0;
        let collection = new webix.DataCollection({ data: [] });

//-------------------- PANEL IZQUIERDO DETALLE COMPRA ---------------------
        let detalle = [            
            {cols:[               
                { view: "combo", name: "txtarticulo", id:"txtarticulo", label: "Articulo",
                    options: {
                        body: {
                            template: "#Clave#", dataFeed: function(text) {
                                let articulo = new articulos();
                                this.load(articulo.searchPorCampo("Clave",text));
                            }
                        }
                    }
                },
                { view:"icon", id: "btnbuscar", icon:"mdi mdi-feature-search"},
                { view:"icon", id: "btnagregar", icon:"mdi mdi-cart-plus"}
            ]},
            {cols:[
                {view:"label", label:"Detalle de la compra", align:"left"},
                {view:"label", id:"narticulos", label:"0 Artículos", align:"right"}
            ]},
            //-------------------- GRID ---------------------
            {
                view: "datatable", id: "gridDetalle", select: "cell", liveValidation: true, editable: false, autowidth: true, data: [{}],
                columns: [
                    { id: "Codigo", editor:"text", header: "Codigo", width: Wdet*.13, css: { "text-align": "left" } },
                    { id: "Articulo", header: "Articulo", width: Wdet*.38, css: { "text-align": "left" } },                            
                    { id: "Cantidad", header: "Cantidad", format: webix.i18n.numberFormat, width: Wdet*.08, css: { "text-align": "center" } },
                    { id: "Unidad", header: "Unidad", width: Wdet*.08, css: { "text-align": "center" } },
                    { id: "Precio", header: "Precio", format: webix.i18n.priceFormat, width: Wdet*.11, css: { "text-align": "center" } },
                    { id: "Descuento", header: "Descto.", format: webix.i18n.priceFormat, width: Wdet*.08, css: { "text-align": "center" } },
                    { id: "Subtotal", header: "Subtotal", format: webix.i18n.priceFormat, width: Wdet*.13, css: { "text-align": "center"} }
                ],
                rules: {},                       
            },
            {cols:[
                { //-------------------- DESCUENTO Y BTN COBRAR ---------------------
                    view: "form", container: "descuento", width: WContainer, height: 140,
                    elements: [
                        {view:"text", id:"txtdescuento", label:"Descto.", align:"left", readonly:true, value: webix.i18n.priceFormat("0.00"), inputAlign:"right"},
                        {view: "button", id:"btncobrar", label: "COBRAR", height:70, click: () => this.validaCobrar()} 
                    ]
                },
                { //-------------------- SUBTOTAL IVA Y TOTAL ---------------------
                    view: "form", container: "totales", width: WContainer, height: 140, paddingY: 5,
                    elements: [
                        {view:"text", id:"txtsubtotal", label:"Subtotal:", align:"right", width:200, readonly:true, value: webix.i18n.priceFormat("0.00"), inputAlign:"right"},
                        {view:"text", id:"txtiva", label:"IVA:", align:"right", width:200, readonly:true, value: webix.i18n.priceFormat("0.00"), inputAlign:"right"},
                        {view:"text", id:"txttotal", label:"TOTAL:", align:"right", width:200, readonly:true, value: webix.i18n.priceFormat("0.00"), inputAlign:"right"}     
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
                            {view:"label", id:"vendedor", label:"Nombre del VENDEDOR", align:"left"},
                            {view:"label", id:"fecha", align:"right"}
                        ]},
                        {cols:[
                            { view: "combo", name: "cmbcliente._id",id:"cmbcliente", label: "Cliente",
                                options: {
                                    body: {
                                        template: "#Nombre#", dataFeed: function(text) {
                                            let cte = new cajeros();
                                            this.load(cte.searchCombo(text));
                                        }
                                    }
                                }
                            },
                            {view: "label", id:"puntos", label:"PUNTOS: 0", align:"right", width: 200}
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
                        { view: "button", id:"btnefectivo", label: "EFECTIVO MXN"},
                        { view: "button", id:"btntarjeta", label: "TARJETA MXN"},
                        { view: "button", id:"btnefectivodls", label: "EFECTIVO DLS"},
                        { view: "button", id:"btntarjetadls", label: "TARJETA DLS"}				
                    ]}
                }
            ]},
            {
                cols:[
                    //-------------------- TECLADO NUMERICO  ---------------------
                    { view: "form", width: WContainer, height: altoTecyPag,
                        elements: [
                            {cols:[
                                { view: "button", id:"num7", label: " 7 ", height: botonesTec},
                                { view: "button", id:"num8",label: " 8 ", height: botonesTec},
                                { view: "button", id:"num9", label: " 9 ", height: botonesTec}
                            ]},
                            {cols:[
                                { view: "button", id:"num4", label: " 4 ", height: botonesTec},
                                { view: "button", id:"num5", label: " 5 ", height: botonesTec},
                                { view: "button", id:"num6", label: " 6 ", height: botonesTec}
                            ]},
                            {cols:[
                                { view: "button", id:"num1", label: " 1 ", height: botonesTec},
                                { view: "button", id:"num2", label: " 2 ", height: botonesTec},
                                { view: "button", id:"num3", label: " 3 ", height: botonesTec}
                            ]},
                            {cols:[
                                { view: "button", id:"num0", label: " 0 ", height: botonesTec},
                                { view: "button", id:"btnmultiplica", label: " X ", height: botonesTec, click: () => this.setFuncionx()},
                                { view: "button", id:"btnborrar", label: " <-- ", height: botonesTec}
                            ]},
                            {cols:[
                                { view: "button", id:"btnpagar", label: " PAGAR ", height: botonesTec}
                            ]},
                        ]
                    },  
                    //-------------------- LISTA DE PAGOS HECHOS Y TOTALES ---------------------              
                    { view: "form", width: WContainer, paddingY: 1, height: altoTecyPag,
                        elements: [
                            { rows:[
                                //{view:"datatable", id:"gridpagos", elements:gridPagos}
                                { view: "datatable", id: "gridPagos", select: "cell", liveValidation: true, editable: true, autowidth: true, data: [{}],
                                    columns: [
                                        { id: "tipo", header: { text: "Forma", css: { "text-align": "center" } }, width: gpago, css: { "text-align": "left" } },
                                        { id: "montotipo", format: webix.i18n.priceFormat, header: { text: "Importe", css: { "text-align": "center" } }, width: gpago, css: { "text-align": "right" } },
                                    ],
                                    rules: {},
                                }
                            ]},
                            { rows:[
                                {view:"text", id:"txttotalpago", label:"Total:", align:"right", labelWidth:85, inputWidth:210, readonly:true, value: webix.i18n.priceFormat("0.00"), inputAlign:"right"},
                                {view:"text", id:"txtsupago", label:"Su Pago:", align:"right", labelWidth:85, inputWidth:210, readonly:true, value: webix.i18n.priceFormat("0.00"), inputAlign:"right"},
                                {view:"text", id:"txtsucambio", label:"Su Cambio:", align:"right", labelWidth:85, inputWidth:210, height:50, readonly:true, value: webix.i18n.priceFormat("0.00"), inputAlign:"right"} 
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

        let puntodeventa = new cajeros();

        super(app, name, form, puntodeventa, id);
    }

    init(view) {
        webix.extend($$(this.Ventana), webix.ProgressBar);
        let nart=0;        
        let subtotal=0;
        let iva=0;
        let total=0;
        let funborrar;        
        let funpor=0;
        let idRegArt;
        let estadoVta="COBRO";
        let funNumero=0;

        let gridArt = $$("gridDetalle");
        gridArt.clearAll();
       
        let Carousel = $$("carousel" + this.id);
        let url = "http://localhost:60493/img/ptovta.png";
        Carousel.add({ Source: url });   
        
        this.habilitaControles(false);
        let formatofecha = webix.Date.dateToStr("%l %d %F %Y");
        $$("fecha").setValue(formatofecha(new Date()));        

        $$("txtarticulo").attachEvent("onKeyPress", function(code, e) {   
            if (code == 13) {
                setTimeout(function() {
                    //var item = editor.getPopup().getList().getItem(state.value);
                    var idart = $$("txtarticulo").getValue();
                    var item = $$("txtarticulo").getList().getItem(idart);
                    
                    if (item == undefined)
                        return;
                        //console.log("llega");
                    let precio=12.5;
                    let articulogrid = {
                        Codigo: item.Clave,
                        Articulo: item.Nombre,
                        Cantidad: "1",
                        Unidad: item.UnidadInventario.Abreviatura,
                        Precio: item.PrecioLista,
                        Descuento: "0",
                        Subtotal: item.PrecioLista,
                        Impuestos: item.Impuestos
                    }                    
                    gridArt.add(articulogrid);   
                    nart=nart+1;
                    $$("narticulos").setValue(nart + " Articulos");
                    $$("txtarticulo").setValue("");   
                    /*subtotal=subtotal+item.PrecioLista;
                    $$("txtsubtotal").setValue(webix.i18n.priceFormat(subtotal));*/
                }, 50);                
            }
        });

        this.$$("gridDetalle").attachEvent("onAfterAdd", function(id, index) {                        
            let record =  gridArt.getItem(id);            
            subtotal = subtotal + (record.Precio*record.Cantidad);                                        
            $$("txtsubtotal").setValue(webix.i18n.priceFormat(subtotal));
            total=subtotal+iva;
            $$("txttotal").setValue(webix.i18n.priceFormat(total));
            $$("txttotalpago").setValue(webix.i18n.priceFormat(total));
        });

        this.$$("gridDetalle").attachEvent("onBeforeDelete", function(id) {                        
            let record =  gridArt.getItem(id);            
            subtotal = subtotal - (record.Precio*record.Cantidad);                                        
            $$("txtsubtotal").setValue(webix.i18n.priceFormat(subtotal));
            total=subtotal+iva;
            $$("txttotal").setValue(webix.i18n.priceFormat(total));
            $$("txttotalpago").setValue(webix.i18n.priceFormat(total));
        });

        this.$$("gridDetalle").attachEvent("onItemClick", function(id, e, node) {                                    
            funborrar=1;
            funpor=1;
            idRegArt=id;
        });

        this.$$("btnborrar").attachEvent("onItemClick", function(id, e){
            if(estadoVta="COBRO" && funborrar==1){ //borrar elemento del grid detalle articulos
                gridArt.remove(idRegArt);
            }else if(estadoVta="COBRO" && funborrar==2){ //borrar caracter del txtarticulo

            }else if(estadoVta="PAGO" && funborrar==3){ //borrar elemento del grid pagos

            }
        });
        
        this.$$("btncobrar").attachEvent("onItemClick", function(id, e){
            estadoVta="PAGO";
        });

        this.$$("btnmultiplica").attachEvent("onItemClick", function(id, e){
            funNumero=2;            
        });

        /*this.$$("num2").attachEvent("onItemClick", function(id, e){
            if(funNumero==1){//escribir numero en el txtarticulo

            }else if(funNumero==2){//multiplicar numero griddetalle
                this.escribeNumero(2);                
            }else if(funNumero==3){//escribir numero para pago

            }
        });

        $escribeNumero:function(num){
            let idarticulo=0;
            if(funpor==0){ // ultimo registro del grid         
                idarticulo=gridArt.getLastId();                       
            }else if(funpor==1){ //registro del grid seleccionado
                idarticulo=idRegArt;                        
            }
            let record =  gridArt.getItem(idarticulo);    
            gridArt.getItem(idarticulo)["Cantidad"]=webix.i18n.numberFormat(num);
            gridArt.getItem(idarticulo)["Subtotal"]=webix.i18n.priceFormat(num*record.Precio);
        };*/
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
                rows: [ {
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

    cargarCombos(data) {
        //this.cargarCombo(this.$$("cmbcliente"), data.Usuarios);
        
        $$("gridOpera").clearAll();
        data.CajerosCajas.forEach(element => {
            $$("gridOpera").config.columns[0].collection.add(element.CajasOp);

            let cajao = {
                CajasOp: element.CajasOp._id       
            }
            console.log(cajao);

            $$("gridOpera").add(cajao);
        });
    }

    habilitaControles(valor){
        if(valor==true){
            $$("btnpagar").enable();
            $$("btnefectivo").enable();
            $$("btntarjeta").enable();
            $$("btntarjetadls").enable();
            $$("btnefectivodls").enable();
            $$("btncobrar").disable();
            $$("btnmultiplica").disable();
            $$("txtarticulo").disable();
        }else{
            $$("btnpagar").disable();
            $$("btnefectivo").disable();
            $$("btntarjeta").disable();
            $$("btnefectivodls").disable();
            $$("btntarjetadls").disable();
            $$("btncobrar").enable();
            $$("txtarticulo").enable();
        }        
    }

    validaCobrar(){
        this.habilitaControles(true);
        
    }

    setFuncionx(){
        this.funcionx=1;
    }
}