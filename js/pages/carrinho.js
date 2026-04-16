import { 
    obterCarrinho,
    aumentarQuantidade,
    diminuirQuantidade,
    removerProduto,
    quantidadeTotal
} from "../services/carrinhoService.js"

async function renderizarCarrinho() {

    const carrinho = obterCarrinho()
    const container = document.getElementById("carrinho-container")

    if(carrinho.length === 0){
        container.innerHTML = "Carrinho vazio 🛒"
        return
    }

    let html = ""

    carrinho.forEach(item => {

        html += `
        
        <div class="item-carrinho">

            <img 
            src="${item.images ? item.images[0] : item.image}" 
            alt="${item.title}"
            >

            <div class="info-produto">
                <h3>${item.title}</h3>

                <p class="preco">R$ ${item.price}</p>

                <div class="controle-quantidade">
                <button class="btn-diminuir" data-id="${item.id}">-</button>

                <span>${item.quantidade}</span>

                <button class="btn-aumentar" data-id="${item.id}">+</button>
            </div>

            <button class="btn-remover" data-id="${item.id}">
                Remover
            </button>
            </div>

            <div class="subtotal">
            <strong>Subtotal</strong>
            <p>R$ ${(item.price * item.quantidade).toFixed(2)}</p>
            </div>

        </div>
    `
    })

    container.innerHTML = html

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

    const contador = document.getElementById("contador")

    if(contador){
        contador.innerText = quantidadeTotal()
    }    
    
}

document.addEventListener("click", (e) => {

  const id = Number(e.target.dataset.id)

  if(e.target.classList.contains("btn-aumentar")){
    aumentarQuantidade(id)
    renderizarCarrinho()
    atualizarContador()
  }

  if(e.target.classList.contains("btn-diminuir")){
    diminuirQuantidade(id)
    renderizarCarrinho()
    atualizarContador()
  }

  if(e.target.classList.contains("btn-remover")){
    removerProduto(id)
    renderizarCarrinho()
    atualizarContador()
  }

})

renderizarCarrinho()
atualizarContador()