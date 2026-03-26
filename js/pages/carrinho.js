import { 
    obterCarrinho,
    aumentarQuantidade,
    diminuirQuantidade,
    removerProduto
} from "../services/carrinhoService.js"

async function buscarProdutos() {
    const res = await
    fetch("http://fakestoreapi.com/products")
    return await res.json()    
}

async function renderizarCarrinho() {
    const carrinho = obterCarrinho()
    const produtos = await buscarProdutos()

    const container = document.getElementById("carrinho-container")

    container.innerHTML = ""

    carrinho.forEach(item => {
        const produto = produtos.find(p => p.id === item.id)

        container.innerHTML += `
        
        <div class="item">
            
            <img src="${produto.image} width="80">
            
            <h3>${produto.title}</h3>
           
            <p>R$ ${produto.price}</p>

            <div>
                <button onclick="diminuir(${item.id})">-</button>
                ${item.quantidade}
                <button onclick="aumentar(${item.id})">+</button>
            </div>

            <button onclick="remover(${item.id})">Remover</button>
        </div>  
        
        `
        
    })

    calcularTotal(produtos, carrinho)
    
}