(() => {
  const raiz = document.documentElement;
  const prefixo = document.body.dataset.prefixo || '';
  document.querySelectorAll('[data-ano]').forEach(item => item.textContent = new Date().getFullYear());
  const cabecalho = document.querySelector('.cabecalho');
  const topo = document.querySelector('[data-voltar-topo]');
  const atualizarRolagem = () => {
    cabecalho?.classList.toggle('rolado', scrollY > 24);
    topo?.classList.toggle('visivel', scrollY > 500);
  };
  addEventListener('scroll', atualizarRolagem, {passive:true}); atualizarRolagem();
  topo?.addEventListener('click', () => scrollTo({top:0, behavior:'smooth'}));
  const observador = new IntersectionObserver(entradas => entradas.forEach(entrada => {
    if (entrada.isIntersecting) { entrada.target.classList.add('visivel'); observador.unobserve(entrada.target); }
  }), {threshold:.12});
  document.querySelectorAll('.revelar').forEach(item => observador.observe(item));
  document.querySelectorAll('[data-contador]').forEach(item => {
    const obs = new IntersectionObserver(([entrada]) => {
      if (!entrada.isIntersecting) return;
      const destino = Number(item.dataset.contador); const inicio = performance.now();
      const animar = agora => { const p = Math.min((agora-inicio)/1200,1); item.textContent = Math.floor(destino*p); if(p<1) requestAnimationFrame(animar); else item.textContent = destino + (item.dataset.sufixo || ''); };
      requestAnimationFrame(animar); obs.disconnect();
    }); obs.observe(item);
  });
  document.querySelectorAll('.acordeao__botao').forEach(botao => botao.addEventListener('click', () => {
    const aberto = botao.getAttribute('aria-expanded') === 'true';
    botao.closest('.acordeao').querySelectorAll('.acordeao__botao').forEach(b => b.setAttribute('aria-expanded','false'));
    botao.setAttribute('aria-expanded', String(!aberto));
  }));
  window.Serliv = {
    prefixo,
    notificar(mensagem) { let area=document.querySelector('.toast-container'); if(!area){area=document.createElement('div');area.className='toast-container';area.setAttribute('aria-live','polite');document.body.append(area)} const toast=document.createElement('div');toast.className='toast';toast.textContent=mensagem;area.append(toast);setTimeout(()=>toast.remove(),3500); },
    escape(texto='') { const el=document.createElement('span');el.textContent=texto;return el.innerHTML; }
  };
})();
