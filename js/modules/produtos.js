import { produtoCard } from "../components/produtoCard.js"

export function renderizarProdutos(produtos){

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

    container.innerHTML = produtos.map(produtoCard).join("")
}