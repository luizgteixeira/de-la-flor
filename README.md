# Site De La Flor

Site institucional e comercial da **De La Flor**, marca de alfajores e lembranças personalizadas criada a partir de uma receita de família peruana, hoje conduzida por Magáli De La Flor e Andrés.

O projeto está organizado como um site estático em **HTML, CSS e JavaScript puro**, sem framework. A estrutura foi pensada para preservar simplicidade, facilitar manutenção e permitir publicação em hospedagens estáticas.

## Objetivo

Apresentar a história da De La Flor, divulgar serviços para eventos e encomendas, destacar produtos, reunir fotos, depoimentos e canais oficiais de contato.

Estrutura sugerida para a página inicial:

- Banner principal;
- chamada para alfajores e encomendas;
- Nossa História;
- Serviços / Momentos especiais;
- Produtos / Loja;
- Depoimentos;
- Instagram;
- WhatsApp / Encomendas;
- rodapé com crédito de layout/design.

## Estrutura do projeto

```text
.
├── index.html
├── robots.txt
├── favicon.ico
├── README.md
├── css/
│   ├── reset.css
│   ├── variaveis.css
│   ├── tipografia.css
│   ├── globais.css
│   ├── cabecalho.css
│   ├── secoes.css
│   ├── formulario.css
│   ├── rodape.css
│   ├── responsivo.css
│   └── principal.css
├── js/
│   ├── main.js
│   ├── navegacao.js
│   ├── carrosseis.js
│   ├── formulario-contato.js
│   ├── whatsapp.js
│   └── dados/
│       ├── campos-contato.js
│       ├── depoimentos.js
│       ├── galeria.js
│       ├── links.js
│       ├── produtos.js
│       └── servicos.js
├── fontes/
└── imagens/
    ├── banner-principal/
    ├── banners/
    ├── depoimentos/
    ├── galeria/
    ├── historia/
    ├── logo/
    ├── produtos/
    └── servicos/
```

## Conteúdo disponível

O briefing do projeto indica os seguintes materiais:

- pasta principal do Google Drive do projeto;
- textos institucionais em `TextosSeções`;
- layout base em `Layout_SiteDeLaFlor`;
- paleta oficial extraída do Adobe Color;
- fontes usadas no layout;
- links oficiais de Instagram, WhatsApp e crédito de layout;
- fotos de história, galeria, banner principal e serviços já organizadas no projeto local.

### Links oficiais

- Instagram: `https://www.instagram.com/alfajordelaflor/`
- WhatsApp: `https://wa.me/message/VJUYK3MDBN3VM1`
- Crédito de layout/design: `https://www.instagram.com/estudiofablo/`

Observação importante: o briefing orienta **nunca usar o Instagram antigo**.

## Identidade visual

Paleta oficial de referência:

| Nome | HEX | Uso sugerido |

|---|---:|---|
| Verde oliva escuro | `#4F5902` | detalhes naturais, ícones e apoios visuais |
| Laranja intenso | `#F27405` | CTAs, compra, orçamento e ações importantes |
| Rosa claro / nude | `#F2C7BD` | fundos suaves, cards e áreas delicadas |
| Coral rosado | `#F27272` | destaques, botões secundários e chamadas visuais |
| Vinho / marsala | `#8C4949` | identidade principal, títulos e rodapé |
| Cinza claro | `#F2F2F2` | fundos neutros, formulários e separadores |
| Off-white rosado | `#F1EAEA` | fundo geral, cards e blocos claros |

Variáveis funcionais sugeridas:

```css
:root {
  --color-primary: #8C4949;
  --color-secondary: #F27272;
  --color-accent: #F27405;
  --color-support: #4F5902;

  --color-background: #F1EAEA;
  --color-background-light: #F2F2F2;
  --color-surface: #F2C7BD;

  --color-text: #8C4949;
  --color-text-dark: #4F5902;
  --color-text-inverse: #FFFFFF;
}
```

Use o laranja com moderação, principalmente em ações como comprar, enviar e solicitar orçamento. O vinho/marsala deve funcionar como cor principal da identidade.

## Fontes

Fontes citadas no relatório do layout:

- Lato Regular;
- Lato Bold;
- Myriad Pro;
- Tenor Sans.

A pasta de layout no Drive contém arquivos de fonte associados ao projeto. Antes de publicar, distribuir ou embutir fontes no site, confirme as licenças de uso. Não compartilhe arquivos de fonte fora do ambiente autorizado do projeto.

## Textos base

### Nossa História

A De La Flor nasceu de uma receita de família, passada de mãe para filha, e de uma tradição que atravessou fronteiras. A história começou com Olga De La Flor, peruana que trouxe para Belo Horizonte os sabores e memórias de sua terra natal, entre eles o alfajor peruano.

Anos depois, Magáli De La Flor transformou esse legado em negócio, mantendo viva a receita original e o carinho de cada preparo. Hoje, ao lado de Andrés, a marca une tradição peruana e afeto mineiro para criar alfajores que celebram encontros e tornam momentos especiais mais memoráveis.

Link citado para a matéria do Estado de Minas:

```text
https://www.em.com.br/degusta/2026/05/7416218-receitas-de-familia-se-transformam-em-produtos-com-historias-e-significados.html
```

### Serviços

Serviços descritos no briefing:

- Casamentos;
- 15 anos;
- Bodas;
- Nascimento e Batizado;
- Formatura;
- Datas Comemorativas;
- Eventos Corporativos;
- Lembranças Personalizadas;
- Ações de Branding.

Cada serviço deve ter, quando possível:

- título claro;
- descrição curta;
- imagem associada;
- CTA para orçamento ou WhatsApp.

### Depoimentos

O material atual parece ser um modelo de organização, não uma lista final de depoimentos. Para publicar, coletar:

- texto do depoimento;
- nome da pessoa;
- identificação, como cliente, cerimonial, noiva ou debutante;
- Instagram, quando autorizado;
- print ou evidência separada;
- confirmação de permissão de publicação.

## Imagens

Pastas locais de imagens já previstas:

- `imagens/banner-principal/`;
- `imagens/banners/`;
- `imagens/depoimentos/`;
- `imagens/galeria/`;
- `imagens/historia/`;
- `imagens/logo/`;
- `imagens/produtos/`;
- `imagens/servicos/`.

Recomendações:

- usar `.webp` para imagens finais do site quando possível;
- manter textos alternativos descritivos;
- separar versões desktop e mobile de banners;
- não apagar arquivos originais sem confirmação;
- revisar imagens ausentes antes da publicação.

## Desenvolvimento

Este projeto não depende de build, bundler ou instalação de pacotes. Para visualizar localmente, abra o `index.html` no navegador ou use uma extensão como Live Server no VS Code.

Validações manuais recomendadas:

- abrir a home no navegador;
- verificar responsividade em desktop, tablet e mobile;
- testar menu mobile aberto e fechado;
- testar links de Instagram, WhatsApp e créditos;
- testar formulário, campos obrigatórios, sucesso e erro;
- verificar console do navegador;
- revisar SEO básico: `title`, `meta description`, hierarquia de títulos e textos claros;
- confirmar contraste, foco por teclado, labels e textos alternativos.

## Pendências

Conteúdo:

- confirmar se as pastas de fotos e banners no Drive ainda estão vazias;
- adicionar fotos finais de produtos;
- adicionar fotos finais de serviços;
- coletar depoimentos reais;
- confirmar links oficiais;
- confirmar grafia de `Magáli`/`Magali` e `Andrés`;
- confirmar o uso do link da matéria do Estado de Minas.

Design:

- revisar o layout `Site_DeLaFlor_V1b` em JPG/PDF;
- abrir o `.ai` no Adobe Illustrator quando necessário;
- verificar licenças de fontes;
- exportar assets finais;
- definir versões mobile dos banners.

Desenvolvimento:

- preencher `index.html`;
- inserir dados em `js/dados/`;
- configurar formulário e estados visuais;
- validar links e CTAs;
- testar responsividade;
- revisar acessibilidade e SEO.

## Observações de segurança e manutenção

- Não expor dados sensíveis em HTML, JavaScript, comentários ou mensagens de erro.
- Não usar mensagens técnicas cruas para usuário final.
- Preservar nomes de arquivos, classes, IDs, âncoras e caminhos de imagens quando já estiverem em uso.
- Evitar dependências externas sem necessidade.
- Não fazer deploy ou alteração de hospedagem sem confirmação.
