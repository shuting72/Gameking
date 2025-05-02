// src/lib/getAiQuestion.ts

export async function getAiQuestion() {
  const response = await fetch("/api/ai-question");
  if (!response.ok) throw new Error("取得題目失敗");
  const data = await response.json();
  return data;
}
