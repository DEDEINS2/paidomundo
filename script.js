function atualizarContador() {
    const agora = new Date();
    let ano = agora.getFullYear();
    const diaDosPais = new Date(ano, 7, 10, 0, 0, 0); // 7 = agosto (mês começa do 0)
    
    // Se já passou o dia dos pais deste ano, calcular para o próximo ano
    if (agora > diaDosPais) {
        ano += 1;
    }
    
    const proximoDiaDosPais = new Date(ano, 7, 10, 0, 0, 0);
    const diff = proximoDiaDosPais - agora;
    
    // Verificar se é o dia dos pais
    if (diff <= 0 && diff > -86400000) { // Se é hoje (menos de 24h de diferença)
        document.getElementById('timer').innerHTML = `
            🎉 <span style="color: #fbbf24;">HOJE É DIA DOS PAIS!</span> 🎉
        `;
        return;
    }
    
    const dias = Math.floor(diff / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutos = Math.floor((diff / (1000 * 60)) % 60);
    const segundos = Math.floor((diff / 1000) % 60);
    
    // Formatação bonita do contador
    document.getElementById('timer').innerHTML = `
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(100px, 1fr)); gap: 1rem; max-width: 500px; margin: 0 auto;">
            <div style="text-align: center;">
                <div style="font-size: 3rem; font-weight: 800; color: #87ceeb;">${dias}</div>
                <div style="font-size: 1rem; color: #add8e6;">dias</div>
            </div>
            <div style="text-align: center;">
                <div style="font-size: 3rem; font-weight: 800; color: #87ceeb;">${horas}</div>
                <div style="font-size: 1rem; color: #add8e6;">horas</div>
            </div>
            <div style="text-align: center;">
                <div style="font-size: 3rem; font-weight: 800; color: #87ceeb;">${minutos}</div>
                <div style="font-size: 1rem; color: #add8e6;">min</div>
            </div>
            <div style="text-align: center;">
                <div style="font-size: 3rem; font-weight: 800; color: #87ceeb;">${segundos}</div>
                <div style="font-size: 1rem; color: #add8e6;">seg</div>
            </div>
        </div>
    `;
}

// Adicionar efeitos especiais quando a página carrega
document.addEventListener('DOMContentLoaded', function() {
    // Criar corações flutuantes extras
    criarCoracaoAleatorio();
    setInterval(criarCoracaoAleatorio, 3000);
    
    // Inicializar contador
    atualizarContador();
    setInterval(atualizarContador, 1000);
});

function criarCoracaoAleatorio() {
    const coracao = document.createElement('div');
    coracao.innerHTML = '💙';
    coracao.style.cssText = `
        position: fixed;
        font-size: ${Math.random() * 20 + 15}px;
        left: ${Math.random() * 100}vw;
        top: 100vh;
        z-index: 1000;
        pointer-events: none;
        animation: voarPraAlto 6s ease-out forwards;
        opacity: 0.8;
    `;
    
    document.body.appendChild(coracao);
    
    // Remover após a animação
    setTimeout(() => {
        if (coracao.parentNode) {
            coracao.parentNode.removeChild(coracao);
        }
    }, 6000);
}

// Adicionar CSS para animação dos corações
const style = document.createElement('style');
style.textContent = `
    @keyframes voarPraAlto {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0.8;
        }
        50% {
            transform: translateY(-50vh) rotate(180deg);
            opacity: 1;
        }
        100% {
            transform: translateY(-120vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
