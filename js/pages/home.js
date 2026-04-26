import { buscarProdutos } from "../api/produtosApi.js"
import { produtoCard } from "../components/produtoCard.js"
import { adicionarProduto } from "../services/carrinhoService.js"
import { mostrarToast, atualizarContador } from "../utils/ui.js"


let produtosOriginais = []
let produtosFiltrados = []
let categoriaAtual = "todos"
let termoBusca = ""

function renderizarProdutos(produtos) {

    const container = document.getElementById("produtos")

    if(!container) return

        if(produtos.length === 0){
            container.innerHTML = `
                <div class="empty">
                    <p>Nenhum produto encontrado</p>
                </div>
                `
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

        const produto = produtosFiltrados.find(p => p.id === id)

        if(!produto) return

        adicionarProduto(produto)

        mostrarToast("Produto adicionado ao carrinho🛒")

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
    container.innerHTML = `
        <div class="loading">
            <div class="spinner"></div>
        </div>
        `

    const produtos = await buscarProdutos()

    produtosOriginais = produtos

    quantidadePorCategoria()

    aplicarFiltros()

    atualizarBotaoAtivo()
}

function aplicarFiltros(){

    let resultado = [...produtosOriginais]

    if(categoriaAtual !== "todos"){
        resultado = resultado.filter(p => p.category === categoriaAtual)
    }

    if(termoBusca){
        resultado = resultado.filter(p => 
            p.title.toLowerCase().includes(termoBusca.toLowerCase())
        )
    }

    produtosFiltrados = resultado

    renderizarProdutos(resultado)

    quantidadePorCategoria()

    atualizarBotaoAtivo()
}

function filtrarPorCategoria(categoria){
    categoriaAtual = categoria
    aplicarFiltros()
    atualizarBotaoAtivo
}

function quantidadePorCategoria(){

    const botoes = document.querySelectorAll(".btn-categoria")

    botoes.forEach(botao => {

        const categoria = botao.dataset.categoria
        const nome = botao.dataset.nome

        let base = [...produtosOriginais]

        if(termoBusca){
            base = base.filter(p =>
                p.title.toLowerCase().includes(termoBusca.toLowerCase())
            )
        }

        let quantidade

        if(categoria === "todos"){
            quantidade = base.length
        } else {     
            quantidade = base.filter(produto =>
                produto.category === categoria
            ).length
        }

        botao.innerText = `${nome} (${quantidade})`

        botao.style.opacity = quantidade === 0 ? "0.5" : "1"        
    })
}

let timeout

const inputBusca = document.getElementById("input-busca")

    if(inputBusca){

        inputBusca.addEventListener("input", (e) => {

            clearTimeout(timeout)

            timeout = setTimeout(() => {
            
                termoBusca = e.target.value.trim()
                aplicarFiltros()

            }, 400)
        })
    }

function atualizarBotaoAtivo(){

    const botoes = document.querySelectorAll(".btn-categoria")

    botoes.forEach(botao => {
        botao.classList.remove("ativo")

        if(botao.dataset.categoria === categoriaAtual){
            botao.classList.add("ativo")
        }
    })
}

carregarProdutos()
atualizarContador()
atualizarBotaoAtivo()