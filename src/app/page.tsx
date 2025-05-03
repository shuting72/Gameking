'use client';

import { useState, useEffect, useRef } from "react";

const questionBank = [
  { question: "貓有四隻腳", answer: true },
  { question: "狗會飛", answer: false },
  { question: "電腦需要電", answer: true },
  { question: "水是固體", answer: false },
  { question: "太陽會發光", answer: true },
  { question: "冰淇淋是熱的", answer: false },
  { question: "人類會呼吸", answer: true },
  { question: "天空是綠色的", answer: false },
  { question: "魚會游泳", answer: true },
  { question: "椅子有兩隻腳", answer: false },
  { question: "太陽從東邊升起", answer: true },
  { question: "貓會飛", answer: false },
  { question: "人有五根手指", answer: true },
  { question: "魚可以在陸地上呼吸", answer: false },
  { question: "鳥類會下蛋", answer: true },
  { question: "一週有七天", answer: true },
  { question: "蘋果是水果", answer: true },
  { question: "晚上太陽很亮", answer: false },
  { question: "地球是圓的", answer: true },
  { question: "沙漠裡常下雪", answer: false },
  { question: "火會燙", answer: true },
  { question: "書本可以吃", answer: false },
  { question: "香蕉是黃色的", answer: true },
  { question: "天空是紅色的", answer: false },
  { question: "水可以喝", answer: true },
  { question: "冰塊比火還燙", answer: false },
  { question: "冬天比夏天冷", answer: true },
  { question: "馬會游泳", answer: true },
  { question: "鋼琴是樂器", answer: true },
  { question: "洗衣機可以洗澡", answer: false },
];

const generateQuestion = () => {
  const item = questionBank[Math.floor(Math.random() * questionBank.length)];
  return {
    question: item.question,
    answer: item.answer,
  };
};

export default function Home() {
  const [username, setUsername] = useState("");
  const [started, setStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [score, setScore] = useState(0);
  const [totalAnswered, setTotalAnswered] = useState(0);
  const [question, setQuestion] = useState<{ question: string; answer: boolean } | null>(null);
  const [highScore, setHighScore] = useState({ name: "", score: 0 });
  const timerRef = useRef<NodeJS.Timeout | null>(null);

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

  const handleAnswer = (ans: boolean) => {
    if (timeLeft === 0 || !question) return;
    if (ans !== question.answer) {
      setScore((s) => s + 1); // 答錯加分
    } else {
      setScore((s) => Math.max(0, s - 1)); // 答對扣分（不低於0）
    }
    setTotalAnswered((t) => t + 1);
    setQuestion(generateQuestion());
  };

  const handleStart = () => {
    if (!username) return alert("請輸入名字");
    setStarted(true);
    setTimeLeft(60);
    setScore(0);
    setTotalAnswered(0);
    setQuestion(generateQuestion());
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-br from-yellow-100 via-white to-blue-100">
      <h1 className="text-7xl font-extrabold text-gray-800 mb-10 drop-shadow-md">誰是錯王 👑</h1>

      {!started && (
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 flex flex-col gap-4">
          <input
            className="text-black p-3 border rounded text-lg"
            placeholder="請輸入名字"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button className="bg-gradient-to-r from-green-400 to-blue-500 text-white py-3 rounded-xl text-xl font-semibold shadow-md" onClick={handleStart}>開始挑戰</button>
          <div className="text-sm text-gray-500">玩法：答錯加1分，答對扣1分，限時60秒！</div>
          <div className="text-sm text-gray-500">目前最高分：{highScore.name}（{highScore.score} 題）</div>
        </div>
      )}

      {started && timeLeft > 0 && question && (
        <div className="flex flex-col items-center gap-6 mt-8">
          <div className="text-2xl">剩餘時間：{timeLeft} 秒</div>
          <div className="text-5xl font-semibold text-center px-12 text-gray-800">{question.question}</div>
          <div className="flex gap-10 mt-6">
            <button className="bg-green-500 hover:bg-green-600 transition text-white px-10 py-6 rounded-2xl text-5xl shadow-lg" onClick={() => handleAnswer(true)}>O</button>
            <button className="bg-red-500 hover:bg-red-600 transition text-white px-10 py-6 rounded-2xl text-5xl shadow-lg" onClick={() => handleAnswer(false)}>X</button>
          </div>
          <div className="text-lg text-gray-600 mt-2">錯題數：{score} ／ 作答總數：{totalAnswered}</div>
        </div>
      )}

      {started && timeLeft === 0 && (
        <div className="text-center mt-10">
          <h2 className="text-3xl font-bold mb-4">時間到！</h2>
          <p className="text-xl">你答錯了 {score} 題，共作答 {totalAnswered} 題。</p>
          <button className="mt-6 bg-black text-white px-6 py-3 rounded-xl text-lg" onClick={() => setStarted(false)}>再玩一次</button>
        </div>
      )}
    </div>
  );
}
