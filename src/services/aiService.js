import { GoogleGenAI, Type } from "@google/genai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

// 3. RESPONSE CACHING
// Store past responses to prevent duplicate network calls.
const apiCache = new Map();

/**
 * 2. & 4. RATE LIMIT HANDLING & FALLBACK SYSTEM
 * Wrapper function to handle 429 quota errors, retries, and returning safe mock data if the API fully crashes.
 */
async function executeWithRetryAndFallback(prompt, schema, mockFallback) {
  // Check cache first
  const cacheKey = btoa(unescape(encodeURIComponent(prompt))).substring(0, 100);
  if (apiCache.has(cacheKey)) {
    console.log("Returning cached response.");
    return apiCache.get(cacheKey);
  }

  // If no API key configured, instantly return mock fallback to prevent crashing demo
  if (!ai) {
    console.warn("No Gemini API Key found. Returning Demo Mode Fallback.");
    return mockFallback;
  }

  const attemptCall = async () => {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: schema
      }
    });
    return JSON.parse(response.text);
  };

  try {
    const result = await attemptCall();
    apiCache.set(cacheKey, result);
    return result;
  } catch (error) {
    console.error("AI API Error:", error.message);
    
    // Check for 429 Quota Exceeded or 403 Permission Denied
    if (error.message.includes("429") || error.message.includes("403") || error.message.includes("quota") || error.message.includes("PERMISSION_DENIED")) {
      console.warn("Quota or Permission Error detected. Waiting 2 seconds to retry...");
      
      // Wait 2 seconds
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      try {
        console.log("Retrying API call once...");
        const retryResult = await attemptCall();
        apiCache.set(cacheKey, retryResult);
        return retryResult;
      } catch (retryError) {
        console.error("Retry failed. Returning Demo Mode Fallback.");
        return mockFallback; // 4. FALLBACK SYSTEM
      }
    }

    // If it's a completely different fatal error (e.g. network offline), fallback to demo mode
    console.warn("Fatal API Error. Returning Demo Mode Fallback.");
    return mockFallback;
  }
}

// --------------------------------------------------------------------------------
// MODULE 1: AI Decision Engine
// --------------------------------------------------------------------------------

const eligibilitySchema = {
  type: Type.OBJECT,
  properties: {
    eligibility: { type: Type.STRING, description: "Must be exactly 'Eligible', 'Not Eligible', or 'Action Required'" },
    reason: { type: Type.STRING, description: "A short, encouraging sentence explaining their eligibility status." },
    actions: { type: Type.ARRAY, items: { type: Type.STRING }, description: "List of exact steps they must take next." },
    documents: { type: Type.ARRAY, items: { type: Type.STRING }, description: "List of required documents based on their situation." },
    next_step: { type: Type.STRING, description: "The immediate single most important next step." }
  },
  required: ["eligibility", "reason", "actions", "documents", "next_step"]
};

const eligibilityMockFallback = {
  eligibility: "Eligible",
  reason: "Demo Mode Active: You appear eligible based on standard criteria.",
  actions: ["Register on the NVSP portal", "Verify your name in the electoral roll"],
  documents: ["Aadhaar Card", "Address Proof (e.g., Utility Bill)"],
  next_step: "Proceed to voter registration online."
};

export async function getEligibilityDecision(userData) {
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

  return executeWithRetryAndFallback(prompt, eligibilitySchema, eligibilityMockFallback);
}

// --------------------------------------------------------------------------------
// MODULE 2: Misinformation Checker
// --------------------------------------------------------------------------------

const misinfoSchema = {
  type: Type.OBJECT,
  properties: {
    isTrue: { type: Type.BOOLEAN },
    explanation: { type: Type.STRING, description: "Why it is true or false" },
    correct_info: { type: Type.STRING, description: "The actual correct factual information" }
  },
  required: ["isTrue", "explanation", "correct_info"]
};

const misinfoMockFallback = {
  isTrue: false,
  explanation: "Demo Mode Active: We cannot verify this statement right now due to server load.",
  correct_info: "Always verify election news through official Election Commission of India (ECI) channels."
};

export async function checkMisinformation(statement) {
  const prompt = `You are a fact-checker for Indian Elections. Analyze this statement for misinformation:
"${statement}"`;

  return executeWithRetryAndFallback(prompt, misinfoSchema, misinfoMockFallback);
}

// --------------------------------------------------------------------------------
// MODULE 3: AI Simplifier
// --------------------------------------------------------------------------------

const simplifySchema = {
  type: Type.OBJECT,
  properties: {
    simple_english: { type: Type.STRING },
    hindi_translation: { type: Type.STRING }
  },
  required: ["simple_english", "hindi_translation"]
};

const simplifyMockFallback = {
  simple_english: "Demo Mode Active: This means you need to register to vote using the official government website.",
  hindi_translation: "डेमो मोड सक्रिय: इसका मतलब है कि आपको आधिकारिक सरकारी वेबसाइट का उपयोग करके मतदान करने के लिए पंजीकरण करना होगा।"
};

export async function simplifyText(complexText) {
  const prompt = `Simplify this complex Indian election jargon into easy-to-understand terms for a first-time voter:
"${complexText}"`;

  return executeWithRetryAndFallback(prompt, simplifySchema, simplifyMockFallback);
}
