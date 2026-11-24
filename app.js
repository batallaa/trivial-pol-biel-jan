
/* =====================================
   TRIVIAL CHALLENGE
   Pol Hernández, Biel Batalla y Jan Fernández
===================================== */

// 1. PREGUNTAS DEL JUEGO

const preguntas = {
  esports: [
    {
      pregunta: "¿Cuántos jugadores tiene un equipo de fútbol en el campo?",
      opciones: ["9", "10", "11", "12"],
      correcta: 2
    },
    {
      pregunta: "¿Qué deporte practica Rafael Nadal?",
      opciones: ["Fútbol", "Tenis", "Baloncesto", "Natación"],
      correcta: 1
    },
    {
      pregunta: "¿Cuántos puntos vale un triple en baloncesto?",
      opciones: ["1", "2", "3", "4"],
      correcta: 2
    }
  ],

  menjar: [
    {
      pregunta: "¿Cuál es el ingrediente principal del guacamole?",
      opciones: ["Tomate", "Aguacate", "Patata", "Arroz"],
      correcta: 1
    },
    {
      pregunta: "¿De qué país es originaria la pizza moderna?",
      opciones: ["Francia", "Japón", "Italia", "Alemania"],
      correcta: 2
    },
    {
      pregunta: "¿Qué fruta es normalmente amarilla?",
      opciones: ["Fresa", "Plátano", "Cereza", "Arándano"],
      correcta: 1
    }
  ]
};

// 2. VARIABLES DEL JUEGO

let nombreJugador = "";
let categoriaActual = "";
let preguntaActual = 0;
let puntuacion = 0;

let tiempoRestante = 15;
let temporizador = null;
let respuestaBloqueada = false;

// 3. ELEMENTOS DEL HTML

const pantallaInicio = document.getElementById("pantalla-inicio");
const pantallaCategorias = document.getElementById("pantalla-categories");
const pantallaJuego = document.getElementById("pantalla-joc");
const pantallaResultados = document.getElementById("pantalla-resultats");

const inputNombre = document.getElementById("nom");
const errorNombre = document.getElementById("error-nom");

const botonComenzar = document.getElementById("btn-comencar");
const botonEsports = document.getElementById("btn-esports");
const botonMenjar = document.getElementById("btn-menjar");

const saludo = document.getElementById("salutacio");
const tituloCategoria = document.getElementById("categoria-titol");
const numeroPregunta = document.getElementById("numero-pregunta");
const textoPregunta = document.getElementById("text-pregunta");
const opciones = document.getElementById("opcions");
const textoTiempo = document.getElementById("temporitzador");

const mensajeFinal = document.getElementById("missatge-final");
const textoPuntuacion = document.getElementById("puntuacio");

const botonReiniciar = document.getElementById("btn-reiniciar");
const botonSalir = document.getElementById("btn-sortir");
const barraProgreso = document.querySelector(".progress-fill");

// 4. CAMBIAR DE PANTALLA

function mostrarPantalla(pantalla) {
  pantallaInicio.classList.add("hidden");
  pantallaCategorias.classList.add("hidden");
  pantallaJuego.classList.add("hidden");
  pantallaResultados.classList.add("hidden");

  pantalla.classList.remove("hidden");
}

// 5. PANTALLA DE INICIO

function comenzar() {
  const nombre = inputNombre.value.trim();

  if (nombre === "") {
    errorNombre.textContent = "Debes escribir tu nombre.";
    inputNombre.focus();
    return;
  }

  nombreJugador = nombre;
  errorNombre.textContent = "";

  saludo.textContent = "¡Hola, " + nombreJugador + "!";

  mostrarPantalla(pantallaCategorias);
}

botonComenzar.addEventListener("click", comenzar);

// También se puede pulsar Enter
inputNombre.addEventListener("keydown", function(evento) {
  if (evento.key === "Enter") {
    comenzar();
  }
});

// 6. SELECCIONAR CATEGORÍA

botonEsports.addEventListener("click", function() {
  iniciarJuego("esports");
});

botonMenjar.addEventListener("click", function() {
  iniciarJuego("menjar");
});

// 7. INICIAR UNA PARTIDA

function iniciarJuego(categoria) {
  detenerTemporizador();

  categoriaActual = categoria;
  preguntaActual = 0;
  puntuacion = 0;

  mostrarPantalla(pantallaJuego);
  mostrarPregunta();
}

// 8. MOSTRAR UNA PREGUNTA

function mostrarPregunta() {
  detenerTemporizador();

  const listaPreguntas = preguntas[categoriaActual];

  // Comprobar si ya hemos terminado
  if (preguntaActual >= listaPreguntas.length) {
    mostrarResultados();
    return;
  }

  respuestaBloqueada = false;

  const pregunta = listaPreguntas[preguntaActual];

  // Título de la categoría
  if (categoriaActual === "esports") {
    tituloCategoria.textContent = "ESPORTS";
  } else {
    tituloCategoria.textContent = "MENJAR";
  }

  // Número de pregunta
  numeroPregunta.textContent =
    "Pregunta " + (preguntaActual + 1) +
    " de " + listaPreguntas.length;

  // Barra de progreso
  if (barraProgreso) {
    const progreso =
      ((preguntaActual + 1) / listaPreguntas.length) * 100;

    barraProgreso.style.width = progreso + "%";
  }

  // Texto de la pregunta
  textoPregunta.textContent = pregunta.pregunta;

  // Borrar las respuestas anteriores
  opciones.innerHTML = "";

  // Crear los 4 botones de respuesta
  pregunta.opciones.forEach(function(respuesta, indice) {
    const boton = document.createElement("button");
    boton.textContent = respuesta;
    boton.type = "button";

    boton.addEventListener("click", function() {
      comprobarRespuesta(indice);
    });

    opciones.appendChild(boton);
  });

  // Iniciar temporizador de esta pregunta
  iniciarTemporizador();
}

// 9. COMPROBAR LA RESPUESTA

function comprobarRespuesta(indice) {

  // Evita responder dos veces
  if (respuestaBloqueada) {
    return;
  }

  respuestaBloqueada = true;
  detenerTemporizador();

  const pregunta = preguntas[categoriaActual][preguntaActual];
  const botones = opciones.querySelectorAll("button");

  // Desactivar las respuestas
  botones.forEach(function(boton) {
    boton.disabled = true;
  });

  // Marcar la respuesta correcta en verde
  botones[pregunta.correcta].classList.add("correcta");

  if (indice === pregunta.correcta) {
    puntuacion++;
  } else if (indice >= 0) {
    // Marcar la respuesta incorrecta en rojo
    botones[indice].classList.add("incorrecta");
  }

  // Si se ha acabado el tiempo
  if (indice === -1) {
    textoTiempo.textContent = "¡Tiempo agotado!";
  }

  // Esperar un segundo antes de avanzar
  setTimeout(function() {
    preguntaActual++;
    mostrarPregunta();
  }, 1000);
}

// 10. TEMPORIZADOR

function iniciarTemporizador() {
  tiempoRestante = 15;
  actualizarTiempo();

  temporizador = setInterval(function() {
    tiempoRestante--;
    actualizarTiempo();

    if (tiempoRestante <= 0) {
      comprobarRespuesta(-1);
    }
  }, 1000);
}

function actualizarTiempo() {
  textoTiempo.textContent = "⏱ " + tiempoRestante + " s";

  if (tiempoRestante <= 5) {
    textoTiempo.classList.add("tiempo-bajo");
  } else {
    textoTiempo.classList.remove("tiempo-bajo");
  }
}

function detenerTemporizador() {
  if (temporizador !== null) {
    clearInterval(temporizador);
    temporizador = null;
  }
}

// 11. MOSTRAR RESULTADOS

function mostrarResultados() {
  detenerTemporizador();

  mostrarPantalla(pantallaResultados);

  const total = preguntas[categoriaActual].length;

  textoPuntuacion.textContent =
    puntuacion + " / " + total;

  if (puntuacion === total) {
    mensajeFinal.textContent =
      "¡Perfecto, " + nombreJugador +
      "! Has acertado todas las preguntas.";
  } else if (puntuacion >= 2) {
    mensajeFinal.textContent =
      "¡Muy bien, " + nombreJugador +
      "! Has conseguido una buena puntuación.";
  } else {
    mensajeFinal.textContent =
      "¡Buen intento, " + nombreJugador +
      "! Puedes volver a jugar para mejorar.";
  }
}

// 12. VOLVER A JUGAR

botonReiniciar.addEventListener("click", function() {
  detenerTemporizador();

  // Conservamos el nombre y volvemos a categorías
  saludo.textContent = "¡Hola, " + nombreJugador + "!";

  mostrarPantalla(pantallaCategorias);
});

// 13. SALIR

botonSalir.addEventListener("click", function() {
  detenerTemporizador();

  nombreJugador = "";
  categoriaActual = "";
  preguntaActual = 0;
  puntuacion = 0;

  inputNombre.value = "";
  errorNombre.textContent = "";

  mostrarPantalla(pantallaInicio);
});

// 14. MOSTRAR LA PANTALLA INICIAL

mostrarPantalla(pantallaInicio);
