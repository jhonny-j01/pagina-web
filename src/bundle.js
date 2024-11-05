function carritoEnPantalla(){document.addEventListener("DOMContentLoaded", function() {
    const dCarrito = document.getElementById('divCarrito');
    const bCarrito = document.getElementById('botonCarrito');
  
    bCarrito.addEventListener('click', function(){
      if(dCarrito.style.display === 'none' || dCarrito.style.display==='' ){
        dCarrito.style.display = 'block';
        console.log('Mostrando elemento');
      } else {
        dCarrito.style.display = 'none';
        console.log('Ocultando elemento');
      }
    });
  });}
//////////////////////////////////////////////////////
function logo(){ 
    document.addEventListener('DOMContentLoaded',function(){
    const logo= document.getElementById('imgLogo');

    logo.addEventListener('click',function(){
        console.log('click');
        window.location.href = '/index.html';
    });
}
    );
}
//////////////////////////////////////////////////////////
function car() {
    document.addEventListener('DOMContentLoaded', function() {
        const productos = document.getElementsByClassName('producto');
        const listaCarrito = document.getElementById('ListaCarrito');
        const totalElement = document.getElementById('Total');
        const divCarrito = document.getElementById('divCarrito');
        let carrito = [];
        let total = 0;
  
        // Cargar el carrito desde localStorage
        const carritoGuardado = localStorage.getItem('carrito');
        if (carritoGuardado) {
            carrito = JSON.parse(carritoGuardado);
            carrito.forEach(item => {
                total += item.precio; // Sumar el precio de los productos guardados
            });
            actualizarCarrito();
        }
  
        for (let i = 0; i < productos.length; i++) {
          const boton = productos[i].querySelector('.agregar-carrito'); // Selecciona el botón dentro del producto
  
          boton.addEventListener('click', function() {
              const nombre = productos[i].querySelector('.nombre-producto').textContent; // Obtener el nombre del producto
              const precioTexto = productos[i].querySelector('.precio-producto').textContent; // Obtener el texto del precio
              const precio = parseFloat(precioTexto.replace('Precio: $', '').trim()); // Extraer el precio
  
              agregarAlCarrito(nombre, precio);
          });
        }
  
        // Función para agregar un producto al carrito
        function agregarAlCarrito(nombre, precio) {
            carrito.push({ nombre, precio });
            total += precio;
            actualizarCarrito();
            guardarCarrito();
        }
  
        // Función para eliminar un producto del carrito
        function eliminarDelCarrito(index) {
            total -= carrito[index].precio; // Restar el precio del total
            carrito.splice(index, 1); // Eliminar el producto del carrito
            actualizarCarrito(); // Actualizar la visualización del carrito
            guardarCarrito(); // Guardar el carrito en localStorage
        }
  
        // Función para actualizar la visualización del carrito
        function actualizarCarrito() {
            listaCarrito.innerHTML = ''; // Limpiar la lista actual
            carrito.forEach((producto, index) => {
                const li = document.createElement('li');
                li.textContent = `${producto.nombre} - $${producto.precio.toLocaleString('es-ES', { minimumFractionDigits: 3, maximumFractionDigits: 3 })}`; // Mostrar el precio con 3 decimales y separador de miles
                
                // Crear un botón de eliminar
                const botonEliminar = document.createElement('button');
                botonEliminar.textContent = 'Eliminar';
                botonEliminar.addEventListener('click', function() {
                    eliminarDelCarrito(index); // Llama a la función de eliminar
                });
                
                li.appendChild(botonEliminar); // Agregar el botón al elemento de lista
                listaCarrito.appendChild(li);
            });
            totalElement.textContent = total.toLocaleString('es-ES', { minimumFractionDigits: 3, maximumFractionDigits: 3 });
            divCarrito.style.display = 'block';
        }
  
        // Función para guardar el carrito en localStorage
        function guardarCarrito() {
            localStorage.setItem('carrito', JSON.stringify(carrito));
        }
    });
  }

/////////////////////////////////////////////////////

function mostrarProductos() {
    document.addEventListener('DOMContentLoaded', function() {
        const comprarboton = document.getElementsByClassName('comprar');
        const ulProductos = document.getElementById('ListaCompra');
        const divCompra = document.getElementById('DivCompra');
        const totalCompraElement = document.getElementById('TotalCompra'); // Asegúrate de tener un <p> con este ID en tu HTML

        for (let i = 0; i < comprarboton.length; i++) {
            comprarboton[i].addEventListener('click', function() {
                const productos = JSON.parse(localStorage.getItem('carrito')); 

                // Asegúrate de que el divCompra se muestre al hacer clic
                divCompra.style.display = 'block'; // Muestra el divCompra

                ulProductos.innerHTML = '';

                if (productos && productos.length > 0) {
                    productos.forEach(producto => {
                        const li = document.createElement('li');
                        li.textContent = `${producto.nombre} - $${producto.precio.toLocaleString('es-ES', { minimumFractionDigits: 3, maximumFractionDigits: 3 })}`;
                        ulProductos.appendChild(li);
                    });
                    mostrarTotalCompra(); // Llama a la función para mostrar el total
                } else {
                    const li = document.createElement('li');
                    li.textContent = 'No hay productos agregados';
                    ulProductos.appendChild(li);
                    totalCompraElement.textContent = ''; // Limpia el total si no hay productos
                }
            });
        }

        // Función para mostrar el total de la compra
        function mostrarTotalCompra() {
            const carritoGuardado = localStorage.getItem('carrito');
            if (carritoGuardado) {
                const carrito = JSON.parse(carritoGuardado);
                const total = carrito.reduce((acc, item) => acc + item.precio, 0); // Calcula el total
                totalCompraElement.textContent = `Total: $${total.toLocaleString('es-ES', { minimumFractionDigits: 3, maximumFractionDigits: 3 })}`; // Muestra el total
            }
        }
    });
};

//////////////////////////////////////////////////

document.addEventListener('DOMContentLoaded', function() {
    const botonesSalir = document.getElementsByClassName('Salir'); // Cambié el nombre aquí
    const divCompra = document.getElementById('DivCompra');

    for (let i = 0; i < botonesSalir.length; i++) {
        botonesSalir[i].addEventListener('click', function() {
            divCompra.style.display = 'none'; 
        });
    }
});
////////////////////////////////////////


/*
function enviarCorreo (){
    (function(){
        emailjs.init("C621lPREOUZLojKk0"); // Reemplaza con tu User ID
    })();

       const nombre=document.getElementById('nombre').value;
       const ciudad= document.getElementById('ciudad').value;
       const barrio = document.getElementById('barrio').value;
       const direccion = document.getElementById('direccion').value;
       const telefono = document.getElementById('telefono').value;
       const productos= JSON.parse(localStorage.getItem('carrito')); 

     const templateParams={
        to_name:nombre,
        to_city:ciudad,
        to_barrio:barrio,
        to_adress:direccion,
        to_phone:telefono,
        to_products: productos,
     }

     emailjs.send('service_tr5hp3f', 'template_gy173hs', templateParams)
     .then(function(response) {
         console.log('Correo enviado exitosamente!', response.status, response.text);
     }, function(error) {
         console.log('Error al enviar el correo:', error);
     });
}

document.addEventListener('DOMContentLoaded',
    function(){
        const form = document.getElementById('enviar');
        form.addEventListener('click',enviarCorreo)
    
    }
)
    */


function enviarCorreo() {

    (function(){
        emailjs.init("QmkFZ38HUHi9S1JpS"); // Reemplaza con tu User ID de EmailJS
    })();
    
    const nombre = document.getElementById('nombre').value.trim();
    const ciudad = document.getElementById('ciudad').value.trim();
    const barrio = document.getElementById('barrio').value.trim();
    const direccion = document.getElementById('direccion').value.trim();
    const telefono = document.getElementById('telefono').value.trim();

    // Validar que los campos no estén vacíos
    if (!nombre || !ciudad || !barrio || !telefono) {
        alert('Por favor, completa todos los campos.');
        return; // Salir de la función si hay campos vacíos
    }

    // Obtener productos del carrito
    let productos = JSON.parse(localStorage.getItem('carrito')) || [];
    let productosDetalles = '';

    if (productos.length === 0) {
        alert('No hay productos en el carrito.');
        return; // Salir si no hay productos
    }

    productos.forEach(producto => {
        productosDetalles += `${producto.nombre} - $${producto.precio.toLocaleString('es-ES', { minimumFractionDigits: 3, maximumFractionDigits: 3 })}\n`;
    });

    const templateParams = {
        nombre: nombre,
        ciudad: ciudad,
        barrio: barrio,
        direccion:direccion,
        telefono: telefono,
        productos: productosDetalles,
    };

    console.log(templateParams); // Para verificar que el objeto se crea correctamente

    // Enviar el correo
    emailjs.send('service_tr5hp3f', 'template_gy173hs', templateParams)
        .then(function(response) {
            console.log('Correo enviado con éxito!', response.status, response.text);
            alert('Compra realizada correctamente');
            localStorage.clear();
            location.reload();
        }, function(error) {
            console.error('Error al enviar correo:', error);
            alert('Error al enviar el correo. Intenta nuevamente.');
        });
}

document.addEventListener('DOMContentLoaded', function() {
    const botonEnviar = document.getElementById('enviar');
    if (botonEnviar) { // Verificar si el botón existe
        botonEnviar.addEventListener('click', enviarCorreo);
    } else {
        console.error('Botón de enviar no encontrado en el DOM.');
    }
});
car()
logo()
carritoEnPantalla()
mostrarProductos()