export const menu_data_multi = new webix.DataCollection({
    data: [{
            id: "structure",
            icon: "mdi mdi-folder-multiple",
            value: "Catalogos",
            data: [{
                    id: "start",
                    icon: "mdi mdi-circle",
                    value: "Unidades"
                },
                {
                    id: "GridUnidades",
                    icon: "mdi mdi-cube",
                    value: "Grupos Componentes"
                },
                {
                    id: "GridConceptos",
                    icon: "mdi mdi-cube",
                    value: "Conceptos"
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
                }

            ]
        },
        {
            id: "tools",
            icon: "mdi mdi-calendar",
            value: "Tools",
            data: [
                { id: "kanban", icon: "mdi mdi-circle", value: "Kanban Board" },
                { id: "pivot", icon: "mdi mdi-circle", value: "Pivot Chart" },
                { id: "scheduler", icon: "mdi mdi-circle", value: "Calendar" }
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
        },
        { id: "demo", icon: "mdi mdi-book", value: "Documentation" }
    ]
});