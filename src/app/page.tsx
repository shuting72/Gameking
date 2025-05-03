'use client';

import { useState, useEffect, useRef } from 'react';

const questionBank = [
  { question: '貓有四隻腳', answer: true },
  { question: '狗會飛', answer: false },
  { question: '電腦需要電', answer: true },
  { question: '水是固體', answer: false },
  { question: '太陽會發光', answer: true },
  { question: '冰淇淋是熱的', answer: false },
  { question: '人類會呼吸', answer: true },
  { question: '天空是綠色的', answer: false },
  { question: '魚會游泳', answer: true },
  { question: '椅子有兩隻腳', answer: false },
  { question: '太陽從東邊升起', answer: true },
  { question: '貓會飛', answer: false },
  { question: '人有五根手指', answer: true },
  { question: '魚可以在陸地上呼吸', answer: false },
  { question: '鳥類會下蛋', answer: true },
  { question: '一週有七天', answer: false },
  { question: '蘋果是水果', answer: true },
  { question: '晚上太陽很亮', answer: false },
  { question: '地球是圓的', answer: true },
  { question: '沙漠裡常下雪', answer: false },
  { question: '火會燙', answer: true },
  { question: '書本可以吃', answer: false },
  { question: '香蕉是黃色的', answer: true },
  { question: '天空是紅色的', answer: false },
  { question: '水可以喝', answer: true },
  { question: '冰塊比火還燙', answer: false },
  { question: '冬天比夏天冷', answer: true },
  { question: '馬會游泳', answer: false },
  { question: '鋼琴是樂器', answer: true },
  { question: '洗衣機可以洗澡', answer: false },
];

const generateQuestion = () => {
  return questionBank[Math.floor(Math.random() * questionBank.length)];
};

export default function Home() {
  const [username, setUsername] = useState('');
  const [started, setStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [score, setScore] = useState(0);
  const [totalAnswered, setTotalAnswered] = useState(0);
  const [question, setQuestion] = useState(null);
  const [highScore, setHighScore] = useState({ name: '', score: 0 });
  const timerRef = useRef(null);

  useEffect(() => {
    if (started && timeLeft > 0) {
      timerRef.current = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    } else if (timeLeft === 0 && timerRef.current) {
      clearTimeout(timerRef.current);
      if (score > highScore.score) {
        setHighScore({ name: username, score });
      }
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [timeLeft, started]);

  useEffect(() => {
    if (started && !question) {
      setQuestion(generateQuestion());
    }
  }, [started, question]);

  const handleAnswer = (ans) => {
    if (timeLeft === 0 || !question) return;
    setScore((prev) => (ans !== question.answer ? prev + 1 : prev - 1));
    setTotalAnswered((t) => t + 1);
    setQuestion(generateQuestion());
  };

  const handleStart = () => {
    if (!username) return alert('請輸入名字');
    setStarted(true);
    setTimeLeft(60);
    setScore(0);
    setTotalAnswered(0);
    setQuestion(generateQuestion());
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-black text-white">
      <h1 className="text-6xl font-extrabold mb-10 tracking-wide">誰是錯王 👑</h1>

      {!started && (
        <div className="w-full max-w-md bg-white text-black rounded-2xl shadow-lg p-8 space-y-4">
          <input
            className="text-black p-3 border rounded text-lg"
            placeholder="請輸入名字"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button className="bg-black text-white py-3 rounded text-xl" onClick={handleStart}>
            開始挑戰
          </button>
          <div className="text-sm text-gray-600">玩法：一分鐘內答錯越多題越高分！（答對會扣分）</div>
          <div className="text-sm text-gray-600">
            目前最高分：{highScore.name}（{highScore.score} 題）
          </div>
        </div>
      )}

      {started && timeLeft > 0 && question && (
        <div className="flex flex-col items-center gap-6 mt-10">
          <div className="text-3xl font-medium">剩餘時間：{timeLeft} 秒</div>
          <div className="text-5xl font-bold text-center px-8 leading-snug">
            {question.question}
          </div>
          <div className="flex gap-12 mt-4">
            <button
              className="bg-green-500 hover:bg-green-600 text-white px-10 py-6 rounded-2xl text-5xl shadow-lg transition"
              onClick={() => handleAnswer(true)}
            >
              O
            </button>
            <button
              className="bg-red-500 hover:bg-red-600 text-white px-10 py-6 rounded-2xl text-5xl shadow-lg transition"
              onClick={() => handleAnswer(false)}
            >
              X
            </button>
          </div>
          <div className="text-lg text-gray-300 mt-4">
            錯題數：{score} ／ 作答總數：{totalAnswered}
          </div>
        </div>
      )}

      {started && timeLeft === 0 && (
        <div className="text-center mt-12">
          <h2 className="text-4xl font-bold mb-4">時間到！</h2>
          <p className="text-2xl">你答錯了 {score} 題，共作答 {totalAnswered} 題。</p>
          <button
            className="mt-6 bg-white text-black px-6 py-3 rounded-xl text-lg"
            onClick={() => setStarted(false)}
          >
            再玩一次
          </button>
        </div>
      )}
    </div>
  );
}
