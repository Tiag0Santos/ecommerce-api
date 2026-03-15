let carrinho =
JSON.parse(localStorage.getItem("carrinho")) || []

export function adicionarCarrinho(produto){

    const item = carrinho.find(p => p.id === produto.id)

    if(item){
        item.quantidade++
    }else{
        carrinho.push({
            ...produto,
            quantidade:1
        })
    }

    salvarCarrinho()
}

function salvarCarrinho(){

    localStorage.setItem("carrinho",JSON.stringify(carrinho))
}

export function obterCarrinho(){

    return carrinho
}