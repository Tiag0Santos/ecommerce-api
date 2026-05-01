import { buscarProdutos } from "../api/produtosApi.js"
import { renderizarProdutos } from "../modules/produtos.js"
import { 
    configurarFiltros,
    setBusca
} from "../modules/filtros.js"
import { configurarEventos } from "../modules/eventos.js"

import { atualizarContador } from "../utils/ui.js"

let timeout

async function iniciar(){

    const container = document.getElementById("produtos")

    container.innerHTML = `
        <div class="loading">
            <div class="spinner"></div>
        </div>
    `

    const produtos = await buscarProdutos()

    configurarFiltros(produtos, renderizarProdutos)

    configurarEventos()

    atualizarContador()
}

const inputBusca = document.getElementById("input-busca")

    if(inputBusca){

        inputBusca.addEventListener("input", (e) => {

            clearTimeout(timeout)

            timeout = setTimeout(() => {
            
                setBusca(e.target.value.trim())

            }, 400)
        })
    }

    iniciar()