// Dados das trilhas com coordenadas para o mapa
const trails = [
  {
    id: 1,
    name: "Trilha do Pico da Pedra Branca",
    difficulty: "alta",
    length: "8 km (ida e volta)",
    duration: "5-6 horas",
    coordinates: [-22.9833, -43.4667],
    path: [
      [-22.975, -43.47],
      [-22.9765, -43.468],
      [-22.978, -43.466],
      [-22.98, -43.464],
      [-22.982, -43.462],
    ],
    biome:
      "Mata Atlântica de altitude, com formações rochosas e floresta ombrófila densa. Vegetação característica de encostas com dossel fechado e abundância de epífitas.",
    fauna: [
      "Sauá (guariba)",
      "Preguiça-de-coleira",
      "Jaguatirica",
      "Gavião-pomba",
      "Sabiá-cica",
      "Tangará",
      "Bentevi",
    ],
    flora: [
      "Palmeira-juçara",
      "Quaresmeira",
      "Bromélias",
      "Orquídeas",
      "Samambaias",
      "Cedro-rosa",
      "Ipê-amarelo",
    ],
  },
  {
    id: 2,
    name: "Trilha da Cachoeira do Barata",
    difficulty: "media",
    length: "4 km (ida e volta)",
    duration: "2-3 horas",
    coordinates: [-22.97, -43.48],
    path: [
      [-22.968, -43.482],
      [-22.969, -43.4805],
      [-22.97, -43.479],
      [-22.971, -43.4775],
      [-22.972, -43.476],
    ],
    biome:
      "Mata Atlântica com áreas alagadas e curso d'água, vegetação ripária. Ambiente úmido com solo orgânico e presença de nascentes.",
    fauna: [
      "Pica-pau",
      "Sabiá-laranjeira",
      "Sagui",
      "Perereca",
      "Libélulas",
      "Lontra",
      "Saracura",
    ],
    flora: [
      "Ingá",
      "Embiruçu",
      "Helicônias",
      "Aguapé",
      "Pau-d'alho",
      "Figueira",
      "Pau-brasil",
    ],
  },
  {
    id: 3,
    name: "Trilha da Cidade de Deus",
    difficulty: "baixa",
    length: "3 km (ida e volta)",
    duration: "1-2 horas",
    coordinates: [-22.99, -43.45],
    path: [
      [-22.988, -43.452],
      [-22.989, -43.4505],
      [-22.99, -43.449],
      [-22.991, -43.4475],
      [-22.992, -43.446],
    ],
    biome:
      "Mata Atlântica em estágio secundário, com transição para áreas urbanas. Região de borda de floresta com clareiras naturais.",
    fauna: [
      "Tico-tico",
      "Sanhaço",
      "Teiú",
      "Lagartixa",
      "Borboletas",
      "Beija-flor",
      "Coruja-buraqueira",
    ],
    flora: [
      "Pau-brasil",
      "Ipê-amarelo",
      "Manacá-da-serra",
      "Erva-mate",
      "Capim",
      "Aroeira",
      "Pitangueira",
    ],
  },
  {
    id: 4,
    name: "Trilha do Camorim",
    difficulty: "media",
    length: "6 km (ida e volta)",
    duration: "3-4 horas",
    coordinates: [-22.995, -43.49],
    path: [
      [-22.993, -43.492],
      [-22.994, -43.4905],
      [-22.995, -43.489],
      [-22.996, -43.4875],
      [-22.997, -43.486],
    ],
    biome:
      "Mata Atlântica com remanescentes de floresta primária e secundária. Terreno acidentado com variação de altitude.",
    fauna: [
      "Tucano",
      "Macaco-prego",
      "Cutia",
      "Tatu",
      "Beija-flor",
      "Jacu",
      "Gambá",
    ],
    flora: [
      "Cedro",
      "Canela",
      "Jaqueira",
      "Xaxim",
      "Bambu",
      "Pau-ferro",
      "Embaúba",
    ],
  },
  {
    id: 5,
    name: "Trilha do Rio Grande",
    difficulty: "alta",
    length: "10 km (ida e volta)",
    duration: "6-7 horas",
    coordinates: [-22.965, -43.46],
    path: [
      [-22.963, -43.462],
      [-22.964, -43.4605],
      [-22.965, -43.459],
      [-22.966, -43.4575],
      [-22.967, -43.456],
    ],
    biome:
      "Mata Atlântica densa com cursos d'água permanentes e áreas íngremes. Solo rico em matéria orgânica e umidade elevada.",
    fauna: [
      "Gato-do-mato",
      "Paca",
      "Tucano-de-bico-preto",
      "Jacaré",
      "Papa-formiga",
      "Jararaca",
      "Gavião-real",
    ],
    flora: [
      "Peroba",
      "Figueira",
      "Pau-ferro",
      "Bromélia-tanque",
      "Orquídea-da-serra",
      "Palmito",
      "Cipó-imbé",
    ],
  },
];

// Elementos do DOM
const trailListElement = document.getElementById("trailList");
const showInfoBtn = document.getElementById("showInfoBtn");
const resultsElement = document.getElementById("results");
const mapOverlay = document.getElementById("mapOverlay");

// Variável para armazenar a trilha selecionada
let selectedTrail = null;
let map = null;
let trailPath = null;
let trailMarkers = [];

// Inicializar o mapa
function initMap() {
  // Coordenadas aproximadas do Parque Nacional da Pedra Branca
  map = L.map("map", {
    zoomControl: false, // Desativar controle de zoom padrão para melhor performance
    preferCanvas: true, // Usar canvas para melhor performance
  }).setView([-22.9833, -43.4667], 13);

  // Adicionar camada do mapa (OpenStreetMap)
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 18,
  }).addTo(map);

  // Adicionar controle de zoom em posição mais adequada para mobile
  L.control
    .zoom({
      position: "bottomright",
    })
    .addTo(map);

  // Adicionar marcador inicial simplificado
  L.marker([-22.9833, -43.4667])
    .addTo(map)
    .bindPopup("Parque Nacional da Pedra Branca")
    .openPopup();
}

// Atualizar o mapa com a trilha selecionada
function updateMap(trail) {
  // Limpar trilha anterior e marcadores
  if (trailPath) {
    map.removeLayer(trailPath);
  }
  trailMarkers.forEach((marker) => map.removeLayer(marker));
  trailMarkers = [];

  // Centralizar o mapa na trilha
  map.setView(trail.coordinates, 14);

  // Adicionar a nova trilha
  trailPath = L.polyline(trail.path, {
    color: "#ff9800",
    weight: 4,
    opacity: 0.8,
  }).addTo(map);

  // Adicionar marcadores de início e fim
  const startMarker = L.marker(trail.path[0])
    .addTo(map)
    .bindPopup("Início da Trilha");
  const endMarker = L.marker(trail.path[trail.path.length - 1])
    .addTo(map)
    .bindPopup("Fim da Trilha");

  trailMarkers.push(startMarker, endMarker);

  // Ajustar o zoom para mostrar toda a trilha
  map.fitBounds(trailPath.getBounds());

  // Atualizar overlay do mapa
  mapOverlay.textContent = trail.name;
}

// Função para renderizar as trilhas
function renderTrails() {
  trailListElement.innerHTML = "";

  trails.forEach((trail) => {
    const trailElement = document.createElement("div");
    trailElement.className = "trail-item";
    trailElement.dataset.id = trail.id;

    trailElement.innerHTML = `
            <h3>${trail.name}</h3>
            <p><strong>Extensão:</strong> ${trail.length}</p>
            <p><strong>Duração:</strong> ${trail.duration}</p>
            <span class="difficulty ${trail.difficulty}">Dificuldade ${trail.difficulty}</span>
        `;

    trailElement.addEventListener("click", () => {
      // Remover a seleção anterior
      document.querySelectorAll(".trail-item").forEach((item) => {
        item.classList.remove("selected");
      });

      // Adicionar seleção à trilha clicada
      trailElement.classList.add("selected");

      // Armazenar a trilha selecionada
      selectedTrail = trail;

      // Atualizar o mapa
      updateMap(trail);
    });

    trailListElement.appendChild(trailElement);
  });
}

// Função para mostrar informações da trilha selecionada
function showTrailInfo() {
  if (!selectedTrail) {
    alert("Por favor, selecione uma trilha primeiro.");
    return;
  }

  resultsElement.innerHTML = `
        <h2>${selectedTrail.name}</h2>
        
        <div class="info-section">
            <h3>Bioma</h3>
            <p>${selectedTrail.biome}</p>
        </div>
        
        <div class="info-section">
            <h3>Fauna</h3>
            <ul class="species-list">
                ${selectedTrail.fauna
                  .map((animal) => `<li>${animal}</li>`)
                  .join("")}
            </ul>
        </div>
        
        <div class="info-section">
            <h3>Flora</h3>
            <ul class="species-list">
                ${selectedTrail.flora
                  .map((plant) => `<li>${plant}</li>`)
                  .join("")}
            </ul>
        </div>
    `;

  resultsElement.classList.add("active");

  // Rolar suavemente até os resultados
  resultsElement.scrollIntoView({ behavior: "smooth" });
}

// Event Listeners
showInfoBtn.addEventListener("click", showTrailInfo);

// Inicializar a aplicação quando o DOM estiver carregado
document.addEventListener("DOMContentLoaded", function () {
  // Inicializar o mapa com um pequeno delay para melhor performance
  setTimeout(initMap, 100);
  renderTrails();
});

// Otimização para mobile - prevenir zoom duplo no mapa
let lastTouchEnd = 0;
document.addEventListener(
  "touchend",
  function (event) {
    const now = new Date().getTime();
    if (now - lastTouchEnd <= 300) {
      event.preventDefault();
    }
    lastTouchEnd = now;
  },
  false
);
