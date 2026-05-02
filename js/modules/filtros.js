let produtosOriginais = []
let produtosFiltrados = []

let categoriaAtual = "todos"
let termoBusca = ""

let renderFn = null

export function configurarFiltros(produtos, renderizar){

    produtosOriginais = produtos
    renderFn = renderizar

    aplicarFiltros()
}

export function setCategoria(categoria){

    categoriaAtual = categoria

    aplicarFiltros()
}

export function setBusca(valor){

    termoBusca = valor

    aplicarFiltros()
}

function aplicarFiltros(){

    let resultado = [...produtosOriginais]

    if(categoriaAtual !== "todos"){
        resultado = resultado.filter(p => 
            p.category === categoriaAtual
        )
    }

    if(termoBusca){
        resultado = resultado.filter(p =>
            p.title.toLowerCase().includes(termoBusca.toLowerCase())
        )
    }

    produtosFiltrados = resultado

    renderFn(resultado)

    atualizarBotaoAtivo()

    quantidadePorCategoria()
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

        const quantidade = categoria === "todos"
            ? base.length
            : base.filter(p => p.category === categoria).length

        botao.innerText = `${nome} (${quantidade})`

        botao.style.opacity = quantidade === 0 ? "0.5" : "1"
    })
}

export function getProdutoPorId(id){

    return produtosFiltrados.find(p => p.id === id)
}
