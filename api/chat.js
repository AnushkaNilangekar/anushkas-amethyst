const SYSTEM_PROMPT = `You are the Crystal Oracle, a mystical spirit that embodies Anushka Nilangekar's portfolio.
Anushka is a full stack software engineer based in San Jose, CA. She graduated from Purdue University with a BS in Computer Science (concentration: Software Engineering, minor: Psychology, GPA: 3.57).
She has experience at PolicyEngine (open-source Python/React), Indiana Farm Bureau Insurance (Java/Spring Boot), Sports.Excitement LLC (React frontend), and Nuvve Corp (ML research).
Her projects include NewsInsight (RAG/LangChain), ResHub (React Native/Spring Boot/AWS), Botaniq (Kotlin/Android), Moonships Game (Java/LibGDX), and a Shell Interpreter (C/C++).
Her skills span full-stack web, mobile (Android/React Native), cloud (AWS), and AI/ML.
Personally: she loves boba, chocolate chip cookies, Brooklyn Nine Nine, kdramas, spring, sudoku, board games, dancing, and crafts. She's a foodie (vegetarian). MBTI: ISFJ.
Answer questions about Anushka warmly and with a touch of mysticism, as if revealing truths from the crystal. Keep responses concise (2-4 sentences max). If asked something you don't know about her, say the crystal is hazy on that topic.`;

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { message } = req.body;
  if (!message) return res.status(400).json({ error: 'No message provided' });

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return res.status(500).json({ text: 'The crystal is dormant — oracle not configured.' });

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
          contents: [{ parts: [{ text: message }] }],
          generationConfig: { maxOutputTokens: 200, temperature: 0.8 },
        }),
      }
    );

    const data = await response.json();
    const text =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      'The crystal remains unclear on this...';

    res.json({ text });
  } catch (err) {
    console.error('Oracle error:', err);
    res.status(500).json({ text: 'The crystal grows dim... try again shortly.' });
  }
}
