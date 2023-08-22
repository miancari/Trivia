 
let puntaje = 0;
let indicePreguntaActual = 0;
let preguntas = [];
const seleccioCategoria = document.getElementById("categoria");
const seleccioDificultad = document.getElementById("dificultad");
const seleccionTipo = document.getElementById("tipo");

const contenedorQuiz = document.getElementById("contenedor-quiz");
const siguientePregunta = document.getElementById("siguiente-pregunta").style.display = "none";
const nuevaTrivia = document.getElementById("nueva-trivia");
const mostrarPuntaje = document.getElementById("puntaje");


function obtenerPreguntas(cantidad = 10, categoria, dificultad, tipo) {
    fetch(`https://opentdb.com/api.php?amount=${cantidad}&category=${categoria}&difficulty=${dificultad}&type=${tipo}`)
        .then(response => response.json())
        .then(data => {
            preguntas = data.results;
            mostrarpreguntas();
            
        });
}

function mostrarpreguntas(){
    const pregunta = preguntas[indicePreguntaActual];
    contenedorQuiz.innerHTML = `
       <h2><b>${pregunta.question}</b></h2>
       <div style="display:flex; flex-direction:column"><button class="respuesta">${pregunta.correct_answer}</button></div>
        ${pregunta.incorrect_answers.map(respuesta => `<div style="display:flex; flex-direction:column"><button class="respuesta" style="display:flex; justify-content:center; align-items:center">${respuesta}</button></div>`).join('')}`;

    document.querySelectorAll('.respuesta').forEach(boton => {
        boton.addEventListener('click', seleccionarRespuesta);
        document.getElementById("siguiente-pregunta").style.display = "inline";
    });
}

function seleccionarRespuesta(e) {
    const botonSeleccionado = e.target;
    const respuestaCorrecta = preguntas[indicePreguntaActual].correct_answer;


    if(botonSeleccionado.innerText === respuestaCorrecta) {
        puntaje += 100;
        mostrarPuntaje.innerText = `Su puntaje es de: ${puntaje}`;
    }

    indicePreguntaActual++;
    if(indicePreguntaActual < preguntas.length) {
        mostrarpreguntas();
    } else {
        contenedorQuiz.innerHTML = `<h2>Has completado la trivia</h2>`
    }
}

function iniciarNuevaTrivia() {
    puntaje = 0;
    indicePreguntaActual = 0;
    mostrarPuntaje.innerText = `Puntaje: ${puntaje}`;

    obtenerPreguntas(
        10,
        seleccioCategoria.value,
        seleccioDificultad.value,
        seleccionTipo.value
    );
}

//siguientePregunta.addEventListener('click', mostrarpreguntas);
nuevaTrivia.addEventListener('click', iniciarNuevaTrivia);

obtenerPreguntas();



