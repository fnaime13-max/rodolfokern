# Pendências · Site Rodolfo Kern

## Dados profissionais (não inventados: o site esconde o campo enquanto estiver vazio)
- [ ] **CRN-9 36312**: tirado da página da equipe do site do Nítio Mendes. Confirmar com ele.
- [ ] **Cidade / endereço** da Clínica Cardim Santana. O DDD 31 sugere Grande BH, mas isso é **inferência**, e o site ainda não mostra a cidade.
- [ ] **WhatsApp 5531973448826**: tirado de um post do Instagram. **Todos os botões e o plano estratégico mandam para esse número.** Confirmar que é o de atendimento.
- [ ] **Formação** (faculdade e ano) e especializações, se ele quiser exibir. Hoje o site não fala de formação.
- [ ] **Domínio** definitivo. Canonical, OG, sitemap e robots usam `https://rodolfokern.felixdias.com/` como provisório.

## Textos para aprovação
- [ ] **"+1000 vidas transformadas"**: está na bio e no manual. Pela Resolução CFN 856/2026 (publicidade), números de pacientes e "transformação" pedem cautela. Confirmar com ele se mantém.
- [ ] **"Treino e corrida fazem parte da minha rotina"** no Sobre: é **inferência** feita a partir dos posts de academia e corrida. Confirmar.
- [ ] **Eventos** (Longevity Revolution, Vitafor Science Summit, VIII Congresso de Saúde Funcional Integrativa): os nomes foram lidos nas fotos dos posts. Confirmar a participação e se ele quer exibir.
- [ ] **Dúvidas (FAQ)**: só "Posso comer à noite…" vem do manual. As outras respostas descrevem o processo (presencial/on-line, refeição flexível, canetas com prescrição médica, valores no WhatsApp). Validar com ele.
- [ ] **Dores** ("Você já começou de novo quantas vezes?"): escritas a partir dos temas dos posts dele. Validar.
- [ ] **Plano estratégico**: as perguntas seguem o formulário do Respondi (objetivo, outros profissionais, profissão), mais "o que te trava" e "presencial ou on-line". O telefone não é perguntado, porque a pessoa já chega pelo WhatsApp.
- [ ] **Painel Mounjaro**: o texto deixa claro que a prescrição é médica. Validar o tom com ele.
- [ ] **Como funciona**: os passos (formulário → consulta → plano) são genéricos. Confirmar a frequência de retornos e o tempo de acompanhamento, se ele quiser detalhar.

## Textos de venda (v4): confirmar com o Rodolfo antes de publicar
- [ ] **Escassez:** o site diz "vagas limitadas para [mês]" e "atendo um número limitado de pessoas por mês". Confirmar que é verdade. Se ele tiver um número real, preencher `vagasRestantes` em `js/config.js` (ex.: 6) e o site passa a mostrar "Restam 6 vagas". **Nunca colocar um número inventado.** O mês vira sozinho a partir do dia 20 (`viraMesNoDia`).
- [ ] **"O que está incluído"** (6 itens): consulta completa, plano personalizado, proteína e treino, ajustes, suplementação e manutenção. São itens típicos de acompanhamento, **não confirmados**. Ajustar à oferta real dele: retornos, app, suporte por WhatsApp, duração.
- [ ] **Preço:** o site diz que os valores são apresentados depois da aplicação. Pela Res. CFN 856/2026, divulgar preço é permitido, mas promoção e desconto são proibidos. Nunca usar "desconto", "oferta" ou "condição especial".
- [ ] **"Garantir prioridade no próximo horário"** (FAQ): confirmar que ele responde as aplicações por ordem de chegada.

## Fotos
Todas vieram do PDF do Instagram (`_originais/insta/`). Versões em alta substituem sem mexer no código: basta usar o **mesmo nome de arquivo** em `assets/img/`.

| Arquivo | Tamanho | Proporção | Onde | Direção |
|---|---|---|---|---|
| `rodolfo-hero.webp` | 1000×1250 | 4:5 | Hero (quadro) e Sobre → eventos | Foto do congresso Lantana. Uma foto de estúdio em alta, sem logo de evento, ficaria melhor. |
| `rodolfo-sobre.webp` | 1100×1170 | ~1:1 | Sobre (grande) | Retrato descontraído, roupas em marinho/cinza |
| `clinica-cardim-santana.webp` | 800×1080 | 3:4 | Sobre (pequena) | Recepção ou consultório da clínica |
| `corrida.webp` | 800×620 | 4:3 | Especialidades → Corrida | Ele correndo |
| `congresso-longevity.webp`, `congresso-summit.webp` | 900×900 | 1:1 | Sobre → eventos | Fotos em eventos da área |
| `og.jpg` | 1200×630 | 1.91:1 | Compartilhamento (WhatsApp, redes) | Gerado a partir do hero |

## Integrações
- O formulário do Respondi **saiu do site**: o plano estratégico agora roda na própria página e envia as respostas para o WhatsApp.
- [ ] Google Analytics / Meta Pixel: não instalados. Decidir se entram.
