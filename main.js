const VELOCIDAD = 600; // reduce este numero para volver mas dificil el juego

const puntos = document.querySelector('#puntos');
let cont = 0;
puntos.textContent = `Puntos: ${cont}`;

const casillas = document.querySelectorAll('.casilla');
console.log(casillas); // mira lo que devuelve el selectorAll para que veas como funciona

casillas.forEach(element => {
	element.addEventListener('click', () => {
		if(element.classList.contains('topo')) puntos.textContent = `Puntos: ${cont++}`;
	});
});

setInterval(() => {
	let lugar = Math.floor(Math.random()*9);
	for (let i = 0; i < casillas.length; i++) {
		lugar == i ? casillas[i].classList.add('topo') : casillas[i].classList.remove('topo');
	}
}, VELOCIDAD);