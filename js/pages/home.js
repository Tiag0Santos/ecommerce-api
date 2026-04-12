import { buscarProdutos } from "../api/produtosApi.js"
import { produtoCard } from "../components/produtoCard.js"
import { adicionarProduto } from "../services/carrinhoService.js"
import { quantidadeTotal } from "../services/carrinhoService.js"

let produtosGlobais = []
let produtosOriginais = []

function renderizarProdutos(produtos) {

    const container = document.getElementById("produtos")

    if(!container) return

        if(produtos.length === 0){
            container.innerHTML = "Nenhum produto encontrado"
            return
        }

    let html = ""

    produtos.forEach(produto => {

        html += produtoCard(produto)
    })

    container.innerHTML = html
        
}

document.addEventListener("click", (e) => {

    const botao = e.target.closest(".btn-add")

    if(botao){

        const id = Number(botao.dataset.id)

        const produto = produtosGlobais.find(p => p.id === id)

        if(!produto) return

        adicionarProduto(produto)

        alert("Produto adicionado 🛒")

        atualizarContador()
    }

    const botaoCategoria = e.target.closest(".btn-categoria")

    if(botaoCategoria){

        const categoria = botaoCategoria.dataset.categoria

        filtrarPorCategoria(categoria)
    }

})

async function carregarProdutos(){

    const container = document.getElementById("produtos")
    container.innerHTML = "Carregando..."

    const produtos = await buscarProdutos()

    produtosGlobais = produtos
    produtosOriginais = produtos

    renderizarProdutos(produtos)
}

function filtrarPorCategoria(categoria){

    if(categoria === "todos"){
        produtosGlobais = produtosOriginais
        renderizarProdutos(produtosOriginais)
        return
    }

    const produtosFiltrados = produtosOriginais.filter(produto => 
        produto.category === categoria
    )

    produtosGlobais = produtosFiltrados

    renderizarProdutos(produtosFiltrados)
}

let timeout

const inputBusca = document.getElementById("input-busca")

    if(inputBusca){

        inputBusca.addEventListener("input", (e) => {

            clearTimeout(timeout)

            timeout = setTimeout(async () => {
            
                const valor = e.target.value.trim()

                const container = document.getElementById("produtos")
                container.innerHTML = "Buscando..."

                const produtos = await buscarProdutos(valor)

                produtosGlobais = produtos

                renderizarProdutos(produtos)

            }, 500)
        })
    }

function atualizarContador() {
    
    const contador = document.getElementById("contador")

    if(contador){
        contador.innerText = quantidadeTotal()
    }
}

carregarProdutos()
atualizarContador()