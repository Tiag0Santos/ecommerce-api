import { 
    obterCarrinho,
    aumentarQuantidade,
    diminuirQuantidade,
    removerProduto,
    limparCarrinho
} from "../services/carrinhoService.js"
import { mostrarToast, atualizarContador } from "../utils/ui.js"


async function renderizarCarrinho() {

    const carrinho = obterCarrinho()
    const container = document.getElementById("carrinho-container")

    if(carrinho.length === 0){
        container.innerHTML = "Carrinho vazio 🛒"
        container.style.textAlign = 'center'
        const resumo = document.getElementById("resumo-carrinho")
            if(resumo) resumo.style.display = "none"
        return
    }

    let html = ""

    carrinho.forEach(item => {

        html += `
        
        <div class="item-carrinho">
            <img 
            src="${item.images ? item.images[0] : item.image}" 
            alt="${item.title}">
            <div class="info-produto">
                <h3>${item.title}</h3>
                <div class="preco">
                    <p>Preço: R$ ${item.price}</p>
                    <div>                          
                        <p>Subtotal:</p>
                        <p>R$ ${(item.price * item.quantidade).toFixed(2)}</p>
                    </div>
                </div>
                <div class="controle-quantidade">
                    <button class="btn-diminuir" data-id="${item.id}">-</button>
                    <span>${item.quantidade}</span>
                    <button class="btn-aumentar" data-id="${item.id}">+</button>
                </div>
                <button class="btn-remover" data-id="${item.id}">
                    Remover
                </button>
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

    const totalEl = document.getElementById("total")
    const subtotalEl = document.getElementById("subtotal")

    if(totalEl && subtotalEl){
        totalEl.innerText = `R$ ${total.toFixed(2)}`
        subtotalEl.innerText = `R$ ${total.toFixed(2)}`
    }
}

document.addEventListener("click", (e) => {

  const id = e.target.dataset.id ? Number(e.target.dataset.id) : null

  if(e.target.classList.contains("btn-aumentar")){
    aumentarQuantidade(id)
    renderizarCarrinho()
    mostrarToast("Produto adicionado ao carrinho🛒")
    atualizarContador()
  }

  if(e.target.classList.contains("btn-diminuir")){
    diminuirQuantidade(id)
    renderizarCarrinho()
    mostrarToast("Produto removido 🗑️")
    atualizarContador()
  }

  if(e.target.classList.contains("btn-remover")){
    removerProduto(id)
    renderizarCarrinho()
    mostrarToast("Produto removido 🗑️")
    atualizarContador()
  }

  if(e.target.classList.contains("btn-finalizar")){
    mostrarToast("Compra finalizada com sucesso 🎉")
    limparCarrinho()    
    atualizarContador()

        setTimeout(() => {
            window.location.href = "index.html"
        }, 1500)
    }
})

renderizarCarrinho()
atualizarContador()