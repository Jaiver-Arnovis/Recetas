
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



import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getFirestore, doc, getDoc, setDoc, updateDoc, increment } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";

// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyB5DlW2q4Hw4QvMfwB71CBEGI3i1ZLYiUA",
    authDomain: "likes-bb8fc.firebaseapp.com",
    projectId: "likes-bb8fc",
    storageBucket: "likes-bb8fc.appspot.com",
    messagingSenderId: "943357612702",
    appId: "1:943357612702:web:0ecc2e16a7e2861e30a18f",
    measurementId: "G-5PT135W0CL"
};

// Inicializar Firebase y Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Función para manejar los "Me gusta"
async function handleLike(event) {
    const button = event.target;
    const recetaId = button.getAttribute("data-id");
    const docRef = doc(db, "likes", recetaId);

    try {
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
            await setDoc(docRef, { likes: 1 }); // Si no existe, lo crea con 1 like
        } else {
            await updateDoc(docRef, { likes: increment(1) }); // Si existe, suma 1
        }

        // Obtener y mostrar los nuevos likes