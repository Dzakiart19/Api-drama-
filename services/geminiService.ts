
import { GoogleGenAI } from "@google/genai";
import { EndpointType } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getSimulationResponse = async (type: EndpointType, params: Record<string, string>) => {
  const prompt = `
    Act as a highly sophisticated real-time scraper for DramaBox.com. 
    The user is calling a specific API endpoint. 
    You must return a REALISTIC, valid, and COMPLETE JSON response that mimics the actual server output of DramaBox.
    
    Endpoint Type: ${type}
    Parameters: ${JSON.stringify(params)}
    
    Rules:
    1. Return ONLY raw JSON. No markdown code blocks, no preamble.
    2. Data must include: IDs, titles, cover URLs (use realistic placeholders or actual patterns if known), descriptions, tags, and relevant metrics like ratings or play counts.
    3. If it's a stream request, generate a realistic-looking .m3u8 link (e.g., https://cdn-vod.dramabox.com/...).
    4. If it's a search, return an array of at least 5 results matching the query.
    5. Ensure the structure is deep and clean.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [{ parts: [{ text: prompt }] }],
      config: {
        temperature: 0.2,
        responseMimeType: "application/json"
      }
    });

    const text = response.text || '{}';
    return JSON.parse(text);
  } catch (error) {
    console.error("Gemini Simulation Error:", error);
    throw new Error("Failed to simulate real-time scraping data.");
  }
};
