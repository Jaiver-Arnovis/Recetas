
  // Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyB5DlW2q4Hw4QvMfwB71CBEGI3i1ZLYiUA",
    authDomain: "likes-bb8fc.firebaseapp.com",
    projectId: "likes-bb8fc",
    storageBucket: "likes-bb8fc.firebasestorage.app",
    messagingSenderId: "943357612702",
    appId: "1:943357612702:web:5742c988e2d796e230a18f",
    measurementId: "G-76QX7HZPK7"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);



// Función para manejar los "Me gusta"
async function handleLike(event) {
    const button = event.target;
    const recetaId = button.getAttribute("data-id");
    const docRef = doc(db, "likes", recetaId);

    try {
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
            await setDoc(docRef, { likes: 1 }); // Si no existe, lo crea con 1 like
            console.log(`Receta ${recetaId} creada con 1 like.`);
        } else {
            await updateDoc(docRef, { likes: increment(1) }); // Si existe, suma 1
            console.log(`Receta ${recetaId} actualizada. Likes incrementados.`);
        }

        // Obtener y mostrar los nuevos likes
        const updatedDoc = await getDoc(docRef);
        document.getElementById(`likes-${recetaId}`).innerText = updatedDoc.data().likes;
        console.log(`Likes actualizados para la receta ${recetaId}: ${updatedDoc.data().likes}`);
    } catch (error) {
        console.error("Error al actualizar los likes:", error);
    }
}

// Evento para adjuntar la función a los botones
document.addEventListener("DOMContentLoaded", async () => {
    const buttons = document.querySelectorAll(".btn-like");
    buttons.forEach(button => {
        button.addEventListener("click", handleLike);
    });

    // Cargar los contadores de "Me gusta" al inicio
    const spans = document.querySelectorAll(".likes-count");
    for (const span of spans) {
        const recetaId = span.getAttribute("data-id");
        const docRef = doc(db, "likes", recetaId);
        const docSnap = await getDoc(docRef);
        span.innerText = docSnap.exists() ? docSnap.data().likes : 0;
        console.log(`Likes iniciales para la receta ${recetaId}: ${span.innerText}`);
    }
});