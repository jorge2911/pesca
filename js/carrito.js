document.addEventListener('DOMContentLoaded', function () {
  cargarCarrito();
  actualizarContadorCarrito();
  actualizarTotal();
});

// Evento para botones con clase "agregar-carrito"
document.addEventListener('click', function (e) {
  if (e.target.classList.contains('agregar-carrito')) {
    const btn = e.target;
    const id = btn.getAttribute('data-id');
    const nombre = btn.getAttribute('data-nombre');
    const precio = btn.getAttribute('data-precio');

    agregarProductoAlCarrito(id, nombre, precio);
  }
});

function agregarProductoAlCarrito(id, nombre, precio) {
  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

  carrito.push({ id, nombre, precio });
  localStorage.setItem('carrito', JSON.stringify(carrito));

  cargarCarrito();
  actualizarContadorCarrito();
  actualizarTotal();
}

function cargarCarrito() {
  const listaCarrito = document.getElementById('lista-carrito');
  listaCarrito.innerHTML = '';

  const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

  if (carrito.length === 0) {
    listaCarrito.innerHTML = '<li class="list-group-item text-muted">Tu carrito está vacío.</li>';
    return;
  }

  carrito.forEach(producto => {
    const li = document.createElement('li');
    li.classList.add('list-group-item');
    li.textContent = `${producto.nombre} - $${producto.precio}`;
    listaCarrito.appendChild(li);
  });
}

function actualizarContadorCarrito() {
  const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  const contador = document.getElementById('contador-carrito');
  if (contador) {
    contador.textContent = carrito.length;
  }
}

function actualizarTotal() {
  const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  const total = carrito.reduce((suma, p) => suma + parseFloat(p.precio), 0);
  const totalSpan = document.getElementById('total-carrito');
  if (totalSpan) {
    totalSpan.textContent = `$${total.toFixed(2)}`;
  }
}

document.getElementById("vaciar-carrito").addEventListener("click", function () {
  localStorage.removeItem("carrito");
  cargarCarrito();
  actualizarTotal();
  actualizarContadorCarrito();
});

