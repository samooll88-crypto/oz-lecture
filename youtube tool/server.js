const express = require("express");
const cors = require("cors");
require("dotenv").config();
const OpenAI = require("openai");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

console.log("API KEY loaded:", !!process.env.OPENAI_API_KEY);

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.get("/test", (req, res) => {
  res.send("서버 테스트 성공");
});

app.post("/generate", async (req, res) => {
  const { topic } = req.body;

  if (!topic || !topic.trim()) {
    return res.status(400).json({ error: "주제를 입력해주세요." });
  }

const prompt = `
당신은 클릭률 높은 유튜브 제목과 썸네일 문구를 만드는 전문가입니다.

주제: ${topic}

아래 조건을 반드시 지켜서 작성하세요.

[제목 작성 규칙]
- 실제 유튜브에서 클릭하고 싶어지는 스타일
- 너무 평범하거나 설명적인 문장 금지
- 궁금증, 반전, 충격, 갈등, 감정 중 최소 1개 포함
- 길이는 18~28자
- "총정리", "알려드립니다" 같은 밋밋한 표현 금지
- 사람들이 바로 눌러보고 싶게 작성

[썸네일 문구 작성 규칙]
- 4~8자 중심
- 짧고 세게
- 단순 요약 금지
- 감정적 반응 또는 궁금증 유발
- 서로 비슷한 표현 반복 금지

[출력 방식]
1. 제목 10개 작성
2. 썸네일 문구 15개 작성
3. 가장 클릭률 높을 것 같은 추천 조합 TOP 3를 따로 제시

[스타일]
- 드라마 리뷰/이슈 채널에서 실제로 쓸 법한 느낌
- 자극적이되 너무 어색하지 않게
- 사람이 직접 쓴 것처럼 자연스럽게

반드시 아래 형식으로만 답하세요.

제목:
1.
2.
3.
4.
5.
6.
7.
8.
9.
10.

썸네일:
1.
2.
3.
4.
5.
6.
7.
8.
9.
10.
11.
12.
13.
14.
15.

추천조합:
1. 제목:
   썸네일:
2. 제목:
   썸네일:
3. 제목:
   썸네일:
`;

  try {
    const response = await client.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 500,
    });

    const result = response.choices[0].message.content;
    res.json({ result });
  } catch (error) {
    console.error("OpenAI error:", error);
    res.status(500).json({
      error: "AI 생성 중 오류가 발생했습니다.",
      detail: error.message,
    });
  }
});

app.listen(port, () => {
  console.log(`서버 실행 중: http://localhost:${port}`);
});