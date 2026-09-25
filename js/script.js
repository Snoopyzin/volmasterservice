/* =========================================================
   Volmaster Service — interações
   ========================================================= */
(() => {
  const WHATSAPP = '5562984930079';
  const MENSAGEM_PADRAO = 'Olá! Vim pelo site da Volmaster Service.';

  const $ = (seletor, raiz = document) => raiz.querySelector(seletor);
  const $$ = (seletor, raiz = document) => [...raiz.querySelectorAll(seletor)];

  /* ---------- Links de WhatsApp ---------- */
  $$('[data-whatsapp]').forEach((el) => {
    const texto = el.dataset.whatsapp || MENSAGEM_PADRAO;
    el.href = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(texto)}`;
    el.target = '_blank';
    el.rel = 'noopener';
  });

  /* ---------- Cabeçalho ganha borda ao rolar ---------- */
  const topo = $('#topo');
  const aoRolar = () => topo.classList.toggle('topo--rolado', window.scrollY > 8);
  aoRolar();
  window.addEventListener('scroll', aoRolar, { passive: true });

  /* ---------- Menu mobile ---------- */
  const botaoMenu = $('.topo__menu');
  const nav = $('#nav');
  const alternaMenu = (abrir) => {
    nav.classList.toggle('aberto', abrir);
    botaoMenu.setAttribute('aria-expanded', String(abrir));
  };
  botaoMenu.addEventListener('click', () => alternaMenu(!nav.classList.contains('aberto')));
  nav.addEventListener('click', (e) => { if (e.target.closest('a')) alternaMenu(false); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') alternaMenu(false); });

  /* ---------- Dinamômetro: troca de stage ---------- */
  const STAGES = [
    { nome: 'Original', desc: 'Mapa de fábrica, do jeito que o veículo saiu da montadora.', curva: 'M30 182 C 90 160, 150 110, 220 96 S 330 92, 390 110' },
    { nome: 'Stage 1', desc: 'Só software. Mais potência e torque com o hardware original.', curva: 'M30 180 C 90 150, 150 90, 220 72 S 330 66, 390 86' },
    { nome: 'Stage 2', desc: 'Mapa + upgrades como downpipe e escapamento. Mais fluxo, mais ganho.', curva: 'M30 178 C 90 140, 150 72, 220 52 S 330 44, 390 66' },
    { nome: 'Stage 3', desc: 'Projeto completo, com arquivo desenvolvido para o conjunto de peças.', curva: 'M30 176 C 90 128, 150 52, 220 32 S 330 22, 390 44' },
  ];
  const dino = $('.dino');
  const mapa = $('#dino-mapa');
  const botoesStage = $$('[data-stage]');

  function mostraStage(i) {
    const s = STAGES[i];
    mapa.setAttribute('d', s.curva);
    mapa.style.d = `path("${s.curva}")`;
    dino.classList.toggle('dino--original', i === 0);
    $('#dino-nome').textContent = s.nome;
    $('#dino-desc').textContent = s.desc;
    botoesStage.forEach((b) => b.setAttribute('aria-pressed', String(Number(b.dataset.stage) === i)));
  }
  botoesStage.forEach((b) => b.addEventListener('click', () => mostraStage(Number(b.dataset.stage))));

  /* ---------- Ano no rodapé ---------- */
  $('#ano').textContent = new Date().getFullYear();
})();
