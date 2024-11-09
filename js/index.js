class Producto {
    constructor(nombre, precio, disponible) {
        this.nombre = nombre;
        this.precio = precio;
        this.disponible = disponible;
    }
}

class Negocio {
    constructor(nombre, direccion, propietario) {
        this.nombre = nombre;
        this.direccion = direccion;
        this.propietario = propietario;
        this.productos = []; //para almacenar productos
    }

    agregaProducto(producto) {
        this.productos.push(producto);
    }

    abierto(horario) {
        return horario >= 8 && horario <= 17;
    }

//retorna solo los productos que estan disponibles
    filtraProductoDisponible() {
        return this.productos.filter(producto => producto.disponible);
    }
}

//crear y guardar productos en localStorage
const tienda1 = new Negocio("Controll Automatización", "Primero de Mayo 454", "Controll Automatización S.A.");

const productosIniciales = [
    new Producto("Levadizo Zed", 400000, true),
    new Producto("Corredizo DKC400", 300000, true),
    new Producto("BOB 30", 250000, true),
    new Producto("Bull", 350000, true),
    new Producto("Control Acceso", 60000, true),
    new Producto("Cerradura Magnética", 95000, true),
    new Producto("Tubular 50", 180000, true),
    new Producto("Roller Black Out", 200000, true),
    new Producto("Batcorr", 320000, true),
    new Producto("Tokey", 70000, true),
    new Producto("Tubular 60", 210000, false) //ejemplo de producto no disponible
];

//guardar productos en localStorage
if (!localStorage.getItem("productos")) {
    localStorage.setItem("productos", JSON.stringify(productosIniciales));
}

//recuperar productos de localStorage
const cargarProductosDesdeLocalStorage = () => {
    const productosGuardados = JSON.parse(localStorage.getItem("productos"));
    tienda1.productos = productosGuardados.map(prod => new Producto(prod.nombre, prod.precio, prod.disponible));
};

cargarProductosDesdeLocalStorage();

//funcion para verificar si el negocio esta abierto
const verificarHorario = () => {
    const inputHorario = document.getElementById("inputHorario").value;
    const horario = parseInt(inputHorario);

    if (isNaN(horario) || horario < 0 || horario > 24) {
        alert("Por favor, ingrese una hora válida entre 0 y 24.");
        return;
    }

    const abierto = tienda1.abierto(horario);
    const resultadoDiv = document.getElementById("resultado");

    resultadoDiv.innerHTML = abierto
        ? `<p>La tienda está abierta a las ${horario} hs.</p>`
        : `<p>La tienda está cerrada a las ${horario} hs.</p>`;
};

//funcion para consultar productos disponibles
const consultarProductos = () => {
    const productosDisponibles = tienda1.filtraProductoDisponible();
    const resultadoDiv = document.getElementById("resultado");

    if (productosDisponibles.length === 0) {
        resultadoDiv.innerHTML = "<p>No hay productos disponibles en la tienda.</p>";
        return;
    }

    let resumenProductos = productosDisponibles.map(prod => `- ${prod.nombre}: $${prod.precio}`).join("<br>");
    resultadoDiv.innerHTML = `<p>Productos disponibles:</p><p>${resumenProductos}</p>`;
};

//evento para verificar el horario
document.getElementById("btnVerificarHorario").addEventListener("click", verificarHorario);

//evento para consultar productos disponibles
document.getElementById("btnConsultarProductos").addEventListener("click", consultarProductos);