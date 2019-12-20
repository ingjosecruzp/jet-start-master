import { JetView } from "webix-jet";
//import {data} from "models/records";

export class GridBase extends JetView {
    constructor(app, name, columns, model, formulario) {
        super(app, name);

        //this.Grid = "Grid" + new Date().getTime();
        this.Grid = "GridBase";
        this.columns = columns;
        this.Modelo = model;
        this.Formulario = formulario;

        //Agregar el atributo de footer a la ultima columna
        this.columns[this.columns.length-1].footer={ content:"rowCount",css: { "text-align": "right  !important" }};
    }
    config() {
        return {
            view: "datatable",
            //autoConfig: true,
            columns: this.columns,
            //autoheight: true,
            //autowidth: true,
            //data: data,
            //css: "webix_shadow_medium",
            footer:true,
            datafetch:50,
            datathrottle: 500,
            loadahead:100,
            id: this.Grid,
            select: "row",
            on: {
                onBeforeLoad: function() {
                    this.showOverlay("Loading...");
                },
                onAfterLoad: function() {
                    this.hideOverlay();
                }
            }
        };
    }
    init(view) {
        /**
         * La funcion para contar las filas se encuntra en el archivo top-js 
         * **/

       //Activa lazy loading
       this.Modelo.lazyLoading(true);

        view.parse(this.Modelo.getAllData());
        this.$$(this.Grid).showOverlay("Cargando...");

        let grid = this.$$(this.Grid);

        this.$$(this.Grid).filterByAll = () => {
            let filter=[];

            grid.config.columns.forEach((element) => {
                if(grid.getFilter(element.id).value !== "")
                    filter.push(element.MongoField + "=" +  grid.getFilter(element.id).value);
            });
            let filters = filter.join();

            view.clearAll();
            view.parse(this.Modelo.getAllData(view.count(),filters));
        };

        //Evento para controlar el scroll infinito
        this.$$(this.Grid).attachEvent("onScrollY", () =>{
            var state = this.$$(this.Grid).getScrollState();
            //console.log("The scroll coordinates: ["+state.x+","+state.y+"]");
            this.loadNext(this.$$(this.Grid));
        });

        //Evento para seleccionar el primer elemento del grid
        this.$$(this.Grid).attachEvent("onAfterLoad", () => {
            let id = grid.getFirstId();
            grid.select(id);
        });
    }
    convertToJSONDate(strDate) {
        var dt = new Date(strDate);
        var newDate = new Date(Date.UTC(dt.getFullYear(), dt.getMonth(), dt.getDate(), dt.getHours(), dt.getMinutes(), dt.getSeconds(), dt.getMilliseconds()));
        return '/Date(' + newDate.getTime() + ')/';
    }
    convertToDate(strDate) {
        var seconds = parseInt(strDate.replace(/\/Date\(([0-9]+)[^+]\//i, "$1"));
        var date = new Date(seconds);

        var dateString =
            date.getUTCFullYear() + "/" +
            ("0" + (date.getUTCMonth() + 1)).slice(-2) + "/" +
            ("0" + date.getUTCDate()).slice(-2)
            /* + " " +
                        ("0" + date.getUTCHours()).slice(-2) + ":" +
                        ("0" + date.getUTCMinutes()).slice(-2) + ":" +
                        ("0" + date.getUTCSeconds()).slice(-2)*/
        ;

        return dateString;
    }
    refresh() {
        console.log("refresh Grid");
        let grid = this.$$(this.Grid);

        let filter=[];

        grid.config.columns.forEach((element) => {
            //Recolecta lo que esta escrito en los filtros
            if(element.MongoField!= undefined && grid.getFilter(element.id).value !== "")
                filter.push(element.MongoField + "=" +  grid.getFilter(element.id).value);
        });
        let filters = filter.join();

        grid.clearAll();
        grid.parse(this.Modelo.getAllData(grid.count(),filters));
    }
    loadNext(view){
		var contentScroll = view.getScrollState().y + view.$view.clientHeight;

		var node = view.getItemNode(view.getLastId());

		var height = view.config.rowHeight || view.type.height;

		if(node && contentScroll >= node.offsetTop+height && !this._dontLoadNext){
            //view.loadNext(view.config.datafetch, view.count()+1);
            //view.clearAll();
            let grid = this.$$(this.Grid);

            let filter=[];

            //Valida si los filtros se encuntran vacios
            grid.config.columns.forEach((element) => {
                if(grid.getFilter(element.id).value !== "")
                    filter.push(element.MongoField + "=" +  grid.getFilter(element.id).value);
            });

            //Filtros vacios
            if(filter.count == 0)
                view.parse(this.Modelo.getAllData(view.count()));
            else
            {
                //Si encuentra algo escrito en los filtros llama otro metodo
                let filters = filter.join();
                view.parse(this.Modelo.getAllData(view.count(),filters));
            }
        }
        
    }
}