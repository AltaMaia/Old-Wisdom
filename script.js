// Navegação por abas
const abaBtns = document.querySelectorAll('.aba-btn');
const conteudoAbas = document.querySelectorAll('.conteudo-aba');

abaBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const abaId = btn.getAttribute('data-aba');
        
        // Remover classes ativas
        abaBtns.forEach(b => b.classList.remove('ativa'));
        conteudoAbas.forEach(c => c.classList.remove('ativa'));
        
        // Adicionar classes ativas
        btn.classList.add('ativa');
        document.getElementById(abaId).classList.add('ativa');
        
        // Salvar progresso
        salvarProgresso(abaId);
    });
});

// Cronômetro de Respiração
let intervaloRespiracao;
let estaAtivo = false;
const iniciarBtn = document.getElementById('iniciarRespiracao');
const faseSpan = document.getElementById('faseRespiracao');
const contagemSpan = document.getElementById('contagemRespiracao');

iniciarBtn.addEventListener('click', () => {
    if (!estaAtivo) {
        iniciarCronometro();
        iniciarBtn.textContent = 'Parar Exercício';
        estaAtivo = true;
    } else {
        pararCronometro();
        iniciarBtn.textContent = 'Iniciar Exercício';
        estaAtivo = false;
    }
});

function iniciarCronometro() {
    let fase = 'inspire';
    let contagem = 4;
    
    intervaloRespiracao = setInterval(() => {
        faseSpan.textContent = fase.charAt(0).toUpperCase() + fase.slice(1);
        contagemSpan.textContent = contagem;
        
        if (fase === 'inspire') {
            contagem--;
            if (contagem === 0) {
                fase = 'segure';
                contagem = 2;
            }
        } else if (fase === 'segure') {
            contagem--;
            if (contagem === 0) {
                fase = 'expire';
                contagem = 6;
            }
        } else if (fase === 'expire') {
            contagem--;
            if (contagem === 0) {
                fase = 'inspire';
                contagem = 4;
            }
        }
    }, 1000);
}

function pararCronometro() {
    clearInterval(intervaloRespiracao);
    faseSpan.textContent = 'Inspire';
    contagemSpan.textContent = '4';
}

// Quiz Ayurveda
const iniciarQuizBtn = document.getElementById('iniciarQuiz');
const resultadoQuiz = document.getElementById('resultadoQuiz');
const tipoDosha = document.getElementById('tipoDosha');
const descricaoDosha = document.getElementById('descricaoDosha');

iniciarQuizBtn.addEventListener('click', () => {
    const doshas = ['Vata', 'Pitta', 'Kapha'];
    const aleatorio = doshas[Math.floor(Math.random() * doshas.length)];
    
    tipoDosha.textContent = aleatorio;
    
    const descricoes = {
        'Vata': 'Você tem constituição Vata. É criativo, energético e adaptável, mas pode ansiar quando desequilibrado.',
        'Pitta': 'Você tem constituição Pitta. É focado, inteligente e determinado, mas pode ficar irritado quando desequilibrado.',
        'Kapha': 'Você tem constituição Kapha. É calmo, leal e estável, mas pode ficar letárgico quando desequilibrado.'
    };
    
    descricaoDosha.textContent = descricoes[aleatorio];
    resultadoQuiz.style.display = 'block';
});

// Rastreamento de Progresso
function carregarProgresso() {
    const salvo = localStorage.getItem('progressoSabedoria');
    if (salvo) {
        const dados = JSON.parse(salvo);
        atualizarProgresso(dados);
    } else {
        inicializarProgresso();
    }
}

function inicializarProgresso() {
    const dados = {};
    abaBtns.forEach(btn => {
        const abaId = btn.getAttribute('data-aba');
        dados[abaId] = {
            visitado: false,
            ultimaVisita: null,
            praticas: 0
        };
    });
    localStorage.setItem('progressoSabedoria', JSON.stringify(dados));
    atualizarProgresso(dados);
}

function salvarProgresso(abaId) {
    const salvo = localStorage.getItem('progressoSabedoria');
    let dados = salvo ? JSON.parse(salvo) : {};
    
    if (!dados[abaId]) {
        dados[abaId] = {
            visitado: false,
            ultimaVisita: null,
            praticas: 0
        };
    }
    
    dados[abaId].visitado = true;
    dados[abaId].ultimaVisita = new Date().toISOString();
    dados[abaId].praticas++;
    
    localStorage.setItem('progressoSabedoria', JSON.stringify(dados));
    atualizarProgresso(dados);
}

function atualizarProgresso(dados) {
    const lista = document.getElementById('listaProgresso');
    lista.innerHTML = '';
    
    Object.entries(dados).forEach(([abaId, info]) => {
        const progresso = (info.praticas / 10) * 100;
        const nome = document.querySelector(`[data-aba="${abaId}"]`).textContent;
        
        const item = document.createElement('div');
        item.className = 'item-progresso';
        item.innerHTML = `
            <div style="display: flex; align-items: center; gap: 10px;">
                <i class="fas ${info.visitado ? 'fa-check-circle' : 'fa-circle'}" 
                   style="color: ${info.visitado ? '#88d8b0' : '#ccc'};"></i>
                <span>${nome}</span>
            </div>
            <div style="flex-grow: 1; height: 10px; background: #e0e0e0; border-radius: 5px; overflow: hidden;">
                <div style="height: 100%; width: ${progresso}%; background: #88d8b0; border-radius: 5px; transition: width 0.5s;"></div>
            </div>
            <div style="text-align: right;">
                <div>${info.praticas} práticas</div>
            </div>
        `;
        lista.appendChild(item);
    });
}

document.getElementById('resetarProgresso').addEventListener('click', () => {
    if (confirm('Tem certeza que quer resetar todo o progresso?')) {
        localStorage.removeItem('progressoSabedoria');
        inicializarProgresso();
    }
});

// Gerador de Prática Diária
const gerarBtn = document.getElementById('gerarPratica');
const resultadoPratica = document.getElementById('resultadoPratica');
const tituloPratica = document.getElementById('tituloPratica');
const descricaoPratica = document.getElementById('descricaoPratica');
const passosPratica = document.getElementById('passosPratica');

const praticas = [
    {
        titulo: 'Mindfulness Matinal',
        descricao: 'Comece o dia com 5 minutos de mindfulness para estabelecer um tom calmo e intencional.',
        passos: [
            'Encontre um local tranquilo para sentar',
            'Feche os olhos e respire profundamente 3 vezes',
            'Observe as sensações do corpo sem julgamento',
            'Traga atenção para os pensamentos como eles vêm e vão',
            'Abra os olhos quando estiver pronto'
        ]
    },
    {
        titulo: 'Meditação de Energia',
        descricao: 'Meditação de 10 minutos para equilibrar seus centros de energia.',
        passos: [
            'Sente-se confortavelmente com a coluna reta',
            'Coloque as mãos no abdômen inferior',
            'Inspire profundamente, imaginando energia subindo dos pés',
            'Exspire, liberando qualquer tensão',
            'Mova as mãos para diferentes centros de energia visualizando luz'
        ]
    }
];

gerarBtn.addEventListener('click', () => {
    const aleatoria = praticas[Math.floor(Math.random() * praticas.length)];
    
    tituloPratica.textContent = aleatoria.titulo;
    descricaoPratica.textContent = aleatoria.descricao;
    
    passosPratica.innerHTML = '';
    aleatoria.passos.forEach(passo => {
        const div = document.createElement('div');
        div.style.marginBottom = '10px';
        div.innerHTML = `<i class="fas fa-chevron-right" style="color: #88d8b0; margin-right: 10px;"></i>${passo}`;
        passosPratica.appendChild(div);
    });
    
    resultadoPratica.style.display = 'block';
});

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    carregarProgresso();
    
    const ativa = document.querySelector('.aba-btn.ativa');
    if (ativa) {
        const abaId = ativa.getAttribute('data-aba');
        salvarProgresso(abaId);
    }
});
