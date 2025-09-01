// Tab Navigation
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const tabId = button.getAttribute('data-tab');
        
        // Remove active class from all buttons and contents
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        // Add active class to clicked button and corresponding content
        button.classList.add('active');
        document.getElementById(tabId).classList.add('active');
        
        // Update navigation links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${tabId}`) {
                link.classList.add('active');
            }
        });
        
        // Save progress
        saveProgress(tabId);
    });
});

// Navigation Toggle for Mobile
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Navigation Links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetTab = document.querySelector(`[data-tab="${targetId}"]`);
        
        if (targetTab) {
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to target button and content
            targetTab.classList.add('active');
            document.getElementById(targetId).classList.add('active');
            
            // Close mobile menu
            navMenu.classList.remove('active');
        }
    });
});

// Breathing Timer
let breathingInterval;
let isBreathingActive = false;
const startBreathingBtn = document.getElementById('startBreathing');
const breathPhase = document.getElementById('breathPhase');
const breathCount = document.getElementById('breathCount');

startBreathingBtn.addEventListener('click', () => {
    if (!isBreathingActive) {
        startBreathingExercise();
        startBreathingBtn.textContent = 'Stop Breathing Exercise';
        isBreathingActive = true;
    } else {
        stopBreathingExercise();
        startBreathingBtn.textContent = 'Start Breathing Exercise';
        isBreathingActive = false;
    }
});

function startBreathingExercise() {
    let phase = 'inhale';
    let count = 4;
    
    breathingInterval = setInterval(() => {
        breathPhase.textContent = phase.charAt(0).toUpperCase() + phase.slice(1);
        breathCount.textContent = count;
        
        if (phase === 'inhale') {
            count--;
            if (count === 0) {
                phase = 'hold';
                count = 2;
            }
        } else if (phase === 'hold') {
            count--;
            if (count === 0) {
                phase = 'exhale';
                count = 6;
            }
        } else if (phase === 'exhale') {
            count--;
            if (count === 0) {
                phase = 'inhale';
                count = 4;
            }
        }
    }, 1000);
}

function stopBreathingExercise() {
    clearInterval(breathingInterval);
    breathPhase.textContent = 'Inhale';
    breathCount.textContent = '4';
}

// Dosha Quiz
const startDoshaQuizBtn = document.getElementById('startDoshaQuiz');
const doshaResult = document.getElementById('doshaResult');
const doshaType = document.getElementById('doshaType');
const doshaDescription = document.getElementById('doshaDescription');

startDoshaQuizBtn.addEventListener('click', () => {
    // Simulate dosha quiz result
    const doshas = ['Vata', 'Pitta', 'Kapha'];
    const randomDosha = doshas[Math.floor(Math.random() * doshas.length)];
    
    doshaType.textContent = randomDosha;
    
    const descriptions = {
        'Vata': 'You have a Vata constitution. You are creative, energetic, and adaptable but may experience anxiety when imbalanced. Focus on routine, warm foods, and grounding practices.',
        'Pitta': 'You have a Pitta constitution. You are focused, intelligent, and determined but may become irritable when imbalanced. Focus on cooling foods, stress management, and moderation.',
        'Kapha': 'You have a Kapha constitution. You are calm, loyal, and steady but may become lethargic when imbalanced. Focus on regular exercise, stimulating activities, and light foods.'
    };
    
    doshaDescription.textContent = descriptions[randomDosha];
    doshaResult.style.display = 'block';
});

// Zen Garden Raking
const zenGarden = document.getElementById('zenGarden');
let isRaking = false;
let lastX = 0;
let lastY = 0;

zenGarden.addEventListener('mousedown', (e) => {
    isRaking = true;
    lastX = e.offsetX;
    lastY = e.offsetY;
});

document.addEventListener('mouseup', () => {
    isRaking = false;
});

document.addEventListener('mousemove', (e) => {
    if (isRaking && zenGarden) {
        const rect = zenGarden.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const dx = x - lastX;
        const dy = y - lastY;
        
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance > 5) {
            const line = document.createElement('div');
            line.style.position = 'absolute';
            line.style.top = `${lastY}px`;
            line.style.left = `${lastX}px`;
            line.style.width = `${distance}px`;
            line.style.height = '1px';
            line.style.background = '#8b4513';
            line.style.transform = `rotate(${Math.atan2(dy, dx)}rad)`;
            line.style.transformOrigin = '0 0';
            
            zenGarden.appendChild(line);
            
            lastX = x;
            lastY = y;
        }
    }
});

// Detachment Balloons
const balloons = document.querySelectorAll('[id^="balloon"]');

balloons.forEach(balloon => {
    let isDragging = false;
    let offsetX, offsetY;
    
    balloon.addEventListener('mousedown', (e) => {
        isDragging = true;
        offsetX = e.clientX - balloon.offsetLeft;
        offsetY = e.clientY - balloon.offsetTop;
        balloon.style.cursor = 'grabbing';
    });
    
    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            balloon.style.left = `${e.clientX - offsetX}px`;
            balloon.style.top = `${e.clientY - offsetY}px`;
        }
    });
    
    document.addEventListener('mouseup', () => {
        if (isDragging && parseFloat(balloon.style.top) < -50) {
            // Balloon released above the viewport
            balloon.style.transition = 'all 1s ease-out';
            balloon.style.transform = 'translateY(-100vh)';
            balloon.style.opacity = '0';
            
            setTimeout(() => {
                balloon.style.transition = '';
                balloon.style.top = '10px';
                balloon.style.left = `${Math.random() * 80 + 10}%`;
                balloon.style.transform = '';
                balloon.style.opacity = '1';
            }, 1000);
        }
        
        isDragging = false;
        balloon.style.cursor = 'grab';
    });
});

// Stoicism Control Exercise
const analyzeSituationBtn = document.getElementById('analyzeSituation');
const situationInput = document.getElementById('situationInput');
const controlItems = document.getElementById('controlItems');
const noControlItems = document.getElementById('noControlItems');

analyzeSituationBtn.addEventListener('click', () => {
    const situation = situationInput.value.trim();
    if (!situation) return;
    
    // Clear previous items
    controlItems.innerHTML = '';
    noControlItems.innerHTML = '';
    
    // Example analysis (in a real app, this would be more sophisticated)
    const controlExamples = [
        'My response to the situation',
        'My attitude and perspective',
        'My preparation and effort',
        'How I communicate with others',
        'My focus and attention'
    ];
    
    const noControlExamples = [
        'Other people\'s actions or opinions',
        'External circumstances',
        'Past events',
        'Future outcomes',
        'The weather or traffic'
    ];
    
    controlExamples.forEach(item => {
        const div = document.createElement('div');
        div.style.marginBottom = '5px';
        div.innerHTML = `<i class="fas fa-check" style="color: var(--secondary-color); margin-right: 5px;"></i>${item}`;
        controlItems.appendChild(div);
    });
    
    noControlExamples.forEach(item => {
        const div = document.createElement('div');
        div.style.marginBottom = '5px';
        div.innerHTML = `<i class="fas fa-times" style="color: var(--primary-color); margin-right: 5px;"></i>${item}`;
        noControlItems.appendChild(div);
    });
});

// Tao Energy Flow
const startEnergyFlowBtn = document.getElementById('startEnergyFlow');
const energyFlow = document.getElementById('energyFlow');
let energyInterval;

startEnergyFlowBtn.addEventListener('click', () => {
    if (startEnergyFlowBtn.textContent === 'Start Energy Flow') {
        startEnergyFlow();
        startEnergyFlowBtn.textContent = 'Stop Energy Flow';
    } else {
        stopEnergyFlow();
        startEnergyFlowBtn.textContent = 'Start Energy Flow';
    }
});

function startEnergyFlow() {
    let position = 10;
    energyInterval = setInterval(() => {
        position += 2;
        if (position > 90) {
            position = 10;
        }
        energyFlow.style.top = `${position}%`;
    }, 50);
}

function stopEnergyFlow() {
    clearInterval(energyInterval);
    energyFlow.style.top = '10%';
}

// Chakra Balance
const balanceChakrasBtn = document.getElementById('balanceChakras');
const chakraBars = document.querySelectorAll('.chakra-bar');

balanceChakrasBtn.addEventListener('click', () => {
    chakraBars.forEach(bar => {
        const fill = bar.querySelector('.chakra-fill');
        const randomWidth = Math.floor(Math.random() * 40) + 60; // 60-100%
        fill.style.width = `${randomWidth}%`;
    });
});

// Progress Tracker
function loadProgress() {
    const savedProgress = localStorage.getItem('wisdomProgress');
    if (savedProgress) {
        const progressData = JSON.parse(savedProgress);
        updateProgressDisplay(progressData);
    } else {
        initializeProgress();
    }
}

function initializeProgress() {
    const progressData = {};
    tabButtons.forEach(button => {
        const tabId = button.getAttribute('data-tab');
        progressData[tabId] = {
            visited: false,
            lastVisit: null,
            practices: 0
        };
    });
    localStorage.setItem('wisdomProgress', JSON.stringify(progressData));
    updateProgressDisplay(progressData);
}

function saveProgress(tabId) {
    const savedProgress = localStorage.getItem('wisdomProgress');
    let progressData;
    
    if (savedProgress) {
        progressData = JSON.parse(savedProgress);
    } else {
        progressData = {};
    }
    
    if (!progressData[tabId]) {
        progressData[tabId] = {
            visited: false,
            lastVisit: null,
            practices: 0
        };
    }
    
    progressData[tabId].visited = true;
    progressData[tabId].lastVisit = new Date().toISOString();
    progressData[tabId].practices++;
    
    localStorage.setItem('wisdomProgress', JSON.stringify(progressData));
    updateProgressDisplay(progressData);
}

function updateProgressDisplay(progressData) {
    const progressList = document.getElementById('progressList');
    progressList.innerHTML = '';
    
    Object.entries(progressData).forEach(([tabId, data]) => {
        const progressItem = document.createElement('div');
        progressItem.className = 'progress-item';
        
        const progressPercent = (data.practices / 10) * 100; // Max 10 practices per tradition
        const progressWidth = Math.min(progressPercent, 100);
        
        const tabName = tabButtons.find(btn => btn.getAttribute('data-tab') === tabId)?.textContent || tabId;
        
        progressItem.innerHTML = `
            <div style="display: flex; align-items: center; gap: 10px;">
                <i class="fas ${data.visited ? 'fa-check-circle' : 'fa-circle'}" style="color: ${data.visited ? 'var(--secondary-color)' : '#ccc'};"></i>
                <span>${tabName}</span>
            </div>
            <div class="progress-bar">
                <div class="progress-fill" style="width: ${progressWidth}%"></div>
            </div>
            <div style="text-align: right;">
                <div>${data.practices} practices</div>
                ${data.lastVisit ? `<div style="font-size: 0.8rem; color: #666;">Last: ${new Date(data.lastVisit).toLocaleDateString()}</div>` : ''}
            </div>
        `;
        
        progressList.appendChild(progressItem);
    });
}

document.getElementById('resetProgress').addEventListener('click', () => {
    if (confirm('Are you sure you want to reset all your progress?')) {
        localStorage.removeItem('wisdomProgress');
        initializeProgress();
    }
});

// Daily Practice Generator
const generatePracticeBtn = document.getElementById('generatePractice');
const practiceResult = document.getElementById('practiceResult');
const practiceTitle = document.getElementById('practiceTitle');
const practiceDescription = document.getElementById('practiceDescription');
const practiceSteps = document.getElementById('practiceSteps');

generatePracticeBtn.addEventListener('click', () => {
    const practices = [
        {
            title: 'Morning Mindfulness',
            description: 'Start your day with a 5-minute mindfulness practice to set a calm, intentional tone for the day.',
            steps: [
                'Find a quiet spot to sit comfortably',
                'Close your eyes and take three deep breaths',
                'Notice the sensations in your body without judgment',
                'Bring awareness to your thoughts as they come and go',
                'Gently open your eyes when ready'
            ]
        },
        {
            title: 'Energy Flow Meditation',
            description: 'A 10-minute meditation to balance your energy centers and promote vitality.',
            steps: [
                'Sit comfortably with your spine straight',
                'Place your hands on your lower abdomen',
                'Inhale deeply, imagining energy flowing up from your feet',
                'Exhale, releasing any tension or blockages',
                'Move your hands to different energy centers as you visualize light filling them'
            ]
        },
        {
            title: 'Gratitude Reflection',
            description: 'Reflect on three things you\'re grateful for today to cultivate positive energy.',
            steps: [
                'Find a quiet moment for reflection',
                'Think of three specific things from today that you appreciate',
                'Consider why each thing matters to you',
                'Notice how this reflection makes you feel',
                'Carry this gratitude with you throughout the day'
            ]
        },
        {
            title: 'Movement Practice',
            description: 'Gentle movement to connect mind and body, releasing tension and increasing energy.',
            steps: [
                'Stand with feet shoulder-width apart',
                'Take a few deep breaths to center yourself',
                'Slowly roll your neck, shoulders, and wrists',
                'Gently sway from side to side',
                'End with a moment of stillness, noticing how your body feels'
            ]
        },
        {
            title: 'Breathing Exercise',
            description: 'A simple breathing technique to calm your nervous system and increase focus.',
            steps: [
                'Sit or lie down comfortably',
                'Place one hand on your chest, one on your belly',
                'Inhale slowly through your nose for 4 counts',
                'Hold your breath for 4 counts',
                'Exhale slowly through your mouth for 6 counts',
                'Repeat for 5-10 cycles'
            ]
        }
    ];
    
    // Get saved progress to personalize recommendations
    const savedProgress = localStorage.getItem('wisdomProgress');
    let progressData = {};
    let lessVisitedTraditions = [];
    
    if (savedProgress) {
        progressData = JSON.parse(savedProgress);
        Object.entries(progressData).forEach(([tabId, data]) => {
            if (data.practices < 3) {
                lessVisitedTraditions.push(tabId);
            }
        });
    }
    
    // Select a practice (prioritize less visited traditions if available)
    let selectedPractice;
    if (lessVisitedTraditions.length > 0) {
        // Weight selection toward less visited traditions
        const weights = lessVisitedTraditions.map(() => 0.7);
        const otherWeight = 0.3 / (practices.length - lessVisitedTraditions.length);
        
        const allWeights = [];
        practices.forEach((_, i) => {
            if (lessVisitedTraditions.includes(i)) {
                allWeights.push(0.7);
            } else {
                allWeights.push(otherWeight);
            }
        });
        
        // Normalize weights
        const totalWeight = allWeights.reduce((a, b) => a + b, 0);
        const normalizedWeights = allWeights.map(w => w / totalWeight);
        
        // Select based on weights
        let random = Math.random();
        let selectedIndex = 0;
        let cumulativeWeight = 0;
        
        for (let i = 0; i < normalizedWeights.length; i++) {
            cumulativeWeight += normalizedWeights[i];
            if (random < cumulativeWeight) {
                selectedIndex = i;
                break;
            }
        }
        
        selectedPractice = practices[selectedIndex];
    } else {
        // Random selection if all traditions have been visited
        selectedPractice = practices[Math.floor(Math.random() * practices.length)];
    }
    
    // Display selected practice
    practiceTitle.textContent = selectedPractice.title;
    practiceDescription.textContent = selectedPractice.description;
    
    practiceSteps.innerHTML = '';
    selectedPractice.steps.forEach(step => {
        const stepElement = document.createElement('div');
        stepElement.style.marginBottom = '10px';
        stepElement.innerHTML = `<i class="fas fa-chevron-right" style="color: var(--secondary-color); margin-right: 10px;"></i>${step}`;
        practiceSteps.appendChild(stepElement);
    });
    
    practiceResult.style.display = 'block';
}

// Initialize progress on page load
document.addEventListener('DOMContentLoaded', () => {
    loadProgress();
    
    // Set initial active tab
    const activeTab = document.querySelector('.tab-btn.active');
    if (activeTab) {
        const tabId = activeTab.getAttribute('data-tab');
        saveProgress(tabId);
    }
});
