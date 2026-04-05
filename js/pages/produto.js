import { adicionarProduto } from "../services/carrinhoService.js"
import { buscarProdutos } from "../api/produtosApi.js"

function pegarId(){

    const params = new
    URLSearchParams(window.location.search)
    return Number(params.get("id"))
}

async function renderizarProduto(){

    const id = pegarId()
    const produtos = await buscarProdutos()

    const produto = produtos.find(p => p.id === id)

    if(!produto){
        document.getElementById("produto-detalhe").innerHTML = "Produto não encontrado"
        return
    }

    const container = document.getElementById("produto-detalhe")

    container.innerHTML = `

      <div class="produto-detalhe">

        <img src="${produto.images[0]}" width="200">

        <h2>${produto.title}</h2>

        <p>R$ ${produto.price}</p>

        <button id="btn-add">
            Adicionar ao carrinho
        </button>

    </div>

    `

    document.getElementById("btn-add").addEventListener("click", () => {
        adicionarProduto(produto)
        alert("Produto adicionado")
        
    })
}

renderizarProduto()
    
