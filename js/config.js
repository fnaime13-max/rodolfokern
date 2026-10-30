/* Tudo que o Rodolfo pode querer trocar fica aqui. */
window.CONFIG = {
  nome: 'Rodolfo Kern',
  // Número que aparece num post do Instagram ("E eu sou: 31 973448826"). É para ele que vão os botões e o plano estratégico.
  whatsapp: '5531973448826',
  mensagem: 'Olá, Rodolfo! Vim pelo site e quero saber sobre os programas de acompanhamento.',
  instagram: 'nutri_rodolfokern',
  crn: 'CRN-9 36312',  // conforme a página da equipe do Nítio Mendes
  // Escassez real: deixe null para mostrar só "vagas limitadas". Coloque o número que ele realmente tem (ex.: 6)
  // para mostrar "Restam 6 vagas". A partir do dia indicado, o site já fala das vagas do mês seguinte.
  vagasRestantes: null,
  viraMesNoDia: 20
};

window.linkWA = function (msg) {
  return 'https://wa.me/' + CONFIG.whatsapp + '?text=' + encodeURIComponent(msg || CONFIG.mensagem);
};
