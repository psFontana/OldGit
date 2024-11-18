let aumentar = document.getElementById("aumentar")
let diminuir = document.getElementById("diminuir")
let retornar = document.getElementById("retornar")
let image = document.getElementById("image")
let width = image.offsetWidth

aumentar.addEventListener("click", () => {
    image.style.width = `${image.offsetWidth + 10}px`
})
diminuir.addEventListener("click", () => {
    image.style.width = `${image.offsetWidth - 10}px`
})
retornar.addEventListener("click", () => {
    image.style.width = `${width}px`
})