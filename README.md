# Site De La Flor

Site institucional da **De La Flor**, marca de alfajores peruanos, presentes afetivos e lembranças personalizadas para eventos, celebrações, ações de marca e compra online.

O projeto é um site estático feito com **HTML, CSS e JavaScript puro**, sem framework, build, bundler ou instalação de pacotes. A arquitetura prioriza simplicidade, desempenho, manutenção direta dos arquivos e compatibilidade com hospedagens estáticas.

## Objetivo

Apresentar a De La Flor, sua história, seus serviços para eventos, produtos para compra online, depoimentos e canais de contato diretos via WhatsApp, e-mail e formulário.

A página inicial inclui:

- banner principal com chamada para compra;
- seção de eventos e serviços;
- seção Nossa História com efeito parallax nas fotos;
- galeria de fotos;
- vitrine de produtos para compra online;
- depoimentos de clientes;
- formulário de contato;
- faixa informativa de atendimento;
- rodapé com informações de contato e créditos.

## Alterações recentes

- Atualização da seção **Menu/Eventos** para exibir cards em grade com **2 linhas e 3 colunas** em telas largas.
- Inclusão das imagens de eventos em `imagens/galeria/eventos/`.
- Ajuste do parallax da seção **Nossa História**, combinando `css/nossa-historia.css` com `js/parallax-sobre.js`.
- Intensificação do movimento parallax das fotos em desktop e tablet, mantendo o recurso desativado em mobile e para usuários com `prefers-reduced-motion`.
- Reorganização dos cards da seção **Depoimentos**:
  - imagem do texto do depoimento no topo;
  - nome e cargo/profissão na parte inferior;
  - remoção do avatar visual `.testimonial-card__avatar`.
- Ajustes em `css/depoimentos.css` para garantir a ordem visual correta dos elementos nos cards.

## Melhorias aplicadas

- SEO básico com `title`, `description`, `canonical`, Open Graph, Twitter Cards e dados estruturados JSON-LD.
- Acessibilidade reforçada com `aria-label`, `aria-labelledby`, `aria-hidden` em elementos decorativos e labels ocultos no formulário.
- Carregamento assíncrono de CSS não crítico para reduzir bloqueio de renderização.
- Organização dos estilos por seção em arquivos CSS separados.
- Uso de imagens otimizadas em `.webp` quando disponível.
- Menu mobile controlado por JavaScript.
- Carrosséis e interações controlados por JavaScript puro.
- Respeito à preferência de redução de movimento no efeito parallax.

## Estrutura do projeto

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
    ├── banner-principal/
    ├── banners/
    │   ├── aspas-direita.png
    │   ├── aspas-esquerda.png
    │   ├── banner-lateral.webp
    │   ├── banner-momentos.webp
    │   └── texto-banner.webp
    ├── galeria/
    │   ├── compre-on-line/
    │   │   ├── g20.webp
    │   │   ├── g22.webp
    │   │   ├── image14.webp
    │   │   ├── image34.webp
    │   │   ├── image54.webp
    │   │   ├── path70.png
    │   │   └── path71.png
    │   ├── depoimentos/
    │   │   ├── g96.webp
    │   │   ├── g98.webp
    │   │   ├── path209-removebg-preview.png
    │   │   ├── path210-removebg-preview.png
    │   │   └── text99.webp
    │   ├── eventos/
    │   │   ├── 15anosProvisoria.jpg
    │   │   ├── Batizado.jpeg
    │   │   ├── Casamento.jpg
    │   │   ├── DatasComemorativas.jpg
    │   │   ├── Formatura.jpeg
    │   │   └── PrimeiraEucaristia.jpeg
    │   ├── ficamos-felizes/
    │   │   ├── gps.webp
    │   │   ├── path265.webp
    │   │   └── text265.webp
    │   ├── formulario/
    │   │   ├── IconesSiteDeLaFlor-01.png
    │   │   ├── IconesSiteDeLaFlor-02.png
    │   │   ├── IconesSiteDeLaFlor-03.png
    │   │   ├── IconesSiteDeLaFlor-04.png
    │   │   ├── IconesSiteDeLaFlor-05.png
    │   │   ├── IconesSiteDeLaFlor-06.png
    │   │   └── IconesSiteDeLaFlor-07.png
    │   ├── fotos/
    │   │   ├── docura-tradicao.png
    │   │   ├── gotas-chocolate.png
    │   │   ├── image254.webp
    │   │   ├── image256.webp
    │   │   └── image258.webp
    │   ├── nossa-historia/
    │   │   ├── FotosFamilia.png
    │   │   └── path72.webp
    │   └── rodape/
    │       ├── IconesSiteDeLaFlor-08.png
    │       ├── IconesSiteDeLaFlor-09.png
    │       ├── IconesSiteDeLaFlor-10.png
    │       ├── IconesSiteDeLaFlor-11.png
    │       ├── IconesSiteDeLaFlor-12.png
    │       ├── IconesSiteDeLaFlor-13.png
    │       ├── IconesSiteDeLaFlor-14.png
    │       ├── path203.webp
    │       └── text294.png
    └── logo/
        ├── alfajor-peruano.webp
        ├── fav-ico.ico
        └── logo.webp
```

## Arquivos principais

### `index.html`

Arquivo principal do site. Contém a estrutura das seções:

- `#home` — banner principal;
- `#menu` — eventos e serviços;
- `#sobre` — Nossa História;
- `#fotos` — galeria;
- `#loja` — compra online;
- `#depoimentos` — depoimentos;
- `#contato` — formulário;
- `.secao-visita` — faixa de atendimento;
- `footer` — rodapé.

### `css/secoes.css`

Controla a seção de eventos/menu, incluindo os cards de eventos e o CTA de orçamento.

### `css/nossa-historia.css`

Controla o layout da seção Nossa História, a posição das fotos e o comportamento visual necessário para o parallax.

### `js/parallax-sobre.js`

Aplica o movimento parallax na imagem `.history-section__photos` dentro da seção `#sobre`.

O script:

- calcula o progresso de rolagem da seção;
- aplica `translate3d` na imagem;
- reduz custo de renderização usando `requestAnimationFrame`;
- desativa o efeito em telas pequenas;
- respeita `prefers-reduced-motion`.

### `css/depoimentos.css`

Controla a seção de depoimentos, carrossel, cards, setas, dots e a nova ordem visual dos elementos:

1. texto do depoimento;
2. linha divisória;
3. nome e cargo/profissão.

### `js/dados/compre-on-line.js`

Arquivo de dados e comportamento da vitrine de produtos da seção de compra online.

### `js/dados/depoimentos.js`

Arquivo de dados e comportamento do carrossel de depoimentos.

### `js/navegacao.js`

Controla a navegação principal, menu mobile e interações de navegação.

### `js/instagram-feed.js`

Controla o carregamento da galeria relacionada ao Instagram. Ao abrir o site, o script consulta o endpoint configurado em `data-instagram-feed-endpoint` no container `#instagram-photos`. Se o atributo estiver vazio, usa `/api/instagram-feed`. Quando recebe mídias válidas, substitui os cards estáticos da seção `#fotos` pelas 3 publicações mais recentes. Se a rota falhar, demorar, retornar vazio ou estiver indisponível no ambiente local, os 3 cards estáticos do HTML permanecem visíveis.

Exemplo para desenvolvimento local com backend em outra porta:

```html
<div
  class="photos-section__grid"
  id="instagram-photos"
  aria-live="polite"
  data-instagram-feed-endpoint="http://localhost:3333/api/instagram-feed"
>
```

Em produção, deixe o atributo vazio ou remova o atributo para usar o padrão `/api/instagram-feed`.

### `api/instagram-feed.js`

Endpoint backend/serverless responsável por buscar as últimas mídias pela API oficial da Meta/Instagram e devolver apenas os dados públicos necessários para o frontend:

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

O token de acesso não fica no HTML nem no JavaScript público. Ele deve existir somente no ambiente seguro do backend/serverless.

Variáveis de ambiente necessárias:

- `INSTAGRAM_USER_ID`: ID da conta do Instagram Business/Creator conectada à Meta.
- `INSTAGRAM_ACCESS_TOKEN`: token de acesso da API Graph com permissão para ler as mídias da conta.
- `INSTAGRAM_GRAPH_API_VERSION`: opcional; quando ausente, usa `v23.0`.
- `INSTAGRAM_ALLOWED_ORIGINS`: opcional; lista separada por vírgula para CORS em desenvolvimento. Quando ausente, permite `http://127.0.0.1:5500` e `http://localhost:5500`.

Em hospedagem estática pura, crie uma função serverless ou backend equivalente respondendo em `/api/instagram-feed` com o mesmo formato acima. Sem esse endpoint, o site continua exibindo as imagens estáticas atuais como fallback.

### `js/formulario.js`

Controla comportamentos do formulário de contato.

## Como testar localmente

Abra `index.html` diretamente em um navegador moderno.

Também é possível usar um servidor estático local:

```bash
python -m http.server 8000
```

Depois acesse:

```text
http://localhost:8000
```

Com Live Server em `http://127.0.0.1:5500/index.html`, a rota `/api/instagram-feed` não executa `api/instagram-feed.js`, porque o Live Server serve apenas arquivos estáticos. Nesse cenário, o teste valida o fallback: os 3 cards estáticos da seção `#fotos` devem continuar aparecendo.

Para testar a integração real em desenvolvimento, rode um backend/serverless local em outra porta e configure o atributo do HTML:

```html
data-instagram-feed-endpoint="http://localhost:3333/api/instagram-feed"
```

Esse backend local deve ler `INSTAGRAM_USER_ID` e `INSTAGRAM_ACCESS_TOKEN` no ambiente seguro do servidor e devolver o JSON no formato documentado acima. Se o site estiver em `127.0.0.1:5500` e o backend em outra porta, o backend precisa responder CORS para essa origem. O endpoint `api/instagram-feed.js` já permite `http://127.0.0.1:5500` e `http://localhost:5500` por padrão, ou a lista definida em `INSTAGRAM_ALLOWED_ORIGINS`. Nenhum token deve ser colocado no HTML, no CSS ou no JavaScript público.

Em produção, publique uma rota serverless/backend em `/api/instagram-feed` e deixe o atributo `data-instagram-feed-endpoint` vazio para usar o caminho padrão.

## Checklist de validação

Antes de publicar, conferir:

- abrir a home no navegador;
- verificar responsividade em desktop, tablet e mobile;
- testar menu mobile aberto e fechado;
- verificar a seção de eventos em grade 2x3 no desktop;
- verificar se as imagens de eventos carregam corretamente;
- testar o parallax da seção Nossa História no desktop;
- confirmar que o parallax não roda no mobile;
- validar a ordem dos depoimentos: texto em cima e nome/cargo embaixo;
- testar carrosséis de compra online e depoimentos;
- testar links de Instagram, WhatsApp, e-mail e créditos;
- testar formulário e campos obrigatórios;
- verificar console do navegador;
- revisar `title`, `meta description`, hierarquia de títulos e textos alternativos;
- confirmar contraste, foco por teclado e labels ocultos.

## Notas de publicação

- O site está preparado para hospedagem estática.
- Preserve a hierarquia de pastas ao mover o projeto.
- Preserve nomes de arquivos, classes, IDs, âncoras e caminhos de imagens já em uso.
- Evite renomear imagens sem atualizar todos os caminhos no HTML, CSS e JavaScript.
- Após substituir arquivos CSS ou JS em produção, limpe o cache do navegador ou force atualização com `Ctrl + F5`.
- Caso adicione novas fontes, confirme as licenças antes de publicar.
- Não faça deploy ou alteração de hospedagem sem confirmação.

## Links oficiais

- Instagram: <https://www.instagram.com/alfajordelaflor/>
- WhatsApp: <https://wa.me/message/VJUYK3MDBN3VM1/>
- Crédito de layout/design: <https://www.instagram.com/estudiofablo/>
- Crédito de WebDesign/Programação: <https://luizgustavodev.com/>

## Desenvolvimento

Este projeto não depende de instalação de pacotes.

Fluxo recomendado:

1. editar os arquivos diretamente;
2. testar com Live Server ou `python -m http.server 8000`;
3. validar responsividade;
4. revisar console do navegador;
5. fazer commit com uma descrição clara das alterações.

Exemplo de commit para a alteração dos depoimentos:

```bash
git add index.html css/depoimentos.css imagens/galeria/depoimentos/
git commit -m "style: inverte layout dos depoimentos"
```

## Observações de segurança e manutenção

- Não expor dados sensíveis em HTML, JavaScript, comentários ou mensagens de erro.
- Não usar mensagens técnicas cruas para usuário final.
- Evitar dependências externas sem necessidade.
- Manter arquivos de imagem otimizados para reduzir tempo de carregamento.
- Conferir caminhos relativos sempre que mover arquivos entre pastas.
- Validar acessibilidade sempre que alterar ordem visual de elementos.
