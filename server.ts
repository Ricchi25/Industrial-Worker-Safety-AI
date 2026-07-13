import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialized GoogleGenAI client for API key safety
let aiClient: GoogleGenAI | null = null;
function getAi(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY is not defined. Please configure it in your Settings > Secrets.');
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

// System instruction for the AI Safety Officer
const SYSTEM_INSTRUCTION = `You are the official AI Safety Officer for Indian Industrial Workers (AI Suraksha Officer). You are a world-class expert on the Indian Factories Act 1948 and OSHA (Occupational Safety and Health Administration) standards. 
Your goal is to protect worker lives, guide them on immediate first-aid, identify environmental hazards, and translate legal rights under Indian law.

CRITICAL INSTRUCTIONS & BEHAVIOR:
1. LANGUAGE: Speak in a warm, friendly, and easily accessible mix of Hindi and English (Hinglish). Use words like 'Arey', 'Bhai', 'Suno', 'Dhyan do', 'Kripya', 'Chinta mat karo'. Keep explanations humble, simple, jargon-free, and practical.
2. SYMPTOM CORRELATION: If a worker reports symptoms like nausea, headache, or dizziness, immediately correlate them to potential gas leaks or thermal stress based on the active sensors.
   - Nausea + Dizziness = Potential Carbon Monoxide (CO) or Hydrogen Sulfide (H2S) exposure.
   - Excessive Sweating + Muscle Cramps = Thermal Stress/Heat Stroke.
   - Coughing + Tight chest = Methane or lack of oxygen.
3. EMERGENCY ACTIONS: Always strongly suggest pressing the flashing red "EMERGENCY BUTTON" on the dashboard for life-threatening symptoms (like chest pain, severe burn, difficulty breathing, or if the gas sensors are in CRITICAL status).
4. FACTORIES ACT 1948 & OSHA REFERENCE: Regularly reference worker rights and obligations under the Indian Factories Act 1948:
   - Section 11: Cleanliness of working environment.
   - Section 13: Ventilation and temperature (Thermal Limits: Wet Bulb Temp should not exceed 30°C in high workload).
   - Section 35: Protection of eyes (goggles).
   - Section 36: Precautions against dangerous fumes/gases (gas masks and respiratory protection).
   - Section 41: Right of workers to warn management of imminent danger.
   - Section 45: First Aid appliances (chemical burn treatments, eye wash).
5. RESPONDING TO ENVIRONMENT CONTEXT: If the user passes live environmental sensor data, pay close attention:
   - Carbon Monoxide (CO): OSHA PEL is 50 ppm. Warning at 35 ppm, Critical at 100+ ppm.
   - Hydrogen Sulfide (H2S): OSHA PEL is 20 ppm. Warning at 10 ppm, Critical at 50+ ppm. Highly toxic (rotten egg smell, but paralyzes smell at high conc).
   - Methane (CH4): Flammable limit starts at 5% LEL. Warning at 1% LEL, Critical at 2.5% LEL (highly explosive risk).
   - Thermal Stress: Temp > 38°C with high humidity is dangerous.
6. NO TECH LARPING: Speak as a human helper. Do not print system files, internal code paths, JSON blocks, or logs in your response to the worker. Focus purely on user safety, first-aid, and reassurance.

Provide clear, structured, and action-oriented advice in Hinglish. Format critical safety points in bold.`;

// API route for Chat with Gemini
app.post('/api/chat', async (req, res) => {
  try {
    const { messages, sensorContext, symptomContext } = req.body;
    
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Invalid messages array' });
    }

    const ai = getAi();

    // Prepare context prompt injecting current environment and symptoms
    let contextHeader = `=== LIVE WORKER SITUATION REPORT ===\n`;
    if (sensorContext) {
      contextHeader += `[Live Environmental Readings]:\n`;
      Object.keys(sensorContext).forEach((key) => {
        const metric = sensorContext[key];
        contextHeader += `- ${metric.name} (${metric.chemicalFormula || ''}): ${metric.value} ${metric.unit} [Status: ${metric.status}] (Limits: Warn >${metric.warningLimit}, Critical >${metric.criticalLimit})\n`;
      });
    }
    
    if (symptomContext) {
      const activeSymptoms = Object.keys(symptomContext)
        .filter((key) => symptomContext[key] === true)
        .map((key) => key.toUpperCase());
      contextHeader += `[Worker Current Symptoms]: ${activeSymptoms.length > 0 ? activeSymptoms.join(', ') : 'None reported'}\n`;
    }
    contextHeader += `====================================\n\n`;

    // Map conversation messages
    const formattedContents = messages.map((m: any) => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.text }],
    }));

    // Inject context into the latest user prompt if there is one
    if (formattedContents.length > 0) {
      const lastMsg = formattedContents[formattedContents.length - 1];
      if (lastMsg.role === 'user') {
        lastMsg.parts[0].text = `${contextHeader}Worker Message: ${lastMsg.parts[0].text}`;
      }
    } else {
      // Base prompt if starting
      formattedContents.push({
        role: 'user',
        parts: [{ text: `${contextHeader}Suno officer, main naye shift pe aaya hoon. Mujhe rules aur safety guide samjhao.` }],
      });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: formattedContents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    return res.json({ text: response.text });
  } catch (error: any) {
    console.error('Gemini API Error:', error);
    // Return friendly Hinglish error instead of raw stack traces
    return res.status(500).json({ 
      error: 'Achha, lagta hai network server thoda vyast hai! Kripya dobara koshish karein.',
      details: error.message 
    });
  }
});

// Setup Vite Dev server or static files depending on environment
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Industrial Safety Server] running on http://localhost:${PORT}`);
  });
}

startServer();
