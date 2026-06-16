# De La Flor - Site Institucional

Site institucional da **De La Flor**, marca de alfajores peruanos, presentes afetivos e lembranças personalizadas para eventos, celebrações, ações de marca e compra online.

O projeto foi desenvolvido com **HTML, CSS e JavaScript puro**, sem framework, build ou dependências obrigatórias. A proposta é entregar uma experiência visual elegante, rápida, responsiva e simples de manter.

## Visão Geral

A página apresenta a marca, sua história familiar, opções para eventos, galeria de fotos, vitrine de produtos, depoimentos e canais diretos de contato.

Principais seções:

- **Home** com chamada principal e identidade visual da marca.
- **Menu/Eventos** com cards para casamento, 15 anos, batizado, formatura, datas comemorativas e primeira eucaristia.
- **Nossa História** com fotos e efeito parallax em telas maiores.
- **Fotos** com integração preparada para Instagram e fallback estático.
- **Compre Online** com vitrine/carrossel de produtos.
- **Depoimentos** com navegação por cards.
- **Contato** com formulário orientado para orçamento.
- **Faixa de atendimento** otimizada para leitura em smartphones.
- **Rodapé** com contatos, links oficiais e créditos.

## Tecnologias

- HTML5 semântico
- CSS3 modular por seção
- JavaScript puro
- Imagens otimizadas em `.webp` quando disponível
- JSON-LD para dados estruturados
- Endpoint serverless opcional para integração com Instagram

## Destaques Técnicos

- Layout responsivo para desktop, tablet e mobile.
- Menu mobile controlado por JavaScript.
- Efeito parallax com `requestAnimationFrame`.
- Respeito a `prefers-reduced-motion`.
- CSS não crítico carregado de forma assíncrona.
- Acessibilidade com `aria-label`, `aria-labelledby`, labels ocultos e foco visível.
- SEO básico com `title`, `meta description`, canonical, Open Graph e Twitter Cards.
- Formulário com validações, mensagens amigáveis e limpeza inteligente.
- Feed do Instagram sem exposição de token no frontend.
- Fallback estático para a galeria caso a API esteja indisponível.

## Estrutura do Projeto

```text
.
├── index.html
├── robots.txt
├── sitemap.xml
├── README.md
├── api/
│   └── instagram-feed.js
├── dados/
│   └── instagram-feed.json
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
│   ├── formulario.js
│   ├── instagram-feed.js
│   ├── navegacao.js
│   ├── parallax-sobre.js
│   └── dados/
│       ├── compre-on-line.js
│       └── depoimentos.js
├── fontes/
└── imagens/
```

## Arquivos Principais

| Arquivo | Responsabilidade |
| --- | --- |
| `index.html` | Estrutura principal da página e seções do site. |
| `css/variaveis.css` | Cores, variáveis e tokens globais. |
| `css/secoes.css` | Seção de eventos/menu. |
| `css/nossa-historia.css` | Layout da seção Nossa História. |
| `css/fotos.css` | Layout da galeria de fotos. |
| `css/compra-on-line.css` | Vitrine e carrossel de compra online. |
| `css/depoimentos.css` | Cards, carrossel e controles dos depoimentos. |
| `css/formulario.css` | Estilos do formulário de contato. |
| `css/ficamos.css` | Faixa informativa de atendimento. |
| `js/navegacao.js` | Menu mobile, botão voltar ao topo e formulário. |
| `js/parallax-sobre.js` | Movimento parallax da seção Nossa História. |
| `js/instagram-feed.js` | Consumo do feed público do Instagram. |
| `api/instagram-feed.js` | Endpoint serverless seguro para buscar mídias do Instagram. |

## Integração com Instagram

A seção `#fotos` foi preparada para carregar automaticamente as 3 publicações mais recentes do Instagram por meio de um endpoint seguro.

O frontend nunca recebe token de acesso. Ele apenas chama um endpoint público:

```js
fetch('/api/instagram-feed')
```

O endpoint deve retornar:

```json
[
  {
    "imageUrl": "https://...",
    "permalink": "https://www.instagram.com/p/...",
    "caption": "Legenda da foto",
    "timestamp": "2026-06-16T12:00:00Z"
  }
]
```

Se a API falhar, retornar vazio ou estiver indisponível, os cards estáticos do HTML continuam visíveis.

### Endpoint Padrão

Em produção, o site usa:

```text
/api/instagram-feed
```

O container da galeria pode definir um endpoint alternativo:

```html
<div
  class="photos-section__grid"
  id="instagram-photos"
  aria-live="polite"
  data-instagram-feed-endpoint=""
>
```

Com o atributo vazio, o JavaScript usa `/api/instagram-feed`.

### Teste com Backend Local

Para testar fotos reais em desenvolvimento, rode um backend/serverless local e configure temporariamente:

```html
data-instagram-feed-endpoint="http://localhost:3333/api/instagram-feed"
```

Antes de publicar, deixe o atributo vazio novamente.

### Variáveis de Ambiente

O token deve existir apenas no backend/serverless:

```text
INSTAGRAM_USER_ID=
INSTAGRAM_ACCESS_TOKEN=
INSTAGRAM_GRAPH_API_VERSION=v23.0
INSTAGRAM_ALLOWED_ORIGINS=http://127.0.0.1:5500,http://localhost:5500
```

`INSTAGRAM_ALLOWED_ORIGINS` é opcional. Quando ausente, o endpoint permite por padrão:

- `http://127.0.0.1:5500`
- `http://localhost:5500`

## Como Rodar Localmente

Este projeto não exige instalação de pacotes.

### Opção 1: Live Server

Abra o projeto com a extensão Live Server e acesse:

```text
http://127.0.0.1:5500/index.html
```

Nesse modo, o Live Server serve apenas arquivos estáticos. Ele não executa `api/instagram-feed.js`.

Resultado esperado:

- a seção de fotos mantém os 3 cards estáticos;
- o restante do site funciona normalmente;
- a integração real do Instagram não é executada.

### Opção 2: Servidor Estático Simples

```bash
python -m http.server 8000
```

Acesse:

```text
http://localhost:8000
```

### Opção 3: Teste Real do Instagram

Para carregar fotos reais:

1. Rode um backend/serverless local em outra porta.
2. Configure as variáveis de ambiente do Instagram no backend.
3. Aponte `data-instagram-feed-endpoint` para o endpoint local.
4. Abra o site pelo Live Server.
5. Confirme que as 3 fotos recentes substituem os cards estáticos.

## Checklist de Validação

Antes de publicar, conferir:

- home abre sem erro no navegador;
- menu mobile abre e fecha corretamente;
- links internos navegam para as seções certas;
- seção de eventos mantém grade e responsividade;
- parallax roda apenas em telas adequadas;
- galeria mostra 3 fotos reais quando o endpoint está ativo;
- galeria mantém fallback estático quando o endpoint falha;
- formulário valida campos obrigatórios;
- botão limpar informa quando o formulário está vazio;
- faixa de visita está legível em smartphones;
- carrosséis de compra online e depoimentos funcionam;
- links de Instagram, WhatsApp, e-mail e créditos abrem corretamente;
- console do navegador não mostra erros;
- imagens têm `alt` adequado;
- foco por teclado está visível;
- HTML de produção não contém `localhost` fixo.

## Publicação

O site pode ser publicado como estático, mas a integração real do Instagram exige uma camada backend/serverless.

Em plataformas compatíveis com a pasta `api/`, como Vercel, o arquivo:

```text
api/instagram-feed.js
```

pode funcionar como rota:

```text
/api/instagram-feed
```

Em hospedagens puramente estáticas, crie uma função serverless ou backend separado com o mesmo contrato de resposta.

## Segurança

- Nunca colocar `INSTAGRAM_ACCESS_TOKEN` no HTML, CSS ou JavaScript público.
- Não expor dados sensíveis em logs ou mensagens para o usuário.
- Manter mensagens de erro amigáveis no frontend.
- Usar CORS apenas para origens conhecidas em desenvolvimento.
- Antes de publicar, revisar o HTML para garantir que `data-instagram-feed-endpoint` está vazio.

## Links Oficiais

- Instagram: <https://www.instagram.com/alfajordelaflor/>
- WhatsApp: <https://wa.me/message/VJUYK3MDBN3VM1/>
- Crédito de layout/design: <https://www.instagram.com/estudiofablo/>
- Crédito de WebDesign/Programação: <https://luizgustavodev.com/>

## Manutenção

Fluxo recomendado:

1. Editar os arquivos diretamente.
2. Testar com Live Server ou `python -m http.server 8000`.
3. Validar responsividade no DevTools.
4. Revisar console do navegador.
5. Confirmar fallback da galeria.
6. Fazer commit com uma mensagem objetiva.

Exemplo:

```bash
git add index.html css js api README.md
git commit -m "feat: melhora site institucional da De La Flor"
```
