import { JetView } from "webix-jet";

export class FrmBase extends JetView {
    constructor(app, name, form, model, id) {
        super(app, name);

        this.form = form;
        //Id de la ventana para poder abrir varios
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
                        { view: "icon", icon: "mdi mdi-content-save", align: "left", click: () => this.guardar() },
                        { view: "icon", icon: "mdi mdi-content-save-all", align: "center" },
                        { view: "icon", icon: "mdi mdi-delete", align: "right", click: () => this.eliminar() }
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

                //Detecta cuando se cerro la ventana
                $$(this.Formulario).attachEvent("onDestruct", () => {
                    socket.emit("liberar", this._id);
                });


            }).fail((error) => {
                webix.alert({
                    type: "alert-error",
                    text: "Error: " + error.statusText
                }).then((result) => {
                    $$(this.Ventana).close();
                    this.hiddenProgressBar();
                });
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
        this.Modelo.saveData(data).then((realdata) => {

            this.hiddenProgressBar();

            webix.alert("Guardado con exito", (result) => {
                $$(this.Ventana).close();
            });
        }).fail((error) => {
            webix.alert({
                type: "alert-error",
                text: "Error: " + error.statusText
            });
            this.hiddenProgressBar();
        });
    }
    update(data) {
        console.log(data);
        this.Modelo.updateData(data).then((realdata) => {
            this.hiddenProgressBar();

            webix.alert("Guardado con exito", (result) => {
                $$(this.Ventana).close();
            });
        }).fail((error) => {
            webix.alert({
                type: "alert-error",
                text: "Error: " + error.statusText
            });
            this.hiddenProgressBar();
        });
    }
    eliminar() {
        if (this._id == undefined) return;

        webix.confirm({
            title: "Eliminar",
            ok: "Si",
            type: "alert-error",
            cancel: "No",
            text: "¿Estas seguro de eliminar el elemento?",
            callback: (result) => {
                if (result == false)
                    return;

                this.showProgressBar();

                this.Modelo.deleteData(this.$$(this.Formulario).getValues()).then((realdata) => {
                    console.log(realdata.json());

                    this.hiddenProgressBar();

                    webix.alert("Eliminado con exito", (result) => {
                        $$(this.Ventana).close();
                    });
                }).fail((error) => {
                    webix.alert({
                        type: "alert-error",
                        text: "Error: " + error.statusText
                    });
                    this.hiddenProgressBar();
                });
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

    convertToJSONDate(strDate) {
        var dt = new Date(strDate);
        var newDate = new Date(Date.UTC(dt.getFullYear(), dt.getMonth(), dt.getDate(), dt.getHours(), dt.getMinutes(), dt.getSeconds(), dt.getMilliseconds()));
        return '/Date(' + newDate.getTime() + ')/';
    }
    convertToDate(strDate) {
        var seconds = parseInt(strDate.replace(/\/Date\(([0-9]+)[^+]\//i, "$1"));
        var date = new Date(seconds);
        return date;
    }
}