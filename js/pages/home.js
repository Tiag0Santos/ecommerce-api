import { buscarProdutos } from "../api/produtosApi.js"
import { produtoCard } from "../components/produtoCard.js"
import { adicionarProduto } from "../services/carrinhoService.js"
import { quantidadeTotal } from "../services/carrinhoService.js"

let produtosGlobais = []

async function carregarProdutos() {

    const container = document.getElementById("produtos")

    container.innerHTML = "Carregando..."

    const produtos = await buscarProdutos()

    produtosGlobais = produtos

    let html = ""

    produtos.forEach(produto => {

        html += `

            <div class="produto-card">

                <a href="produto.html?id=${produto.id}">
                    <img src="${produto.images ? produto.images[0] : produto.image}" width="80">
                    <h3>${produto.title}</h3>
                </a>

                <p>R$ ${produto.price}</p>

                <button class="btn-add" data-id="${produto.id}">
                    Adicionar
                </button>

            </div>
    `
  })

        container.innerHTML = html
        
    }

    document.addEventListener("click", (e) => {

        if(e.target.classList.contains("btn-add")){

            const id = Number(e.target.dataset.id)

            const produto = produtosGlobais.find(p => p.id === id)

            adicionarProduto(produto)

            alert("Produto adicionado 🛒")

            atualizarContador()
        }

    })

    carregarProdutos()
    

function atualizarContador() {
    
    const contador = document.getElementById("contador")

    contador.innerText = quantidadeTotal()

}

carregarProdutos()
atualizarContador()