// 1. Cria a caixinha visual na tela
const painel = document.createElement('div');
painel.innerHTML = `
  <h3 style="margin:0 0 10px 0; color:#fff;">🎹 Sintetizador de Texto</h3>
  <p style="margin:0 0 10px 0; font-size:12px; color:#aaa;">Digite abaixo para gerar música em tempo real:</p>
  <input type="text" id="campoMusica" placeholder="Digite algo aqui..." style="width:100%; padding:8px; border:none; border-radius:4px; font-size:16px;">
`;
Object.assign(painel.style, {
  position: 'fixed', bottom: '20px', right: '20px', width: '280px',
  background: '#1a1a1a', padding: '15px', borderRadius: '10px',
  zIndex: '999999', fontFamily: 'sans-serif', boxShadow: '0 10px 25px rgba(0,0,0,0.5)'
});
document.body.appendChild(painel);

// 2. Cria o motor de som do navegador
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// 3. Função que toca a nota baseada na letra digitada
document.getElementById('campoMusica').addEventListener('input', (evento) => {
  const texto = evento.target.value;
  if (!texto) return;
  
  // Pega a última letra digitada
  const ultimaLetra = texto.charCodeAt(texto.length - 1);
  
  // Transforma o código da letra em uma frequência musical (Hz) entre 200Hz e 800Hz
  const frequencia = ((ultimaLetra % 25) * 24) + 200;

  // Cria o oscilador (o gerador de onda sonora)
  const oscilador = audioCtx.createOscillator();
  const ganho = audioCtx.createGain(); // Controle de volume

  // Tipo de onda: 'sine' (suave), 'square' (retro/8-bit), 'triangle', 'sawtooth'
  oscilador.type = 'triangle'; 
  oscilador.frequency.setValueAtTime(frequencia, audioCtx.currentTime);
  
  // Configura o volume para sumir suavemente (efeito de eco/piano)
  ganho.gain.setValueAtTime(0.2, audioCtx.currentTime);
  ganho.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + 0.4);

  // Conecta tudo aos alto-falantes
  oscilador.connect(ganho);
  ganho.connect(audioCtx.destination);

  // Liga o som e desliga após 0.4 segundos
  oscilador.start();
  oscilador.stop(audioCtx.currentTime + 0.4);
});
