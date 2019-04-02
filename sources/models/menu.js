export const menu_data_multi = new webix.DataCollection({
    data: [{
            id: "administracion",
            icon: "mdi mdi-nut",
            value: "Administración",
            data: [{
                    id: "GridUsuarios",
                    icon: "mdi mdi-account",
                    value: "Usarios"
                },
                {
                    id: "GridRoles",
                    icon: "mdi mdi-account-group",
                    value: "Roles"
                },
                {
                    id: "GridEmpresas",
                    icon: "mdi mdi-factory",
                    value: "Empresas"
                },
            ]
        },
        {
            id: "catalogos",
            icon: "mdi mdi-folder-multiple",
            value: "Catalogos",
            data: [{
                    id: "GridUnidades",
                    icon: "mdi mdi-circle",
                    value: "Unidades"
                },
                {
                    id: "GridUnidadesss",
                    icon: "mdi mdi-cube",
                    value: "Grupos Componentes"
                },
                {
                    id: "GridConceptos",
                    icon: "mdi mdi-cube",
                    value: "Conceptos"
                },
                {
                    id: "GridArticulos",
                    icon: "mdi mdi-ring",
                    value: "Articulos"
                },
                {
                    id: "GridTipoComponente",
                    icon: "mdi mdi-package-variant",
                    value: "Tipo Componentes"
                },
                {
                    id: "GridGrupoComponente",
                    icon: "mdi mdi-package-variant-closed",
                    value: "Grupo Componentes"
                },
                {
                    id: "GridSubgrupoComponente",
                    icon: "mdi mdi-group",
                    value: "Subgrupo Componentes"
                },
                {
                    id: "GridMarca",
                    icon: "mdi mdi-registered-trademark",
                    value: "Marcas"
                },
                {
                    id: "GridDepartamento",
                    icon: "mdi mdi-codepen",
                    value: "Departamentos"
                },
                {
                    id: "GridPuesto",
                    icon: "mdi mdi-worker",
                    value: "Puestos"
                },
                {
                    id: "GridPureza",
                    icon: "mdi mdi-hexagon-slice-6",
                    value: "Purezas"
                },
                {
                    id: "GridPeso",
                    icon: "mdi mdi-weight-kilogram",
                    value: "Pesos"
                },
                {
                    id: "GridProcedencia",
                    icon: "mdi mdi-earth",
                    value: "Procedencia"
                },
                {
                    id: "GridAlmacen",
                    icon: "mdi mdi-home",
                    value: "Almacenes"
                }

            ]
        },
        {
            id: "tools",
            icon: "mdi mdi-book",
            value: "Movimientos",
            data: [
                { id: "GridEntradas", icon: "mdi mdi-circle", value: "Entrada" },
                { id: "GridSalida", icon: "mdi mdi-circle", value: "Salida" }
            ]
        },
        {
            id: "reportes",
            icon: "mdi mdi-chart-bar",
            value: "Reportes",
            data: [
                { id: "RptExistencia", icon: "mdi mdi-book", value: "Existencias" }
            ]
        },
        {
            id: "forms",
            icon: "mdi mdi-pencil",
            value: "Forms",
            data: [{
                    id: "buttons",
                    icon: "mdi mdi-circle",
                    value: "Buttons",
                    data: [
                        { id: "button", icon: "mdi mdi-circle-outline", value: "Buttons" },
                        { id: "segmented", icon: "mdi mdi-circle-outline", value: "Segmented" },
                        { id: "toggle", icon: "mdi mdi-circle-outline", value: "Toggle" },
                    ]
                },
                {
                    id: "texts",
                    icon: "mdi mdi-circle",
                    value: "Text Fields",
                    data: [
                        { id: "text", icon: "mdi mdi-circle-outline", value: "Text" },
                        { id: "textarea", icon: "mdi mdi-circle-outline", value: "Textarea" },
                        { id: "richtext", icon: "mdi mdi-circle-outline", value: "RichText" }
                    ]
                },
                {
                    id: "selects",
                    icon: "mdi mdi-circle",
                    value: "Selectors",
                    data: [{
                            id: "single",
                            icon: "mdi mdi-circle-outline",
                            value: "Single value",
                            data: [
                                { id: "combo", icon: "mdi mdi-circle-outline", value: "Combo" },
                                { id: "richselect", icon: "mdi mdi-circle-outline", value: "RichSelect" },
                                { id: "select", icon: "mdi mdi-circle-outline", value: "Select" }
                            ]
                        },
                        {
                            id: "multi",
                            icon: "mdi mdi-circle-outline",
                            value: "Multiple values",
                            data: [
                                { id: "multicombo", icon: "mdi mdi-circle-outline", value: "MultiCombo" },
                                { id: "multiselect", icon: "mdi mdi-circle-outline", value: "MultiSelect" }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
});