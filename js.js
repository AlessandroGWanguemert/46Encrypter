
window.onload = function () {
    const modoOscuroBtn = document.getElementById("modo-oscuro");
const body = document.body;

modoOscuroBtn.addEventListener("click", () => {
  body.classList.toggle("dark");
 

});
}