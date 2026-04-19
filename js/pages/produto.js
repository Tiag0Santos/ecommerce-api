import { adicionarProduto } from "../services/carrinhoService.js"
import { buscarProdutos } from "../api/produtosApi.js"
import { mostrarToast, atualizarContador } from "../utils/ui.js"

function pegarId(){
    const params = new URLSearchParams(window.location.search)
    return Number(params.get("id"))
}

async function renderizarProduto(){

    const produtos = await buscarProdutos()
    const id = pegarId()

    const produto = produtos.find(p => p.id === id)

    const container = document.getElementById("detalhe-produto")

    if(!produto){
        container.innerHTML = "Produto não encontrado"
        return
    }

    container.innerHTML = `

        <div class="container-produto">
            <div class="imagem-produto">
                <img src="${produto.images ? produto.images[0] : produto.image}">
            </div>
            <div class="info-produto">
                <h2>${produto.title}</h2>
                <p class="preco">R$ ${produto.price}</p>
                <p class="descricao">${produto.description}</p>
                <button class="btn-add" id="btn-adicionar">
                    Adicionar ao carrinho
                </button>
            </div>
        </div>

    `

    const botao = document.getElementById("btn-adicionar")

    botao.addEventListener("click", () => {
        adicionarProduto(produto)

        mostrarToast("Produto adicionado ao carrinho🛒")

        atualizarContador()
    })
}

renderizarProduto()
atualizarContador()