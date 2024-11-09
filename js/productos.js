const productos = [
    { id: 1, nombre: "Levadizo Zed", precio: 400000, imagen: "../assets/levadizozed.jpg" },
    { id: 2, nombre: "Corredizo DKC400", precio: 300000, imagen: "../assets/bull.5.jpg" },
    { id: 3, nombre: "Batiene BILL30", precio: 250000, imagen: "../assets/bill.30.jpg" },
    { id: 4, nombre: "BOB 30", precio: 200000, imagen: "../assets/bob.30.jpg" },
    { id: 5, nombre: "BULL 15M-20M", precio: 350000, imagen: "../assets/bull.20m-2.jpg" },
    { id: 6, nombre: "BISON 25T", precio: 450000, imagen: "../assets/bison.25t.jpg" },
    { id: 7, nombre: "Control acceso", precio: 60000, imagen: "../assets/controlacceso.jpg" },
    { id: 8, nombre: "Cerradura Magnética", precio: 95000, imagen: "../assets/cerrmagnet.jpg" },
    { id: 9, nombre: "Tubular 50", precio: 180000, imagen: "../assets/tub-serie-50.jpg" },
    { id: 10, nombre: "Roller black out", precio: 200000, imagen: "../assets/tub-serie-40.jpg" },
    { id: 11, nombre: "Tokey", precio: 70000, imagen: "../assets/tokey.jpg" },
];

//función para mostrar productos en el DOM
const mostrarProductos = () => {
    const productosLista = document.getElementById("productos-lista");
    productos.forEach((producto) => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <p class="card-title">${producto.nombre}</p>
            <p class="card-text">Precio: $${producto.precio}</p>
            <button class="agregar-carrito" data-id="${producto.id}">Agregar al carrito</button>
        `;
        productosLista.appendChild(card);
    });
};

//función para agregar producto al carrito
const agregarAlCarrito = (id) => {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const producto = productos.find((prod) => prod.id === id);
    if (producto) {
        carrito.push(producto);
        localStorage.setItem("carrito", JSON.stringify(carrito));
        actualizarCarrito();
    }
};

//función para mostrar productos en el carrito
const mostrarCarrito = () => {
    const carritoItems = document.getElementById("carrito-items");
    carritoItems.innerHTML = "";
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito.forEach((item, index) => {
        const div = document.createElement("div");
        div.classList.add("carrito-item");
        div.innerHTML = `
            <p>${item.nombre} - $${item.precio}</p>
            <button class="eliminar-item" data-index="${index}">Eliminar</button>
        `;
        carritoItems.appendChild(div);
    });
};

//función para eliminar un producto del carrito
const eliminarDelCarrito = (index) => {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito.splice(index, 1);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarCarrito();
};

//función para actualizar el carrito (muestra y calcula total)
const actualizarCarrito = () => {
    mostrarCarrito();
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const totalSinIva = carrito.reduce((acc, item) => acc + item.precio, 0);
    const iva = totalSinIva * 0.21;  //calcula 21% iva
    const totalConIva = totalSinIva + iva;

    //mostrar el total y el IVA
    document.getElementById("total-carrito").textContent = totalSinIva.toFixed(2);
    document.getElementById("iva-carrito").textContent = iva.toFixed(2);
    document.getElementById("total-con-iva").textContent = totalConIva.toFixed(2);
};

//función para la compra
const comprarCarrito = () => {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    if (carrito.length > 0) {
        alert("¡Compra realizada con éxito! Total: $" + document.getElementById("total-con-iva").textContent);
        vaciarCarrito();
    } else {
        alert("Tu carrito está vacío.");
    }
};

//función para vaciar el carrito
const vaciarCarrito = () => {
    localStorage.removeItem("carrito");
    actualizarCarrito();
};

//eventos
document.addEventListener("click", (e) => {
    if (e.target.classList.contains("agregar-carrito")) {
        const id = parseInt(e.target.dataset.id);
        agregarAlCarrito(id);
    }
    if (e.target.classList.contains("eliminar-item")) {
        const index = parseInt(e.target.dataset.index);
        eliminarDelCarrito(index);
    }
    if (e.target.id === "vaciar-carrito") {
        vaciarCarrito();
    }
    if (e.target.id === "comprar-carrito") {
        comprarCarrito();
    }
});

//inicializa la página
window.addEventListener("load", () => {
    mostrarProductos();
    actualizarCarrito();
});