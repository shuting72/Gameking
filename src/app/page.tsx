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
  { question: '吃飯要用嘴巴', answer: true }，
  { question: "周杰倫是日本人", answer: false },
  { question: "皮卡丘是藍色的", answer: false },
  { question: "哈利波特騎的是掃把", answer: true },
  { question: "五月天是一部動漫", answer: false },
  { question: "灌籃高手的主角是櫻木花道", answer: true },
  { question: "BLACKPINK 是四個人組成的團體", answer: true },
  { question: "名偵探柯南真實身份是毛利小五郎", answer: false },
  { question: "鋼鐵人是復仇者聯盟的一員", answer: true },
  { question: "冰雪奇緣的主角是安娜和艾莎", answer: true },
  { question: "Snoopy 是隻貓", answer: false },
  { question: "新海誠是音樂製作人", answer: false },
  { question: "蜘蛛人能射出蜘蛛絲", answer: true },
  { question: "《青花瓷》是周杰倫唱的", answer: true },
  { question: "BTS 是韓國男團", answer: true },
  { question: "皮卡丘最常說的是『Pika Pika』", answer: true },
  { question: "火影忍者的九尾是狗", answer: false },
  { question: "泰勒絲是一位搖滾樂手", answer: false }，
];

const shuffle = (arr) => arr.sort(() => 0.5 - Math.random());

export default function Home() {
  const [username, setUsername] = useState('');
  const [started, setStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [score, setScore] = useState(0);
  const [totalAnswered, setTotalAnswered] = useState(0);
  const [question, setQuestion] = useState(null);
  const [recentQuestions, setRecentQuestions] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const timerRef = useRef(null);

  const generateQuestion = () => {
    const options = questionBank.filter(q => !recentQuestions.includes(q.question));
    const next = options[Math.floor(Math.random() * options.length)];
    setRecentQuestions(prev => {
      const updated = [...prev, next.question];
      return updated.length > 5 ? updated.slice(-5) : updated;
    });
    return next;
  };

  useEffect(() => {
    if (started && timeLeft > 0) {
      timerRef.current = setTimeout(() => setTimeLeft(t => t - 1), 1000);
    } else if (timeLeft === 0 && timerRef.current) {
      clearTimeout(timerRef.current);
      const newBoard = [...leaderboard, { name: username, score }]
        .sort((a, b) => b.score - a.score)
        .slice(0, 3);
      setLeaderboard(newBoard);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [timeLeft, started]);

  useEffect(() => {
    if (started && !question) setQuestion(generateQuestion());
  }, [started, question]);

  const handleAnswer = (ans) => {
    if (timeLeft === 0 || !question) return;
    setScore(prev => ans !== question.answer ? prev + 1 : Math.max(0, prev - 1));
    setTotalAnswered(t => t + 1);
    setQuestion(generateQuestion());
  };

  const handleStart = () => {
    if (!username) return alert('請輸入名字');
    setStarted(true);
    setTimeLeft(60);
    setScore(0);
    setTotalAnswered(0);
    setQuestion(generateQuestion());
    setRecentQuestions([]);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-black text-white font-sans">
      <h1 className="text-6xl font-extrabold mb-6 tracking-wide drop-shadow">誰是錯王 👑</h1>

      {/* 排行榜 */}
      <div className="bg-white text-black rounded-2xl shadow-lg p-6 w-full max-w-md mb-6">
        <h2 className="text-2xl font-bold mb-4">排行榜</h2>
        {leaderboard.length === 0 ? <p>暫無紀錄</p> : (
          <ul className="space-y-2">
            {leaderboard.map((entry, idx) => (
              <li key={idx} className="flex justify-between text-lg">
                <span>{idx + 1}. {entry.name}</span>
                <span>{entry.score} 分</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* 遊戲開始區塊 */}
      {!started && (
        <div className="w-full max-w-md bg-white text-black rounded-2xl shadow-lg p-8 space-y-4">
          <input
            className="text-black p-3 border rounded text-lg w-full"
            placeholder="請輸入名字"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button
            className="bg-black text-white py-3 rounded text-xl w-full hover:bg-gray-800 transition"
            onClick={handleStart}
          >
            開始挑戰
          </button>
          <p className="text-gray-600 text-sm">玩法：一分鐘內答錯越多題越高分！（答對會扣分）</p>
        </div>
      )}

      {started && timeLeft > 0 && question && (
        <div className="flex flex-col items-center gap-8 mt-10">
          <div className="text-4xl font-semibold">剩餘時間：{timeLeft} 秒</div>
          <div className="text-5xl font-bold text-center px-8 leading-snug drop-shadow">
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
          <div className="text-lg text-gray-300 mt-4">錯題數：{score} ／ 作答總數：{totalAnswered}</div>
        </div>
      )}

      {started && timeLeft === 0 && (
        <div className="text-center mt-12">
          <h2 className="text-4xl font-bold mb-4">時間到！</h2>
          <p className="text-2xl">你答錯了 {score} 題，共作答 {totalAnswered} 題。</p>
          <button
            className="mt-6 bg-white text-black px-6 py-3 rounded-xl text-lg hover:bg-gray-200 transition"
            onClick={() => setStarted(false)}
          >
            再玩一次
          </button>
        </div>
      )}
    </div>
  );
}
