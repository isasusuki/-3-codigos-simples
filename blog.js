// 1. Cria uma mensagem na tela explicando o que fazer
const aviso = document.createElement('div');
aviso.innerHTML = '🎯 <b>Modo Foco:</b> Clique no texto ou artigo que você deseja ler.';
Object.assign(aviso.style, {
  position: 'fixed', top: '20px', left: '50%', transform: 'translateX(-50%)',
  background: '#333', color: '#fff', padding: '15px 25px', borderRadius: '30px',
  zIndex: '999999', fontFamily: 'sans-serif', boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
});
document.body.appendChild(aviso);

// 2. Fica esperando você clicar em alguma parte da página
document.addEventListener('click', function focarElemento(evento) {
  evento.preventDefault(); // Evita que links te levem para outra página
  
  const elementoEscolhido = evento.target; // O texto que você clicou
  
  // 3. O "Truque": Apaga todo o conteúdo do site original!
  document.body.innerHTML = '';
  
  // 4. Cria uma nova página do zero, limpa e minimalista
  document.body.style.backgroundColor = '#fbfbfb';
  document.body.style.margin = '0';
  
  const container = document.createElement('div');
  Object.assign(container.style, {
    maxWidth: '700px', margin: '60px auto', padding: '0 20px',
    fontFamily: 'Georgia, serif', fontSize: '20px', lineHeight: '1.6', color: '#222'
  });
  
  // 5. Coloca apenas o texto que você escolheu dentro dessa página nova
  container.appendChild(elementoEscolhido);
  document.body.appendChild(container);
  
  // Remove o evento para o código parar de rodar
  document.removeEventListener('click', focarElemento);
}, { once: true });
