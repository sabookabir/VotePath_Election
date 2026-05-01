import { GoogleGenAI, Type } from "@google/genai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

// Create instance only if API key exists to prevent crashing if not set yet
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

/**
 * MODULE 1: AI Decision Engine (Main Feature)
 * Takes user answers and returns strict JSON for eligibility and actions.
 */
export async function getEligibilityDecision(userData) {
  if (!ai) throw new Error("Gemini API Key is missing. Please add it to your .env file.");

  const prompt = `You are an expert Indian Election Assistant.
Based on the following user details, determine their voter eligibility and what steps they must take.
User Details:
- Age: ${userData.age}
- City: ${userData.city}
- Has Voter ID?: ${userData.hasVoterId}
- Moved recently?: ${userData.movedRecently}

Return a strictly formatted JSON response based on this schema.
Rules:
- If age is 'no' (under 18), they are Not Eligible.
- If they moved recently, they need to fill Form 8.
- If they don't have a Voter ID and are 18+, they need Form 6.
`;

  try {
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

    return JSON.parse(response.text);
  } catch (error) {
    console.error("AI Decision Engine Error:", error);
    throw error;
  }
}

/**
 * MODULE 2: Misinformation Checker
 */
export async function checkMisinformation(statement) {
  if (!ai) throw new Error("Gemini API Key missing.");

  const prompt = `You are a fact-checker for Indian Elections. Analyze this statement for misinformation:
"${statement}"`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            isTrue: { type: Type.BOOLEAN },
            explanation: { type: Type.STRING, description: "Why it is true or false" },
            correct_info: { type: Type.STRING, description: "The actual correct factual information" }
          },
          required: ["isTrue", "explanation", "correct_info"]
        }
      }
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("Misinformation Checker Error:", error);
    throw error;
  }
}

/**
 * MODULE 3: AI Simplifier
 */
export async function simplifyText(complexText) {
  if (!ai) throw new Error("Gemini API Key missing.");

  const prompt = `Simplify this complex Indian election jargon into easy-to-understand terms for a first-time voter:
"${complexText}"`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            simple_english: { type: Type.STRING },
            hindi_translation: { type: Type.STRING }
          },
          required: ["simple_english", "hindi_translation"]
        }
      }
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("Simplifier Error:", error);
    throw error;
  }
}
