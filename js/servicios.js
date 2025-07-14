// servicios.js utilizado para el manejo de la api externa

document.addEventListener("DOMContentLoaded", () => {
  const URL_API = "https://fakestoreapi.com/products";
  const contenedor = document.getElementById("productos-container");
  const listaCarrito = document.getElementById("lista-servicios");
  const totalSpan = document.getElementById("total-servicios");
  const botonVaciar = document.getElementById("vaciar-servicios");

  // Cargar productos desde API
  fetch(URL_API)
    .then((res) => res.json())
    .then((productos) => {
      productos.forEach((producto) => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
          <img src="${producto.image}" alt="${producto.title}">
          <h3>${producto.title}</h3>
          <p>Precio: $${producto.price}</p>
          <button class="agregar-carrito-servicio"
            data-id="${producto.id}"
            data-nombre="${producto.title}"
            data-precio="${producto.price}"
            data-imagen="${producto.image}">
            Agregar al carrito
          </button>
        `;
        contenedor.appendChild(card);
      });

      // Agregar eventos a botones
      document.querySelectorAll(".agregar-carrito-servicio").forEach(btn => {
        btn.addEventListener("click", agregarAlCarrito);
      });
    });

  function agregarAlCarrito(e) {
    const btn = e.currentTarget;
    const producto = {
      id: btn.dataset.id,
      nombre: btn.dataset.nombre,
      precio: parseFloat(btn.dataset.precio),
      imagen: btn.dataset.imagen,
      cantidad: 1
    };

    let carrito = JSON.parse(localStorage.getItem("carrito_servicios")) || [];
    const existente = carrito.find(p => p.id === producto.id);

    if (existente) {
      existente.cantidad += 1;
    } else {
      carrito.push(producto);
    }

    localStorage.setItem("carrito_servicios", JSON.stringify(carrito));
    renderizarCarrito();
    actualizarContadorServicios();  // ✅ Solo acá, no dentro del objeto ni en otro listener
  }

  function renderizarCarrito() {
    const carrito = JSON.parse(localStorage.getItem("carrito_servicios")) || [];
    listaCarrito.innerHTML = "";
    let total = 0;

    carrito.forEach((producto, index) => {
      const item = document.createElement("li");
      item.innerHTML = `
        <img src="${producto.imagen}" alt="${producto.nombre}" width="40">
        <span>${producto.nombre}</span>
        <input type="number" min="1" value="${producto.cantidad}" data-index="${index}" class="cantidad-input">
        <span>$${(producto.precio * producto.cantidad).toFixed(2)}</span>
        <button class="eliminar" data-index="${index}">X</button>
      `;
      listaCarrito.appendChild(item);
      total += producto.precio * producto.cantidad;
    });

    totalSpan.textContent = `$${total.toFixed(2)}`;

    // Eventos de edición
    document.querySelectorAll(".cantidad-input").forEach(input => {
      input.addEventListener("change", actualizarCantidad);
    });

    document.querySelectorAll(".eliminar").forEach(btn => {
      btn.addEventListener("click", eliminarProducto);
    });
  }

  function actualizarCantidad(e) {
    const index = e.target.dataset.index;
    let carrito = JSON.parse(localStorage.getItem("carrito_servicios")) || [];
    carrito[index].cantidad = parseInt(e.target.value);
    localStorage.setItem("carrito_servicios", JSON.stringify(carrito));
    renderizarCarrito();
    actualizarContadorServicios();
  }

  function eliminarProducto(e) {
    const index = e.target.dataset.index;
    let carrito = JSON.parse(localStorage.getItem("carrito_servicios")) || [];
    carrito.splice(index, 1);
    localStorage.setItem("carrito_servicios", JSON.stringify(carrito));
    renderizarCarrito();
    actualizarContadorServicios();
  }

  botonVaciar.addEventListener("click", () => {
    localStorage.removeItem("carrito_servicios");
    renderizarCarrito();
    actualizarContadorServicios();
  });

  // Cargar carrito y contador al iniciar
  renderizarCarrito();
  actualizarContadorServicios();
});

// Contador flotante del carrito
function actualizarContadorServicios() {
  const carrito = JSON.parse(localStorage.getItem("carrito_servicios")) || [];
  const contador = document.getElementById("contador-servicios");
  if (contador) {
    const totalItems = carrito.reduce((acc, prod) => acc + prod.cantidad, 0);
    contador.textContent = totalItems;
  }
}
