document.querySelectorAll('.btn-like').forEach(button => {
    button.addEventListener('click', function () {
        const recetaId = this.getAttribute('data-id');
        const likesCount = document.getElementById(`likes-${recetaId}`);

        // Referencia a Firebase
        const docRef = firebase.firestore().collection("likes").doc(recetaId);

        // Actualizar "Me gusta" en Firestore
        docRef.get().then(doc => {
            let currentLikes = doc.exists ? doc.data().likes : 0;
            docRef.set({ likes: currentLikes + 1 }, { merge: true });
            likesCount.textContent = currentLikes + 1;
        });
    });
});

// Obtener los "Me gusta" al cargar la página
window.onload = function () {
    firebase.firestore().collection("likes").get().then(snapshot => {
        snapshot.forEach(doc => {
            const recetaId = doc.id;
            const likesCount = document.getElementById(`likes-${recetaId}`);
            if (likesCount) {
                likesCount.textContent = doc.data().likes;
            }
        });
    });
};