export function getSiNo() {
    var SiNo = [
        { id: "SI", value: "SI" },
        { id: "NO", value: "NO" },
    ];
    return SiNo;
};

export function getNaturaleza() {
    var Naturaleza = [
        { id: "ENTRADA", value: "ENTRADA" },
        { id: "SALIDA", value: "SALIDA" },
    ];
    return Naturaleza;
};

export function getTipoAlmacen() {
    var TipoAlmacen = [
        { id: "PRINCIPAL", value: "PRINCIPAL" },
        { id: "AUXILIAR", value: "AUXILIAR" },
    ];
    return TipoAlmacen;
};

export function getEstatus() {
    var Estatus = [
        { id: "ACTIVO", value: "ACTIVO" },
        { id: "INACTIVO", value: "INACTIVO" },
    ];
    return Estatus;
};

export function getMetodoCosteo() {
    var Estatus = [
        { id: "PEPS", value: "PEPS" },
        { id: "UEPS", value: "UEPS" },
        { id: "PROMEDIO PONDERADO", value: "PROMEDIO PONDERADO" },
    ];
    return Estatus;
};

export function getValoracion() {
    var Valoracion = [
        { id: "1", value: "ULTIMO COSTO" },
        { id: "2", value: "PROMEDIO PONDERADO" },
    ];
    return Valoracion;
};

export function getCajasRegVta() {
    var Valoracion = [
        { id: "LOS ARTICULOS", value: "LOS ARTICULOS" },
        { id: "LOS CLIENTES", value: "LOS CLIENTES" },
    ];
    return Valoracion;
};

export function getCajasCobroDefault() {
    var Valoracion = [
        { id: "EFECTIVO", value: "EFECTIVO" },
        { id: "TARJETA", value: "TARJETA" },
    ];
    return Valoracion;
};