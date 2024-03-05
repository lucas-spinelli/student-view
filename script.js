const firebaseConfig = {

  apiKey: "AIzaSyB4FcTg4y8z14c_7ldC3fd_DP95fjqKXB0",

  authDomain: "digital-students-20b63.firebaseapp.com",

  projectId: "digital-students-20b63",

  storageBucket: "digital-students-20b63.appspot.com",

  messagingSenderId: "974951621429",

  appId: "1:974951621429:web:2f68d33ba338135191a27c",

  measurementId: "G-M68WZK1CVM"

};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Obtener referencia a la sección de evaluaciones en el HTML
const evaluacionesDiv = document.getElementById('evaluaciones');

// Función para mostrar las evaluaciones en la página
function mostrarEvaluaciones() {
    database.ref('evaluaciones').once('value', function(snapshot) {
        evaluacionesDiv.innerHTML = '';

        if (snapshot.exists()) {
            snapshot.forEach(function(childSnapshot) {
                const evaluacion = childSnapshot.val();
                const fechaEvaluacion = new Date(evaluacion.fecha);
                const diferencia = fechaEvaluacion - new Date();
                const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
                const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
                const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);

                const evaluacionDiv = document.createElement('div');
                evaluacionDiv.classList.add('evaluacion');

                const materiaParrafo = document.createElement('p');
                materiaParrafo.textContent = `Materia: ${evaluacion.materia}`;

                const tiempoParrafo = document.createElement('p');
                tiempoParrafo.textContent = `Tiempo restante: ${dias}d ${horas}h ${minutos}m ${segundos}s`;

                evaluacionDiv.appendChild(materiaParrafo);
                evaluacionDiv.appendChild(tiempoParrafo);

                evaluacionesDiv.appendChild(evaluacionDiv);
            });
        } else {
            const sinEvaluacionesParrafo = document.createElement('p');
            sinEvaluacionesParrafo.textContent = 'No hay evaluaciones próximas.';
            evaluacionesDiv.appendChild(sinEvaluacionesParrafo);
        }
    });
}

// Mostrar evaluaciones cuando se cargue la página
mostrarEvaluaciones();
