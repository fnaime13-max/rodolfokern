(function () {
  var reduz = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* ---------- dados do CONFIG ---------- */
  $$('[data-wa]').forEach(function (a) { a.href = linkWA(); });
  if (CONFIG.crn) {
    $('[data-crn]').textContent = 'Nutricionista · ' + CONFIG.crn;
    $('[data-crn-curto]').textContent = CONFIG.crn;
    $('[data-crn-rodape]').textContent = 'Rodolfo Kern · Nutricionista · ' + CONFIG.crn;
  } else {
    $('[data-crn]').hidden = true;
    $('[data-crn-curto]').hidden = true;
    $('[data-crn-rodape]').textContent = 'Rodolfo Kern · Nutricionista';
  }

  /* ---------- agenda do mês (escassez sem número inventado) ---------- */
  var meses = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
  var hoje = new Date();
  var mes = meses[(hoje.getMonth() + (hoje.getDate() >= CONFIG.viraMesNoDia ? 1 : 0)) % 12];
  var vagas = CONFIG.vagasRestantes;
  var plural = function (n) { return n + (n === 1 ? ' vaga' : ' vagas'); };
  $$('[data-mes]').forEach(function (el) { el.textContent = mes; });
  $$('[data-vagas]').forEach(function (el) {
    el.textContent = vagas ? 'Restam ' + plural(vagas) + ' para ' + mes : 'Vagas limitadas para ' + mes;
  });
  $$('[data-vagas-curto]').forEach(function (el) {
    el.textContent = vagas ? 'Agenda de ' + mes + ' · restam ' + plural(vagas) : 'Agenda de ' + mes + ' · vagas limitadas';
  });

  /* ---------- abertura: o anel carrega até 100%, vira "meta batida" e se abre no site ---------- */
  var ab = $('#abertura'), pct = $('#pct'), rotulo = $('#rotulo'), ponto = $('#abPonto');
  var segs = $$('.abertura__seg span', ab);
  var acabou = false, pulou = false;

  function liberar() {
    if (acabou) return;
    acabou = true;
    ab.classList.add('fim');
    document.body.classList.remove('is-loading');
    document.body.classList.add('pronto');
    dispatchEvent(new Event('scroll'));
  }

  function carga(k) {
    ab.style.setProperty('--carga', k.toFixed(4));
    var ang = (-90 + 360 * k) * Math.PI / 180;
    ponto.setAttribute('cx', (60 + 38 * Math.cos(ang)).toFixed(2));
    ponto.setAttribute('cy', (60 + 38 * Math.sin(ang)).toFixed(2));
    pct.textContent = Math.round(k * 100);
    segs.forEach(function (s, i) { s.classList.toggle('on', k >= (i + 1) / segs.length - .001); });
  }

  function abrir() {
    var b = $('#abIcone').getBoundingClientRect();
    ab.style.setProperty('--mx', (b.left + b.width / 2) + 'px');
    ab.style.setProperty('--my', (b.top + b.height / 2) + 'px');
    var max = Math.hypot(innerWidth, innerHeight), ini = performance.now(), dur = 950;
    document.body.classList.add('pronto');
    (function passo(t) {
      var k = Math.min(1, (t - ini) / dur);
      var e = k < .5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2;
      ab.style.setProperty('--r', (e * max) + 'px');
      if (k < 1) requestAnimationFrame(passo); else liberar();
    })(ini);
  }

  function metaBatida() {
    carga(1);
    ab.classList.add('meta');
    rotulo.textContent = 'Meta batida · 100%';
    setTimeout(abrir, pulou ? 400 : 1000);
  }

  if (reduz) {
    liberar();
  } else {
    var ini = performance.now(), dur = 2400;
    (function contar(t) {
      if (pulou) return;
      var k = Math.min(1, (t - ini) / dur);
      carga(k < .5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2);
      if (k < 1) requestAnimationFrame(contar); else metaBatida();
    })(ini);
    ab.addEventListener('click', function () {
      if (pulou || ab.classList.contains('meta')) return;
      pulou = true; metaBatida();
    });
    addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !acabou && !pulou && !ab.classList.contains('meta')) { pulou = true; metaBatida(); }
    });
    setTimeout(liberar, 8000); // garantia
  }

  /* ---------- navegação ---------- */
  var nav = $('#nav'), burger = $('#burger'), menu = $('#menu');
  burger.addEventListener('click', function () {
    var aberto = burger.getAttribute('aria-expanded') !== 'true';
    burger.setAttribute('aria-expanded', aberto);
    burger.setAttribute('aria-label', aberto ? 'Fechar menu' : 'Abrir menu');
    nav.classList.toggle('aberto', aberto);
  });
  $$('a', menu).forEach(function (a) {
    a.addEventListener('click', function () { burger.setAttribute('aria-expanded', 'false'); nav.classList.remove('aberto'); });
  });
  addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && nav.classList.contains('aberto')) { burger.click(); burger.focus(); }
  });
  var linksMenu = $$('.nav__menu a:not(.nav__cta)');
  var secoes = linksMenu.map(function (a) { return $(a.getAttribute('href')); });

  /* ---------- anel de progresso da página ---------- */
  var prog = $('#progPagina'), progAnel = $('#progAnel'), progN = $('#progN'), fimPag = $('#agendar');
  var ultimo = -1;
  function rolagem() {
    var y = scrollY;
    nav.classList.toggle('rolou', y > 30);
    var atual = -1;
    secoes.forEach(function (s, i) { if (s && y + innerHeight * .4 >= s.offsetTop) atual = i; });
    linksMenu.forEach(function (a, i) { if (i === atual) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current'); });

    var n = Math.round(Math.max(0, Math.min(1, y / (fimPag.offsetTop - innerHeight * .4))) * 20) * 5;
    if (n !== ultimo) {
      ultimo = n;
      progAnel.style.setProperty('--p', n / 100);
      progN.textContent = n + '%';
      prog.setAttribute('aria-label', 'Página ' + n + '% carregada. Ir para o final');
      prog.classList.toggle('cheia', n === 100);
    }
    prog.classList.toggle('oculta', !acabou);
  }
  addEventListener('scroll', rolagem, { passive: true });
  addEventListener('resize', rolagem);
  rolagem();

  /* ---------- plano estratégico (aplicação → WhatsApp) ---------- */
  var quiz = $('#quiz'), etapas = $$('.quiz__etapa', quiz);
  var passoTxt = $('#quizPasso'), qSeg = $('#quizSeg');
  var voltar = $('#quizVoltar'), prox = $('#quizProx'), erro = $('#quizErro');
  var fim = $('#quizFim'), resumo = $('#quizResumo'), enviar = $('#quizEnviar');
  var atualQ = 0, total = etapas.length;
  qSeg.innerHTML = new Array(total + 1).join('<i></i>');
  var qSegs = $$('i', qSeg);

  function progresso(p) {
    qSegs.forEach(function (s, i) { s.classList.toggle('on', i < Math.round(p / 100 * total)); });
    qSeg.classList.toggle('cheia', p === 100);
  }

  function mostrar(i, focar) {
    atualQ = i;
    etapas.forEach(function (f, j) { f.hidden = j !== i; });
    passoTxt.textContent = Math.round(i / total * 100) + '% carregado · pergunta ' + (i + 1) + ' de ' + total;
    voltar.hidden = i === 0;
    prox.firstChild.textContent = i === total - 1 ? 'Finalizar aplicação ' : 'Continuar ';
    erro.textContent = '';
    progresso(Math.round(i / total * 100));
    if (focar) { var el = $('input', etapas[i]); if (el) el.focus({ preventScroll: true }); }
  }

  function respostas(f) {
    if (f.dataset.tipo === 'texto') return null;
    return $$('input:checked', f).map(function (i) { return i.value; });
  }

  function valida(i) {
    var f = etapas[i];
    if (f.dataset.tipo === 'texto') {
      var nome = $('[name="nome"]', f);
      if (!nome.value.trim()) { erro.textContent = 'Digite seu nome para eu saber com quem estou falando.'; nome.focus(); return false; }
      return true;
    }
    if (!respostas(f).length) { erro.textContent = 'Escolha pelo menos uma opção para continuar.'; return false; }
    return true;
  }

  function concluir() {
    var nome = $('[name="nome"]', quiz).value.trim();
    var profissao = $('[name="profissao"]', quiz).value.trim();
    var linhas = [], itens = [];
    etapas.forEach(function (f) {
      var r = respostas(f);
      if (!r) return;
      linhas.push('• ' + f.dataset.chave + ': ' + r.join(', '));
      itens.push([f.dataset.chave, r.join(', ')]);
    });
    if (profissao) { linhas.push('• Profissão: ' + profissao); itens.push(['Profissão', profissao]); }
    var msg = 'Olá, Rodolfo! Meu nome é ' + nome + ' e acabei de enviar minha aplicação pelo site para o acompanhamento.\n\n' + linhas.join('\n') + '\n\nQuero garantir minha vaga para ' + mes + '!';
    enviar.href = linkWA(msg);
    resumo.innerHTML = '';
    itens.forEach(function (it) {
      var li = document.createElement('li'), b = document.createElement('b');
      b.textContent = it[0]; li.appendChild(b); li.appendChild(document.createTextNode(it[1]));
      resumo.appendChild(li);
    });
    etapas.forEach(function (f) { f.hidden = true; });
    fim.hidden = false;
    quiz.classList.add('terminou');
    passoTxt.textContent = '100% carregado · aplicação completa';
    progresso(100);
    $('#quizFimT').focus({ preventScroll: true });
  }

  quiz.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!valida(atualQ)) return;
    if (atualQ < total - 1) mostrar(atualQ + 1, true); else concluir();
  });
  voltar.addEventListener('click', function () { if (atualQ > 0) mostrar(atualQ - 1, true); });
  $('#quizRefazer').addEventListener('click', function () {
    quiz.reset(); fim.hidden = true; quiz.classList.remove('terminou'); mostrar(0, true);
  });

  // escolha única avança sozinha; "Ainda não" desmarca as outras e vice-versa
  quiz.addEventListener('change', function (e) {
    var inp = e.target, f = inp.closest('.quiz__etapa');
    if (!f) return;
    erro.textContent = '';
    if (inp.type === 'checkbox' && inp.checked) {
      $$('input', f).forEach(function (o) {
        if (o !== inp && (inp.hasAttribute('data-exclusivo') || o.hasAttribute('data-exclusivo'))) o.checked = false;
      });
    }
    if (f.dataset.tipo === 'unico') setTimeout(function () { if (!f.hidden) quiz.requestSubmit(prox); }, 320);
  });

  mostrar(0, false);

  // botões "Garantir minha vaga": rolam até a aplicação; os dos programas já marcam o programa escolhido
  $$('[data-abre-plano]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      e.preventDefault();
      if (a.dataset.programa) {
        var r = $('input[name="programa"][value="' + a.dataset.programa + '"]', quiz);
        if (r) r.checked = true;
      }
      $('#plano').scrollIntoView({ behavior: reduz ? 'auto' : 'smooth', block: 'start' });
      setTimeout(function () { var el = $('input', etapas[atualQ]); if (el && !quiz.classList.contains('terminou')) el.focus({ preventScroll: true }); }, reduz ? 0 : 700);
    });
  });

  /* ---------- abas de especialidades ---------- */
  var abas = $$('.esp__abas [role="tab"]');
  function ativar(tab, foco) {
    abas.forEach(function (t) {
      var sel = t === tab;
      t.setAttribute('aria-selected', sel);
      t.tabIndex = sel ? 0 : -1;
      $('#' + t.getAttribute('aria-controls')).hidden = !sel;
    });
    if (foco) tab.focus();
  }
  abas.forEach(function (t, i) {
    t.addEventListener('click', function () { ativar(t); });
    t.addEventListener('keydown', function (e) {
      var j = { ArrowRight: i + 1, ArrowLeft: i - 1, Home: 0, End: abas.length - 1 }[e.key];
      if (j === undefined) return;
      e.preventDefault();
      ativar(abas[(j + abas.length) % abas.length], true);
    });
  });

  /* ---------- como funciona: carrossel com barra segmentada + anel ---------- */
  var trilho = $('#slides'), slides = $$('.slide', trilho);
  slides.forEach(function (s, i) {
    var n = +s.dataset.pct, segsHtml = '';
    for (var k = 0; k < slides.length; k++) segsHtml += '<i' + (k <= i ? ' class="on"' : '') + '></i>';
    s.insertAdjacentHTML('afterbegin', '<span class="seg slide__seg' + (n === 100 ? ' cheia' : '') + '" aria-hidden="true">' + segsHtml + '</span><p class="slide__pct">' + n + '% carregado</p>');
    s.insertAdjacentHTML('beforeend', '<span class="anel slide__anel" style="--p:0" aria-hidden="true"><svg viewBox="0 0 120 120"><circle cx="60" cy="60" r="50"/><circle cx="60" cy="60" r="50"/></svg></span>');
  });
  var obSlide = new IntersectionObserver(function (en) {
    en.forEach(function (e) {
      if (e.isIntersecting) $('.slide__anel', e.target).style.setProperty('--p', e.target.dataset.pct / 100);
    });
  }, { root: trilho, threshold: .6 });
  slides.forEach(function (s) { obSlide.observe(s); });

  var ant = $('#comoAnt'), seg = $('#comoProx');
  function passoSlide() { return slides[0].offsetWidth + 22; }
  function setas() {
    ant.disabled = trilho.scrollLeft < 8;
    seg.disabled = trilho.scrollLeft > trilho.scrollWidth - trilho.clientWidth - 8;
  }
  ant.addEventListener('click', function () { trilho.scrollBy({ left: -passoSlide(), behavior: 'smooth' }); });
  seg.addEventListener('click', function () { trilho.scrollBy({ left: passoSlide(), behavior: 'smooth' }); });
  trilho.addEventListener('scroll', setas, { passive: true });
  setas();

  // arrastar com o mouse, como no Instagram
  var arr = null;
  trilho.addEventListener('pointerdown', function (e) {
    if (e.pointerType !== 'mouse' || e.target.closest('a,button')) return;
    arr = { x: e.clientX, s: trilho.scrollLeft, moveu: false };
  });
  addEventListener('pointermove', function (e) {
    if (!arr) return;
    var dx = e.clientX - arr.x;
    if (Math.abs(dx) > 4) { arr.moveu = true; trilho.classList.add('arrastando'); }
    trilho.scrollLeft = arr.s - dx;
  });
  addEventListener('pointerup', function () {
    if (!arr) return;
    var moveu = arr.moveu; arr = null;
    trilho.classList.remove('arrastando');
    if (moveu) trilho.scrollTo({ left: Math.round(trilho.scrollLeft / passoSlide()) * passoSlide(), behavior: 'smooth' });
  });

  /* ---------- antes e depois: trilho com setas e arraste ---------- */
  (function () {
    var t = $('#adTrilho');
    if (!t) return;
    var a = $('#adAnt'), p = $('#adProx');
    var passo = function () { var c = $('.ad__card:not(.ad__card--destaque)', t); return c ? c.offsetWidth + 18 : 300; };
    var setasAd = function () {
      a.disabled = t.scrollLeft < 8;
      p.disabled = t.scrollLeft > t.scrollWidth - t.clientWidth - 8;
    };
    a.addEventListener('click', function () { t.scrollBy({ left: -passo(), behavior: 'smooth' }); });
    p.addEventListener('click', function () { t.scrollBy({ left: passo(), behavior: 'smooth' }); });
    t.addEventListener('scroll', setasAd, { passive: true });
    setasAd();
    var d = null;
    t.addEventListener('pointerdown', function (e) {
      if (e.pointerType !== 'mouse') return;
      d = { x: e.clientX, s: t.scrollLeft, moveu: false };
    });
    addEventListener('pointermove', function (e) {
      if (!d) return;
      var dx = e.clientX - d.x;
      if (Math.abs(dx) > 4) { d.moveu = true; t.classList.add('arrastando'); }
      t.scrollLeft = d.s - dx;
    });
    addEventListener('pointerup', function () {
      if (!d) return;
      d = null;
      t.classList.remove('arrastando');
    });
  })();

  /* ---------- revelar no scroll ---------- */
  if (!reduz && 'IntersectionObserver' in window) {
    var alvos = $$('.secao .titulo, .lead, .dor, .custo__grade li, .custo__virada, .modo__intro > *, .modo__lista, .incluso__lista li, .plano-card, .perfil__col, .esp__abas, .esp__paineis, .slides, .sobre__fotos, .sobre__txt > *, .duvidas__intro > *, .faq details, .final__grade > *');
    var obR = new IntersectionObserver(function (en) {
      en.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('visto'); obR.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -8% 0px' });
    alvos.forEach(function (el) { el.classList.add('revela'); obR.observe(el); });
  }
})();
