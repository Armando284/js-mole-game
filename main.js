const puntos = document.querySelector("#puntos");
const casillas = document.querySelectorAll(".casilla");
const AddOrReduce = document.querySelector("#Velocidad");
const indicator = document.querySelector(".VELOCITY");
let cont = 0;

puntos.textContent = `Puntos: ${cont}`;

casillas.forEach((element) => {
  element.addEventListener("click", () => {
    if (element.classList.contains("topo"))
      puntos.innerHTML = `Puntos: <span>${cont++}</span>`;
  });
});

let VELOCITY = 1000;
let intervalId = setInterval(() => {
  let lugar = Math.floor(Math.random() * 9);
  for (let i = 0; i < casillas.length; i++) {
    lugar === i
      ? casillas[i].classList.add("topo")
      : casillas[i].classList.remove("topo");
  }
}, VELOCITY);

function changeVelocity() {
  clearInterval(intervalId);
  VELOCITY = parseFloat(AddOrReduce.value) * 10;
  intervalId = setInterval(() => {
    let lugar = Math.floor(Math.random() * 9);
    for (let i = 0; i < casillas.length; i++) {
      lugar === i
        ? casillas[i].classList.add("topo")
        : casillas[i].classList.remove("topo");
    }
  }, VELOCITY);
}
AddOrReduce.onchange = changeVelocity;
