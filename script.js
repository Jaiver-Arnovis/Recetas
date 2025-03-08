
document.addEventListener("DOMContentLoaded", () => {
    aplicarPreferenciaModoOscuro();
    document.getElementById("toggleMode").addEventListener("click", toggleDarkMode);
    cargarRecetas('postres.html'); // Cargar "Platos Fuertes" por defecto
});

function cargarRecetas(archivo) {
    fetch(archivo)
        .then(response => response.text())
        .then(data => {
            document.getElementById('contenido').innerHTML = data;
            aplicarPreferenciaModoOscuro();
            configurarCambioDeRecetas();
        })
        .catch(error => console.error('Error al cargar las recetas:', error));
}

function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
    localStorage.setItem("darkMode", document.body.classList.contains("dark-mode"));
}

function aplicarPreferenciaModoOscuro() {
    if (localStorage.getItem("darkMode") === "true") {
        document.body.classList.add("dark-mode");
    }
}

function configurarCambioDeRecetas() {
    let recetas = document.querySelectorAll(".receta");
    let indiceReceta = 0;
    
    document.getElementById("siguienteReceta").addEventListener("click", () => {
        recetas[indiceReceta].classList.remove("active");
        indiceReceta = (indiceReceta + 1) % recetas.length;
        recetas[indiceReceta].classList.add("active");
    });
}



