// Función para cargar estudiantes y mostrarlos en la tabla
function cargarEstudiantes() {
    fetch('/estudiantes')
        .then(response => response.json())
        .then(data => {
            const tabla = document.getElementById('tablaEstudiantes').getElementsByTagName('tbody')[0];
            tabla.innerHTML = '';

            data.forEach(est => {
                const fila = tabla.insertRow();
                fila.insertCell(0).textContent = est.ci;
                fila.insertCell(1).textContent = est.nombre;
                fila.insertCell(2).textContent = est.edad;
                fila.insertCell(3).textContent = est.curso;

                const acciones = fila.insertCell(4);
                const btnModificar = document.createElement('button');
                btnModificar.textContent = 'Modificar';
                btnModificar.onclick = () => modificarEstudiante(est.ci);
                acciones.appendChild(btnModificar);

                const btnEliminar = document.createElement('button');
                btnEliminar.textContent = 'Eliminar';
                btnEliminar.onclick = () => eliminarEstudiante(est.ci);
                acciones.appendChild(btnEliminar);
            });
        })
        .catch(error => console.error('Error cargando estudiantes:', error));
}

// Función para eliminar un estudiante
function eliminarEstudiante(ci) {
    fetch(`/eliminar/${ci}`, {
        method: 'DELETE',
    })
    .then(response => response.text())
    .then(() => {
        cargarEstudiantes();
    })
    .catch(error => console.error('Error eliminando estudiante:', error));
}

// Función para modificar un estudiante
function modificarEstudiante(ci) {
    fetch(`/estudiante/${ci}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('ci').value = data.ci;
            document.getElementById('nombre').value = data.nombre;
            document.getElementById('edad').value = data.edad;
            document.getElementById('curso').value = data.curso;
            document.getElementById('agregarForm').setAttribute('action', `/modificar/${ci}`);
            document.getElementById('agregarForm').setAttribute('method', 'POST');
        })
        .catch(error => console.error('Error modificando estudiante:', error));
}

// Manejo del evento de enviar el formulario
document.getElementById('agregarForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries());

    fetch(this.getAttribute('action') || '/agregar', {
        method: this.getAttribute('method') || 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.text())
    .then(() => {
        cargarEstudiantes();
        this.reset();
        this.removeAttribute('action');
        this.removeAttribute('method');
    })
    .catch(error => console.error('Error agregando/modificando estudiante:', error));
});

// Manejo del evento de buscar un estudiante
document.getElementById('buscarBtn').addEventListener('click', function () {
    const ci = document.getElementById('ci').value;
    if (ci) {
        modificarEstudiante(ci);
    }
});

// Cargar estudiantes al cargar la página
cargarEstudiantes();
