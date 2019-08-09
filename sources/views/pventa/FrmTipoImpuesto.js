import { JetView } from "webix-jet";
import { FrmBase } from "views/FrmBase";
import { tipoimpuesto } from "models/pventa/tipoimpuesto";
import { getNaturalezaTimp } from "models/generales";

export class FrmTipoImpuesto extends FrmBase {
    constructor(app, name) {
        //Genera un idetificador unico para la ventana con el 
        //objetivo de poder generar varias instancias
        let id = new Date().getTime();
        let collection = new webix.DataCollection({
            data: []
        });

        let form = {
            title: "Tipo de Impuesto",
            width: 400,
            elements: [                        
                { view: "text", name: "_id", hidden: true },                
                { view: "text", name: "Nombre", labelWidth: 82, label: "Nombre" },
                { view: "combo", name: "Naturaleza", labelWidth: 82, id: "cmbNaturaleza" + id, label: "Naturaleza", options:  getNaturalezaTimp()},
                
                {
                    view: "fieldset",
                    label: "",
                    id: "fieldsetGravar" + id,
                    type: "space",
                    body: {
                        rows: [                            
                            { view: "checkbox", id: "Grava", name: "Grava",labelRight:"Gravar",uncheckValue:0, checkValue:1, labelWidth:0}, 
                            {
                                view: "datatable",
                                id: "gridGravables",
                                height: 150,
                                width: 390,
                                select: "cell",
                                //editaction: "none",
                                columns: [                                                                                                                                             
                                    {
                                        id: "TipoImpuesto",
                                        editor: "combo",
                                        header: "Tipo de impuesto",
                                        fillspace: true,
                                        //width: 257,
                                        placeholder: "Tipo de impuesto que grava",
                                        collection: collection,
                                        //select: "row",
                                        //navigation: true,
                                        suggest: { // suggest
                                            template: "#value#",
                                            body: { // list
                                                template: "#value#",
                                                dataFeed: function(text) {
                                                    let tipoimpuestos = new tipoimpuesto();
                                                   // this.load(tipoimpuestos.searchCombo(text));
                                                    this.load(tipoimpuestos.searchXTipo(text));
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
                },
                { view: "checkbox", id: "Predeterminado", name: "Predeterminado",labelRight:"Usar como valor predeterminado",uncheckValue:0, checkValue:1, labelWidth:0}, 
            ],

            rules: {
                //$all: webix.rules.isNotEmpty,
                "Nombre": webix.rules.isNotEmpty,
                "Naturaleza": webix.rules.isNotEmpty
            }
        };

        let tipoimpuestos = new tipoimpuesto();        

        super(app, name, form, tipoimpuestos, id);
    }
    init(view) {
        webix.extend($$(this.Ventana), webix.ProgressBar);
        let grid = $$("gridGravables");

        this.LstTipos = [];
        let self = this;

        $$("cmbNaturaleza" + this.id).attachEvent("onChange", (newv, oldv) => {
            let valorNaturaleza = $$("cmbNaturaleza" + this.id).getValue();
            //console.log(valorNaturaleza);
            if(valorNaturaleza=='RETENCION DE IMPUESTO'){
                this.$$("Grava").setValue('0');
                this.$$("Grava").disable();                   
                $$("gridGravables").disable();
            }else{
                this.$$("Grava").enable();                   
                $$("gridGravables").disable();
            }
        });

        $$("Grava").attachEvent("onChange", function() {
            let ValorGrava = $$("Grava").getValue();
            if (ValorGrava == 0) {
                $$("gridGravables").disable();    
                $$("gridGravables").eachRow(function(row){ 
                    let id = $$("gridGravables").getItem(row);
                    this.remove(id);
                    //if (id) $$("gridGravables").remove(id);
                    console.log(id);
                    /*let record = $$("gridGravables").getItem(row);
                    delete record.year;
                    this.remove(record);*/
                    //this.updateItem(row, record);
                });    
            }
            else {
                $$("gridGravables").enable();
            }
        });


        $$("gridGravables").attachEvent("onBeforeEditStop", function(change, editor) {
            var column = editor.config;

            if (column.editor == "combo" && column.collection) {
                var item = editor.getPopup().getList().getItem(change.value);
                try {
                    if (item == undefined) return;

                    if (!column.collection.exists(item.id)) {
                        column.collection.add(item);
                        self.LstTipos = column.collection;
                    }
                } catch (err) {
                    console.log(err);
                }
            }
        });

        this.$$("gridGravables").attachEvent("onKeyPress", function(code, e) {
            if (code == 46) {
                console.log("eliminar");
                let id = $$("gridGravables").getSelectedId();
                if (id) $$("gridGravables").remove(id);

            } else if (code == 13) {
                var editor = this.getEditor();
                setTimeout(function() {
                    //grid.editCell(editor.row, "Cantidad");
                        grid.add({});                    
                    //grid.editNext(true, editor);
                }, 50);
            }
        });
    }

    guardar() {
        console.log($$("gridGravables").validate());
        if (!$$("gridGravables").validate()) return;

        let data = this.$$(this.Formulario).getValues();

        //data.Fecha = this.convertToJSONDate(data.Fecha);

        let TiposGravan = [];

        //Obtiene los valores del grid
        $$("gridGravables").eachRow((row) => {
            let record = $$("gridGravables").getItem(row);
            //record.Articulo = this.LstArticulos.getItem(record.Articulo);

            //Se crea el objecto articulo el cual se añadira al movimiento
            if (record.TipoImpuesto != undefined) {
                let nombretipo = {
                    TipoImpuesto: {
                        _id: record.TipoImpuesto
                    }
                };

                TiposGravan.push(nombretipo);
            }
        });

        data.TiposGravan = TiposGravan;
        console.log(data);
        

        super.guardar(data);
    }
    
    cargarChecks(data){
        this.$$("Grava").value=data.Grava;
        this.$$("Predeterminado").value=data.Predeterminado;
    }

    cargarCombos(data) {        

        $$("gridGravables").clearAll();

        data.TiposGravan.forEach(element => {
            $$("gridGravables").config.columns[0].collection.add(element.TipoImpuesto);

            let tipoimp = {
                TipoImpuesto: element.TipoImpuesto._id       
            }
            console.log(tipoimp);

            $$("gridGravables").add(tipoimp);
        });
    }

}