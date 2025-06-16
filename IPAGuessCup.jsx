import React, { useState } from "react";

// Example game data:
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

function randomQuestion() {
  return questions[Math.floor(Math.random() * questions.length)];
}

export default function IPAGuessCup() {
  const [current, setCurrent] = useState(randomQuestion());
  const [selected, setSelected] = useState(null);
  const [result, setResult] = useState(null);
  const [ballThrown, setBallThrown] = useState(false);
  const [score, setScore] = useState(0);

  const handleSelect = (option) => {
    setSelected(option.symbol);
    if (option.symbol === current.ipa) {
      setResult("correct");
      setScore(score + 1);
    } else {
      setResult("wrong");
    }
    setBallThrown(false);
  };

  const handleThrow = () => {
    // Simulate a 50/50 success for fun
    setBallThrown(Math.random() > 0.5 ? "scored" : "missed");
  };

  const handleNext = () => {
    setCurrent(randomQuestion());
    setSelected(null);
    setResult(null);
    setBallThrown(false);
  };

  return (
    <div className="max-w-md mx-auto bg-neutral-900 rounded-2xl p-8 shadow-xl text-white flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4 text-center">🎯 Guess the IPA Sound</h2>
      <div className="mb-3 text-neutral-300">
        <span className="font-semibold">Which IPA symbol is shared by these words?</span>
        <ul className="my-2 flex gap-2 justify-center">
          {current.words.map((w) => (
            <li key={w} className="bg-blue-900/60 px-3 py-1 rounded-lg">{w}</li>
          ))}
        </ul>
      </div>
      <div className="flex gap-4 mb-6">
        {current.options.map((opt) => (
          <button
            key={opt.symbol}
            onClick={() => handleSelect(opt)}
            className={`flex flex-col items-center px-4 py-2 rounded-xl font-bold border-2 ${
              selected === opt.symbol
                ? opt.symbol === current.ipa
                  ? "bg-green-600 border-green-400"
                  : "bg-red-600 border-red-400"
                : "bg-neutral-800 border-neutral-700 hover:bg-blue-800"
            }`}
            disabled={selected}
          >
            <span className="text-3xl">{opt.emoji}</span>
            <span className="text-xl mt-1 font-mono">{opt.symbol}</span>
          </button>
        ))}
      </div>

      {result === "correct" && !ballThrown && (
        <div className="flex flex-col items-center mb-4">
          <span className="text-green-400 font-bold mb-2">
            Correct! Now throw your ball! 🏀
          </span>
          <button
            className="mt-2 px-8 py-2 rounded-xl bg-pink-700 hover:bg-pink-800 text-white font-bold text-lg shadow-lg"
            onClick={handleThrow}
          >
            Throw Ball into Cup 🟥
          </button>
        </div>
      )}
      {ballThrown && (
        <div className="text-xl font-bold mb-4">
          {ballThrown === "scored" ? (
            <span className="text-pink-400">
              🎉 Nice shot! You landed it in the cup!
            </span>
          ) : (
            <span className="text-yellow-400">
              Almost! Try again next round.
            </span>
          )}
        </div>
      )}
      {result === "wrong" && (
        <div className="text-red-400 font-bold mb-4">Oops! That's not the sound. Try again next round.</div>
      )}
      {(result || ballThrown) && (
        <button
          className="mt-2 px-6 py-2 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold shadow"
          onClick={handleNext}
        >
          Next
        </button>
      )}
      <div className="mt-8 text-neutral-400 text-sm">Score: {score}</div>
      <div className="mt-1 text-xs text-neutral-600">IPA/Emoji mapping is for demo. Add more!</div>
    </div>
  );
}
