import { buscarProdutos } from "../api/produtosApi.js"
import { produtoCard } from "../components/produtoCard.js"
import { adicionarProduto } from "../services/carrinhoService.js"

async function carregarProdutos() {

    const produtos = await buscarProdutos()

    const container = document.querySelector("#produtos")

    produtos.forEach(produto => {

        container.innerHTML +=
        produtoCard(produto)
        
    })

    adicionarEventos(produtos)
    
}

function adicionarEventos(produtos) {

    const botoes = document.querySelectorAll(".btn-add")

    botoes.forEach(botao => {

        botao.addEventListener("click", () => {

            const id = Number(botao.dataset.id)

            const produto = produtos.find(p => p.id === id)

            adicionarProduto(produto)

            alert("Produto adicionado ao carrinho")
        })
    })
}

carregarProdutos()