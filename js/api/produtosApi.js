export async function buscarProdutos() {

    const resposta = await
    fetch("https://fakestoreapi.com/products")

    return await resposta.json()

}