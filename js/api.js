document.addEventListener("DOMContentLoaded", () => {
    fetch("https://fakestoreapi.com/products")
    .then(response => response.json())
    .then(data => {
        const contenedor = document.getElementById("productos-container");

        data.forEach(producto => {
            const productoHTML = `
                <div class="card m-2 p-2" style="width: 18rem;">
                    <img src="${producto.image}" class="card-img-top" alt="${producto.title}" style="height: 200px; object-fit: contain;">
                    <div class="card-body">
                        <h5 class="card-title">${producto.title}</h5>
                        <p class="card-text">Precio: $${producto.price}</p>
                        <button class="btn btn-primary agregar-carrito"
                            data-id="${producto.id}"
                            data-nombre="${producto.title}"
                            data-precio="${producto.price}">
                            Agregar al carrito
                        </button>
                    </div>
                </div>
            `;
            contenedor.innerHTML += productoHTML;
        });

        // IMPORTANTE: Volvé a vincular los botones luego de crear el contenido dinámico
        agregarEventosBotones();
    })
    .catch(error => {
        console.error("Error al obtener productos:", error);
    });
});


function agregarEventosBotones() {
    const botones = document.querySelectorAll('.agregar-carrito');
    botones.forEach(boton => {
        boton.addEventListener('click', function(e) {
            const id = this.getAttribute('data-id');
            const nombre = this.getAttribute('data-nombre');
            const precio = this.getAttribute('data-precio');

            agregarProductoAlCarrito(id, nombre, precio);
        });
    });
}

