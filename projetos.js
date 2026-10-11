/*
  Projetos exibidos no site.
  - conceito: true  → projeto fictício criado para mostrar o trabalho (aparece com o selo "Projeto conceito")
  - Quando fechar um cliente de verdade, adicione aqui com conceito: false.
  - ramo: um dos grupos usados no diagnóstico (alimentacao, beleza, saude, pet, varejo, servicos)
  - servicos: site, identidade, gmn, midia
  - imagens (opcional): lista de caminhos, ex.: ['img/forno-1.webp'] — aparecem na galeria do projeto
  - link (opcional): endereço do site publicado
*/
window.PROJETOS = [
  {
    slug: 'forno-da-vila',
    nome: 'Forno da Vila',
    tipo: 'Padaria artesanal',
    ramo: 'alimentacao',
    conceito: true,
    servicos: ['identidade', 'site', 'midia'],
    resumo: 'Marca com cara de bairro e cheiro de pão quente: logo em selo, paleta de forno e um site com cardápio do dia e encomendas pelo WhatsApp.',
    cores: ['#7A2E1D', '#E9A23B', '#FFF4E0', '#2B1A12'],
    fonte: 'Fraunces',
    logo: `<svg viewBox="0 0 120 120" aria-hidden="true"><circle cx="60" cy="60" r="56" fill="#7A2E1D"/><circle cx="60" cy="60" r="47" fill="none" stroke="#E9A23B" stroke-width="2" stroke-dasharray="3 5"/><path d="M34 66c0-14 12-24 26-24s26 10 26 24v6H34z" fill="#E9A23B"/><path d="M44 58c4-4 8-4 12 0M58 54c4-4 8-4 12 0" stroke="#7A2E1D" stroke-width="3" fill="none" stroke-linecap="round"/><text x="60" y="92" text-anchor="middle" font-family="Georgia,serif" font-size="8.5" font-weight="700" fill="#FFF4E0" letter-spacing=".6">FORNO DA VILA</text></svg>`,
  },
  {
    slug: 'brasa-burger',
    nome: 'Brasa Burger',
    tipo: 'Hamburgueria',
    ramo: 'alimentacao',
    conceito: true,
    servicos: ['midia', 'identidade', 'gmn'],
    resumo: 'Identidade de fogo e chapa, fotos de lanches geradas com IA no padrão de estúdio e perfil do Google completo para aparecer em "hambúrguer perto de mim".',
    cores: ['#D62828', '#FCBF49', '#1D1D1D', '#FFF8EC'],
    fonte: 'Anton',
    logo: `<svg viewBox="0 0 120 120" aria-hidden="true"><rect width="120" height="120" rx="22" fill="#1D1D1D"/><path d="M60 22c10 14-6 18 4 30 6-6 6-12 4-18 12 10 16 26 6 38-8 10-28 10-34-2-6-12 4-22 8-26 0 8 4 12 8 12-6-12 2-24 4-34z" fill="#D62828"/><path d="M60 52c4 6-2 10 2 16 6-4 6-10 2-16 8 6 8 18 0 22-6 3-14 0-14-8 0-6 6-10 10-14z" fill="#FCBF49"/><text x="60" y="104" text-anchor="middle" font-family="Impact,Arial Black,sans-serif" font-size="17" fill="#FFF8EC" letter-spacing="1">BRASA</text></svg>`,
  },
  {
    slug: 'navalha-co',
    nome: 'Navalha & Co.',
    tipo: 'Barbearia',
    ramo: 'beleza',
    conceito: true,
    servicos: ['identidade', 'site', 'gmn'],
    resumo: 'Visual clássico e firme, site com agendamento em dois toques e um perfil do Google que transforma cada corte em avaliação.',
    cores: ['#1F2A2E', '#C89B3C', '#EDE6DA', '#8C2F2F'],
    fonte: 'Playfair Display',
    logo: `<svg viewBox="0 0 120 120" aria-hidden="true"><rect width="120" height="120" rx="60" fill="#1F2A2E"/><circle cx="60" cy="60" r="50" fill="none" stroke="#C89B3C" stroke-width="1.5"/><path d="M38 46l44 28M82 46L38 74" stroke="#C89B3C" stroke-width="5" stroke-linecap="round"/><circle cx="38" cy="46" r="5" fill="#EDE6DA"/><circle cx="82" cy="46" r="5" fill="#EDE6DA"/><text x="60" y="98" text-anchor="middle" font-family="Georgia,serif" font-size="10" font-style="italic" fill="#EDE6DA" letter-spacing="1">Navalha &amp; Co.</text></svg>`,
  },
  {
    slug: 'patas-felizes',
    nome: 'Patas Felizes',
    tipo: 'Pet shop',
    ramo: 'pet',
    conceito: true,
    servicos: ['identidade', 'midia', 'gmn'],
    resumo: 'Marca alegre que os tutores reconhecem de longe, fotos de produtos e de banho e tosa feitas com IA, e Google com horários e serviços em dia.',
    cores: ['#2A9D8F', '#F4A261', '#FFF7EE', '#264653'],
    fonte: 'Baloo 2',
    logo: `<svg viewBox="0 0 120 120" aria-hidden="true"><rect width="120" height="120" rx="30" fill="#2A9D8F"/><ellipse cx="60" cy="70" rx="18" ry="15" fill="#FFF7EE"/><ellipse cx="38" cy="50" rx="8" ry="10" fill="#F4A261"/><ellipse cx="52" cy="38" rx="8" ry="10" fill="#F4A261"/><ellipse cx="68" cy="38" rx="8" ry="10" fill="#F4A261"/><ellipse cx="82" cy="50" rx="8" ry="10" fill="#F4A261"/><text x="60" y="106" text-anchor="middle" font-family="Trebuchet MS,sans-serif" font-size="12" font-weight="700" fill="#FFF7EE">patas felizes</text></svg>`,
  },
  {
    slug: 'sorriso-leve',
    nome: 'Sorriso Leve',
    tipo: 'Clínica odontológica',
    ramo: 'saude',
    conceito: true,
    servicos: ['site', 'gmn', 'identidade'],
    resumo: 'Site que passa confiança logo na primeira tela, com tratamentos explicados sem jargão, e perfil do Google pensado para quem procura dentista no bairro.',
    cores: ['#0B6E99', '#9ED8DB', '#F4FAFB', '#0A2F44'],
    fonte: 'Manrope',
    logo: `<svg viewBox="0 0 120 120" aria-hidden="true"><rect width="120" height="120" rx="26" fill="#F4FAFB"/><path d="M40 40c6-6 14-4 20 0 6-4 14-6 20 0 6 8 2 20-2 30-3 10-4 18-8 18s-4-12-10-12-6 12-10 12-5-8-8-18c-4-10-8-22-2-30z" fill="#0B6E99"/><path d="M44 50c8 8 24 8 32 0" stroke="#9ED8DB" stroke-width="4" fill="none" stroke-linecap="round"/><text x="60" y="108" text-anchor="middle" font-family="Arial,sans-serif" font-size="11" font-weight="700" fill="#0A2F44">sorriso leve</text></svg>`,
  },
  {
    slug: 'atelie-lina',
    nome: 'Ateliê Lina',
    tipo: 'Loja de roupas',
    ramo: 'varejo',
    conceito: true,
    servicos: ['site', 'midia', 'identidade'],
    resumo: 'Vitrine online com catálogo e pedido pelo WhatsApp, fotos de peças e vídeos curtos com IA para o Instagram, e uma marca delicada que combina com a loja.',
    cores: ['#6D597A', '#E8D5C4', '#FBF7F3', '#B56576'],
    fonte: 'Cormorant',
    logo: `<svg viewBox="0 0 120 120" aria-hidden="true"><rect width="120" height="120" rx="8" fill="#FBF7F3"/><rect x="10" y="10" width="100" height="100" rx="4" fill="none" stroke="#6D597A" stroke-width="1"/><text x="60" y="66" text-anchor="middle" font-family="Georgia,serif" font-size="30" font-style="italic" fill="#6D597A">Lina</text><text x="60" y="84" text-anchor="middle" font-family="Georgia,serif" font-size="8" fill="#B56576" letter-spacing="3">ATELIÊ</text></svg>`,
  },
]
