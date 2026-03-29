import { 
    obterCarrinho,
    aumentarQuantidade,
    diminuirQuantidade,
    removerProduto,
    quantidadeTotal
} from "../services/carrinhoService.js"

async function buscarProdutos() {
    const res = await
    fetch("https://fakestoreapi.com/products")
    return await res.json()    
}

async function renderizarCarrinho() {

    const carrinho = obterCarrinho()
    const container = document.getElementById("carrinho-container")

    container.innerHTML = ""

    carrinho.forEach(item => {

        container.innerHTML += `
        
        <div class="item">
            
            <img src="${item.image}" width="80">
            
            <h3>${item.title}</h3>
           
            <p>R$ ${item.price}</p>

            <div>
                <button onclick="diminuir(${item.id})">-</button>
                ${item.quantidade}
                <button onclick="aumentar(${item.id})">+</button>
            </div>

            <button onclick="remover(${item.id})">Remover</button>
        </div>  
        
        `        
    })

    calcularTotal(carrinho)
    
}

function calcularTotal(carrinho){

    let total = 0

    carrinho.forEach(item => {

        total += item.price * item.quantidade
    })

    document.getElementById("total").innerHTML = "Total: R$ " + total.toFixed(2)
}

function atualizarContador() {

    document.getElementById("contador").innerText = quantidadeTotal()
}

window.aumentar = (id) => {
    aumentarQuantidade(id)
    renderizarCarrinho()
    atualizarContador()
}

window.diminuir = (id) => {
    diminuirQuantidade(id)
    renderizarCarrinho()
    atualizarContador()
}

window.remover = (id) => {
    removerProduto(id)
    renderizarCarrinho()
    atualizarContador()
}

renderizarCarrinho()
atualizarContador()