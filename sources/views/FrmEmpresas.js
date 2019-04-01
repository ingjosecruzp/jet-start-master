import { JetView } from "webix-jet";
import { bdempresas } from "models/catalogos/bdempresas";


export default class FrmEmpresas extends JetView {
    config() {
        const login_form = {
            view: "form",
            id: "FrmEmpresas",
            width: 500,
            borderless: false,
            margin: 10,
            rows: [
                { type: "header", template: "<div style='padding-left:18px'>Empresas</div>" },
                {
                    view: "list",
                    id: "LstEmpresas",
                    width: 500,
                    height: 200,
                    template: "#RazonSocial# <div style='padding-left:18px'> RFC: #RFC#</div>",
                    type: {
                        height: 62
                    },
                    select: true,
                    data: []
                },
            ],
            rules: {

            }
        };

        return {
            cols: [{}, { rows: [{}, login_form, {}] }, {}]
        };
    }

    init(view) {
        let self = this;
        webix.extend($$("FrmEmpresas"), webix.ProgressBar);

        let empresas = new bdempresas();

        this.showProgressBar();
        empresas.getEmpresasUsuarios().then((realdata) => {
            let data = realdata.json();
            data.forEach(element => {
                $$("LstEmpresas").add(element);
            });
            this.hiddenProgressBar();

        }).fail((error) => {
            webix.alert({
                type: "alert-error",
                text: "Error: " + error.statusText
            });
            this.hiddenProgressBar();
        });

        $$("LstEmpresas").attachEvent("onItemDblClick", function(id, e, node) {

            self.showProgressBar();
            empresas.selectEmpresa(id).then((realdata) => {
                let data = realdata.json();
                localStorage.setItem("token", data);
                self.app.show("/top/start");

                self.hiddenProgressBar();

            }).fail((error) => {
                webix.alert({
                    type: "alert-error",
                    text: "Error: " + error.statusText
                });
                self.hiddenProgressBar();
            });


        });
    }

    showProgressBar() {
        $$("FrmEmpresas").showProgress({
            type: "icon",
            delay: 3000
        });
        $$("FrmEmpresas").disable();
    }

    hiddenProgressBar() {
        $$("FrmEmpresas").enable();
        $$("FrmEmpresas").hideProgress();
    }

}