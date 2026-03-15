import { buscarProdutos } from "../api/produtosApi.js"
import { criarProdutoCard } from "../components/produtoCard.js"

async function carregarProdutos() {

    const produtos = await buscarProdutos()

    const container = document.querySelector("#lista-produtos")

    produtos.forEach(produto => {

        container.innerHTML +=
        criarProdutoCard(produto)
        
    });
    
}

carregarProdutos()