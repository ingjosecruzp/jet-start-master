// views/myview.js
import { JetView } from "webix-jet";

export default class MyView extends JetView {
    //config() => { template: "Myview text" };
    config() {
        return {
            template: '<a route="/top/data">Data</a>'
        };
    }
}