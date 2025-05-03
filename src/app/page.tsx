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
  { question: "一週有七天", answer: false },
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
  { question: "馬會游泳", answer: false },
  { question: "鋼琴是樂器", answer: true },
  { question: "洗衣機可以洗澡", answer: false }
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
  const [wrongStreak, setWrongStreak] = useState(0);
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
      setScore((s) => s + 1); // 答錯得分
      setWrongStreak((w) => w + 1);
    } else {
      setScore((s) => Math.max(0, s - 1)); // 答對扣分，最低為 0
      setWrongStreak(0);
    }

    if (wrongStreak >= 4) {
      alert("你已連錯 5 題，請認真作答！");
      setStarted(false);
      return;
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
    setWrongStreak(0);
    setQuestion(generateQuestion());
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-black text-white">
      <h1 className="text-6xl font-bold mb-8">誰是錯王 👑</h1>

      {!started && (
        <div className="w-full max-w-sm bg-white text-black rounded-xl shadow p-6 flex flex-col gap-4">
          <input
            className="p-3 border rounded text-lg"
            placeholder="請輸入名字"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button className="bg-black text-white py-3 rounded text-xl" onClick={handleStart}>
            開始挑戰
          </button>
          <div className="text-sm text-gray-500">玩法：答錯加分，答對扣分，亂猜會被抓到哦！</div>
          <div className="text-sm text-gray-500">目前最高分：{highScore.name}（{highScore.score} 題）</div>
        </div>
      )}

      {started && timeLeft > 0 && question && (
        <div className="flex flex-col items-center gap-6 mt-8">
          <div className="text-2xl">剩餘時間：{timeLeft} 秒</div>
          <div className="text-5xl font-bold text-center px-6">{question.question}</div>
          <div className="flex gap-12 mt-4">
            <button
              className="bg-green-500 text-white px-12 py-6 rounded text-5xl"
              onClick={() => handleAnswer(true)}
            >
              O
            </button>
            <button
              className="bg-red-500 text-white px-12 py-6 rounded text-5xl"
              onClick={() => handleAnswer(false)}
            >
              X
            </button>
          </div>
          <div className="text-base text-gray-400 mt-2">
            錯題數：{score} ／ 作答總數：{totalAnswered}
          </div>
        </div>
      )}

      {started && timeLeft === 0 && (
        <div className="text-center mt-8">
          <h2 className="text-3xl font-bold mb-4">時間到！</h2>
          <p className="text-xl">你答錯了 {score} 題，共作答 {totalAnswered} 題。</p>
          <button
            className="mt-6 bg-white text-black px-6 py-3 rounded text-lg"
            onClick={() => setStarted(false)}
          >
            再玩一次
          </button>
        </div>
      )}
    </div>
  );
}

}