export async function buscarProdutos(query = ""){

  const url = query ?
  `https://dummyjson.com/products/search?q=${query}`
    : `https://dummyjson.com/products`

  const res = await fetch(url)
  const data = await res.json()

  return data.products

}