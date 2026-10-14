/* ToniDev (site novo): diagnóstico, resultado, projetos, menu, busca e animações */

const WHATSAPP = '5531972359811' // número que recebe os contatos (só dígitos, com 55 + DDD)

const RAMOS = {
  alimentacao: { label: 'Alimentação', exemplo: 'padaria, restaurante, lanchonete, doces', visual: true },
  beleza: { label: 'Beleza', exemplo: 'barbearia, salão, estética', visual: true },
  saude: { label: 'Saúde', exemplo: 'dentista, clínica, fisioterapia', visual: false },
  pet: { label: 'Pet', exemplo: 'pet shop, banho e tosa, veterinário', visual: true },
  varejo: { label: 'Moda e varejo', exemplo: 'roupas, ótica, presentes, decoração', visual: true },
  servicos: { label: 'Serviços', exemplo: 'oficina, academia, contabilidade, imobiliária', visual: false },
  outro: { label: 'Outro ramo', exemplo: 'me conta qual', visual: false },
}

const SERVICOS = {
  site: { nome: 'Site', curto: 'site' },
  identidade: { nome: 'Identidade visual', curto: 'identidade visual' },
  gmn: { nome: 'Google Meu Negócio', curto: 'Google Meu Negócio' },
  midia: { nome: 'Fotos e vídeos com IA', curto: 'fotos e vídeos com IA' },
}

const TEM = [
  { id: 'site', label: 'Site próprio', curto: 'site próprio', peso: 25 },
  { id: 'logo', label: 'Logo e cores definidas para a marca', curto: 'logo e cores definidas', peso: 20 },
  { id: 'google', label: 'Perfil no Google com fotos e avaliações', curto: 'perfil no Google com fotos e avaliações', peso: 25 },
  { id: 'instagram', label: 'Instagram ativo, com posts frequentes', curto: 'Instagram ativo', peso: 15 },
  { id: 'fotos', label: 'Fotos boas dos produtos ou do espaço', curto: 'fotos boas dos produtos', peso: 15 },
]

const DORES = [
  { id: 'encontram', label: 'Pouca gente me encontra na internet' },
  { id: 'concorrente', label: 'Perco cliente para o concorrente' },
  { id: 'amadora', label: 'Minha marca parece amadora' },
  { id: 'conteudo', label: 'Não tenho fotos e vídeos bons para postar' },
  { id: 'perguntas', label: 'Respondo as mesmas perguntas o dia todo no WhatsApp' },
  { id: 'instagram', label: 'Quero vender mais pelo Instagram' },
  { id: 'naosei', label: 'Não sei, quero uma opinião' },
]

// O que cada serviço entrega, adaptado ao ramo
const ENTREGA = {
  site: {
    alimentacao: 'Cardápio do dia, fotos dos produtos e encomendas direto no seu WhatsApp.',
    beleza: 'Serviços com preços, fotos do espaço e agendamento em dois toques.',
    saude: 'Tratamentos explicados sem jargão, localização e agendamento fácil.',
    pet: 'Banho, tosa e produtos com preços, e agendamento pelo WhatsApp.',
    varejo: 'Catálogo com as peças e pedido direto pelo WhatsApp.',
    servicos: 'Serviços bem explicados e pedido de orçamento em um clique.',
    outro: 'Tudo o que o cliente precisa saber e um botão direto para o seu WhatsApp.',
  },
  identidade: 'Logo, cores e fontes, mais o padrão para fachada, redes sociais e materiais. A marca passa a ser reconhecida.',
  gmn: 'Perfil completo com fotos, horários e serviços, e uma estratégia simples para ganhar avaliações e aparecer no mapa antes do concorrente.',
  midia: {
    alimentacao: 'Fotos dos pratos e produtos com cara de estúdio e vídeos curtos com movimento para o Instagram e o Google.',
    beleza: 'Imagens do espaço e dos resultados e vídeos curtos para os stories e o Google.',
    pet: 'Fotos de produtos e vídeos fofos e profissionais para as redes.',
    varejo: 'Fotos das peças como em catálogo e vídeos curtos para vender no Instagram.',
    padrao: 'Fotos e vídeos de produto feitos com IA, prontos para Instagram, Google e anúncios.',
  },
}

const POR_QUE = {
  site: 'Quem procura no Google decide em segundos. Com um site, você explica tudo e leva a pessoa para o WhatsApp sem depender só das redes.',
  identidade: 'Uma marca bem feita passa confiança antes de qualquer conversa e faz o cliente lembrar de você.',
  gmn: 'É a primeira coisa que aparece quando alguém busca o seu tipo de negócio no bairro.',
  midia: 'Foto boa vende. Com IA dá para ter imagens e vídeos de nível profissional sem sessão de fotos.',
}

// ---------------------------------------------------------------- estado

const ref = (() => {
  try {
    const c = new URLSearchParams(location.search).get('c')
    if (c) sessionStorage.setItem('ref', c)
    return c || sessionStorage.getItem('ref') || ''
  } catch {
    return ''
  }
})()

const st = { ramo: '', ramoOutro: '', tem: [], dores: [], nome: '', cidade: '' }
let passo = 0

// ---------------------------------------------------------------- utilidades

const $ = (s, el = document) => el.querySelector(s)
const $$ = (s, el = document) => [...el.querySelectorAll(s)]
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c])

function waLink(texto) {
  return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(texto)}`
}

// ---------------------------------------------------------------- diagnóstico

const PASSOS = [
  {
    titulo: 'Qual é o ramo do seu negócio?',
    ajuda: 'Assim eu mostro exemplos parecidos com o seu.',
    render: () => `
      <div class="opts opts--grid" role="radiogroup" aria-label="Ramo do negócio">
        ${Object.entries(RAMOS)
          .map(
            ([id, r]) => `<button type="button" class="opt" role="radio" aria-checked="${st.ramo === id}" data-ramo="${id}">
              <b>${r.label}</b><small>${r.exemplo}</small></button>`,
          )
          .join('')}
      </div>
      <label class="field ${st.ramo === 'outro' ? '' : 'is-hidden'}" id="ramo-outro">
        <span>Qual é o seu negócio?</span>
        <input type="text" value="${esc(st.ramoOutro)}" name="ramo-outro" autocomplete="off" placeholder="ex.: loja de material de construção…" maxlength="60" />
      </label>`,
    valido: () => !!st.ramo && (st.ramo !== 'outro' || st.ramoOutro.trim().length > 1),
  },
  {
    titulo: 'O que o seu negócio já tem hoje?',
    ajuda: 'Marque tudo o que já existe. Se ainda não tem nada, tudo bem: é por isso que estamos aqui.',
    render: () => `
      <div class="opts" role="group" aria-label="O que já tem">
        ${TEM.map((t) => `<button type="button" class="opt opt--check" aria-pressed="${st.tem.includes(t.id)}" data-tem="${t.id}"><b>${t.label}</b></button>`).join('')}
        <button type="button" class="opt opt--check opt--none" aria-pressed="${st.tem.length === 0 && st._nenhum === true}" data-tem="nenhum"><b>Nada disso ainda</b></button>
      </div>`,
    valido: () => st.tem.length > 0 || st._nenhum === true,
  },
  {
    titulo: 'O que mais incomoda hoje?',
    ajuda: 'Marque tudo o que fizer sentido.',
    render: () => `
      <div class="opts" role="group" aria-label="O que mais incomoda">
        ${DORES.map((d) => `<button type="button" class="opt opt--check" aria-pressed="${st.dores.includes(d.id)}" data-dor="${d.id}"><b>${d.label}</b></button>`).join('')}
      </div>`,
    valido: () => st.dores.length > 0,
  },
  {
    titulo: 'Para fechar: como se chama o seu negócio?',
    ajuda: 'É só para personalizar o seu resultado. Nada é enviado sem você clicar.',
    render: () => `
      <label class="field"><span>Nome do negócio</span>
        <input type="text" id="f-nome" value="${esc(st.nome)}" name="nome-do-negocio" placeholder="ex.: Padaria Pão Quente…" maxlength="60" autocomplete="organization" /></label>
      <label class="field"><span>Cidade <em>(opcional)</em></span>
        <input type="text" id="f-cidade" value="${esc(st.cidade)}" name="cidade" placeholder="ex.: Belo Horizonte…" maxlength="40" autocomplete="address-level2" /></label>`,
    valido: () => st.nome.trim().length > 1,
  },
]

const dlg = $('#quiz')

function abrirQuiz() {
  passo = 0
  desenharPasso()
  dlg.showModal()
}

function desenharPasso() {
  const p = PASSOS[passo]
  $('#quiz-steps').innerHTML = `
    <div class="quiz__step" key="${passo}">
      <h2 id="quiz-titulo" class="quiz__q">${p.titulo}</h2>
      <p class="quiz__help">${p.ajuda}</p>
      ${p.render()}
    </div>`
  $('#quiz-count').textContent = `${passo + 1} de ${PASSOS.length}`
  $('#quiz-bar').style.width = `${((passo + 1) / PASSOS.length) * 100}%`
  $('#quiz-voltar').style.visibility = passo === 0 ? 'hidden' : 'visible'
  $('#quiz-seguir').textContent = passo === PASSOS.length - 1 ? 'Ver meu resultado' : 'Continuar'
  atualizarBotao()
  const foco = $('#quiz-steps input:not([type=hidden])') ?? $('#quiz-steps .opt')
  if (passo === PASSOS.length - 1) foco?.focus()
}

function atualizarBotao() {
  $('#quiz-seguir').disabled = !PASSOS[passo].valido()
}

$('#quiz-steps').addEventListener('click', (e) => {
  const b = e.target.closest('.opt')
  if (!b) return
  if (b.dataset.ramo) {
    st.ramo = b.dataset.ramo
    $$('[data-ramo]').forEach((x) => x.setAttribute('aria-checked', String(x === b)))
    $('#ramo-outro').classList.toggle('is-hidden', st.ramo !== 'outro')
    if (st.ramo === 'outro') $('#ramo-outro input').focus()
    else setTimeout(seguir, 220) // escolha única: avança sozinho
  }
  if (b.dataset.tem) {
    const id = b.dataset.tem
    if (id === 'nenhum') {
      st.tem = []
      st._nenhum = true
    } else {
      st._nenhum = false
      st.tem = st.tem.includes(id) ? st.tem.filter((x) => x !== id) : [...st.tem, id]
    }
    $$('[data-tem]').forEach((x) =>
      x.setAttribute('aria-pressed', String(x.dataset.tem === 'nenhum' ? st._nenhum === true : st.tem.includes(x.dataset.tem))),
    )
  }
  if (b.dataset.dor) {
    const id = b.dataset.dor
    if (st.dores.includes(id)) st.dores = st.dores.filter((x) => x !== id)
    else st.dores = [...st.dores, id]
    $$('[data-dor]').forEach((x) => x.setAttribute('aria-pressed', String(st.dores.includes(x.dataset.dor))))
  }
  atualizarBotao()
})

$('#quiz-steps').addEventListener('input', (e) => {
  if (e.target.closest('#ramo-outro')) st.ramoOutro = e.target.value
  if (e.target.id === 'f-nome') st.nome = e.target.value
  if (e.target.id === 'f-cidade') st.cidade = e.target.value
  atualizarBotao()
})

$('#quiz-steps').addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && e.target.tagName === 'INPUT') {
    e.preventDefault()
    if (PASSOS[passo].valido()) seguir()
  }
})

function seguir() {
  if (!PASSOS[passo].valido()) return
  if (passo < PASSOS.length - 1) {
    passo++
    desenharPasso()
  } else {
    dlg.close()
    mostrarResultado()
  }
}

$('#quiz-seguir').addEventListener('click', seguir)
$('#quiz-voltar').addEventListener('click', () => {
  if (passo > 0) {
    passo--
    desenharPasso()
  }
})
$('[data-close]').addEventListener('click', () => dlg.close())
dlg.addEventListener('click', (e) => {
  if (e.target === dlg) dlg.close()
})
$$('[data-open-quiz]').forEach((b) => b.addEventListener('click', abrirQuiz))

// ---------------------------------------------------------------- cálculo

function calcular() {
  const nota = Math.max(5, TEM.filter((t) => st.tem.includes(t.id)).reduce((s, t) => s + t.peso, 0))
  const tem = (id) => st.tem.includes(id)
  const dor = (id) => st.dores.includes(id)
  const visual = RAMOS[st.ramo]?.visual

  const pontos = {
    site: (tem('site') ? 0 : 3) + (dor('encontram') ? 1 : 0) + (dor('concorrente') ? 1 : 0) + (dor('perguntas') ? 2 : 0),
    identidade: (tem('logo') ? 0 : 3) + (dor('amadora') ? 3 : 0) + (dor('instagram') ? 1 : 0),
    gmn: (tem('google') ? 0 : 3) + (dor('encontram') ? 2 : 0) + (dor('concorrente') ? 2 : 0),
    midia: (tem('fotos') ? 0 : 2) + (visual ? 1 : 0) + (dor('conteudo') ? 3 : 0) + (dor('instagram') ? 2 : 0) + (tem('instagram') && !tem('fotos') ? 1 : 0),
  }
  let recomendados = Object.entries(pontos)
    .filter(([, p]) => p >= 3)
    .sort((a, b) => b[1] - a[1])
    .map(([k]) => k)
    .slice(0, 3)
  if (!recomendados.length) recomendados = Object.entries(pontos).sort((a, b) => b[1] - a[1]).map(([k]) => k).slice(0, 2)

  const faltando = TEM.filter((t) => !st.tem.includes(t.id))
  return { nota, recomendados, faltando }
}

function faixa(n) {
  if (n < 40) return { titulo: 'Quase invisível na internet', texto: 'Quem ainda não conhece o seu negócio tem pouca chance de achar você. A boa notícia: é aqui que dá para crescer mais rápido.' }
  if (n < 70) return { titulo: 'Dá para crescer bastante', texto: 'Você já tem uma base. Faltam algumas peças para ser encontrado e escolhido antes do concorrente.' }
  return { titulo: 'Bem encaminhado', texto: 'Sua presença já é boa. Agora é lapidar o que existe para converter mais visitas em clientes.' }
}

// ---------------------------------------------------------------- resultado

function entregaDe(serv) {
  const e = ENTREGA[serv]
  if (typeof e === 'string') return e
  return e[st.ramo] ?? e.padrao ?? e.outro
}

function projetosPara(recomendados) {
  const lista = window.PROJETOS ?? []
  const pontua = (p) => (p.ramo === st.ramo ? 10 : 0) + p.servicos.filter((s) => recomendados.includes(s)).length
  return [...lista].sort((a, b) => pontua(b) - pontua(a)).slice(0, 3)
}

function mostrarResultado() {
  const { nota, recomendados, faltando } = calcular()
  const f = faixa(nota)
  const nome = st.nome.trim()
  const ramoTxt = st.ramo === 'outro' ? st.ramoOutro.trim() : RAMOS[st.ramo].label
  const projs = projetosPara(recomendados)
  const doRamo = projs.some((p) => p.ramo === st.ramo)

  const msg = [
    'Oi, Antonio! Fiz o diagnóstico no seu site.',
    '',
    `Negócio: ${nome} (${ramoTxt}${st.cidade.trim() ? `, ${st.cidade.trim()}` : ''})`,
    `Já tenho: ${st.tem.length ? TEM.filter((t) => st.tem.includes(t.id)).map((t) => t.curto).join(', ') : 'nada ainda'}`,
    `O que mais incomoda: ${DORES.filter((d) => st.dores.includes(d.id)).map((d) => d.label.toLowerCase()).join('; ')}`,
    `Tenho interesse em: ${recomendados.map((s) => SERVICOS[s].curto).join(', ')}`,
    `Nota de presença: ${nota}/100`,
    '',
    'Podemos marcar uma conversa?',
    ref ? `\nCódigo: #${ref}` : '',
  ]
    .join('\n')
    .trim()

  const el = $('#resultado')
  el.innerHTML = `
    <div class="wrap">
      <button type="button" class="link-back" id="voltar-site">Voltar ao site</button>

      <header class="result__head glass">
        <div class="result__dial">
          <svg viewBox="0 0 120 64" class="dial dial--big" role="img" aria-label="Nota ${nota} de 100">
            <path d="M10 60a50 50 0 0 1 100 0" class="dial__track" />
            <path d="M10 60a50 50 0 0 1 100 0" class="dial__fill dial__fill--anim" style="--p: ${nota / 100}" pathLength="1" />
          </svg>
          <div class="result__num"><b data-count="${nota}">0</b><span>/100</span></div>
          <p class="result__label">presença digital</p>
        </div>
        <div>
          <p class="result__kicker">Diagnóstico: ${esc(nome)}</p>
          <h2 id="resultado-titulo" class="result__title">${f.titulo}</h2>
          <p class="result__text">${f.texto}</p>
          ${
            faltando.length
              ? `<p class="result__missing"><b>O que está faltando:</b> ${faltando.map((t) => t.curto).join(', ')}.</p>`
              : ''
          }
          <p class="result__fine">A nota é uma estimativa feita a partir das suas respostas.</p>
        </div>
      </header>

      <section class="plan" aria-labelledby="plano-titulo">
        <h3 id="plano-titulo" class="h3">O que eu faria pelo seu negócio</h3>
        <ol class="plan__list">
          ${recomendados
            .map(
              (s, i) => `
            <li class="plan__item">
              <span class="plan__order">${i === 0 ? 'Primeiro' : i === 1 ? 'Depois' : 'Para completar'}</span>
              <h4>${SERVICOS[s].nome}</h4>
              <p class="plan__what">${entregaDe(s)}</p>
              <p class="plan__why">${POR_QUE[s]}</p>
            </li>`,
            )
            .join('')}
        </ol>
      </section>

      <section class="result__projects" aria-labelledby="proj-titulo">
        <h3 id="proj-titulo" class="h3">${doRamo ? 'Exemplos parecidos com o seu negócio' : 'Exemplos do que eu faço'}</h3>
        <p class="section__lead">Projetos conceito, criados para mostrar o resultado em negócios como o seu.</p>
        <div class="projects">${projs.map((p) => cartao(p, recomendados)).join('')}</div>
      </section>

      <section class="book">
        <div>
          <h3 class="h3">Vamos conversar sobre o seu negócio?</h3>
          <p>O botão abre o seu WhatsApp com o resumo do diagnóstico já escrito. Você revisa e envia, e eu respondo para marcarmos uma conversa de 15 minutos, sem compromisso.</p>
        </div>
        <div class="book__cta">
          <a class="btn btn--big btn--whats" href="${waLink(msg)}" target="_blank" rel="noopener">Agendar uma conversa no WhatsApp</a>
          <button type="button" class="btn btn--ghost" data-open-quiz-again>Refazer o diagnóstico</button>
        </div>
      </section>
    </div>`

  document.body.classList.add('showing-result')
  el.hidden = false
  window.scrollTo({ top: 0 })
  el.focus({ preventScroll: true })
  contar(el.querySelector('[data-count]'))

  $('#voltar-site').addEventListener('click', fecharResultado)
  el.querySelector('[data-open-quiz-again]').addEventListener('click', abrirQuiz)
}

function fecharResultado() {
  document.body.classList.remove('showing-result')
  $('#resultado').hidden = true
  window.scrollTo({ top: 0 })
}

function contar(b) {
  const alvo = Number(b.dataset.count)
  const t0 = performance.now()
  const passo = (t) => {
    const k = Math.min(1, (t - t0) / 1100)
    b.textContent = Math.round(alvo * (1 - Math.pow(1 - k, 3)))
    if (k < 1) requestAnimationFrame(passo)
  }
  requestAnimationFrame(passo)
}

// ---------------------------------------------------------------- projetos

function cartao(p, destaque = []) {
  const [c1, c2, c3] = p.cores
  return `
    <article class="project" style="--c1:${c1};--c2:${c2};--c3:${c3 ?? '#fff'}">
      <div class="project__board">
        <div class="project__logo">${p.logo}</div>
        <div class="project__mock" aria-hidden="true">
          <div class="mock__bar"><i></i><i></i><i></i></div>
          <div class="mock__hero"><span></span><span></span><em></em></div>
          <div class="mock__row"><i></i><i></i><i></i></div>
        </div>
        <ul class="project__palette" aria-label="Paleta de cores">
          ${p.cores.map((c) => `<li style="background:${c}" title="${c}"></li>`).join('')}
        </ul>
      </div>
      ${p.imagens?.length ? `<div class="project__gallery">${p.imagens.map((src) => `<img src="${src}" alt="${esc(p.nome)}" loading="lazy" />`).join('')}</div>` : ''}
      <div class="project__body">
        <div class="project__title">
          <h3>${esc(p.nome)}</h3>
          ${p.conceito ? '<span class="tag tag--concept">Projeto conceito</span>' : ''}
        </div>
        <p class="project__type">${esc(p.tipo)}</p>
        <p class="project__text">${esc(p.resumo)}</p>
        <ul class="project__services">
          ${p.servicos.map((s) => `<li class="${destaque.includes(s) ? 'is-match' : ''}">${SERVICOS[s].nome}</li>`).join('')}
        </ul>
        ${p.link ? `<a class="project__link" href="${p.link}" target="_blank" rel="noopener">Ver o site</a>` : ''}
      </div>
    </article>`
}

function desenharProjetos(filtro = '') {
  const lista = (window.PROJETOS ?? []).filter((p) => !filtro || p.ramo === filtro)
  $('#lista-projetos').innerHTML = lista.map((p) => cartao(p)).join('')
  $('#lista-projetos').scrollLeft = 0
}

function desenharFiltros() {
  const ramos = [...new Set((window.PROJETOS ?? []).map((p) => p.ramo))]
  const box = $('#filtros')
  box.innerHTML =
    `<button type="button" class="chip" aria-pressed="true" data-f="">Todos</button>` +
    ramos.map((r) => `<button type="button" class="chip" aria-pressed="false" data-f="${r}">${RAMOS[r]?.label ?? r}</button>`).join('')
  box.addEventListener('click', (e) => {
    const b = e.target.closest('[data-f]')
    if (!b) return
    $$('[data-f]', box).forEach((x) => x.setAttribute('aria-pressed', String(x === b)))
    desenharProjetos(b.dataset.f)
  })
}

// Links do menu fecham o resultado antes de rolar até a seção
document.addEventListener('click', (e) => {
  const a = e.target.closest('a[href^="#"]')
  if (a && document.body.classList.contains('showing-result')) fecharResultado()
})


// ---------------------------------------------------------------- site novo: menu, busca e animações

const calma = matchMedia('(prefers-reduced-motion: reduce)').matches

// Menu: a ilha vira menu de tela cheia no celular
const ilha = $('#ilha')
const hamburguer = $('#hamburguer')
const menuCheio = $('#menu-cheio')
function abrirMenu(sim) {
  ilha.classList.toggle('is-aberto', sim)
  hamburguer.setAttribute('aria-expanded', String(sim))
  hamburguer.setAttribute('aria-label', sim ? 'Fechar menu' : 'Abrir menu')
  document.body.style.overflow = sim ? 'hidden' : ''
  if (sim) {
    menuCheio.hidden = false
    void menuCheio.offsetWidth // garante que a animação de entrada aconteça
    menuCheio.classList.add('is-visivel')
  } else {
    menuCheio.classList.remove('is-visivel')
    setTimeout(() => { if (!ilha.classList.contains('is-aberto')) menuCheio.hidden = true }, 400)
  }
}
hamburguer.addEventListener('click', () => abrirMenu(!ilha.classList.contains('is-aberto')))
$$('#menu-cheio a, #menu-cheio button').forEach((el) => el.addEventListener('click', () => abrirMenu(false)))
document.addEventListener('keydown', (e) => e.key === 'Escape' && ilha.classList.contains('is-aberto') && abrirMenu(false))

// A busca na abertura: alguém digita, o resultado aparece e chega uma mensagem no WhatsApp
const EXEMPLOS = [
  { termo: 'padaria perto de mim', nome: 'Padaria Pão da Hora', tipo: 'Padaria', msg: 'Oi! Te achei no Google. Vocês fazem encomenda para sábado?' },
  { termo: 'personal trainer em BH', nome: 'Carla Mendes Personal', tipo: 'Personal trainer', msg: 'Oi, Carla! Vi seu perfil no Google. Ainda tem horário de manhã?' },
  { termo: 'fotógrafo de casamento', nome: 'Rafael Lima Fotografia', tipo: 'Fotógrafo', msg: 'Oi! Vi seu site e amei as fotos. Você tem data livre em março?' },
  { termo: 'barbearia aberta agora', nome: 'Barbearia do Zé', tipo: 'Barbearia', msg: 'Fala, Zé! Te achei no Google. Dá para cortar agora à tarde?' },
]
const termo = $('#g-termo')
const resultado = $('#g-resultado')
const notificacao = $('#notificacao')
const espera = (ms) => new Promise((r) => setTimeout(r, ms))
function mostrarExemplo(ex) {
  $('#g-nome').textContent = ex.nome
  $('#g-tipo').textContent = ex.tipo
  $('#g-inicial').textContent = ex.nome[0]
  $('#g-msg').textContent = ex.msg
}
async function rodarBusca() {
  if (calma) {
    mostrarExemplo(EXEMPLOS[0])
    termo.textContent = EXEMPLOS[0].termo
    resultado.classList.add('is-on')
    notificacao.classList.add('is-on')
    return
  }
  for (let i = 0; ; i = (i + 1) % EXEMPLOS.length) {
    const ex = EXEMPLOS[i]
    mostrarExemplo(ex)
    termo.textContent = ''
    for (const letra of ex.termo) {
      termo.textContent += letra
      await espera(55)
    }
    await espera(350)
    resultado.classList.add('is-on')
    await espera(1100)
    notificacao.classList.add('is-on')
    await espera(3200)
    notificacao.classList.remove('is-on')
    resultado.classList.remove('is-on')
    await espera(700)
  }
}
if (termo) setTimeout(rodarBusca, 900)

// Elementos aparecem ao entrar na tela, em sequência com os vizinhos
const vigia = new IntersectionObserver(
  (itens) => itens.forEach((it) => {
    if (!it.isIntersecting) return
    it.target.classList.add('is-in')
    vigia.unobserve(it.target)
  }),
  { rootMargin: '0px 0px -12% 0px' },
)
// a comparação se resolve quando entra na tela
const comparar = $('#comparar')
if (comparar) (calma ? comparar.classList.add('is-in') : vigia.observe(comparar))
$$('.revela').forEach((el) => {
  const irmaos = [...el.parentElement.children].filter((x) => x.classList.contains('revela'))
  el.style.setProperty('--i', irmaos.indexOf(el))
  if (calma) el.classList.add('is-in')
  else vigia.observe(el)
})

// A frase acende palavra por palavra conforme a rolagem
const frase = $('#frase')
if (frase) {
  const texto = frase.textContent.trim()
  const palavras = texto.split(/\s+/)
  frase.innerHTML = palavras.map((p, i) => `<span class="pal" style="--c:${(i / palavras.length).toFixed(3)}">${esc(p)}</span>`).join(' ')
  frase.setAttribute('aria-label', texto)
  let pedido = false
  const atualizar = () => {
    pedido = false
    const r = frase.getBoundingClientRect()
    const vh = innerHeight
    const p = Math.min(1, Math.max(0, (vh * 0.9 - r.top) / (r.height + vh * 0.35)))
    frase.style.setProperty('--p', calma ? 1 : p.toFixed(3))
  }
  addEventListener('scroll', () => { if (!pedido) (pedido = true), requestAnimationFrame(atualizar) }, { passive: true })
  atualizar()
}

// Menu flutuante vira vidro enquanto a pessoa rola para baixo; volta ao subir ou parar
{
  const ilha = $('#ilha')
  let ultimoY = scrollY
  let parou
  addEventListener('scroll', () => {
    const y = scrollY
    if (y > ultimoY + 2 && y > 40) ilha.classList.add('is-vidro')
    else if (y < ultimoY - 2) ilha.classList.remove('is-vidro')
    ultimoY = y
    clearTimeout(parou)
    parou = setTimeout(() => ilha.classList.remove('is-vidro'), 700)
  }, { passive: true })
}

// ---------------------------------------------------------------- início

desenharFiltros()
desenharProjetos()
$('#ano').textContent = new Date().getFullYear()
$$('.js-whats').forEach((a) => (a.href = waLink(`Oi, Antonio! Vi seu site e queria conversar sobre o meu negócio.${ref ? `\n\nCódigo: #${ref}` : ''}`)))
if (new URLSearchParams(location.search).has('diagnostico')) abrirQuiz()
