
import { preguntes } from "./questions.js";

export function iniciarJoc(categoria, enAcabar) {

  const llista = preguntes[categoria];
  let preguntaActual = 0;
  let encerts = 0;

  let temps = 15;
  let interval = null;
  let respostaBloquejada = false;

  function mostrarPregunta() {

    // Aturar el temporitzador anterior
    clearInterval(interval);

    // Final del joc
    if (preguntaActual >= llista.length) {
      enAcabar(encerts, llista.length);
      return;
    }

    respostaBloquejada = false;
    const pregunta = llista[preguntaActual];

    document.getElementById("categoria-titol")
      .textContent = `Categoria: ${categoria}`;

    document.getElementById("numero-pregunta")
      .textContent =
      `Pregunta ${preguntaActual + 1} de ${llista.length}`;

    document.getElementById("text-pregunta")
      .textContent = pregunta.pregunta;

    const contenidor = document.getElementById("opcions");
    contenidor.innerHTML = "";

    pregunta.opcions.forEach((opcio, index) => {
      const boto = document.createElement("button");
      boto.textContent = opcio;

      boto.addEventListener("click", () => {
        respondre(index);
      });

      contenidor.appendChild(boto);
    });

    // Reiniciar el temps per cada pregunta
    temps = 15;
    actualitzarTemps();

    interval = setInterval(() => {
      temps--;
      actualitzarTemps();

      if (temps <= 0) {
        respondre(-1);
      }
    }, 1000);
  }

  function actualitzarTemps() {
    document.getElementById("temporitzador")
      .textContent = `⏱ Temps: ${temps} segons`;
  }

  function respondre(index) {

    // Evitar respondre dues vegades
    if (respostaBloquejada) return;

    respostaBloquejada = true;
    clearInterval(interval);

    const pregunta = llista[preguntaActual];

    if (index === pregunta.correcta) {
      encerts++;
    }

    preguntaActual++;
    mostrarPregunta();
  }

  mostrarPregunta();
}
