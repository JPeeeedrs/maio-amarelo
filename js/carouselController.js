// Módulo para checar as respostas (answerChecker.js)
const answerChecker = (function () {
	// Respostas corrigidas com termo "sinistros"
	const correctAnswers = [
		"Um movimento para conscientização sobre segurança no trânsito.",
		"Reduzir o número de sinistros de trânsito.", // Atualizado
		"Porque o amarelo é a cor da sinalização de atenção no trânsito.",
		"O CONTRAN (Conselho Nacional de Trânsito).",
		"Respeitar os limites de velocidade e regras de trânsito.",
		"O consumo de álcool e direção.",
		"Ligar para os serviços de emergência e prestar ajuda se possível.",
		"Ele reduz o risco de ferimentos graves em caso de sinistro.", // Atualizado
		"O veículo o condutor e a via.",
		"Usar a faixa de pedestres e olhar para os dois lados.",
	];

	function normalize(str) {
		return str.toLowerCase().replace(/\s+/g, " ").trim();
	}

	function checkAnswer(questionIndex, selectedAnswer) {
		return (
			normalize(selectedAnswer) === normalize(correctAnswers[questionIndex])
		);
	}

	return { checkAnswer };
})();

// carouselController.js
document.addEventListener("DOMContentLoaded", function () {
	const carouselItems = document.querySelectorAll(".carousel-item");
	const restartBtn = document.getElementById("restartBtn");
	let currentSlide = 0;
	let score = 0;

	function showSlide(index) {
		carouselItems.forEach((item, i) => {
			item.classList.toggle("active", i === index);
		});
	}

	function resetButtonStyles(buttons) {
		buttons.forEach((btn) => {
			btn.style.backgroundColor = "";
			btn.style.color = "";
			btn.style.borderColor = "";
		});
	}

	function handleAnswer(e) {
		const button = e.target;
		const buttons = carouselItems[currentSlide].querySelectorAll("button");

		// Desativa todos os botões
		buttons.forEach((btn) => (btn.disabled = true));

		// Verifica resposta
		const isCorrect = answerChecker.checkAnswer(
			currentSlide,
			button.textContent
		);

		// Estiliza a resposta selecionada
		if (isCorrect) {
			score++;
			button.style.backgroundColor = "#28a745";
			button.style.color = "white";
		} else {
			button.style.backgroundColor = "#dc3545";
			button.style.color = "white";

			// Encontra e destaca a resposta correta
			buttons.forEach((btn) => {
				if (answerChecker.checkAnswer(currentSlide, btn.textContent)) {
					btn.style.backgroundColor = "#28a745";
					btn.style.color = "white";
				}
			});
		}

		// Avança após 1.5 segundos
		setTimeout(() => {
			if (currentSlide < carouselItems.length - 1) {
				currentSlide++;
				resetButtonStyles(buttons);
				showSlide(currentSlide);
			} else {
				alert(`Você acertou ${score} de ${carouselItems.length} perguntas!`);
				restartBtn.classList.remove("d-none");
			}
		}, 1500);
	}

	function initQuiz() {
		document.querySelectorAll(".options button").forEach((button) => {
			button.addEventListener("click", handleAnswer);
		});
		showSlide(0);
	}

	// Reiniciar quiz
	restartBtn.addEventListener("click", () => {
		currentSlide = 0;
		score = 0;
		restartBtn.classList.add("d-none");
		carouselItems.forEach((item) => {
			const buttons = item.querySelectorAll("button");
			resetButtonStyles(buttons);
			buttons.forEach((btn) => (btn.disabled = false));
		});
		initQuiz();
	});

	initQuiz();
});
