// Dados das trilhas com coordenadas para o mapa
const trails = [
    {
        id: 1,
        name: "Trilha do Pico da Pedra Branca",
        difficulty: "alta",
        length: "8 km (ida e volta)",
        duration: "5-6 horas",
        coordinates: [-22.9833, -43.4667], // Coordenadas aproximadas
        path: [
            [-22.9750, -43.4700],
            [-22.9765, -43.4680],
            [-22.9780, -43.4660],
            [-22.9800, -43.4640],
            [-22.9820, -43.4620]
        ],
        biome: "Mata Atlântica de altitude, com formações rochosas e floresta ombrófila densa. Vegetação característica de encostas com dossel fechado e abundância de epífitas.",
        fauna: ["Sauá (guariba)", "Preguiça-de-coleira", "Jaguatirica", "Gavião-pomba", "Sabiá-cica", "Tangará", "Bentevi"],
        flora: ["Palmeira-juçara", "Quaresmeira", "Bromélias", "Orquídeas", "Samambaias", "Cedro-rosa", "Ipê-amarelo"]
    },
    {
        id: 2,
        name: "Trilha da Cachoeira do Barata",
        difficulty: "media",
        length: "4 km (ida e volta)",
        duration: "2-3 horas",
        coordinates: [-22.9700, -43.4800], // Coordenadas aproximadas
        path: [
            [-22.9680, -43.4820],
            [-22.9690, -43.4805],
            [-22.9700, -43.4790],
            [-22.9710, -43.4775],
            [-22.9720, -43.4760]
        ],
        biome: "Mata Atlântica com áreas alagadas e curso d'água, vegetação ripária. Ambiente úmido com solo orgânico e presença de nascentes.",
        fauna: ["Pica-pau", "Sabiá-laranjeira", "Sagui", "Perereca", "Libélulas", "Lontra", "Saracura"],
        flora: ["Ingá", "Embiruçu", "Helicônias", "Aguapé", "Pau-d'alho", "Figueira", "Pau-brasil"]
    },
    {
        id: 3,
        name: "Trilha da Cidade de Deus",
        difficulty: "baixa",
        length: "3 km (ida e volta)",
        duration: "1-2 horas",
        coordinates: [-22.9900, -43.4500], // Coordenadas aproximadas
        path: [
            [-22.9880, -43.4520],
            [-22.9890, -43.4505],
            [-22.9900, -43.4490],
            [-22.9910, -43.4475],
            [-22.9920, -43.4460]
        ],
        biome: "Mata Atlântica em estágio secundário, avec transição para áreas urbanas. Região de borda de floresta com clareiras naturais.",
        fauna: ["Tico-tico", "Sanhaço", "Teiú", "Lagartixa", "Borboletas", "Beija-flor", "Coruja-buraqueira"],
        flora: ["Pau-brasil", "Ipê-amarelo", "Manacá-da-serra", "Erva-mate", "Capim", "Aroeira", "Pitangueira"]
    },
    {
        id: 4,
        name: "Trilha do Camorim",
        difficulty: "media",
        length: "6 km (ida e volta)",
        duration: "3-4 horas",
        coordinates: [-22.9950, -43.4900], // Coordenadas aproximadas
        path: [
            [-22.9930, -43.4920],
            [-22.9940, -43.4905],
            [-22.9950, -43.4890],
            [-22.9960, -43.4875],
            [-22.9970, -43.4860]
        ],
        biome: "Mata Atlântica com remanescentes de floresta primária e secundária. Terreno acidentado com variação de altitude.",
        fauna: ["Tucano", "Macaco-prego", "Cutia", "Tatu", "Beija-flor", "Jacu", "Gambá"],
        flora: ["Cedro", "Canela", "Jaqueira", "Xaxim", "Bambu", "Pau-ferro", "Embaúba"]
    },
    {
        id: 5,
        name: "Trilha do Rio Grande",
        difficulty: "alta",
        length: "10 km (ida e volta)",
        duration: "6-7 horas",
        coordinates: [-22.9650, -43.4600], // Coordenadas aproximadas
        path: [
            [-22.9630, -43.4620],
            [-22.9640, -43.4605],
            [-22.9650, -43.4590],
            [-22.9660, -43.4575],
            [-22.9670, -43.4560]
        ],
        biome: "Mata Atlântica densa com cursos d'água permanentes e áreas íngremes. Solo rico em matéria orgânica e umidade elevada.",
        fauna: ["Gato-do-mato", "Paca", "Tucano-de-bico-preto", "Jacaré", "Papa-formiga", "Jararaca", "Gavião-real"],
        flora: ["Peroba", "Figueira", "Pau-ferro", "Bromélia-tanque", "Orquídea-da-serra", "Palmito", "Cipó-imbé"]
    }
];

// Elementos do DOM
const trailListElement = document.getElementById('trailList');
const showInfoBtn = document.getElementById('showInfoBtn');
const resultsElement = document.getElementById('results');
const mapOverlay = document.getElementById('mapOverlay');

// Variável para armazenar a trilha selecionada
let selectedTrail = null;
let map = null;
let trailPath = null;
let trailMarkers = [];

// Inicializar o mapa
function initMap() {
    // Coordenadas aproximadas do Parque Nacional da Pedra Branca
    map = L.map('map').setView([-22.9833, -43.4667], 13);
    
    // Adicionar camada do mapa (OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    
    // Adicionar marcador inicial
    L.marker([-22.9833, -43.4667], {
        icon: L.divIcon({
            className: 'custom-marker',
            html: '🏞️',
            iconSize: [30, 30],
            iconAnchor: [15, 15]
        })
    }).addTo(map)
    .bindPopup('Parque Nacional da Pedra Branca')
    .openPopup();
    
    // Ajustar o mapa após o carregamento completo
    setTimeout(() => {
        map.invalidateSize();
    }, 100);
}

// Atualizar o mapa com a trilha selecionada
function updateMap(trail) {
    // Limpar trilha anterior e marcadores
    if (trailPath) {
        map.removeLayer(trailPath);
    }
    trailMarkers.forEach(marker => map.removeLayer(marker));
    trailMarkers = [];
    
    // Centralizar o mapa na trilha
    map.setView(trail.coordinates, 14);
    
    // Adicionar a nova trilha
    trailPath = L.polyline(trail.path, {
        color: '#ff9800',
        weight: 4,
        opacity: 0.8,
        dashArray: '10, 10'
    }).addTo(map);
    
    // Adicionar marcadores de início e fim
    const startMarker = L.marker(trail.path[0], {
        icon: L.divIcon({
            className: 'custom-marker',
            html: '🚶‍♂️',
            iconSize: [30, 30],
            iconAnchor: [15, 15]
        })
    }).addTo(map).bindPopup('Início da Trilha');
    
    const endMarker = L.marker(trail.path[trail.path.length - 1], {
        icon: L.divIcon({
            className: 'custom-marker',
            html: '🏁',
            iconSize: [30, 30],
            iconAnchor: [15, 15]
        })
    }).addTo(map).bindPopup('Fim da Trilha');
    
    trailMarkers.push(startMarker, endMarker);
    
    // Ajustar o zoom para mostrar toda a trilha
    map.fitBounds(trailPath.getBounds());
    
    // Atualizar overlay do mapa
    mapOverlay.textContent = trail.name;
    
    // Garantir que o mapa seja redimensionado corretamente
    setTimeout(() => {
        map.invalidateSize();
    }, 50);
}

// Função para renderizar as trilhas
function renderTrails() {
    trailListElement.innerHTML = '';
    
    trails.forEach(trail => {
        const trailElement = document.createElement('div');
        trailElement.className = 'trail-item';
        trailElement.dataset.id = trail.id;
        
        trailElement.innerHTML = `
            <h3>${trail.name}</h3>
            <p><strong>Extensão:</strong> ${trail.length}</p>
            <p><strong>Duração:</strong> ${trail.duration}</p>
            <span class="difficulty ${trail.difficulty}">Dificuldade ${trail.difficulty}</span>
        `;
        
        trailElement.addEventListener('click', () => {
            // Remover a seleção anterior
            document.querySelectorAll('.trail-item').forEach(item => {
                item.classList.remove('selected');
            });
            
            // Adicionar seleção à trilha clicada
            trailElement.classList.add('selected');
            
            // Armazenar a trilha selecionada
            selectedTrail = trail;
            
            // Atualizar o mapa
            updateMap(trail);
        });
        
        // Adicionar evento de toque para melhor resposta em dispositivos móveis
        trailElement.addEventListener('touchstart', function(e) {
            this.style.transform = 'translateY(-2px)';
            e.preventDefault();
        }, {passive: false});
        
        trailElement.addEventListener('touchend', function() {
            this.style.transform = '';
        });
        
        trailListElement.appendChild(trailElement);
    });
}

// Função para mostrar informações da trilha selecionada
function showTrailInfo() {
    if (!selectedTrail) {
        alert('Por favor, selecione uma trilha primeiro.');
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
                ${selectedTrail.fauna.map(animal => `<li>${animal}</li>`).join('')}
            </ul>
        </div>
        
        <div class="info-section">
            <h3>Flora</h3>
            <ul class="species-list">
                ${selectedTrail.flora.map(plant => `<li>${plant}</li>`).join('')}
            </ul>
        </div>
    `;
    
    resultsElement.classList.add('active');
    
    // Rolar suavemente até os resultados
    resultsElement.scrollIntoView({ behavior: 'smooth' });
}

// Event Listeners
showInfoBtn.addEventListener('click', showTrailInfo);

// Melhorar a experiência de toque no botão
showInfoBtn.addEventListener('touchstart', function() {
    this.style.transform = 'translateY(-2px)';
});

showInfoBtn.addEventListener('touchend', function() {
    this.style.transform = '';
});

// Inicializar a aplicação
document.addEventListener('DOMContentLoaded', function() {
    initMap();
    renderTrails();
    
    // Ajustar o mapa quando a janela for redimensionada
    window.addEventListener('resize', function() {
        if (map) {
            setTimeout(() => {
                map.invalidateSize();
                if (selectedTrail) {
                    map.fitBounds(trailPath.getBounds());
                }
            }, 100);
        }
    });
});

// Prevenir comportamentos padrão indesejados em dispositivos móveis
document.addEventListener('touchstart', function(e) {
    if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON') {
        e.preventDefault();
    }
}, {passive: false});
