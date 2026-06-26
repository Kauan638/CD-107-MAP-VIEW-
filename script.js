// ========================================
// VARIÁVEIS GLOBAIS
// ========================================

const mapa =
document.getElementById("mapa");

const enderecoAtual =
document.getElementById("enderecoAtual");

const produto =
document.getElementById("produto");

const sku =
document.getElementById("sku");

const qtd =
document.getElementById("qtd");

const statusPosicao =
document.getElementById("status");

const pulmoes =
document.getElementById("pulmoes");


// ========================================
// CONFIGURAÇÕES DO MAPA
// ========================================

const ruas = [

70,71,72,73,74,75,76,77,78,79,
80,81,82,83,84,85,86,87,88,

91,92,93,94,95,96,97,98,99,
100,101,102,103,104,105,106

];


// ========================================
// GERA MAPA
// ========================================

function gerarMapa(){

    mapa.innerHTML = "";

    ruas.forEach(rua=>{

        const linha =
        document.createElement("div");

        linha.className =
        "rua";

        // Número da rua

        const numeroRua =
        document.createElement("div");

        numeroRua.className =
        "numero-rua";

        numeroRua.innerText =
        rua;

        linha.appendChild(
            numeroRua
        );

        // Container posições

        const enderecos =
        document.createElement("div");

        enderecos.className =
        "enderecos";

        // Cria posições

        for(let i=1;i<=240;i++){

            const posicao =
            document.createElement("div");

            posicao.className =
            "posicao";

            // Situação aleatória

            const situacao =
            gerarSituacao();

            posicao.classList.add(
                situacao
            );

            // Endereço fictício

            const endereco =

            `${rua}.${String(i)
            .padStart(3,"0")}.1.1`;

            posicao.dataset.endereco =
            endereco;

            posicao.dataset.situacao =
            situacao;

            posicao.dataset.sku =
            gerarSKU();

            posicao.dataset.produto =
            gerarProduto();

            posicao.dataset.qtd =
            Math.floor(
                Math.random()*100
            );

            // Clique

            posicao.onclick =
            ()=>mostrarDetalhes(
                posicao
            );

            enderecos.appendChild(
                posicao
            );
        }

        linha.appendChild(
            enderecos
        );

        mapa.appendChild(
            linha
        );

    });

}

gerarMapa();


// ========================================
// GERA SITUAÇÃO
// ========================================

function gerarSituacao(){

    const sorteio =
    Math.random();

    if(sorteio < .70)
        return "ocupada";

    if(sorteio < .82)
        return "vazia";

    if(sorteio < .90)
        return "baixa";

    if(sorteio < .96)
        return "ruptura";

    if(sorteio < .98)
        return "bloqueada";

    return "pulmao";
}


// ========================================
// DETALHES
// ========================================

function mostrarDetalhes(posicao){

    enderecoAtual.innerText =
    posicao.dataset.endereco;

    produto.innerText =
    posicao.dataset.produto;

    sku.innerText =
    posicao.dataset.sku;

    qtd.innerText =
    posicao.dataset.qtd +
    " UN";

    statusPosicao.innerText =
    traduzirStatus(
        posicao.dataset.situacao
    );

    pulmoes.innerText =

    `P1 - ${
        gerarEnderecoAleatorio()
    }`;
}


// ========================================
// TRADUZ SITUAÇÃO
// ========================================

function traduzirStatus(status){

    switch(status){

        case "ocupada":
            return "OCUPADA";

        case "vazia":
            return "VAZIA";

        case "baixa":
            return "BAIXA OCUPAÇÃO";

        case "ruptura":
            return "RUPTURA";

        case "bloqueada":
            return "BLOQUEADA";

        case "pulmao":
            return "PULMÃO";

        default:
            return "";
    }
}


// ========================================
// GERA PRODUTO
// ========================================

function gerarProduto(){

    const produtos = [

        "ARROZ 5KG",
        "FEIJÃO CARIOCA",
        "CAFÉ 500G",
        "AÇÚCAR 5KG",
        "ÓLEO SOJA 900ML",
        "LEITE INTEGRAL",
        "MACARRÃO ESPAGUETE",
        "DETERGENTE 500ML",
        "AMACIANTE 2L",
        "PAPEL HIGIÊNICO"

    ];

    return produtos[
        Math.floor(
            Math.random()*
            produtos.length
        )
    ];
}


// ========================================
// GERA SKU
// ========================================

function gerarSKU(){

    return "789" +

    Math.floor(

        100000000 +
        Math.random()*900000000

    );

}


// ========================================
// ENDEREÇO ALEATÓRIO
// ========================================

function gerarEnderecoAleatorio(){

    const rua =

    ruas[
        Math.floor(
            Math.random()*ruas.length
        )
    ];

    return

    `${rua}.${
        Math.floor(
            Math.random()*240
        )
    }.1.1`;
}


// ========================================
// BUSCA RÁPIDA
// ========================================

const campoBusca =
document.querySelector(
    'input[placeholder="Digite SKU ou Endereço"]'
);

campoBusca.addEventListener(
    "keyup",
    buscar
);

function buscar(){

    const valor =
    campoBusca.value
    .toLowerCase();

    document
    .querySelectorAll(".posicao")
    .forEach(pos=>{

        pos.style.opacity =
        ".2";

        if(

            pos.dataset.endereco
            .toLowerCase()
            .includes(valor)

            ||

            pos.dataset.sku
            .includes(valor)

        ){

            pos.style.opacity =
            "1";

            pos.style.transform =
            "scale(1.8)";
        }

    });

    if(valor === ""){

        document
        .querySelectorAll(".posicao")
        .forEach(pos=>{

            pos.style.opacity =
            "1";

            pos.style.transform =
            "scale(1)";
        });

    }

}


// ========================================
// ATUALIZAR MAPA
// ========================================

document
.querySelectorAll(".btn")
.forEach(btn=>{

    if(

        btn.innerText
        .includes("Atualizar")

    ){

        btn.onclick = ()=>{

            gerarMapa();

        }

    }

});
