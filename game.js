
import { preguntes } from "./questions.js";

export function iniciarJoc(categoria, enAcabar) {

  const llista = preguntes[categoria];
  let preguntaActual = 0;
  let encerts = 0;

  function mostrarPregunta() {

    // Si no queden preguntes, acabar
    if (preguntaActual >= llista.length) {
      enAcabar(encerts, llista.length);
      return;
    }

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
  }

  function respondre(index) {
    const pregunta = llista[preguntaActual];

    if (index === pregunta.correcta) {
      encerts++;
    }

    preguntaActual++;
    mostrarPregunta();
  }

  mostrarPregunta();
}
