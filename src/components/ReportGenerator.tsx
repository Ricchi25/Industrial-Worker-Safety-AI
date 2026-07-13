import React, { useState } from 'react';
import { FileText, Copy, Check, Download, Info, Github } from 'lucide-react';

export default function ReportGenerator() {
  const [copied, setCopied] = useState(false);

  const reportText = `# UN SDG INDUSTRIAL WORKER HEALTH & SAFETY AI PLATFORM
## Final Term Project Submission Document
**File Name:** SDG_IndustrialSafetyAI_StudentSubmission.md  
**Sustainable Development Goals:** SDG 3 (Good Health & Well-being) & SDG 8 (Decent Work & Economic Growth)  
**Target Deployment Agency:** Ministry of Labour & Employment, Government of India  

---

### 1. Selected SDG & Reason for Selection
* **Selected Goal:** SDG 3 (Good Health and Well-being) & SDG 8 (Decent Work and Economic Growth).
* **Focus Area:** Sub-target 3.9 (Reduce deaths and illnesses from hazardous chemicals and air/water/soil pollution) and Sub-target 8.8 (Protect labor rights and promote safe and secure working environments for all workers, including migrant workers and those in precarious employment).
* **Reason for Selection:** Indian industrial sectors (especially chemical refineries, glass factories, smelting furnaces, and underground mines) rely heavily on contract laborers. These workers operate in hazardous conditions with minimal safety compliance, leading to thousands of preventable deaths and amputations annually. This project leverages Generative and Predictive AI to protect the lives and legal rights of these workers on the factory floor.

---

### 2. Problem Statement
* **The Problem:** Workers are exposed to silent, fatal concentrations of toxic gases (Carbon Monoxide, Hydrogen Sulfide, and Methane) and severe thermal stress without immediate warning systems. 
* **Location:** Heavy manufacturing zones, steel smelting foundries, and chemical processing clusters across industrial hubs in India (e.g., Morbi, Ankleshwar, Vapi, Raipur, Navi Mumbai).
* **Affected Audience:** Low-wage, informal, and undereducated contract workers who cannot read complex manuals and are unaware of their legal safety rights under Indian labor laws.
* **Severity of Consequences:** If untreated, gaseous asphyxiation causes instant sensory paralysis and respiratory arrest. Delayed evac during flammable gas leaks leads to catastrophic boiler explosions (blasts). Long-term neglect results in permanent occupational lung disease, amputations, or fatal injuries.

---

### 3. Proposed Solution
This **Industrial Worker Safety AI Platform** is a full-stack, sensor-driven safety dashboard and Hinglish legal-compliance supervisor:
1. **Sensor-Driven Purge Telemetry:** Simulates real-time IoT air and noise telemetry (CO, H2S, Methane, Temp, Noise) with automated ventilation adjustments based on safety boundaries.
2. **Symptom-Sensor Correlation (Predictive AI):** Allows workers to frequently log physical health symptoms (nausea, dizziness, headache). The predictive algorithm matches symptoms with sensor spikes to diagnose air poisoning before it turns fatal.
3. **Generative Hinglish Safety Officer (Gemini AI):** A server-side chatbot utilizing Google Gemini 3.5 Flash. It answers questions, details first-aid protocols, and explains legal worker rights in accessible, friendly Hinglish.
4. **Emergency siren system:** Integrated with a dual-tone local synthesizer for instant physical evacuation signals (Factories Act Sec 40 compliance).

---

### 4. Project Features
* **Real-time Environmental Sensor Hub:** Live sliders and preset incident triggers (Methane Peak, Toxic Gas Leak, Smelting Heatwave) to simulate hazardous environments.
* **Worker Health Symptom Logger:** Multi-symptom checklist that analyzes worker conditions and correlates them with raw toxic thresholds.
* **Hinglish AI Suraksha Officer (Chatbot):** Direct interactive chatbot powered by Gemini 3.5 Flash, providing legal, physical, and medical counseling.
* **Web Audio Siren & Evacuation Panel:** Big red emergency trigger generating actual loud siren sounds with mock GPS coordinates and evacuation rules.
* **Factories Act 1948 Compliance Reference:** Embedded database containing legal sections, safe limits, and Indian factory incident case studies.
* **Social Lean Canvas Grid:** Interactive business/social impact board defining operations and financial sustainability.

---

### 5. Technology Stack
* **Generative & Predictive AI:** Google Gemini Developer API (via the server-side \`@google/genai\` SDK) using the \`gemini-3.5-flash\` model.
* **Frontend UI Framework:** React 19, TypeScript, and Tailwind CSS.
* **Server-Side API Proxy:** Node.js, Express, and \`dotenv\` for secure, non-exposed API key management.
* **Build System & Hot Reload:** Vite 6 with custom CJS bundling using \`esbuild\`.
* **Visual Icons:** \`lucide-react\` vector icons.
* **Audio Warning Synthesizer:** Web Audio API oscillator nodes.

---

### 6. Project Proof of Work (Screenshots)
*(Copy this text into Word/PDF and insert your application screenshots in the placeholders below)*

#### SCREENSHOT 1: ENVIRONMENT SENSOR HUB
> **Description:** Shows the real-time sensor dials and preset testing selectors (Normal, Methane Peak, Gas Leak, Smelting Heatwave).
> *[INSERT YOUR WEBSITE HOMEPAGE AND SENSOR SLIDERS SCREENSHOT HERE]*

#### SCREENSHOT 2: WORKER HEALTH SYMPTOM DIAGNOSTIC
> **Description:** Shows the active symptom checklists with the Predictive AI risk correlation warning alert active.
> *[INSERT YOUR WORKER SYMPTOM LOGGING SCREENSHOT HERE]*

#### SCREENSHOT 3: HINGLISH AI SURAKSHA OFFICER CHAT
> **Description:** Shows the chatbot answering chemical burn first aid or legal ventilation rules in friendly Hindi/English mix.
> *[INSERT YOUR GEMINI AI CHAT WINDOW SCREENSHOT HERE]*

#### SCREENSHOT 4: EVACUATION SIREN ACTIVATED
> **Description:** Shows the flashing Red Emergency Warning system with coordinates, supervisor broadcast, and siren toggles.
> *[INSERT YOUR EMERGENCY PANEL STATE SCREENSHOT HERE]*

#### SCREENSHOT 5: SOCIAL LEAN CANVAS
> **Description:** Shows the comprehensive business canvas detailing customer segments, cost structures, and social value streams.
> *[INSERT YOUR LEAN CANVAS SCREENSHOT HERE]*

---

### 7. Open Source Code Link
* **GitHub Repository:** [INSERT YOUR GITHUB REPOSITORY LINK HERE]  
* **Source Code Verification:** Includes fully annotated modular TypeScript components, local telemetry simulation, and the secure Gemini express proxy server.

---

### 8. Future Scope
1. **Physical IoT Hardware coupling:** Connect the React interface via WebUSB or WebBluetooth to real gas sensors (MQ-2, MQ-135) and a physical buzzer on a safety helmet.
2. **Offline Web Assembly Models:** Compile a lightweight speech-to-text model locally so illiterate workers can speak symptoms in regional dialects (Marathi, Gujarati, Bengali, Tamil) without needing internet.
3. **Worker Location Tracing:** Implement sub-meter indoor beacons to track trapped workers during a reactor blast or collapse under Factories Act safety guidelines.
4. **Automated Government SMS Alerts:** Direct integration with state labor departments (DISHA) to auto-notify inspectors of illegal contractor gas-level coverups.

---
**Created using Google AI Studio Build - Final Term Project SDG Solution**`;

  const handleCopy = () => {
    navigator.clipboard.writeText(reportText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-natural-border p-6 flex flex-col h-[550px]" id="report-generator-root">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4">
        <div>
          <h2 className="text-xl font-bold text-natural-dark tracking-tight flex items-center gap-2">
            <FileText className="w-5 h-5 text-natural-olive" />
            SDG Project Assignment Generator
          </h2>
          <p className="text-sm text-[#8A8471]">Generate the complete, ready-to-submit Word/PDF document text</p>
        </div>
        <button
          onClick={handleCopy}
          className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0 ${
            copied
              ? 'bg-natural-olive text-white shadow-xs animate-pulse'
              : 'bg-natural-olive hover:bg-[#4A4A33] text-white shadow-xs'
          }`}
          id="copy-report-btn"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4" />
              Copied to Clipboard!
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              Copy Full Report Text
            </>
          )}
        </button>
      </div>

      <div className="bg-natural-sand/5 border border-[#A68A64]/30 p-3 rounded-2xl flex gap-2.5 items-start text-xs text-natural-dark mb-4">
        <Info className="w-5 h-5 text-natural-sand shrink-0 mt-0.5" />
        <div className="font-medium">
          <strong>Assignment Hack:</strong> Copy this text, paste it into MS Word, Google Docs, or a Markdown editor, and replace the highlighted <strong>[INSERT SCREENSHOT HERE]</strong> blocks with screenshots of this working applet. Save it as <strong>SDG_WorkerSafety_YourName.pdf</strong> and upload it on your college portal!
        </div>
      </div>

      {/* GitHub Instructions Panel */}
      <div className="bg-natural-dark text-[#E6E2D3] p-4 rounded-2xl mb-4 border border-natural-border">
        <h3 className="text-xs font-bold flex items-center gap-1.5 uppercase tracking-wider text-white">
          <Github className="w-4 h-4 text-natural-olive" />
          Exporting to GitHub for Project Submission
        </h3>
        <p className="text-[11px] text-[#DCD7CC] mt-1 leading-relaxed font-medium">
          Your professor requires an open-source GitHub code link. You can do this easily:
        </p>
        <ul className="text-[11px] text-[#DCD7CC] space-y-1 list-decimal pl-4.5 mt-2 font-bold leading-relaxed">
          <li>Click the <strong>Settings Cog ⚙️</strong> in the top-right menu of your Google AI Studio workspace.</li>
          <li>Select the <strong>Export to GitHub</strong> option. This will automatically authenticate and push this entire repository (including files, backend, and documentation) to your personal GitHub account!</li>
          <li>Copy the repository link and paste it into the <strong>Open Source Code Link</strong> section of your report.</li>
        </ul>
      </div>

      {/* Preview Container */}
      <div className="flex-1 overflow-y-auto p-4 bg-[#FDFCFB] border border-natural-border rounded-xl font-mono text-[11px] text-natural-text whitespace-pre-wrap leading-relaxed select-all" id="report-preview-box">
        {reportText}
      </div>
    </div>
  );
}
