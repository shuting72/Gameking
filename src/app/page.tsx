'use client';

import { useState, useEffect, useRef } from 'react';

const questionBank = [
  { question: '貓有四隻腳', answer: true },
  { question: '狗會飛', answer: false },
  { question: '電腦需要電', answer: true },
  { question: '水是固體', answer: false },
  { question: '太陽是地球的主要光源', answer: true },
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
  { question: '一週有七天', answer: true },
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
  { question: '馬會潛水', answer: false },
  { question: '鋼琴是樂器', answer: true },
  { question: '洗衣機可以洗澡', answer: false },
  { question: '眼睛是用來看的', answer: true },
  { question: '冰會融化成水', answer: true },
  { question: '太空沒有空氣', answer: true },
  { question: '人類可以不用睡覺', answer: false },
  { question: '蜘蛛有八隻腳', answer: true },
  { question: '月亮是地球的衛星', answer: true },
  { question: '牛會下蛋', answer: false },
  { question: '冬天會下雪', answer: true },
  { question: '橘子是紫色的', answer: false },
  { question: '寫字用手寫', answer: true },
  { question: '馬是植物', answer: false },
  { question: '太陽是恆星', answer: true },
  { question: '火車比飛機快', answer: false },
  { question: '鯊魚是魚類', answer: true },
  { question: '烏龜會飛', answer: false },
  { question: '人只有一顆心臟', answer: true },
  { question: '西瓜裡面是紅色的', answer: true },
  { question: '企鵝生活在北極', answer: false },
  { question: '筆電需要充電', answer: true },
  { question: '青蛙會游泳', answer: true },
  { question: '牛奶是從牛身上擠出來的', answer: true },
  { question: '鯊魚是哺乳動物', answer: false },
  { question: '北極熊生活在南極', answer: false },
  { question: '馬鈴薯長在地底下', answer: true },
  { question: '彩虹有七種顏色', answer: true },
  { question: '一加一等於三', answer: false },
  { question: '中國的首都是北京', answer: true },
  { question: '月亮本身會發光', answer: false },
  { question: '風是看不見的', answer: true },
  { question: '地球繞著太陽轉', answer: true },
  { question: '日本是一個島國', answer: true },
  { question: '海水是鹹的', answer: true },
  { question: '豬會下蛋', answer: false },
  { question: '橘子是藍色的', answer: false },
  { question: '三角形有四條邊', answer: false },
  { question: '1公斤鐵和1公斤棉花一樣重', answer: true },
  { question: '法國在歐洲', answer: true },
  { question: '金字塔在埃及', answer: true },
  { question: '紐約是美國的首都', answer: false },
  { question: '跑比走慢', answer: false },
  { question: '老虎是貓科動物', answer: true },
  { question: '5G比4G慢', answer: false },
  { question: '清朝比民國早', answer: true },
  { question: '一世紀有100年', answer: true },
  { question: '吉他是四條弦', answer: false },
  { question: '聖誕節是12月25日', answer: true },
  { question: '端午節會划龍舟', answer: true },
  { question: '檸檬是酸的', answer: true },
  { question: '唱歌用的是耳朵', answer: false },
  { question: '吃飯要用嘴巴', answer: true }
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
  const [highScores, setHighScores] = useState<{ name: string; score: number }[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (started && timeLeft > 0) {
      timerRef.current = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    } else if (timeLeft === 0 && timerRef.current) {
      clearTimeout(timerRef.current);

      setHighScores((prev) => {
        const existingIndex = prev.findIndex((p) => p.name === username);
        let updated = [...prev];

        if (existingIndex !== -1) {
          if (score > prev[existingIndex].score) {
            updated[existingIndex].score = score;
          }
        } else {
          updated.push({ name: username, score });
        }

        return updated
          .sort((a, b) => b.score - a.score)
          .slice(0, 3);
      });
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
    if (ans !== question.answer) setScore((s) => s + 1);
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
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-4xl font-bold mb-6">誰是錯王 👑</h1>

      {!started && (
        <div className="w-full max-w-sm bg-white rounded-xl shadow p-6 flex flex-col gap-4">
          <div>
            <div className="font-semibold mb-2">排行榜</div>
            {highScores.map((entry, index) => (
              <div key={index} className="flex justify-between">
                <span>{index + 1}. {entry.name}</span>
                <span>{entry.score} 分</span>
              </div>
            ))}
          </div>
          <input
            className="text-black p-2 border rounded"
            placeholder="請輸入名字"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button className="bg-black text-white py-2 rounded text-lg" onClick={handleStart}>開始挑戰</button>
          <div className="text-sm text-gray-500">玩法：一分鐘內答錯越多題越高分！（答對會扣分）</div>
        </div>
      )}

      {started && timeLeft > 0 && question && (
        <div className="flex flex-col items-center gap-4 mt-6">
          <div className="text-xl">剩餘時間：{timeLeft} 秒</div>
          <div className="text-3xl font-semibold text-center px-4">{question.question}</div>
          <div className="flex gap-8 mt-4">
            <button className="bg-green-500 text-white px-8 py-4 rounded text-4xl" onClick={() => handleAnswer(true)}>O</button>
            <button className="bg-red-500 text-white px-8 py-4 rounded text-4xl" onClick={() => handleAnswer(false)}>X</button>
          </div>
          <div className="text-sm text-gray-500 mt-2">錯題數：{score} ／ 作答總數：{totalAnswered}</div>
        </div>
      )}

      {started && timeLeft === 0 && (
        <div className="text-center mt-6">
          <h2 className="text-2xl font-bold mb-2">時間到！</h2>
          <p className="text-lg">你答錯了 {score} 題，共作答 {totalAnswered} 題。</p>
          <button className="mt-4 bg-black text-white px-4 py-2 rounded" onClick={() => setStarted(false)}>再玩一次</button>
        </div>
      )}
    </div>
  );
}
