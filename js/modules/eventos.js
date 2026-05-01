import { adicionarProduto } from "../services/carrinhoService.js"
import { mostrarToast, atualizarContador } from "../utils/ui.js"
import {
    setCategoria,
    getProdutoPorId
} from "./filtros.js"

export function configurarEventos(){

    document.addEventListener("click", (e) => {

        const botao = e.target.closest(".btn-add")

        if(botao){

            const id = Number(botao.dataset.id)

            const produto = getProdutoPorId(id)

            if(!produto) return

            adicionarProduto(produto)

            mostrarToast("Produto adicionado ao carrinho 🛒")

            atualizarContador()
        }

        const botaoCategoria = e.target.closest(".btn-categoria")

        if(botaoCategoria){

            setCategoria(botaoCategoria.dataset.categoria)
        }
    })
}