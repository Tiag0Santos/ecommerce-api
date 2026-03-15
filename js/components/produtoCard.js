export function criarProdutoCard(produto){
    return `

    <div class="produto-card">
        <img src="${produto.image}"></img>

        <h3>${produto.title}</h3>

        <p>R$ ${produto.price}</p>

        <button data-id="${produto.id}">
            Adicionar ao carrinho
        </button>

    </div>
    
    `
}