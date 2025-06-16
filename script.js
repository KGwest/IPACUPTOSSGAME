const questions = [
  {
    words: ["seat", "sheep", "beet"],
    ipa: "i",
    emoji: "😊",
    options: [
      { symbol: "i", emoji: "😊" },
      { symbol: "ɪ", emoji: "😗" },
      { symbol: "e", emoji: "😁" },
    ],
  },
  {
    words: ["sit", "ship", "bit"],
    ipa: "ɪ",
    emoji: "😗",
    options: [
      { symbol: "e", emoji: "😁" },
      { symbol: "ɪ", emoji: "😗" },
      { symbol: "æ", emoji: "😃" },
    ],
  },
  {
    words: ["cat", "bat", "trap"],
    ipa: "æ",
    emoji: "😃",
    options: [
      { symbol: "ɪ", emoji: "😗" },
      { symbol: "æ", emoji: "😃" },
      { symbol: "ɑ", emoji: "😎" },
    ],
  },
];

let score = 0;
let current = {};

function randomQuestion() {
  return questions[Math.floor(Math.random() * questions.length)];
}

function renderQuestion() {
  current = randomQuestion();
  const container = document.getElementById("game-container");
  container.innerHTML = `
    <div class="card">
      <h2>🎯 Guess the IPA Sound</h2>
      <p>Which IPA symbol is shared by these words?</p>
      <ul class="word-list">${current.words.map(w => `<li>${w}</li>`).join("")}</ul>
      <div class="options">
        ${current.options.map(opt => `
          <button onclick="handleSelect('${opt.symbol}')">
            <span>${opt.emoji}</span><br>${opt.symbol}
          </button>
        `).join("")}
      </div>
      <div id="result"></div>
      <div class="score">Score: ${score}</div>
    </div>
  `;
}

function handleSelect(selected) {
  const resultDiv = document.getElementById("result");
  if (selected === current.ipa) {
    score++;
    resultDiv.innerHTML = `
      <p class="correct">Correct! Now throw your ball! 🏀</p>
      <button onclick="handleThrow()">Throw Ball into Cup 🟥</button>
    `;
  } else {
    resultDiv.innerHTML = `<p class="wrong">Oops! That's not the right sound.</p>
      <button onclick="renderQuestion()">Try Another</button>`;
  }
}

function handleThrow() {
  const resultDiv = document.getElementById("result");
  const outcome = Math.random() > 0.5 ? "scored" : "missed";
  resultDiv.innerHTML = `
    <p class="${outcome === 'scored' ? 'correct' : 'missed'}">
      ${outcome === 'scored' ? "🎉 Nice shot!" : "Almost! Try again next round."}
    </p>
    <button onclick="renderQuestion()">Next</button>
  `;
}

renderQuestion();
