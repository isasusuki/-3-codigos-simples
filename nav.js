// 1. Carrega uma biblioteca física leve (Matter.js) direto no site
const script = document.createElement('script');
script.src = 'https://cloudflare.com';
document.head.appendChild(script);

script.onload = () => {
  // 2. Configura o motor de física do jogo
  const { Engine, World, Bodies, Composite, Mouse, MouseConstraint, Runner } = Matter;
  const engine = Engine.create();
  const runner = Runner.create();
  
  // Limita o tamanho da tela para nada fugir
  const largura = window.innerWidth;
  const altura = window.innerHeight;
  
  // Cria um chão invisível para as coisas baterem e não caírem infinitamente
  const chao = Bodies.rectangle(largura / 2, altura + 30, largura, 60, { isStatic: true });
  World.add(engine.world, chao);

  // 3. Captura todos os elementos visuais da página (títulos, imagens, botões)
  const elementos = document.querySelectorAll('h1, h2, p, img, button, a');
  
  elementos.forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.width < 10 || rect.height < 10) return; // Ignora coisas invisíveis

    // Transforma o elemento do site em um objeto físico pesado
    const objetoFisico = Bodies.rectangle(
      rect.left + rect.width / 2,
      rect.top + rect.height / 2,
      rect.width,
      rect.height,
      { restitution: 0.6, friction: 0.1 } // Dá um efeito meio elástico de borracha
    );

    World.add(engine.world, objetoFisico);

    // Faz o elemento visual seguir a posição do objeto físico a cada milissegundo
    el.style.position = 'fixed';
    el.style.zIndex = '99999';
    el.style.width = `${rect.width}px`;
    el.style.height = `${rect.height}px`;
    el.style.transformOrigin = 'center';

    function atualizarPosicao() {
      const { x, y } = objetoFisico.position;
      const angulo = objetoFisico.angle;
      el.style.left = `${x - rect.width / 2}px`;
      el.style.top = `${y - rect.height / 2}px`;
      el.style.transform = `rotate(${angulo}rad)`;
      requestAnimationFrame(atualizarPosicao);
    }
    atualizarPosicao();
  });

  // 4. Ativa o mouse para você poder clicar, arrastar e arremessar as coisas pela tela
  const mouse = Mouse.create(document.body);
  const mouseConstraint = MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: { stiffness: 0.2, render: { visible: false } }
  });
  World.add(engine.world, mouseConstraint);

  // Inicia o motor físico
  Runner.run(runner, engine);
  console.log("💥 Gravidade ativada! Divirta-se jogando tudo pro alto.");
};
