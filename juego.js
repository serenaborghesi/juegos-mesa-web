// Obtener el nombre del juego desde la URL (?game=Catan)
const params = new URLSearchParams(window.location.search);
const gameName = params.get("game");

function fetchJuegoDetails() {
  fetch("juegos.json")
    .then(response => response.json())
    .then(juegos => {
      const juego = juegos.find(j => j.name === gameName);
      if (juego) {
        renderJuegoDetail(juego);
      } else {
        document.getElementById("main-container").innerHTML = "<h2>Juego no encontrado</h2>";
      }
    })
    .catch(error => console.error(error));
}

function renderJuegoDetail(juego) {
  const container = document.getElementById("main-container");
  const div = document.createElement("div");

  div.innerHTML = `
    <h2>${juego.name}</h2>
    <img src="img/${juego.image}" width="400" alt="${juego.name}" />
    <p><strong>Descripción:</strong> ${juego.description}</p>
    <p><strong>Duración:</strong> ${juego.duration}</p>
    <h3>Historia</h3>
    <p>${juego.history || "No disponible"}</p>
    <h3>Estrategias</h3>
    <p>${juego.strategies || "No disponible"}</p>
    <h3>Curiosidades</h3>
    <ul>
      ${(juego.curiosities || ["No disponible."]).map(c => `<li>${c}</li>`).join("")}
    </ul>
  `;
  container.appendChild(div);
}

fetchJuegoDetails();
