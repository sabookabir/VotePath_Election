import { GoogleGenAI } from "@google/genai";

const apiKey = "AIzaSyBtODifrRTdWHLiTUpaLCSXYhtQdUNZbbw";
const ai = new GoogleGenAI({ apiKey });

async function test() {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: "Say hi"
    });
    console.log("SUCCESS:", response.text);
  } catch (err) {
    console.error("API ERROR:", err.message);
  }
}
test();
