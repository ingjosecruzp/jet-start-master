import { JetView } from "webix-jet";
import { login } from "models/login";
import { timingSafeEqual } from "crypto";


export default class FrmLogin extends JetView {
    config() {
        const login_form = {
            view: "form",
            id: "FrmLogin",
            width: 400,
            borderless: false,
            margin: 10,
            rows: [
                { type: "header", template: "CLG" },
                { view: "text", name: "Nombre", label: "Usuario", labelPosition: "top" },
                { view: "text", type: "password", name: "Contrasena", label: "Password", labelPosition: "top" },
                { view: "button", value: "Entrar", click: () => this.do_login(), hotkey: "enter" }
            ],
            rules: {
                Nombre: webix.rules.isNotEmpty,
                Contrasena: webix.rules.isNotEmpty
            }
        };

        return {
            cols: [{}, { rows: [{}, login_form, {}] }, {}]
        };
    }

    init(view) {
        //console.log(this.app.config.debug);
        view.$view.querySelector("input").focus();
        webix.extend($$("FrmLogin"), webix.ProgressBar);

        /*socket.on('mensaje', function(data) {
            data = JSON.parse(data);
            console.log(data);
        });

        socket.on('clienteSesiones', function(data) {
            data = JSON.parse(data);
            console.log(data);
        });*/

    }

    do_login() {
        if (this.$$("FrmLogin").validate() == false)
            return;

        console.log("entro2");

        let data = this.$$("FrmLogin").getValues();

        this.showProgressBar();

        let peticion = new login();

        peticion.saveData(data).then((realdata) => {

            this.hiddenProgressBar();
            localStorage.setItem("token", realdata.json());

            this.app.show("/FrmEmpresas");

        }).fail((error) => {
            webix.alert({
                type: "alert-error",
                text: "Error: " + error.statusText
            });
            this.hiddenProgressBar();
        });
    }
    showProgressBar() {
        $$("FrmLogin").showProgress({
            type: "icon",
            delay: 3000
        });
        $$("FrmLogin").disable();
    }
    hiddenProgressBar() {
        $$("FrmLogin").enable();
        $$("FrmLogin").hideProgress();
    }

}