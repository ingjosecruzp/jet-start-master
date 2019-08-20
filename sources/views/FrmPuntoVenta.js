import { FrmBase } from "views/FrmBase";
import { clientes } from "models/catalogos/clientes";
import { articulos } from "models/catalogos/articulos";

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
        let altoTecyPag = alto-250;
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
                    { id: "id", editor:"text", header: "id", width: 0 },
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
                        {view: "button", id:"btncobrar", label: "COBRAR", height:70} 
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
                            /*{ view: "combo", name: "cmbcliente._id",id:"cmbcliente", label: "Cliente",
                                options: {
                                    body: {
                                        template: "#Nombre#", dataFeed: function(text) {
                                            let cte = new clientes();
                                            this.load(cte.searchCombo(text));
                                        }
                                    }
                                }
                            },*/
                            {view:"text", id:"cmbcliente", label:"Cliente", value: "PUBLICO GENERAL", inputAlign:"left"},
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
                { view: "fieldset", label: "Forma de pago", type:"clean", height: 100, 
                    body:{
                        rows: [{
                            cols:[	
                                {view:"label", id:"montopaga", align:"left"},		
                                {view:"text", id:"tipocambio", align:"right", label:"Tipo Cambio: $", labelWidth:120,  inputWidth:190}
                            ]},                     
                            {cols:[			
                                { view: "button", id:"btnefectivo", label: "EFECTIVO MXN", height:70},
                                { view: "button", id:"btntarjeta", label: "TARJETA MXN"},
                                { view: "button", id:"btnefectivodls", label: "EFECTIVO DLS"},
                                { view: "button", id:"btntarjetadls", label: "TARJETA DLS"}				
                            ]
                        }]
                    }
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
                                { view: "button", id:"btnpunto", label: " . ", height: botonesTec},
                                { view: "button", id:"btnmultiplica", label: " X ", height: botonesTec}                                
                            ]},
                            {cols:[
                                { view: "button", id:"btnpagar", label: " PAGAR ", height: botonesTec, width: WContainer*0.62 },
                                { view: "button", id:"btnborrar", label: " <-- ", height: botonesTec, width: WContainer*0.38}
                            ]},
                        ]
                    },  
                    //-------------------- LISTA DE PAGOS HECHOS Y TOTALES ---------------------              
                    { view: "form", width: WContainer, paddingY: 1, height: altoTecyPag,
                        elements: [
                            { rows:[
                                {
                                    view: "datatable", id: "gridPagos", select: "cell", liveValidation: true, editable: false, autowidth: true, data: [{}],
                                    columns: [
                                        { id: "tipo", header: "Forma", width:gpago, css: { "text-align": "left" } },                            
                                        { id: "montotipo", header: "Monto", format: webix.i18n.priceFormat, width: gpago, css: { "text-align": "right" } }
                                    ],
                                    rules: {},                       
                                },
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

        let puntodeventa = new clientes();

        super(app, name, form, puntodeventa, id);
    }

    init(view) {
        webix.extend($$(this.Ventana), webix.ProgressBar);
        let nart=0;        
        let subtotal=0;
        let iva=0;
        let total=0;
        let funNum=0;
        let idRegArt;
        let idPago;
        let totPago=0;
        let tienePunto=false;
        let numDecimal=0;
        let estadoVta="COBRO";
        let gridPago = $$("gridPagos");        
        let gridArt = $$("gridDetalle");
        
        gridPago.clearAll();
        gridArt.clearAll();
        gridArt.hideColumn("id");
        
       
        let Carousel = $$("carousel" + this.id);
        let url = "http://localhost:60493/img/ptovta.png";
        Carousel.add({ Source: url });   
        
        habilitaControles(false);
        let formatofecha = webix.Date.dateToStr("%l %d %F %Y");
        $$("fecha").setValue(formatofecha(new Date()));                

        $$("txtarticulo").attachEvent("onKeyPress", function(code, e) {   
            if (code == 13) {
                setTimeout(function() {
                    var idart = $$("txtarticulo").getValue();
                    var item = $$("txtarticulo").getList().getItem(idart);
                    
                    if (item == undefined)
                        return;
                    let articulogrid = {
                        id: item._id,
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
                    idRegArt = gridArt.getLastId();
                    $$("narticulos").setValue(nart + " Articulos");
                    $$("txtarticulo").setValue("");   
                }, 50);                
            }
        });

        this.$$("gridDetalle").attachEvent("onAfterAdd", function(id, index) {                                    
            cuentas();
        });

        this.$$("gridDetalle").attachEvent("onAfterDelete", function(id) {                                    
            cuentas();
            $$("txtarticulo").focus();
        });

        this.$$("gridDetalle").attachEvent("onDataUpdate", function(id, data, old){
            cuentas();
        });

        this.$$("gridDetalle").attachEvent("onItemClick", function(id, e, node) {                                    
            idRegArt=id;
        });

        this.$$("gridPagos").attachEvent("onItemClick", function(id, e, node) {                                    
            idPago=id;
            funNum=3;
        });
        
        this.$$("btnborrar").attachEvent("onFocus", function(current_view, prev_view){            
            if(estadoVta=="COBRO" && prev_view.$view.id==""){ //borrar caracter del txtarticulo
                
            }else if(estadoVta=="COBRO" && prev_view.$view.id!=""){ //borrar registro del grid detalle
                gridArt.remove(idRegArt);                
            }else if(estadoVta=="PAGO" && funNum==2){ //borrar el numero escrito en label
                $$("montopaga").setValue("");
                tienePunto=false;
                numDecimal=0;
            }else if(estadoVta=="PAGO" && funNum==3){ //borrar registro del grid pagos
                gridPago.remove(idPago);                
                funNum=2;
                cuentaPagos();
            }
        });
        
        this.$$("btncobrar").attachEvent("onItemClick", function(id, e){
            estadoVta="PAGO";
            funNum=2;
        });

        this.$$("btnmultiplica").attachEvent("onItemClick", function(id, e){
            funNum=1;  
            $$("txtarticulo").focus();          
        });  
        
        this.$$("btnefectivo").attachEvent("onItemClick", function(id, e){
            agregaPago("EFECTIVO");
        });

        this.$$("btntarjeta").attachEvent("onItemClick", function(id, e){
            agregaPago("TARJETA");
        });

        this.$$("btnefectivodls").attachEvent("onItemClick", function(id, e){
            let tc = $$("tipocambio").getValue();
            if(tc=="" || tc=="0"){
                webix.message({type:"error", text:"INDIQUE EL TIPO DE CAMBIO!!"});
                return;
            }
            agregaPago("EFECTIVO DLS");
        });

        this.$$("btntarjetadls").attachEvent("onItemClick", function(id, e){
            let tc = $$("tipocambio").getValue();
            if(tc=="" || tc=="0"){
                webix.message({type:"error", text:"INDIQUE EL TIPO DE CAMBIO!!"});
                return;
            }
            agregaPago("TARJETA DLS");
        });

        this.$$("btnpagar").attachEvent("onItemClick", function(id, e){
            let falta=0;
            if(totPago<total){
                falta=total-totPago;
                webix.message({type:"error", text:"AUN FALTA " + webix.i18n.priceFormat(falta) + " POR COBRAR!!"});
                return;
            }            
        });

        this.$$("num1").attachEvent("onItemClick", function(id, e){
            BtnNumero(1);
        });

        this.$$("num2").attachEvent("onItemClick", function(id, e){
            BtnNumero(2);
        });

        this.$$("num3").attachEvent("onItemClick", function(id, e){
            BtnNumero(3);
        });

        this.$$("num4").attachEvent("onItemClick", function(id, e){
            BtnNumero(4);
        });

        this.$$("num5").attachEvent("onItemClick", function(id, e){
            BtnNumero(5);
        });

        this.$$("num6").attachEvent("onItemClick", function(id, e){
            BtnNumero(6);
        });

        this.$$("num7").attachEvent("onItemClick", function(id, e){
            BtnNumero(7);
        });

        this.$$("num8").attachEvent("onItemClick", function(id, e){
            BtnNumero(8);
        });

        this.$$("num9").attachEvent("onItemClick", function(id, e){
            BtnNumero(9);
        });

        this.$$("num0").attachEvent("onItemClick", function(id, e){
            BtnNumero(0);
        });

        this.$$("btncobrar").attachEvent("onItemClick", function(id, e){
            validaCobrar();
        });

        this.$$("btnpunto").attachEvent("onItemClick", function(id, e){
            if(estadoVta=="PAGO" && tienePunto==false){//escribir punto
                let monto=$$("montopaga").getValue()+".";
                $$("montopaga").setValue(monto);
                tienePunto=true;
            }
        });

        function BtnNumero(num){
            if(estadoVta=="COBRO" && funNum==0){ //escribir numero en el txtarticulo
                
            }else if(estadoVta=="COBRO" && funNum==1 && num>0){ //multiplicar numero griddetalle   
                let item = gridArt.getItem(idRegArt);
                item["Cantidad"] = num;   
                item["Subtotal"] = num * item.Precio;
                gridArt.updateItem(idRegArt, item);
                funNum=0;
                $$("txtarticulo").focus();
            }else if(estadoVta=="PAGO"){//escribir numero para pago
                if(tienePunto){
                    numDecimal=numDecimal+1;
                    if(numDecimal>2)
                        return;
                }
                let monto=$$("montopaga").getValue()+num;
                $$("montopaga").setValue(monto);
                funNum=2;
            }            
        }

        function cuentas(){
            subtotal=0;
            total=0;
            gridArt.eachRow(function(row){ 
                let record = gridArt.getItem(row);
                if (record == undefined) return;
                subtotal = subtotal + (record.Precio*record.Cantidad);                                                        
                total=subtotal+iva;
            });
            $$("txtsubtotal").setValue(webix.i18n.priceFormat(subtotal));
            $$("txttotal").setValue(webix.i18n.priceFormat(total));
            $$("txttotalpago").setValue(webix.i18n.priceFormat(total));
            $$("txtarticulo").focus();
        }

        function validaCobrar(){        
            if(nart==0){
                webix.message({type:"error", text:"AGREGUE ARTICULOS A LA LISTA!!"});
                return;
            }
            habilitaControles(true);
        }

        function agregaPago(tipoP){
            let montop = $$("montopaga").getValue();

            if (montop == "" || montop=="0"){
                webix.message({type:"error", text:"INDIQUE EL MONTO!!"});
                return;
            }            

            if(tipoP=="EFECTIVO DLS" || tipoP=="TARJETA DLS"){
                montop=$$("tipocambio").getValue()*montop;
            }

            let itemPago = {
                tipo: tipoP,
                montotipo: montop,                
            }                    
            gridPago.add(itemPago);   
            $$("montopaga").setValue("");  
            tienePunto=false;  
            numDecimal=0;
            cuentaPagos();        
        }

        function cuentaPagos(){
            totPago=0;
            gridPago.eachRow(function(row){                 
                let record = gridPago.getItem(row);
                if (record == undefined) return;
                totPago = totPago + (record.montotipo)*1;                                
            });
            $$("txtsupago").setValue(webix.i18n.priceFormat(totPago));

            if(totPago>total)
                $$("txtsucambio").setValue(webix.i18n.priceFormat(totPago-total));
            else
                $$("txtsucambio").setValue(webix.i18n.priceFormat(0));
        }

        function habilitaControles(valor){
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
                $$("txtarticulo").focus();
            }        
        }
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
}