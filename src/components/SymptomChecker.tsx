import React, { useMemo } from 'react';
import { EnvironmentalState, SymptomState } from '../types';
import { Activity, AlertOctagon, Heart, LifeBuoy, AlertTriangle } from 'lucide-react';

interface SymptomCheckerProps {
  symptoms: SymptomState;
  setSymptoms: React.Dispatch<React.SetStateAction<SymptomState>>;
  sensors: EnvironmentalState;
  onEmergencyTrigger: () => void;
}

export default function SymptomChecker({
  symptoms,
  setSymptoms,
  sensors,
  onEmergencyTrigger,
}: SymptomCheckerProps) {
  
  const handleCheckboxChange = (key: keyof SymptomState) => {
    setSymptoms((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const symptomList = [
    { id: 'nausea', label: 'Nausea / Ji Machlana', desc: 'Queasiness, urge to vomit. Linked to toxic fumes.' },
    { id: 'dizziness', label: 'Dizziness / Chakkar Aana', desc: 'Lightheadedness, confusion. Core CO/H2S sign.' },
    { id: 'headache', label: 'Headache / Sar Dard', desc: 'Throbbing ache. High CO risk indicator.' },
    { id: 'eyeIrritation', label: 'Eye Irritation / Aankh Jalna', desc: 'Burning eyes, watering. Linked to H2S gas.' },
    { id: 'breathingDifficulty', label: 'Breathing Difficulty / Saans Phoolna', desc: 'Shortness of breath. Severe risk, lack of O₂.' },
    { id: 'skinRash', label: 'Skin Rash / Chemical Burn', desc: 'Itching or chemical splashes (Factories Act Sec 45).' },
  ];

  // Predictive AI Correlation Logic
  const healthAssessment = useMemo(() => {
    const active = Object.keys(symptoms).filter((k) => symptoms[k as keyof SymptomState] === true);
    if (active.length === 0) {
      return {
        level: 'SAFE' as 'SAFE' | 'WARNING' | 'CRITICAL',
        title: 'Aap Surakshit Hain / You are Safe',
        description: 'Koi bhee lakshan darj nahi kiya gaya hai. Kaam jaari rakhein aur surakshit rahein.',
        advice: 'Shift ke dauran paani peete rahein aur har 2 ghante mein dhyan se check-in karein.',
        urgent: false,
      };
    }

    const hasNausea = symptoms.nausea;
    const hasDizziness = symptoms.dizziness;
    const hasHeadache = symptoms.headache;
    const hasBreathing = symptoms.breathingDifficulty;
    const hasRash = symptoms.skinRash;
    const hasEye = symptoms.eyeIrritation;

    const isCOHigh = sensors.co.status !== 'NORMAL';
    const isH2SHigh = sensors.h2s.status !== 'NORMAL';
    const isMethaneHigh = sensors.methane.status !== 'NORMAL';
    const isTempHigh = sensors.temperature.status !== 'NORMAL';

    // Scenario 1: Carbon Monoxide Poisoning Correlation
    if ((hasNausea || hasDizziness || hasHeadache) && isCOHigh) {
      return {
        level: 'CRITICAL',
        title: 'CO Fumes Se Poisoning Ka Khatra! / CO Toxicity Risk',
        description: 'Aapke lakshan (Nausea/Dizziness/Headache) aur elevated Carbon Monoxide levels aapas mein mel kha rahe hain!',
        advice: 'Fauran fresh air assembly point par jayein. Factories Act Section 36 ke tehat, closed spaces mein ghutna jaanleva ho sakta hai!',
        urgent: true,
      };
    }

    // Scenario 2: Hydrogen Sulfide Poisoning Correlation
    if ((hasEye || hasDizziness || hasNausea) && isH2SHigh) {
      return {
        level: 'CRITICAL',
        title: 'H₂S Fumes Se Dam Ghutne Ka Khatra! / H2S Gas Danger',
        description: 'Elevated Hydrogen Sulfide gas ke sath eye irritation aur chakkar aana bohot dangerous hai.',
        advice: 'H2S gas olfactory nerve ko block kar deti hai (sunghne ki shamta khatam hoti hai). Turant exhaust chalu karein aur baahar niklein!',
        urgent: true,
      };
    }

    // Scenario 3: Methane asphyxiation risk
    if (hasBreathing && isMethaneHigh) {
      return {
        level: 'CRITICAL',
        title: 'Methane Blast Aur Saans Ka Khatra! / Explosion & Suffocation Risk',
        description: 'Methane level is critical aur aapko saans lene mein takleef ho rahi hai. Oxygen replace ho chuka hai!',
        advice: 'Explosive gas limit par hai. Koee bhee spark ya electric switch turn on mat karein! Dhire se safe area mein evacuate karein.',
        urgent: true,
      };
    }

    // Scenario 4: Heat Stroke Correlation
    if ((hasDizziness || hasHeadache || hasNausea) && isTempHigh) {
      return {
        level: 'WARNING',
        title: 'Thermal Stress / Heat Stroke Se Bachav',
        description: 'Temperature bohot adhik hai aur aapko sar dard ya chakkar aa raha hai. Sharir mein paani ki kami (dehydration) ho rahi hai.',
        advice: 'Factories Act Section 13 ke tehat cool resting shelter mein rest karein, ORS ghol peeyein aur sar par thanda kapda rakhein.',
        urgent: false,
      };
    }

    // Scenario 5: Chemical burn or exposure
    if (hasRash) {
      return {
        level: 'WARNING',
        title: 'Chemical Splash / Skin Burn First-Aid',
        description: 'Skin burn ya rash chemical exposure ke karan ho sakta hai.',
        advice: 'Factories Act Sec 45 ke First-aid box se clean chemical neutralizer use karein. Affected skin ko behte hue paani se 15 mins dhowein.',
        urgent: false,
      };
    }

    // Default general symptoms warning
    if (hasBreathing) {
      return {
        level: 'CRITICAL',
        title: 'Emergency Medical Alert Needed',
        description: 'Saans lene mein takleef (Breathing Difficulty) ek bada medical emergency hai.',
        advice: 'Kripya immediate supervisor ko report karein aur emergency oxygen inhaler use karein. EMERGENCY BUTTON dabayein.',
        urgent: true,
      };
    }

    return {
      level: 'WARNING',
      title: 'Lakshano Ki Nigraani Karein / Monitor Symptoms',
      description: 'Aapko sub-optimal health lakshan hain lekin sensors safe hain. Yeh thakan ya dehydration ho sakta hai.',
      advice: 'Paani peeyein, 10 mins rest room mein aaraam karein. Agar tabiyat aur kharab ho toh AI Safety Officer chatbot se salah lein.',
      urgent: false,
    };
  }, [symptoms, sensors]);

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-natural-border p-6 flex flex-col h-full" id="symptom-checker-root">
      <div>
        <h2 className="text-xl font-bold text-natural-dark tracking-tight flex items-center gap-2">
          <Heart className="w-5 h-5 text-natural-rose" />
          Worker Health & Symptom Logger
        </h2>
        <p className="text-sm text-[#8A8471]">Log daily check-ins to correlate and diagnose toxicity risks</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4 flex-1">
        {/* Checkbox Checklist */}
        <div className="space-y-3">
          <label className="text-xs font-bold text-[#8A8471] uppercase tracking-wider block mb-1">
            Check Active Symptoms (Apne Lakshan Chunein)
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {symptomList.map((symptom) => (
              <label
                key={symptom.id}
                className={`p-3 rounded-xl border flex items-start gap-3 cursor-pointer select-none transition-all ${
                  symptoms[symptom.id as keyof SymptomState]
                    ? 'border-natural-rose bg-natural-rose/5 text-natural-dark ring-1 ring-natural-rose/40'
                    : 'border-natural-border bg-natural-bg/20 text-[#8A8471] hover:bg-natural-bg/50'
                }`}
                id={`label-symptom-${symptom.id}`}
              >
                <input
                  type="checkbox"
                  checked={symptoms[symptom.id as keyof SymptomState]}
                  onChange={() => handleCheckboxChange(symptom.id as keyof SymptomState)}
                  className="mt-1 accent-natural-rose w-4 h-4 cursor-pointer"
                  id={`checkbox-symptom-${symptom.id}`}
                />
                <div>
                  <div className="text-xs font-extrabold text-natural-text">{symptom.label}</div>
                  <div className="text-[10px] text-[#8A8471] mt-0.5 leading-snug font-medium">{symptom.desc}</div>
                </div>
              </label>
            ))}
          </div>
          
          <button
            onClick={() => setSymptoms({
              nausea: false,
              dizziness: false,
              headache: false,
              eyeIrritation: false,
              breathingDifficulty: false,
              skinRash: false,
            })}
            className="text-[11px] font-bold text-natural-olive hover:text-natural-dark hover:underline transition-all block mt-2 cursor-pointer"
          >
            Clear All Symptoms (Sare Lakshan Saaf Karein)
          </button>
        </div>

        {/* Predictive AI Correlation Analysis */}
        <div className="flex flex-col">
          <label className="text-xs font-bold text-[#8A8471] uppercase tracking-wider block mb-1">
            Predictive AI Diagnostic Output
          </label>
          <div className={`border p-4 rounded-2xl flex-1 flex flex-col justify-between ${
            healthAssessment.level === 'CRITICAL'
              ? 'border-natural-rose/30 bg-natural-rose/5'
              : healthAssessment.level === 'WARNING'
              ? 'border-natural-sand/30 bg-natural-sand/5'
              : 'border-natural-border bg-natural-bg/30'
          }`} id="diagnostic-panel">
            <div>
              <div className="flex items-center gap-2 mb-2">
                {healthAssessment.level === 'CRITICAL' ? (
                  <AlertOctagon className="w-5 h-5 text-natural-rose animate-pulse" />
                ) : healthAssessment.level === 'WARNING' ? (
                  <AlertTriangle className="w-5 h-5 text-natural-sand" />
                ) : (
                  <Activity className="w-5 h-5 text-natural-olive" />
                )}
                <span className={`text-sm font-black ${
                  healthAssessment.level === 'CRITICAL'
                    ? 'text-natural-rose'
                    : healthAssessment.level === 'WARNING'
                    ? 'text-natural-sand'
                    : 'text-natural-olive'
                }`}>
                  {healthAssessment.title}
                </span>
              </div>
              <p className="text-xs text-natural-text font-medium leading-relaxed">
                {healthAssessment.description}
              </p>
              
              <div className="mt-3 pt-3 border-t border-natural-border/50">
                <div className="text-[10px] font-bold text-[#8A8471] uppercase tracking-wider mb-1.5 flex items-center gap-1">
                  <LifeBuoy className="w-3.5 h-3.5 text-natural-olive" />
                  Kanooni Safety & First Aid Advice (Pratham Upchar)
                </div>
                <p className="text-xs text-natural-olive font-bold leading-relaxed bg-natural-beige/30 p-2.5 rounded-xl border border-natural-border">
                  {healthAssessment.advice}
                </p>
              </div>
            </div>

            {/* Quick Emergency Button inside Risk Panel */}
            {healthAssessment.urgent && (
              <button
                onClick={onEmergencyTrigger}
                className="mt-4 w-full bg-natural-rose hover:bg-natural-rose/90 text-white font-black py-2.5 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 animate-pulse transition-colors cursor-pointer"
                id="urgent-symptom-emergency-btn"
              >
                <AlertOctagon className="w-4 h-4" />
                DANGER: PRESS EMERGENCY BUTTON NOW!
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
