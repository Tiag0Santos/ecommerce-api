import { adicionarProduto } from "../services/carrinhoService.js"
import { buscarProdutos } from "../api/produtosApi.js"

function pegarId(){

    const params = new
    URLSearchParams(window.location.search)
    return Number(params.get("id"))
}

async function renderizarProduto(){

    const produtos = await buscarProdutos()
    const id = pegarId()

    const produto = produtos.find(p => p.id === id)

    if(!produto){
        document.getElementById("produto-detalhe").innerHTML = "Produto não encontrado"
        return
    }

    const container = document.getElementById("produto-detalhe")

    container.innerHTML = `

      <div class="produto-detalhe">

        <img src="${produto.images ? produto.images[0] : produto.image}" width="200">

        <h2>${produto.title}</h2>

        <p>R$ ${produto.price}</p>

        <button class="btn-add" data-id="${produto.id}">
            Adicionar ao carrinho
        </button>

    </div>

    `

    document.addEventListener("click", async (e) => {

        if(e.target.classList.contains("btn-add")){

            const id = Number(e.target.dataset.id)

            const produtos = await buscarProdutos()
            const produto = produtos.find(p => p.id === id)

            adicionarProduto(produto)

            alert("Produto adicionado 🛒")
        }

    })

}

renderizarProduto()
    
