const LINK_PLANILHA = "https://docs.google.com/spreadsheets/d/e/2PACX-1vR0MT67exQF8_pIjtAZl-NXXZQa6jzkvTERjBaeeylggTLUTvhfvS3tJP9SO6Pw5eF2jXtTRxwG-DeP/pub?gid=0&single=true&output=csv";

let produtos = [];

async function carregarProdutos() {
    try {
        const resposta = await fetch(LINK_PLANILHA);
        const dados = await resposta.text();
        
        const linhas = dados.split('\n').slice(1);
        produtos = linhas.map(linha => {
            const colunas = linha.split(',');
            return {
                titulo: colunas[0]?.trim(),
                preco: colunas[1]?.trim(),
                imagem: colunas[2]?.trim(),
                link: colunas[3]?.trim()
            };
        }).filter(p => p.titulo); 

        exibirProdutos(produtos);
    } catch (erro) {
        console.error("Erro ao carregar planilha:", erro);
    }
}

function exibirProdutos(lista) {
    const container = document.getElementById('container-ofertas');
    container.innerHTML = ""; 

    lista.forEach(item => {
        container.innerHTML += `
            <div class="card">
                <img src="${item.imagem}" alt="${item.titulo}">
                <h3>${item.titulo}</h3>
                <p class="price-new">${item.preco}</p>
                <a href="${item.link}" target="_blank" class="btn-cupom">Pegar Oferta</a>
            </div>
        `;
    });
}

function filtrarProdutos() {
    const termo = document.getElementById('inputBusca').value.toLowerCase();
    const filtrados = produtos.filter(p => p.titulo.toLowerCase().includes(termo));
    exibirProdutos(filtrados);
}

carregarProdutos();