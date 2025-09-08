// Variáveis globais
let isDay = true;
let meditationTimer;
let meditationSeconds = 300; // 5 minutos
let isMeditating = false;
let daysStreak = parseInt(localStorage.getItem('daysStreak') || '0');
let totalMinutes = parseInt(localStorage.getItem('totalMinutes') || '0');
let flowersGrown = parseInt(localStorage.getItem('flowersGrown') || '0');

// Reflexões diárias
const reflections = [
    "A paz começa dentro de você. Encontre silêncio no meio do caos.",
    "Cada respiração é uma nova oportunidade de recomeçar.",
    "Simplicidade é a chave para a verdadeira riqueza.",
    "O presente é o único momento que realmente existe.",
    "Deixe ir o que não pode controlar, abrace o que pode.",
    "A natureza ensina sabedoria silenciosa e poderosa.",
    "Cultive gratidão como a mais bela flor do jardim.",
    "Em cada desafio, há uma lição esperando para ser aprendida."
];

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    updateStats();
    checkDailyVisit();
    
    // Event listeners
    document.getElementById('growFlowers').addEventListener('click', growFlowers);
    document.getElementById('dayNightBtn').addEventListener('click', toggleDayNight);
    document.getElementById('startMeditation').addEventListener('click', startMeditation);
    document.getElementById('pauseMeditation').addEventListener('click', pauseMeditation);
    document.getElementById('resetMeditation').addEventListener('click', resetMeditation);
    document.getElementById('newReflection').addEventListener('click', newReflection);
});

// Fazer flores crescer
function growFlowers() {
    const flowers = document.querySelectorAll('.flower');
    flowers.forEach((flower, index) => {
        setTimeout(() => {
            flower.classList.add('grown');
            flowersGrown++;
            localStorage.setItem('flowersGrown', flowersGrown.toString());
            updateStats();
        }, index * 300);
    });
}

// Alternar dia e noite
function toggleDayNight() {
    const sky = document.getElementById('sky');
    const ground = document.getElementById('ground');
    const sunMoon = document.getElementById('sunMoon');
    const dayNightBtn = document.getElementById('dayNightBtn');
    
    isDay = !isDay;
    
    if (isDay) {
        sky.classList.remove('night');
        ground.classList.remove('night');
        sunMoon.classList.remove('night');
        dayNightBtn.innerHTML = '<i class="fas fa-moon"></i> Mudar para Noite';
    } else {
        sky.classList.add('night');
        ground.classList.add('night');
        sunMoon.classList.add('night');
        dayNightBtn.innerHTML = '<i class="fas fa-sun"></i> Mudar para Dia';
    }
}

// Meditação
function startMeditation() {
    if (!isMeditating) {
        isMeditating = true;
        meditationTimer = setInterval(() => {
            meditationSeconds--;
            updateTimerDisplay();
            
            if (meditationSeconds <= 0) {
                completeMeditation();
            }
        }, 1000);
    }
}

function pauseMeditation() {
    if (isMeditating) {
        isMeditating = false;
        clearInterval(meditationTimer);
    }
}

function resetMeditation() {
    isMeditating = false;
    clearInterval(meditationTimer);
    meditationSeconds = 300;
    updateTimerDisplay();
}

function completeMeditation() {
    isMeditating = false;
    clearInterval(meditationTimer);
    meditationSeconds = 300;
    updateTimerDisplay();
    
    // Adicionar minutos ao total
    const minutesAdded = 5;
    totalMinutes += minutesAdded;
    localStorage.setItem('totalMinutes', totalMinutes.toString());
    updateStats();
    
    // Mostrar mensagem de conclusão
    showNotification('🧘‍♀️ Meditação concluída! Sinta a paz interior.');
}

function updateTimerDisplay() {
    const minutes = Math.floor(meditationSeconds / 60);
    const seconds = meditationSeconds % 60;
    document.getElementById('timerMinutes').textContent = minutes.toString().padStart(2, '0');
}

// Nova reflexão
function newReflection() {
    const randomReflection = reflections[Math.floor(Math.random() * reflections.length)];
    const reflectionText = document.getElementById('reflectionText');
    
    reflectionText.style.opacity = '0';
    setTimeout(() => {
        reflectionText.textContent = randomReflection;
        reflectionText.style.opacity = '1';
    }, 300);
}

// Atualizar estatísticas
function updateStats() {
    document.getElementById('daysStreak').textContent = daysStreak;
    document.getElementById('totalMinutes').textContent = totalMinutes;
    document.getElementById('flowersGrown').textContent = flowersGrown;
}

// Verificar visita diária
function checkDailyVisit() {
    const lastVisit = localStorage.getItem('lastVisit');
    const today = new Date().toDateString();
    
    if (lastVisit !== today) {
        // Nova visita diária
        daysStreak++;
        localStorage.setItem('daysStreak', daysStreak.toString());
        localStorage.setItem('lastVisit', today);
        updateStats();
    }
}

// Notificação
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'zen-notification';
    notification.innerHTML = `<i class="fas fa-check-circle"></i> ${message}`;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Adicionar estilo para notificação
const style = document.createElement('style');
style.textContent = `
    .zen-notification {
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, var(--zen-green), #689f38);
        color: white;
        padding: 1rem 2rem;
        border-radius: 10px;
        box-shadow: var(--zen-shadow);
        z-index: 1000;
        animation: slideIn 0.5s ease;
    }
    
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);
