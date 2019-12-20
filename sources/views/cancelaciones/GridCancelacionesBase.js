import { JetView } from "webix-jet";

export class GridCancelacionesBase extends JetView {
    constructor(app, name, form, model, id) {
        super(app, name);

        this.form = form;
        this.id = id
        this.Ventana = "Ventana" + new Date().getTime();
        this.Formulario = "Frm" + new Date().getTime();
        this.Modelo = model;
    }
    config() {
        return {
            view: "window",
            /*top: 200,
            left: 300,*/
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
                        { view: "icon", icon: "mdi mdi-content-save", align: "center", click: () => this.guardar() },
                        { view: "icon", icon: "mdi mdi-printer", align: "left", click: () => this.reporte() },
                        { view: "icon", icon: "mdi mdi-file-excel", align: "center"},
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
    showWindow(id) {
        this._id = id;

        if (this._id != undefined) {

            this.showProgressBar();

            this.Modelo.getData(this._id).then((realdata) => {
                //console.log(realdata.json());
                this.$$(this.Formulario).setValues(realdata.json());
                this.cargarCombos(realdata.json());

                this.hiddenProgressBar();

            }).fail(function(error) {
                webix.alert({
                    type: "alert-error",
                    text: "Error: " + error.statusText
                });
                this.hiddenProgressBar();
            });
        }

        this.getRoot().show();
    }

    guardar(data) {
        if (this.$$(this.Formulario).validate({ hidden: true }) == false)
            return;

        data = data == undefined ? this.$$(this.Formulario).getValues() : data;

        webix.confirm({
            title: "Guardar",
            ok: "Si",
            cancel: "No",
            text: "¿Estas seguro de guardar la información?",
            callback: (result) => {
                if (result == false)
                    return;

                this.showProgressBar();

                if (this._id == undefined) {
                    this.save(data);
                } else {
                    //this.update(this._id);
                    this.update(data);
                }

            }
        });

    }
    save(data) {
        this.Modelo.saveCancelacion(data).then((realdata) => {
            this.hiddenProgressBar();
            webix.alert("Guardado con exito", (result) => {
                $$(this.Ventana).$scope.refresh();
            });
        }).fail((error) => {
            webix.alert({
                type: "alert-error",
                text: "Error: " + error.statusText
            });
            this.hiddenProgressBar();
        });
    }

    reporte(data) {

        console.log("imprimir");

        if (this.$$(this.Formulario).validate({ hidden: true }) == false)
            return;

        this.showProgressBar();
        let params = this.$$(this.Formulario).getValues();
        console.log(params);
        this.Modelo.VerReporte(params).then((realdata) => {
            this.hiddenProgressBar();
            console.log(realdata);
            let archivo = realdata.json();
            console.log(archivo);

            //var win = window.open("http://localhost:60493/webReports/" + archivo, '_blank');
            var win = window.open("/webReports/" + archivo, '_blank');
            win.focus();

        }).fail((error) => {
            webix.alert({
                type: "alert-error",
                text: "Error: " + error.statusText
            });
            this.hiddenProgressBar();
        });

        return;

        if (this.$$(this.Formulario).validate() == false)
            return;
        data = data == undefined ? this.$$(this.Formulario).getValues() : data;

        webix.confirm({
            title: "Guardar",
            ok: "Si",
            cancel: "No",
            text: "¿Estas seguro de guardar la información?",
            callback: (result) => {
                if (result == false)
                    return;

                this.showProgressBar();

                if (this._id == undefined) {
                    this.save(data);
                } else {
                    //this.update(this._id);
                    this.update(data);
                }

            }
        });

    }

    cargarCombos(data) {
        //Metodo para sobrescribir
    }
    cargarCombo(combo, data) {
        //Metodo para sobrescribir
        combo.getList().clearAll();

        //Cargar el combo con el valor que viene del ws
        combo.getList().parse([data]);

        //Selecciona el item
        combo.setValue(data.id);
        //combo.setValue(data._id);
    }
    showProgressBar() {
        $$(this.Ventana).showProgress({
            type: "icon",
            delay: 3000
        });
        $$(this.Ventana).disable();
    }
    hiddenProgressBar() {
        $$(this.Ventana).enable();
        $$(this.Ventana).hideProgress();
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

    convertToJSONDate(strDate) {
        var dt = new Date(strDate);
        var newDate = new Date(Date.UTC(dt.getFullYear(), dt.getMonth(), dt.getDate(), dt.getHours(), dt.getMinutes(), dt.getSeconds(), dt.getMilliseconds()));
        return '/Date(' + newDate.getTime() + ')/';
    }
}