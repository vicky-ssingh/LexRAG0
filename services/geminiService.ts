import { GoogleGenAI } from "@google/genai";
import { ChatResponse } from "../types";

// NOTE: In a full RAG setup, this service would fetch context from your Python/Flask backend
// and then pass that context to Gemini. Here, we simulate the expert persona directly.

const apiKey = process.env.API_KEY; 
const ai = new GoogleGenAI({ apiKey: apiKey });

const MODEL_NAME = 'gemini-2.5-flash';

export const askLegalAssistant = async (question: string): Promise<ChatResponse> => {
  try {
    // 1. In your full Python version, you would call your Flask API here:
    // const response = await fetch('http://localhost:5000/query', { method: 'POST', body: ... });
    
    // 2. For this frontend demo, we use Gemini directly with a strong system prompt
    // to simulate the RAG behavior on the Companies Act 2013.
    
    const systemInstruction = `
      You are LexRAG, an AI legal assistant specialized in the Indian Companies Act 2013.
      
      Rules:
      1. Answer the user's question based strictly on general knowledge of the Indian Companies Act 2013.
      2. Provide citations (Sections, Sub-sections) where possible.
      3. Format the answer in clear Markdown.
      4. Do not make up laws. If you are unsure, state that.
      5. Keep the tone professional, legal, yet accessible.
    `;

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: question,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.3, // Low temperature for factual legal accuracy
      }
    });

    const text = response.text || "I apologize, I could not generate an answer at this time.";
    
    // Extracting fake citations for the demo visualization
    // In a real RAG, these come from the Retrieval step
    const citations: string[] = [];
    if (text.includes("Section")) {
      const matches = text.match(/Section \d+(\([a-z0-9]+\))?/g);
      if (matches) {
        matches.slice(0, 3).forEach(m => citations.push(`Companies Act 2013, ${m}`));
      }
    }
    if (citations.length === 0) {
      citations.push("Companies Act 2013 - General Provisions");
    }

    return {
      answer: text,
      citations: Array.from(new Set(citations)) // Unique citations
    };

  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to consult the legal archives.");
  }
};