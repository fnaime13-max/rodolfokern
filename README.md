# Site · Rodolfo Kern, Nutricionista

Site estático (HTML + CSS + JS puro, sem build e sem dependências). Conceito **"Modo ativado"**, tirado do manual de identidade: o toggle-maçã e a bateria que carrega.

## Estrutura
```
index.html          página única
css/styles.css      todo o visual (cores e fontes no topo, em :root)
js/config.js        DADOS EDITÁVEIS: WhatsApp, mensagem padrão, CRN, clínica
js/main.js          abertura, interruptor do hero, plano estratégico (quiz → WhatsApp), bateria, abas, carrossel
assets/img/         fotos (.webp) e og.jpg
assets/favicon.svg  ícone da aba
_originais/         material bruto (não publicar)
qa/                 scripts e prints de teste (não publicar)
```

## Como alterar
- **WhatsApp, CRN, clínica:** edite `js/config.js`. Todos os botões e o plano estratégico usam esse número.
- **Perguntas do plano estratégico:** cada pergunta é um `<fieldset class="quiz__etapa">` em `index.html` (seção `#plano`). `data-chave` é o rótulo que aparece na mensagem do WhatsApp.
- **Fotos:** troque o arquivo em `assets/img/` mantendo o **mesmo nome**. Se uma foto faltar, aparece um placeholder listrado com o nome e o tamanho esperados.
- **Redes sociais:** o Instagram aparece como link direto no `index.html` (procure `nutri_rodolfokern`).
- **Logo:** o símbolo é o `<symbol id="toggle">` no topo do `index.html`. As cores vêm de `--tg-pill` e `--tg-knob`.
- **Textos:** direto no `index.html`; cada seção está comentada.

**Depois de mudar CSS ou JS,** troque o `?v=20261026b` dos links no `index.html` por uma versão nova (ex.: `?v=20261102a`). Sem isso, o navegador mostra a versão antiga do cache.

## Escassez (vagas do mês)
Em `js/config.js`: `vagasRestantes: null` mostra "Vagas limitadas para novembro". Um número (ex.: `6`) mostra "Restam 6 vagas para novembro". A partir do dia `viraMesNoDia` (20), o mês exibido passa a ser o seguinte. Só use números reais.

## Estrutura de venda (inspirada no site do Nítio)
Barra de vagas → Hero → **Plano estratégico** (seção de maior destaque: selo "Passo 1", moldura verde brilhando e o aviso "Comece aqui") (quiz de 5 perguntas que envia as respostas para o WhatsApp) → Dores → Custo de continuar igual → Solução → O que está incluído + Para quem é / não é (modo espera × ativo) → Especialidades → Como funciona → Sobre → Dúvidas → CTA final. O WhatsApp fica fixo na tela o tempo todo.

## Interações
1. **Abertura:** a pílula carrega de 0 a 100%, um dedo liga o botão, as folhas brotam e o botão se abre no site.
2. **Hero:** foto inteira num quadro arredondado, com um cartão pequeno com nome e CRN.
3. **Bateria da página** (acima do WhatsApp): carrega de 5 em 5% com o scroll e chega a 100% no final.
4. **Plano estratégico:** uma barra e uma bateria carregam a cada resposta; no fim, um resumo e o botão "Enviar para o Rodolfo".
5. **Sem estratégia × Com acompanhamento** (comparação fixa), abas de especialidades e carrossel com bateria 20→100%.
6. Tudo respeita `prefers-reduced-motion`.

## Publicar
Suba a pasta inteira (menos `_originais/` e `qa/`) em qualquer hospedagem estática: GitHub Pages, Hostinger ou Cloudflare Pages. Não há comando de build. Para testar localmente: `python -m http.server` na pasta e abra `http://localhost:8000`.
