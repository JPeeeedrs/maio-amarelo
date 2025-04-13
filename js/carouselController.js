// Módulo para checar as respostas (answerChecker.js)
const answerChecker = (function() {
    // Array com as respostas corretas (em ordem dos slides)
    const correctAnswers = [
        "Um movimento para conscientização sobre segurança no trânsito.",
        "Reduzir o número de acidentes de trânsito.",
        "Porque o amarelo é a cor da sinalização de atenção no trânsito.",
        "O CONTRAN (Conselho Nacional de Trânsito).",
        "Respeitar os limites de velocidade e regras de trânsito.",
        "O consumo de álcool e direção.",
        "Ligar para os serviços de emergência e prestar ajuda se possível.",
        "Ele reduz o risco de ferimentos graves em caso de acidente.",
        "O veículo o condutor e a via.",
        "Usar a faixa de pedestres e olhar para os dois lados."
    ];

    /**
     * Verifica se a resposta selecionada está correta para a pergunta.
     * @param {number} questionIndex - Índice da pergunta (slide).
     * @param {string} selectedAnswer - Texto da resposta selecionada.
     * @returns {boolean} - Retorna true se estiver correta, false se não.
     */
    function checkAnswer(questionIndex, selectedAnswer) {
        return selectedAnswer === correctAnswers[questionIndex];
    }

    return {
        checkAnswer: checkAnswer
    };
})();


// carouselController.js
document.addEventListener("DOMContentLoaded", function() {
    // Elementos do DOM
    const carouselItems = document.querySelectorAll('.carousel-item');
    const feedbackContainer = document.getElementById('feedback');
    const restartBtn = document.getElementById("restartBtn");

    // Variáveis de controle do quiz
    let currentSlide = 0;
    let score = 0;

    // Exibe o slide (questão) de acordo com o índice
    function showSlide(index) {
        carouselItems.forEach((item, i) => {
            item.classList.toggle('active', i === index);
        });
        enableCurrentOptions();
    }

    // Desabilita os botões da questão atual para evitar múltiplos cliques
    function disableCurrentOptions() {
        const currentSlideItem = carouselItems[currentSlide];
        const buttons = currentSlideItem.querySelectorAll('button');
        buttons.forEach(button => {
            button.disabled = true;
        });
    }

    // Habilita os botões da questão atual (ao iniciar o slide)
    function enableCurrentOptions() {
        const currentSlideItem = carouselItems[currentSlide];
        const buttons = currentSlideItem.querySelectorAll('button');
        buttons.forEach(button => {
            button.disabled = false;
        });
    }

    // Exibe mensagens de feedback na tela
    function showFeedback(message, color) {
        feedbackContainer.textContent = message;
        feedbackContainer.style.color = color;
    }

    // Avança para o próximo slide ou finaliza o quiz
    function goToNextSlide() {
        currentSlide++;
        if (currentSlide < carouselItems.length) {
            showSlide(currentSlide);
        } else {
            showFinalScore();
        }
    }

    // Exibe a pontuação final e o botão de reiniciar
    function showFinalScore() {
        const currentFeedback = carouselItems[currentSlide - 1].querySelector('#feedback');
        currentFeedback.style.display = 'block';

        if(currentFeedback) {
            currentFeedback.textContent = `Parabéns! Vocês fez ${score} pontos!`;
            currentFeedback.style.color = '#F7AF03';
            currentFeedback.style.display = 'block';
        }

        restartBtn.classList.remove('d-none');
    }

    // Configura os eventos de clique para cada botão de cada slide
    function setupQuiz() {
        carouselItems.forEach((item, index) => {
            const buttons = item.querySelectorAll('button');
            buttons.forEach((button) => {
                button.addEventListener('click', function() {
                    // Se os botões já estiverem desabilitados, sai da função
                    if (this.disabled) return;
                    
                    // Desabilita os botões para evitar cliques múltiplos
                    disableCurrentOptions();
                    
                    const answer = this.textContent.trim();
                    const isCorrect = answerChecker.checkAnswer(index, answer);

                    if (isCorrect) {
                        score++; 
                        this.style.backgroundColor = 'green';
                        this.style.color = 'white';
                    } else {
                        this.style.backgroundColor = 'red';
                        this.style.color = 'white';
                    }

                    // Após um pequeno delay, limpa o feedback e avança para a próxima pergunta
                    setTimeout(() => {
                        showFeedback("", "");
                        goToNextSlide();
                    }, 1500);
                });
            });
        });
    }
    
    // Reinicia o quiz ao clicar no botão de reiniciar
    restartBtn.addEventListener('click', function() {
        currentSlide = 0;
        score = 0;
        showSlide(currentSlide);
        showFeedback("", "");
        restartBtn.classList.add('d-none');

        carouselItems.forEach((item) => {
            const buttons = item.querySelectorAll('button');
            buttons.forEach(button => {
                button.style.backgroundColor = '';
                button.style.color = '';
            });
        });
    });

    // Inicia o quiz
    showSlide(currentSlide);
    setupQuiz();
});
