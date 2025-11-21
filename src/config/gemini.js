const apiKey = import.meta.env.VITE_GEMINI_API
import { GoogleGenAI } from "@google/genai";
// The client gets the API key from the environment variable GEMINI_API_KEY.
const ai = new GoogleGenAI({ apiKey });

async function runChat(prompt) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });
  console.log(response.text);
  return response.text;
}

export default runChat;