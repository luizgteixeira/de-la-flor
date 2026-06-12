# Site De La Flor

Site institucional da **De La Flor**, marca de alfajores e lembranças personalizadas com identidade peruana e produção local em Belo Horizonte.

O projeto é um site estático em **HTML, CSS e JavaScript puro**, sem framework ou empacotador. A arquitetura prioriza simplicidade, desempenho e compatibilidade com hospedagens estáticas.

## Objetivo

Apresentar a De La Flor, seus serviços para eventos, produtos para compra online, depoimentos e canais de contato diretos via WhatsApp e e-mail.

A página inicial atual inclui:

- banner principal com chamada para compra;
- sessão de eventos e serviços;
- histórico da marca;
- galeria de fotos;
- vitrine de produtos;
- depoimentos de clientes;
- formulário de contato;
- rodapé com informações e créditos.

## Melhorias aplicadas

- SEO básico com `title`, `description`, `canonical`, Open Graph e Twitter Cards.
- Acessibilidade reforçada em formulários com labels ocultos e `aria-hidden` em elementos decorativos.
- Carregamento assíncrono de CSS não crítico para reduzir bloqueio de renderização.
- Substituição do Font Awesome por ícones SVG inline no formulário.
- Uso de `font-display: swap` nas fontes carregadas.

## Estrutura do projeto

```text
.
├── index.html
├── robots.txt
├── sitemap.xml
├── README.md
├── css/
│   ├── cabecalho.css
│   ├── compra-on-line.css
│   ├── depoimentos.css
│   ├── ficamos.css
│   ├── formulario.css
│   ├── fotos.css
│   ├── nossa-historia.css
│   ├── principal.css
│   ├── reset.css
│   ├── responsivo.css
│   ├── rodape.css
│   ├── secoes.css
│   ├── tipografia.css
│   └── variaveis.css
├── js/
│   ├── navegacao.js
│   └── dados/
│       ├── compre-on-line.js
│       ├── depoimentos.js
│       ├── eventos.js
│       └── hero.js
├── fontes/
└── imagens/
    ├── banner-principal/
    ├── banners/
    ├── galeria/
    │   ├── compre-on-line/
    │   ├── depoimentos/
    │   ├── eventos/
    │   ├── ficamos-felizes/
    │   ├── fotos/
    │   ├── nossa-historia/
    │   └── rodape/
    └── logo/
```

## Como testar

1. Abra `index.html` em um navegador moderno.
2. Ou use um servidor estático local, por exemplo:

```bash
# no Windows com Python 3
python -m http.server 8000
```

1. Acesse `http://localhost:8000`.

## Notas de publicação

- O site está preparado para hospedagem estática.
- Preserve a hierarquia de imagens e CSS ao mover o projeto.
- Caso adicione novas fontes, confirme licenças antes de publicar.

## Links oficiais

- Instagram: <https://www.instagram.com/alfajordelaflor/>
- WhatsApp: <https://wa.me/message/VJUYK3MDBN3VM1/>
- Crédito de layout/design: <https://www.instagram.com/estudiofablo/>
- Crédito de WebDesign/Programação: <https://luizgustavodev.com/>

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
