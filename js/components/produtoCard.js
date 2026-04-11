export function produtoCard(produto){
    return `

        <div class="produto-card">
            <a href="produto.html?id=${produto.id}">
                <img src="${produto.images[0]}" width="80">
                <h3>${produto.title}</h3>
            </a>

            <p>R$ ${produto.price}</p>

            <button class="btn-add" data-id="${produto.id}">
                Adicionar ao carrinho
            </button>
    
        </div>

    `
}