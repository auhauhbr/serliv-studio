(() => {
  const botao = document.querySelector('[data-tema]');
  const chave = 'serliv-tema';
  const ler = () => { try { return localStorage.getItem(chave); } catch (erro) { return null; } };
  const lerAba = () => window.name.startsWith('serliv-tema:') ? window.name.split(':')[1] : null;
  const aplicar = tema => {
    const escuro = tema === 'escuro';
    document.documentElement.dataset.tema = escuro ? 'escuro' : 'claro';
    botao?.setAttribute('aria-label', escuro ? 'Ativar tema claro' : 'Ativar tema escuro');
    if (botao) botao.textContent = escuro ? '☀' : '◐';
  };
  const salvar = tema => {
    try { localStorage.setItem(chave, tema); } catch (erro) { /* window.name mantém o tema em file:// */ }
    window.name = `serliv-tema:${tema}`;
  };
  const temaDaUrl = new URLSearchParams(location.search).get('tema');
  const inicial = ['claro', 'escuro'].includes(temaDaUrl) ? temaDaUrl : ler() || lerAba() || 'claro';
  aplicar(inicial);
  salvar(inicial);
  botao?.addEventListener('click', () => {
    const novo = document.documentElement.dataset.tema === 'escuro' ? 'claro' : 'escuro';
    aplicar(novo); salvar(novo);
  });
  addEventListener('storage', evento => { if (evento.key === chave && evento.newValue) aplicar(evento.newValue); });
  document.querySelectorAll('a[href]').forEach(link => link.addEventListener('click', () => {
    const destino = link.getAttribute('href');
    if (!destino || destino.startsWith('#') || destino.startsWith('mailto:') || destino.startsWith('tel:')) return;
    try {
      const url = new URL(destino, location.href);
      if (url.origin === location.origin || location.protocol === 'file:') {
        url.searchParams.set('tema', document.documentElement.dataset.tema);
        link.href = url.href;
      }
    } catch (erro) { /* mantém o link original */ }
  }));
})();
