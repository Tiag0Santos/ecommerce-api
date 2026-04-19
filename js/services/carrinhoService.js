let carrinho =
JSON.parse(localStorage.getItem("carrinho")) || []

export function obterCarrinho(){
    return carrinho
}

export function adicionarProduto(produto){

    const item = carrinho.find(p => p.id === produto.id)

    if(item){
        item.quantidade++
    }else{
        carrinho.push({
            id: produto.id,
            title: produto.title,
            price: produto.price,
            images: produto.images || [produto.image],
            quantidade: 1
        })
    }

    salvarCarrinho()
}

export function aumentarQuantidade(id){
    const item = carrinho.find(p => p.id === id)

    if(item){
        item.quantidade++
        salvarCarrinho()
    }
}

export function diminuirQuantidade(id){
    const item = carrinho.find(p => p.id === id)

    if(item && item.quantidade > 1){
        item.quantidade--
        salvarCarrinho()
    }
}

export function removerProduto(id){
    carrinho = carrinho.filter(p => p.id !== id)

    salvarCarrinho()
}

function salvarCarrinho(){

    localStorage.setItem("carrinho",JSON.stringify(carrinho))
}

export function quantidadeTotal(){
    return carrinho.reduce((total, item) => {
        return total + item.quantidade
    }, 0)
}

export function limparCarrinho(){
    localStorage.removeItem("carrinho")
}