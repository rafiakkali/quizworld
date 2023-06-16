const startButton = document.getElementById('start-button');
const questionElement = document.getElementById('question');
const optionsContainer = document.getElementById('options-container');
const answerElement = document.getElementById('answer');
const timerElement = document.getElementById('timer');
const quizContainer = document.getElementById('quiz-container');
let parsedQuestions = [];
let currentQuestionIndex = 0;
let timerInterval;

startButton.addEventListener('click', startQuiz);

function startQuiz() {
  const mcqInput = document.getElementById('mcq-input');
  const mcqData = mcqInput.value.trim();
  parsedQuestions = parseMCQData(mcqData);

  if (parsedQuestions.length > 0) {
    startButton.style.display = 'none';
    mcqInput.style.display = 'none'; // Hide the text box
    quizContainer.style.display = 'block';
    showQuestion();
  }
}


function parseMCQData(mcqData) {
  const questions = mcqData.split(/\d+\.\s/).filter(q => q.trim() !== '');
  return questions.map(question => {
    const optionsAndAnswer = question.split('Answer: ');
    const options = optionsAndAnswer[0].split('\n').filter(o => o.trim() !== '');
    const answer = optionsAndAnswer[1].trim();
    return {
      question: options[0],
      options: options.slice(1),
      answer
    };
  });
}

function showQuestion() {
  const currentQuestion = parsedQuestions[currentQuestionIndex];
  const { question, options } = currentQuestion;

  // Display the question and options
  questionElement.textContent = `Question ${currentQuestionIndex + 1}: ${question}`;
  optionsContainer.innerHTML = '';
  options.forEach(option => {
    const optionElement = document.createElement('p');
    optionElement.textContent = option;
    optionsContainer.appendChild(optionElement);
  });

  answerElement.textContent = ''; // Clear the answer

  timerElement.textContent = '15';
  let timeLeft = 15;
  timerInterval = setInterval(() => {
    timeLeft--;
    timerElement.textContent = timeLeft.toString().padStart(2, '0');
    if (timeLeft === 0) {
      clearInterval(timerInterval);
      showAnswer();
    }
  }, 1000);
}



function showAnswer() {
  const currentQuestion = parsedQuestions[currentQuestionIndex];
  answerElement.textContent = `Answer: ${currentQuestion.answer}`;

  setTimeout(nextQuestion, 3000); // Move to the next question after 3 seconds
}

function nextQuestion() {
  clearInterval(timerInterval);
  currentQuestionIndex++;

  if (currentQuestionIndex < parsedQuestions.length) {
    showQuestion();
  } else {
    // Quiz ended
    questionElement.textContent = 'Quiz ended';
    optionsContainer.innerHTML = '';
    answerElement.textContent = '';
    timerElement.textContent = '00';
  }
}
