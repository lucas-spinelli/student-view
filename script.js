// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyB4FcTg4y8z14c_7ldC3fd_DP95fjqKXB0",
    authDomain: "digital-students-20b63.firebaseapp.com",
    projectId: "digital-students-20b63",
    storageBucket: "digital-students-20b63.appspot.com",
    messagingSenderId: "974951621429",
    appId: "1:974951621429:web:2f68d33ba338135191a27c",
    measurementId: "G-M68WZK1CVM"
};

// Inicializa Firebase
firebase.initializeApp(firebaseConfig);

// Inicializa Cloud Firestore
const db = firebase.firestore();

// Referencia a la colección "evaluaciones"
const evaluacionesRef = db.collection("evaluaciones");

// Función para mostrar las evaluaciones en la página
function mostrarEvaluaciones() {
    evaluacionesRef.get().then((querySnapshot) => {
        document.getElementById("evaluaciones").innerHTML = "";
        querySnapshot.forEach((doc) => {
            const evaluacion = doc.data();
            const fecha = evaluacion.fecha.toDate(); // Convertir el campo "fecha" a objeto Date
            const materia = evaluacion.materia;
            const html = `<div class="evaluacion">
                                <p><strong>${materia}</strong></p>
                                <p>${fecha.toLocaleString()}</p>
                            </div>`;
            document.getElementById("evaluaciones").innerHTML += html;
        });
    });
}

// Mostrar evaluaciones al cargar la página
mostrarEvaluaciones();

// Agregar evento al formulario para agregar evaluaciones
document.getElementById("formularioEvaluacion").addEventListener("submit", (e) => {
    e.preventDefault();
    const materia = document.getElementById("materia").value;
    const fecha = new Date(document.getElementById("fecha").value);
    evaluacionesRef.add({ materia, fecha })
        .then(() => {
            document.getElementById("materia").value = "";
            document.getElementById("fecha").value = "";
            mostrarEvaluaciones();
        })
        .catch((error) => {
            console.error("Error al agregar evaluación: ", error);
        });
});
