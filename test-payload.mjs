import { GoogleGenAI, Type } from "@google/genai";

const apiKey = "AIzaSyBtODifrRTdWHLiTUpaLCSXYhtQdUNZbbw";
const ai = new GoogleGenAI({ apiKey });

async function test() {
  try {
    const prompt = `You are an expert Indian Election Assistant.
Based on the following user details, determine their voter eligibility and what steps they must take.
User Details:
- Age: yes
- City: Delhi
- Has Voter ID?: yes
- Moved recently?: no

Return a strictly formatted JSON response based on this schema.
Rules:
- If age is 'no' (under 18), they are Not Eligible.
- If they moved recently, they need to fill Form 8.
- If they don't have a Voter ID and are 18+, they need Form 6.
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            eligibility: {
              type: Type.STRING,
              description: "Must be exactly 'Eligible', 'Not Eligible', or 'Action Required'"
            },
            reason: {
              type: Type.STRING,
              description: "A short, encouraging sentence explaining their eligibility status."
            },
            actions: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "List of exact steps they must take next (e.g., 'Fill Form 6 on NVSP website')."
            },
            documents: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "List of required documents based on their situation."
            },
            next_step: {
              type: Type.STRING,
              description: "The immediate single most important next step."
            }
          },
          required: ["eligibility", "reason", "actions", "documents", "next_step"]
        }
      }
    });

    console.log("SUCCESS TEXT:", response.text);
    JSON.parse(response.text);
    console.log("JSON PARSED OK");
  } catch (err) {
    console.error("API ERROR:", err);
  }
}
test();
