
export function mostrarResultats(
  nom,
  encerts,
  total,
  tornarAJugar,
  sortir
) {

  // Mostrar el missatge final
  document.getElementById("missatge-final")
    .textContent = `Molt bé, ${nom}! Has acabat el Trivial.`;

  // Mostrar puntuació
  document.getElementById("puntuacio")
    .textContent = `Has encertat ${encerts} de ${total} preguntes`;

  // Botó tornar a jugar
  document.getElementById("btn-reiniciar").onclick = () => {
    tornarAJugar();
  };

  // Botó sortir
  document.getElementById("btn-sortir").onclick = () => {
    sortir();
  };
}
