let toastTimeout

export function mostrarToast(mensagem){
    const toast = document.getElementById("toast")
    if(!toast) return

    toast.innerText = mensagem
    toast.classList.add("show")

    clearTimeout(toastTimeout)

    toastTimeout = setTimeout(() => {
        toast.classList.remove("show")
    }, 3000)
}

import { quantidadeTotal } from "../services/carrinhoService.js"

export function atualizarContador(){
    const contador = document.getElementById("contador")
    if(contador){
        contador.innerText = quantidadeTotal()
    }
}