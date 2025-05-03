(function () {
	var slide = ["img/maioamarelo.png", "img/maio.png", "img/beber.png"];

	var slideAtual = 0;

	function slider() {
		document.querySelector(".slider img").src = slide[slideAtual];
		slideAtual = (slideAtual + 1) % slide.length;
	}

	document.addEventListener("DOMContentLoaded", function () {
		setInterval(slider, 3000);
	});
})();

(function () {
	var slide = [
		"img/sestsenat/1.png",
		"img/sestsenat/2.png",
		"img/sestsenat/3.png",
		"img/sestsenat/4.png",
		"img/sestsenat/5.png",
		"img/sestsenat/6.png",
		"img/sestsenat/7.png",
		"img/sestsenat/8.png",
	];

	var slideAtual = 0;

	function carrossel() {
		document.querySelector(".carrossel img").src = slide[slideAtual];
		slideAtual = (slideAtual + 1) % slide.length;
	}

	document.addEventListener("DOMContentLoaded", function () {
		setInterval(carrossel, 5000);
	});
})();
